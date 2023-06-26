import Redis, { Redis as RedisClient } from 'ioredis';

class RedisService {
  private static instance: RedisService;

  private client: RedisClient;

  private constructor() {
    this.client = new Redis({
      host: 'localhost',
      port: 6383,
    });
  }

  public static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
    }
    return RedisService.instance;
  }

  public async addToRedis(key: string, data: any): Promise<void> {
    await this.client.set(key, JSON.stringify(data));
  }
}

const redisService = RedisService.getInstance();
export default redisService;
