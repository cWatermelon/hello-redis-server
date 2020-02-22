import { Controller, Post, Body, Get, Query, Delete } from '@nestjs/common';
import { RedisService } from './redis.service';
import IORedis from 'ioredis';
import { Observable } from 'rxjs';
import { SetValueByKey } from '../interface/redis.interface';

/**
 * @author chenc
 * @description 操作redids服务器
 */
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
	getValueByKey(@Query('key') key: string): Observable<string> {
		return this.redis.getValueByKey(key);
	}

	@Delete('key')
	deleteKey(@Query('key') key: string) {
		return this.redis.deleteKey(key);
	}

	@Post('set')
	setValueByKey(@Body() params: SetValueByKey) {
		return this.redis.setValueByKey(params);
	}

	@Get('ttl')
	getTtlByKey(@Query('key') key: string): Observable<number> {
		return this.redis.getKeyOfTtl(key);
	}
}
