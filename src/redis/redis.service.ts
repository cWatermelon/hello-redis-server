import { Injectable } from '@nestjs/common';
import IORedis from 'ioredis';
import { from, Observable } from 'rxjs';
import { SetValueByKey } from '../interface/redis.interface';

@Injectable()
export class RedisService {
	redis: IORedis.Redis;

	/**
	 * @description 登录 redis
	 * @param options
	 */
	login(options: IORedis.RedisOptions): void {
		this.redis = new IORedis(options);
	}

	/**
	 * @description 获取当前db的 所有key
	 * @param partten 匹配格式
	 */
	keys(partten: string): Observable<string[]> {
		return from(this.redis.keys(partten));
	}

	/**
	 * @description 根据key 获取value
	 * @param key IORedis.KeyType
	 */
	getValueByKey(key: IORedis.KeyType) {
		return from(this.redis.get(key));
	}

	/**
	 * @description 根据key 删除对应的value
	 * @param key IORedis.KeyType[]
	 */
	deleteKey(...key: IORedis.KeyType[]): Observable<number> {
		return from(this.redis.del(...key));
	}

	/**
	 * @description 设置对应的 key -> value
	 * @param key IORedis.keyType
	 * @param value IORedis.ValueType
	 * @param expiryMode string | any[],
	 * @param time number | string
	 * @param setMode number | string
	 */
	setValueByKey({ key, value, expiryMode, time, setMode }: SetValueByKey): Observable<string> {
		return from(this.redis.set(key, value, expiryMode, time, setMode));
	}

	/**
	 * @description 根据key 获取过期时间
	 * @param key IORedis.keyType
	 */
	getKeyOfTtl(key: IORedis.KeyType): Observable<number> {
		return from(this.redis.ttl(key));
	}
}
