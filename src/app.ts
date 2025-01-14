import "reflect-metadata";

import express, { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import logger from "./config/logger";
import authRouter from "./routes/auth.routes";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to Auth Service..");
});
// app.get('/', async(req, res, next) => {
//     const err = createHttpError(401, "You can not access this route")
//     // throw err // this error catch by global error handler
//     next(err)
//     res.send('Welcome')
// })

app.use("/auth", authRouter);

// global error handler - it is a middleware
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        errors: [
            {
                type: err.name,
                msg: err.message,
                path: "",
                location: "",
            },
        ],
    });
});
// this global error handler can not catch error of async function so our server crashes and to solve this we use next(err) instead of 'throw err'.  when we pass something inside next() it assumes the error is thrown

export default app;
