import IORedis from 'ioredis';

/** 类型文件 **/

export interface SetValueByKey {
	key: IORedis.KeyType;
	value: IORedis.ValueType;
	expiryMode?: string | any[];
	time?: number | string;
	setMode?: number | string;
}
