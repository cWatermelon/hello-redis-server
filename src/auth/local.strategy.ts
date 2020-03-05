import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import IORedis from 'ioredis';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super();
	}

	async validate(payload: IORedis.RedisOptions & { name: string }): Promise<any> {
		const result = await this.authService.validateUser(payload);
		if (!result) {
			throw new UnauthorizedException();
		}
		return result;
	}
}
