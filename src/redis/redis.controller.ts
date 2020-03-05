import IORedis from 'ioredis';
import { Controller, Post, Body, Get, Query, Delete, Put, UseGuards } from '@nestjs/common';
import { RedisService } from './redis.service';
import { AuthService } from '../auth/auth.service';
import { SetValueByKey, Response, ExpireOfKey, RenameKey } from '../interface/redis.interface';
import { AuthGuard } from '@nestjs/passport';

/**
 * @author chenc
 * @description 操作redids服务器
 */
@Controller('redis')
export class RedisController {
	constructor(private readonly redis: RedisService, private readonly authService: AuthService) {}

	@UseGuards(AuthGuard('local'))
	@Post('login')
	async login(@Body() params: IORedis.RedisOptions & { name: string }): Promise<Response<boolean>> {
		const result = await this.authService.login(params);
		return {
			statusCode: 200,
			data: result
		};
	}

	@UseGuards(AuthGuard('jwt'))
	@Get('keys')
	async keys(@Query('partten') partten: string): Promise<Response<string[]>> {
		const result = await this.redis.keys(partten);
		return {
			statusCode: 200,
			data: result
		};
	}

	@Get('key')
	async getValueByKey(@Query('key') key: string): Promise<Response<string>> {
		const result = await this.redis.getValueByKey(key);
		return {
			statusCode: 200,
			data: result
		};
	}

	@Delete('key')
	async deleteKey(@Query('key') key: string) {
		const result = await this.redis.deleteKey(key);
		return {
			statusCode: 200,
			data: result
		};
	}

	@Post('set')
	async setValueByKey(@Body() params: SetValueByKey): Promise<Response<string>> {
		const result = await this.redis.setValueByKey(params);
		return {
			statusCode: 200,
			data: result
		};
	}

	@Get('ttl')
	async getTtlByKey(@Query('key') key: string): Promise<Response<number>> {
		const result = await this.redis.getKeyOfTtl(key);
		return {
			statusCode: 200,
			data: result
		};
	}

	@Put('expire')
	async setExpireOfKey(@Body() params: ExpireOfKey): Promise<Response<1 | 0>> {
		const result = await this.redis.setExpireOfKey(params.key, params.expireTime);
		return {
			statusCode: 200,
			data: result
		};
	}

	@Put('rename')
	async renameKey(@Body() params: RenameKey): Promise<Response<string>> {
		const result = await this.redis.renameKey(params.key, params.newKey);
		return {
			statusCode: 200,
			data: result
		};
	}
}
