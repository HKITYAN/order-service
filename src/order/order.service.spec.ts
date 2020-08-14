import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { MapService } from '@/map/map.service';
import { MapServiceMock } from '@/map/map.mock.spec';
import { Repository, UpdateResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './order.entity';
import OrderCoordinate from './dto/orderCoordinate.dto';
import { Status } from './enum/status.enum';
import { HttpException, HttpStatus, HttpService } from '@nestjs/common';
import { UpdateStatus } from './dto/updateStatus.dto';

describe('OrderService', () => {
  let orderService: OrderService;
  let orderRepo: Repository<Order>;

  const unassignedOrder : Order = {
    id: "c22a7249-f252-4dee-9cbc-735bac0f79b2",
    status: Status.UNASSIGNED,
    createdDate: new Date(),
    updatedDate: new Date(),
    version: 0
  } as Order;

  const takenOrder : Order = {
    id: "7e0f39f4-74d2-4a4e-b934-cfbc379f5578",
    status: Status.TAKEN,
    createdDate: new Date(),
    updatedDate: new Date(),
    version: 0
  } as Order;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: MapService,
          useClass: MapServiceMock
        },
        {
          provide: getRepositoryToken(Order),
          useClass: Repository
        }
      ],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
    orderRepo = module.get<Repository<Order>>(getRepositoryToken(Order));
  });

  it('order service should be defined', () => {
    expect(orderService).toBeDefined();
  });

  describe("create order functionality test", () => {
    const coordinate1: OrderCoordinate = {
      origin: ["200.4320", "-81.38992"],
      destination: ["50.4320", "-81.38992"]
    }
    const coordinate2: OrderCoordinate = {
      origin: ["100.4320", "-81.38992"],
      destination: ["50.4320", "-81.38992"]
    }

    test.each`
      input          |  case
      ${coordinate1} |  ${"return a new order"}
      ${coordinate2} |  ${"handle exception FAIL_TO_GET_DISTANCE"}
    `("createOrder => $case", async ({ input }) => {
      
      jest.spyOn(orderRepo, "save").mockImplementation(() => Promise.resolve(unassignedOrder))

      expect.assertions(1);
      try {
        expect(await orderService.createOrder(input)).toBe(unassignedOrder);
      } catch(exception) {
        const failToGetDistanceException : HttpException = new HttpException("FAIL_TO_GET_DISTANCE", HttpStatus.INTERNAL_SERVER_ERROR)
        expect(exception).toEqual(failToGetDistanceException)
      }
    })
  });

  describe("take order functionality test", () => {
    const unassingedOrderId = unassignedOrder.id
    const takenOrderId = takenOrder.id
    const fakeOrderId = "xxxx-xxxx-xxx"

    const findOne = (id) => {
      if (id === unassingedOrderId) return Promise.resolve(unassignedOrder)
      if (id === takenOrderId) return Promise.resolve(takenOrder)
      return null;
    }
    
    test.each`
      input                   |   case
      ${unassingedOrderId}    |   ${"take an order with UNASSIGNED status"}
      ${takenOrderId}         |   ${"take an order with TAKEN status"}
      ${fakeOrderId}          |   ${"take an order which does not exists"}
    `("takeOrder => $case", async ({ input }) => {
      const successResponse : UpdateStatus = { status: "SUCCESS" }
      jest.spyOn(orderRepo, "findOne").mockImplementation(findOne)
      jest.spyOn(orderRepo, "update").mockImplementation(() => Promise.resolve({ affected: 1 } as UpdateResult))
      
      expect.assertions(1);
      try {
        expect(await orderService.takeOrder(input)).toEqual(successResponse);
      } catch(exception) {
        const orderTakenException = new HttpException("ORDER_ALREADY_TAKEN", HttpStatus.FORBIDDEN)
        const orderNotFoundException = new HttpException("ORDER_NOT_FOUND", HttpStatus.NOT_FOUND)
        switch(input) {
          case "7e0f39f4-74d2-4a4e-b934-cfbc379f5578":
            expect(exception).toEqual(orderTakenException)
            break
          case "xxxx-xxxx-xxx":
            expect(exception).toEqual(orderNotFoundException)
            break
          default:
            expect(exception).toEqual(orderNotFoundException) 
        }
          
        
      }
    })
  })

  describe("list order functionality test", () => {
    it ("listOrder => list order when there exists orders", async () => {
      jest.spyOn(orderRepo, "find").mockImplementation(() => Promise.resolve([takenOrder, unassignedOrder]))
      expect((await orderService.listOrder(1, 1)).sort()).toEqual([takenOrder, unassignedOrder].sort())
    })

    it ("listOrder => return empty array when there are no orders", async () => {
      jest.spyOn(orderRepo, "find").mockImplementation(() => Promise.resolve([]))
      expect(await orderService.listOrder(1, 1)).toEqual([])
    })
  })
});
