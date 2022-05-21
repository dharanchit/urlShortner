import dbConnection from "../utils/dbConnection";
import Redis from "../utils/redisClient";

const shortUrlGenerator = async (url: string, hostUrl: string) => {
    try {
        const dbClient = dbConnection();
        await dbClient.connect();
        const redis = Redis();
        await redis.connect();
        const response = await dbClient.query(`SELECT id FROM urltable ORDER BY id DESC LIMIT(1)`);
        let start = '1';
        if (response.rowCount > 0) {
            const previousRow = response.rows[0];
            const previousId = previousRow.id;
            const newStart = Number(start) + previousId;
            start = (newStart).toString();
        }
        const shortLinkUrl = Buffer.from(start).toString('base64');
        const urlAlreadyExists = await redis.get(hostUrl + "/" + shortLinkUrl);
        if (urlAlreadyExists) {
            return hostUrl + "/" + shortLinkUrl;
        }
        await dbClient.query('INSERT INTO urltable(longlink, shortlink) VALUES($1, $2)', [url, hostUrl + "/" + shortLinkUrl]);
        await redis.set(hostUrl + "/" + shortLinkUrl, url);
        return hostUrl + "/" + shortLinkUrl;
    } catch(err: any) {
        console.error(`Error occurred while generating the url ${err}`);
        return '';
    }
}

export default shortUrlGenerator;