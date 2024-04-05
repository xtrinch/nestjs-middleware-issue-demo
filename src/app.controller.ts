import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { FastifyRequest, FastifyReply } from 'fastify';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(
    @Req() request: FastifyRequest,
  ): Promise<string> {
    const response = await this.appService.getHello(request);
    return response;
  }
}
