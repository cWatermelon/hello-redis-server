import IORedis from 'ioredis';
import { AuthGuard } from '@nestjs/passport';
import { RedisService } from './redis.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../decorator/user.decorator';
import { SetValueByKey, Response, ExpireOfKey, RenameKey } from '../interface/redis.interface';
import { Controller, Post, Body, Get, Query, Delete, Put, UseGuards } from '@nestjs/common';

/**
 * @author chenc
 * @description 操作redids服务器
 */
@Controller('redis')
export class RedisController {
	constructor(private readonly authService: AuthService, private readonly redis: RedisService) {}

	@Post('login')
	async login(@Body() params: IORedis.RedisOptions & { name: string }): Promise<Response<{ accessToken: string }>> {
		const result = await this.authService.login(params);
		return {
			statusCode: 200,
			data: result
		};
	}

	@UseGuards(AuthGuard())
	@Get('keys')
	async keys(@Query('partten') partten: string): Promise<Response<string[]>> {
		const result = await this.redis.keys(partten);
		return {
			statusCode: 200,
			data: result
		};
	}

	@UseGuards(AuthGuard())
	@Get('key')
	async getValueByKey(@Query('key') key: string): Promise<Response<string>> {
		const result = await this.redis.getValueByKey(key);
		return {
			statusCode: 200,
			data: result
		};
	}

	@UseGuards(AuthGuard())
	@Delete('key')
	async deleteKey(@Query('key') key: string) {
		const result = await this.redis.deleteKey(key);
		return {
			statusCode: 200,
			data: result
		};
	}
	@UseGuards(AuthGuard())
	@Post('set')
	async setValueByKey(@Body() params: SetValueByKey): Promise<Response<string>> {
		const result = await this.redis.setValueByKey(params);
		return {
			statusCode: 200,
			data: result
		};
	}

	@UseGuards(AuthGuard())
	@Get('ttl')
	async getTtlByKey(@Query('key') key: string): Promise<Response<number>> {
		const result = await this.redis.getKeyOfTtl(key);
		return {
			statusCode: 200,
			data: result
		};
	}

	@UseGuards(AuthGuard())
	@Put('expire')
	async setExpireOfKey(@Body() params: ExpireOfKey): Promise<Response<1 | 0>> {
		const result = await this.redis.setExpireOfKey(params.key, params.expireTime);
		return {
			statusCode: 200,
			data: result
		};
	}

	@UseGuards(AuthGuard())
	@Put('rename')
	async renameKey(@Body() params: RenameKey): Promise<Response<string>> {
		const result = await this.redis.renameKey(params.key, params.newKey);
		return {
			statusCode: 200,
			data: result
		};
	}

	@UseGuards(AuthGuard())
	@Get('exist')
	async checkKeyExist(@Query('key') key: string): Promise<Response<number>> {
		const result = await this.redis.checKeyExist(key);
		return {
			statusCode: 200,
			data: result
		};
	}

	@UseGuards(AuthGuard())
	@Get('currentUser')
	async currentUser(@User() user): Promise<Response<{ name: string; db: number }>> {
		return {
			statusCode: 200,
			data: user
		};
	}
}
