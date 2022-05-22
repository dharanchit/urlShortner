import longStringInDb from "../generators/longStringInDb";
import Redis from "../utils/redisClient";

const getLongUrlService = async (shortenURL: string) => {
  const redis = await Redis();
  let data: string | null = "";
  data = await redis.get(String(shortenURL));
  if (data) {
    return {
      status: 200,
      message: "Success",
      urlString: data,
    };
  }
  // incase doesn't exist on redis check on db
  const { found, link } = await longStringInDb(shortenURL);
  return {
    status: 200,
    message: found ? "Success" : "Couldn't find the desired response",
    urlString: link,
  };
};

export default getLongUrlService;
