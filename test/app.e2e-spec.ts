import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import supertest from 'supertest';
import { MapService } from '@/map/map.service';
import { Order } from '@/order/order.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /orders', () => {
    const orderList = [
      {
        "status": "UNASSIGNED",
        "distance": 100,
        "id": "46616236-e11c-4e9d-9aba-dff66b720c2c"
      }
    ]
    return supertest(app.getHttpServer())
      .get('/orders?page=1&limit=1')
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(orderList)
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
