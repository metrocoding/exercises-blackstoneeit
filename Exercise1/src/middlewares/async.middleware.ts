import { NextFunction, Request, Response } from "express";

export default function (handler: Function) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handler(req, res);
        } catch (ex) {
            console.error("⛔ Async Error Handler: ", `${req.url} - `, ex);
            next(ex);
        }
    };
}
