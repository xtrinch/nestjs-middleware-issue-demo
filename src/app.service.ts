import { Injectable } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class AppService {
  async getHello(req: FastifyRequest): Promise<string> {
    return req.headers.test as string;
  }
}
