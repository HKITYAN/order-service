import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import supertest from 'supertest';
import { MapService } from '@/map/map.service';
import { Order } from '@/order/order.entity';
import OrderCoordinate from '@/order/dto/orderCoordinate.dto';
import { GloablExceptionFilter } from '@/exception.filter';
import { ValidationException } from '@/validationException';
import { getConnection } from "typeorm";
import { Status } from '@/order/enum/status.enum';
import { UpdateStatus } from '@/order/dto/updateStatus.dto';

describe('Order Controller E2E test', () => {
  let app: INestApplication;
  let request: supertest.SuperTest<supertest.Test>

  beforeEach(async () => {
    jest.setTimeout(5000)
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      exceptionFactory: (errors) => (new ValidationException(errors))
    }))
    app.useGlobalFilters(new GloablExceptionFilter());
    await app.init();

    request = supertest(app.getHttpServer())
  });


  describe("list order functionality test", () => {
    test.each`
      page   |  limit   |  case
      ${1}   |   ${1}   |  ${"handle list order"}
      ${100} |   ${1}   |  ${"handle empty order"}
      ${0}   |   ${1}   |  ${"handle wrong input"} 
    `('GET /orders => $case', ({ page, limit }) => {
      expect.hasAssertions()
      const orderList = [
        {
          "status": "UNASSIGNED",
          "distance": 100,
          "id": "46616236-e11c-4e9d-9aba-dff66b720c2c"
        }
      ]
      return request
        .get(`/orders?page=${page}&limit=${limit}`)
        .then(response => {
          switch(response.status) {
            case HttpStatus.OK:
              if (page === 1) expect(response.body).toEqual(orderList)
              if (page === 100) expect(response.body).toEqual([])
              break
            case HttpStatus.BAD_REQUEST:
              expect(response.body).toMatchObject({ error: "VALIDATION_ERROR" })
              break
            default:
              expect(response.body).toHaveProperty("error")
              break
          }
        });
    });
  })

  describe("create order functionality test", () => {
    const wrongFormatCoordinate: OrderCoordinate = {
      origin: ["x200.4320x", "-81.38992"],
      destination: ["50.4320", "-81.38992"]
    }
    const correctCoordinate: OrderCoordinate = {
      origin: ["40.4320", "-81.38992"],
      destination: ["50.4320", "-81.38992"]
    }
    test.each`
      input                    |  case
      ${wrongFormatCoordinate} |  ${"handle wrong format coordinate"}
      ${correctCoordinate}     |  ${"handle create order"}
    `('POST /orders => $case', ({ input }) => {
      expect.hasAssertions()
      return request
        .post('/orders')
        .send(input)
        .set('Accept', 'application/json')
        .then(response => {
          switch(response.status) {
            case HttpStatus.OK:
              expect(response.body).toHaveProperty("id")
              expect(response.body).toHaveProperty("distance")
              expect(response.body).toHaveProperty("status", Status.UNASSIGNED)
              break
            case HttpStatus.BAD_REQUEST:
              expect(response.body).toMatchObject({ error: "VALIDATION_ERROR" })
              break
            default:
              expect(response.body).toHaveProperty("error")
              break
          }
        });
    });
  })

  describe("take order functionality test", () => {
    const unassingedOrderId = "46616236-e11c-4e9d-9aba-dff66b720c2c"
    const takenOrderId = "46616236-e11c-4e9d-9aba-dff66b720c2c"
    const nonExistId = "55516236-e11c-4e9d-9aba-dff66b720c2c"
    const wrongFormatOrderId = "xxxx-xxxx-xxx-xxxxxx"
    
    test.each`
      input                   |   case
      ${unassingedOrderId}    |   ${"take an order with UNASSIGNED status"}
      ${takenOrderId}         |   ${"take an order with TAKEN status"}
      ${nonExistId}           |   ${"take an order which does not exists"}
      ${wrongFormatOrderId}   |   ${"id with wrong format"}
    `("takeOrder => $case", async ({ input }) => {
      const successResponse : UpdateStatus = { status: "SUCCESS" }
      expect.hasAssertions()
      return request
      .patch(`/orders/${input}`)
      .send({"status": "TAKEN"})
      .set('Accept', 'application/json')
      .then(response => {
        switch(response.status) {
          case HttpStatus.OK:
            expect(response.body).toEqual(successResponse)
            break
          case HttpStatus.BAD_REQUEST:
            expect(response.body).toMatchObject({ error: "VALIDATION_ERROR" })
            break
          default:
            expect(response.body).toHaveProperty("error")
            break
        }
      });
    })
  })

  


  afterAll(async () => {
    const connection = getConnection()
    await connection.close()
    await app.close();
  });
});
