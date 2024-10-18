
import { Adapter } from 'seyfert';
import { ClientRedis } from './redis';

export class RedisAdapter implements Adapter {
    public isAsync = true;

    private client: ClientRedis;

    constructor(redis: ClientRedis) {
        this.client = redis;
    }

    async start(): Promise<void> {
    }

    async scan(query: string, keys: boolean = false): Promise<any[] | string[]> {
        let cursor = '0';
        const result: any[] = [];
        do {
            const [newCursor, scannedKeys] = await this.client.scan(cursor, 'MATCH', query);
            cursor = newCursor;
            if (keys) {
                result.push(...scannedKeys);
            } else {
                const values = await this.bulkGet(scannedKeys);
                result.push(...values);
            }
        } while (cursor !== '0');
        return result;
    }

    async bulkGet(keys: string[]): Promise<any[]> {
        if (keys.length === 0) return [];
        const values = await this.client.mget(...keys);
        return values.map((value) => (value ? JSON.parse(value) : null));
    }

    async get(key: string): Promise<any | null> {
        const value = await this.client.get(key);
        return value ? JSON.parse(value) : null;
    }

    async bulkSet(keyValue: [string, any][]): Promise<void> {
        const pipeline = this.client.pipeline();
        keyValue.forEach(([key, value]) => {
            pipeline.set(key, JSON.stringify(value));
        });
        await pipeline.exec();
    }

    async set(id: string, data: any): Promise<void> {
        await this.client.set(id, JSON.stringify(data));
    }

    async bulkPatch(updateOnly: boolean, keyValue: [string, any][]): Promise<void> {
        if (updateOnly) {
            await this.bulkSet(keyValue);
        } else {
            // Implementa lógica adicional si es necesario para el patch.
            await this.bulkSet(keyValue);
        }
    }

    async patch(updateOnly: boolean, id: string, data: any): Promise<void> {
        await this.set(id, data); // Similar a bulkPatch
    }

    async values(to: string): Promise<any[]> {
        const keys = await this.keys(to);
        return this.bulkGet(keys);
    }

    async keys(to: string): Promise<string[]> {
        return this.scan(`${to}*`, true);
    }

    async count(to: string): Promise<number> {
        const keys = await this.keys(to);
        return keys.length;
    }

    async bulkRemove(keys: string[]): Promise<void> {
        if (keys.length === 0) return;
        await this.client.del(...keys);
    }

    async remove(key: string): Promise<void> {
        await this.client.del(key);
    }

    async flush(): Promise<void> {
        await this.client.flushdb();
    }

    async contains(to: string, key: string): Promise<boolean> {
        const exists = await this.client.exists(key);
        return exists === 1;
    }

    async getToRelationship(to: string): Promise<string[]> {
        return this.client.smembers(to);
    }

    async bulkAddToRelationShip(data: Record<string, string[]>): Promise<void> {
        const pipeline = this.client.pipeline();
        Object.entries(data).forEach(([key, values]) => {
            pipeline.sadd(key, ...values);
        });
        await pipeline.exec();
    }

    async addToRelationship(to: string, keys: string | string[]): Promise<void> {
        await this.client.sadd(to, ...(Array.isArray(keys) ? keys : [keys]));
    }

    async removeToRelationship(to: string, keys: string | string[]): Promise<void> {
        await this.client.srem(to, ...(Array.isArray(keys) ? keys : [keys]));
    }

    async removeRelationship(to: string | string[]): Promise<void> {
        await this.bulkRemove(Array.isArray(to) ? to : [to]);
    }
}
