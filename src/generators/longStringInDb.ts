import dbConnection from "../utils/dbConnection";

type Props = {
  link: string;
  found: boolean;
};

const longStringInDb = async (shortUrl: string): Promise<Props> => {
  const splitUrlString = shortUrl.split("/");
  const encodedString = splitUrlString[splitUrlString.length - 1];
  const indexNumber = Buffer.from(encodedString, "base64").toString("ascii");
  const dbClient = dbConnection();
  await dbClient.connect();
  const response = await dbClient.query("SELECT * FROM urltable WHERE id=$1", [
    indexNumber,
  ]);
  if (response.rowCount === 0) {
    return {
      link: "",
      found: false,
    };
  }
  return {
    link: response.rows[0].longlink,
    found: true,
  };
};

export default longStringInDb;
