import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { AuthService } from '../auth/auth.service';

@Global()
@Module({
	providers: [RedisService, AuthService],
	exports: [RedisService],
	controllers: [RedisController]
})
export class RedisModule {}
