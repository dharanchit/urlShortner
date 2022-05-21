import { createClient } from "redis";

const Redis = () => {
  const client = createClient();
  client.on("error", (err) => console.log("Redis Client Error", err));
  return client;
};

export default Redis;
