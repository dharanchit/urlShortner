import { Request, Response } from "express";
import generateShortUrlService from "../services/generateShortUrlService";
import validUrl from "valid-url";

const generateShortUrlController = async (req: Request, res: Response) => {
  try {
    const { longUrl } = req.body;
    const hostUrl = `${req.protocol}://${req.get("host")}`;
    if (!longUrl) {
      return res
        .status(404)
        .send({ message: "URL not provided", shortenUrl: "" });
    }
    if (!validUrl.isHttpUri(longUrl))
      return res.status(400).send({ message: "Invalid Url", data: null });
    const generateShortUrlResult = await generateShortUrlService(
      longUrl,
      hostUrl
    );
    return res.status(generateShortUrlResult.status).send({
      message: generateShortUrlResult.message,
      shortenUrl: generateShortUrlResult.shortenUrl,
    });
  } catch (err: any) {
    console.error(`Error occured while generating short url ${err}`);
    return res.status(500).send({
      message: "Error occured while generating short url",
      shortenUrl: "",
    });
  }
};

export default generateShortUrlController;
