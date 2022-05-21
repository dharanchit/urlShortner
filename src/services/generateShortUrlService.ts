import shortUrlGenerator from "../generators/shortUrlGenerator";

const generateShortUrlService = async (url: string, hostUrl: string) => {
    const shortenString: string = await shortUrlGenerator(url, hostUrl);
    return {
        status: 200,
        message: "Success",
        shortenUrl: shortenString,
    };
}

export default generateShortUrlService;