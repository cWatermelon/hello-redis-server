import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [RedisModule, AuthModule]
})
export class AppModule {}
