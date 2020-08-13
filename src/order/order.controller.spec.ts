import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MapService } from '@/map/map.service';
import { MapServiceMock } from '@/map/map.mock.spec';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository, UpdateResult } from 'typeorm';
import OrderCoordinate from './dto/orderCoordinate.dto';
import { Status } from './enum/status.enum';
import { OrderId } from './dto/orderId.dto';
import { UpdateStatus, UpdateStatusEnum } from './dto/updateStatus.dto';
import { Pagination } from './dto/pagination.dto';
import { HttpService } from '@nestjs/common';

describe('Order Controller', () => {
  let orderController: OrderController;
  let orderService: OrderService;
  let orderRepo: Repository<Order>
  const order : Order = {
    id: "c22a7249-f252-4dee-9cbc-735bac0f79b2",
    status: Status.UNASSIGNED,
    createdDate: new Date(),
    updatedDate: new Date(),
    version: 0
  } as Order;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
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
      ]
    }).compile();

    orderController = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService)
    orderRepo = module.get<Repository<Order>>(getRepositoryToken(Order));
  });

  it('order controller should be defined', () => {
    expect(orderController).toBeDefined();
  });

  describe("create order functionality test",() => {
    const coordinate: OrderCoordinate = {
      origin: ["100.4320", "-81.38992"],
      destination: ["50.4320", "-81.38992"]
    }

    it("createOrder => create an order", async () => {
      jest.spyOn(orderRepo, "save").mockImplementation(() => Promise.resolve(order))
      expect(await orderController.createOrder(coordinate)).toBe(order)
    })
  })

  describe("take order functionality test",() => {
    const findOne = (id) =>  Promise.resolve(order)

    const coordinate: OrderCoordinate = {
      origin: ["100.4320", "-81.38992"],
      destination: ["50.4320", "-81.38992"]
    }

    it("takeOrder => take an order", async () => {
      const id : string  = "c22a7249-f252-4dee-9cbc-735bac0f79b2"
      const status : UpdateStatusEnum = UpdateStatusEnum.TAKEN
      const successResponse : UpdateStatus = { status: "SUCCESS" }
      
      jest.spyOn(orderRepo, "findOne").mockImplementation(findOne)
      jest.spyOn(orderRepo, "update").mockImplementation(() => Promise.resolve({ affected: 1 } as UpdateResult))

      expect(await orderController.takeOrder({ id }, { status })).toEqual(successResponse)
    })
  })

  describe("get order list functionality test",() => {
    

    it("getOrderList => get order list", async () => {
      const pagination : Pagination = { page: "1", limit: "1" }
      jest.spyOn(orderRepo, "find").mockImplementation(() => Promise.resolve([order]))
      expect((await orderController.getOrderList(pagination)).sort()).toEqual(([order].sort()))
    })
  })

  
});
