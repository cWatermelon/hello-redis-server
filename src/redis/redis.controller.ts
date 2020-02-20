import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { RedisService } from './redis.service';
import IORedis from 'ioredis';
import { Observable } from 'rxjs';

@Controller('redis')
export class RedisController {
  constructor(readonly redis: RedisService) {}

  @Post('login')
  login(@Body() params: IORedis.RedisOptions) {
    this.redis.login(params);
  }

  @Get('keys')
  keys(@Query('partten') partten: string): Observable<string[]> {
    return this.redis.keys(partten);
  }

  @Get('key')
  getValueByKe(@Query('key') key: string): Observable<string> {
    return this.redis.getValueByKey(key);
  }
}
