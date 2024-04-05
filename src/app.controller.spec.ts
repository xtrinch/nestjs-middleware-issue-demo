import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import * as request from 'supertest';

describe('AppController', () => {
  let appController: AppController;
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const module = Test.createTestingModule({
      imports: [AppModule]
    });

    const moduleFixture: TestingModule = await module.compile();

     app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    // remove the exclude and observe that it works
    app.setGlobalPrefix('api', { exclude: ['/'] });
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  
    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "pong"', async () => {
      const result = await request(app.getHttpServer())
        .get(`/api/app`)
        .expect(200);
      expect(result.text).toBe('pong');
    });
  });

  afterAll(done => {
    app.close();
    done();
});
});
