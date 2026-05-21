import { createClient } from "redis";
// import Redis from 'ioredis';

// const redis = new Redis(process.env.REDIS_URL!);

const redis = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: 13139,
  },
});

redis.on("error", (err) =>
  console.log("Redis Client Error", err.message || err),
);

redis.on("connect", () => console.log("Redis Client Connected"));

await redis.connect();

export default redis;
