import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL!);

// const cartKey = `cart:${userId}`;
// await redis.hincrby(cartKey, productId, 1);
// await redis.hincrby(cartKey, productId, -1);

export default redis;