import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { MapService } from '@/map/map.service';
import { MapServiceMock } from '@/map/map.mock.spect';
import { getRepository, Repository, UpdateResult } from 'typeorm';
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
    id: "c22a7249-f252-4dee-9cbc-735bac0f79b2",
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

  it('should be defined', () => {
    expect(orderService).toBeDefined();
  });

  describe("create order functionality test", () => {

    it("able to return a new order", async () => {
      const coordinate: OrderCoordinate = {
        origin: ["41.4320", "-81.38992"],
        destination: ["50.4320", "-81.38992"]
      }
      jest.spyOn(orderRepo, "save").mockImplementation(() => Promise.resolve(unassignedOrder))
      expect(await orderService.createOrder(coordinate)).toBe(unassignedOrder);
    })

    it("able to handle exception FAIL_TO_GET_DISTANCE", async () => {
      const coordinate: OrderCoordinate = {
        origin: ["60.4320", "-81.38992"],
        destination: ["50.4320", "-81.38992"]
      }

      const httpException : HttpException = new HttpException("FAIL_TO_GET_DISTANCE", HttpStatus.INTERNAL_SERVER_ERROR)

      await expect(orderService.createOrder(coordinate)).rejects.toThrow(httpException);
    })
  });

  describe("take order functionality test", () => {
    const unassingedOrderId = "c22a7249-f252-4dee-9cbc-735bac0f79b2"
    const takenOrderId = "3ffc6389-a7b0-4f08-a7c2-56100592f630"

    const findOne = (id) => {
      if (id === unassingedOrderId) return Promise.resolve(unassignedOrder)
      if (id === takenOrderId) return Promise.resolve(takenOrder)
      return null;
    }
    

    it("able to take order successfully", async () => {
      const successResponse : UpdateStatus = { status: "SUCCESS" }
      jest.spyOn(orderRepo, "findOne").mockImplementation(findOne)
      jest.spyOn(orderRepo, "update").mockImplementation(() => Promise.resolve({ affected: 1 } as UpdateResult))
      expect(await orderService.takeOrder(unassingedOrderId)).toMatchObject(successResponse);
    })

    it("able to handle exception ORDER_NOT_FOUND", async () => {
      const httpException = new HttpException("ORDER_NOT_FOUND", HttpStatus.NOT_FOUND)
      jest.spyOn(orderRepo, "findOne").mockImplementation(findOne)
      await expect(orderService.takeOrder("xxxx-xxxx-xxxx")).rejects.toThrow(httpException);
    })

    it("able to handle exception ORDER_ALREADY_TAKEN", async () => {
      const httpException = new HttpException("ORDER_ALREADY_TAKEN", HttpStatus.FORBIDDEN)
      jest.spyOn(orderRepo, "findOne").mockImplementation(findOne)
      await expect(orderService.takeOrder(takenOrderId)).rejects.toThrow(httpException);
    })
  })

  describe("listOrder functionality test", () => {
    it ("able to list order when there exists orders", async () => {
      jest.spyOn(orderRepo, "find").mockImplementation(() => Promise.resolve([takenOrder, unassignedOrder]))
      expect(await orderService.listOrder(1, 1)).toEqual(expect.arrayContaining([takenOrder, unassignedOrder]))
    })

    it ("able to return empty array when there are no orders", async () => {
      jest.spyOn(orderRepo, "find").mockImplementation(() => Promise.resolve([]))
      expect(await orderService.listOrder(1, 1)).toEqual(expect.arrayContaining([]))
    })
  })
});
