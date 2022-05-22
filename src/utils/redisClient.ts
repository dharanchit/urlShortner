import { createClient } from "redis";
require('dotenv').config();

const Redis = async () => {
  const client = createClient({
    socket: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    }
  });
  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect();
  return client;
};

export default Redis;
