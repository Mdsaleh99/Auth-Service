import { config } from "dotenv";
import path from "path";

config({ path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`) });

// .env.${process.env.NODE_ENV} => for .env.test the jest automatically pick this file for testing we don't need to specify NODE_ENV in package.json how we added to 'dev' script - "dev": "cross-env NODE_ENV=dev nodemon src/server.ts",

const { PORT, NODE_ENV, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } =
    process.env;

export const Config = {
    PORT,
    NODE_ENV,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
};
