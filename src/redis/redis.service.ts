import { Injectable } from '@nestjs/common';
import IORedis from 'ioredis';
import { SetValueByKey } from '../interface/redis.interface';

@Injectable()
export class RedisService {
	redis: IORedis.Redis;

	async login(options: IORedis.RedisOptions): Promise<boolean> {
		const result = await this.connect(options);
		if (result) {
			this.redis = result;
		}
		return result !== false;
	}

	async keys(partten: string): Promise<string[]> {
		return await this.redis.keys(partten);
	}

	async getValueByKey(key: IORedis.KeyType): Promise<string> {
		return await this.redis.get(key);
	}

	async deleteKey(...key: IORedis.KeyType[]): Promise<number> {
		return await this.redis.del(...key);
	}

	async setValueByKey({ key, value, expiryMode = 'EX', time = 60, setMode = 'XX' }: SetValueByKey): Promise<string> {
		return await this.redis.set(key, value, expiryMode, time, setMode);
	}

	async getKeyOfTtl(key: IORedis.KeyType): Promise<number> {
		return await this.redis.ttl(key);
	}

	private async connect(param: IORedis.RedisOptions): Promise<false | IORedis.Redis> {
		return new Promise((resolve, reject) => {
			const redis = new IORedis(param);
			redis.on('ready', () => resolve(redis));
			redis.on('error', e => reject(e));
		});
	}
}
