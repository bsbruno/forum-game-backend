import ICacheProvider from "../models/ICacheProvider";
import Redis, { Redis as RedisClient } from "ioredis";
import cacheConfig from "@config/cache";

export default class RedisCacheProvider implements ICacheProvider {
    private client: RedisClient;
    constructor() {
        this.client = new Redis(cacheConfig.config.redis);
    }

    public async invalidate(key: string): Promise<void> {
        await this.client.del(key);
    }

    public async recover<T>(key: string): Promise<T | null> {
        const data = await this.client.get(key);
        if (!data) return null;
        const parse = JSON.parse(data) as T;

        return parse;
    }

    public async save(key: string, value: string): Promise<void> {
        this.client.set(key, JSON.stringify(value));
    }
}
