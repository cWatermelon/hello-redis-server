import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import IORedis from 'ioredis';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class AuthService {
	constructor(private readonly jwtService: JwtService, private readonly redisService: RedisService) {}

	async validateUser(payload: IORedis.RedisOptions & { name: string }): Promise<any> {
		const user = await this.redisService.login(payload);
		if (user) {
			return payload;
		}
		return null;
	}

	async login(payload: IORedis.RedisOptions & { name: string }): Promise<any> {
		return {
			accessToken: this.jwtService.sign(payload.name)
		};
	}
}
