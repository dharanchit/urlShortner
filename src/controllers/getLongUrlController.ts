import { Request, Response } from "express";
import getLongUrlService from "../services/getLongUrlService";

const getLongUrlController = async (req: Request, res: Response) => {
  try {
    const { shortUrl } = req.query;
    if (!shortUrl) {
      throw `Url string not provided`;
    }
    const getLongUrlServiceResult = await getLongUrlService(shortUrl as string);
    return res.status(getLongUrlServiceResult.status).send({
      message: getLongUrlServiceResult.message,
      urlString: getLongUrlServiceResult.urlString,
    });
  } catch (err) {
    console.error(`Error occured while fetching actual url`);
    return res.status(500).send({
      message: "Error occured while searching for url",
      urlString: null,
    });
  }
};

export default getLongUrlController;
