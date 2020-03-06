import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { JwtService } from '@nestjs/jwt';
import IORedis from 'ioredis';

@Injectable()
export class AuthService {
	constructor(private readonly redisService: RedisService, private readonly jwtService: JwtService) {}

	async login(payload: IORedis.RedisOptions & { name: string }) {
		const result = await this.redisService.login(payload);
		if (!result) {
			throw new UnauthorizedException('身份验证失败!');
		}
		return {
			accessToken: this.signToken({ name: payload.name })
		};
	}

	private signToken(payload: { name: string }) {
		return this.jwtService.sign(payload);
	}
}
