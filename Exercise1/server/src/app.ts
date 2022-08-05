import { json } from "body-parser";
import express from "express";
import "express-async-errors";
import helmet, { frameguard, xssFilter } from "helmet";
import cors = require("cors");

import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import movieRouter from "./routes/movie.router";

const app = express();

app.use(json());

// Helmet Security - - - - - - - - - - - - - - - - - -
app.use(helmet());
app.use(frameguard({ action: "deny" }));
app.use(xssFilter());

// Enable CORS - - - - - - - - - - - - - - - - - - - -
app.use(cors());

// register routes
app.use("/api/movie", movieRouter);

// error handler
app.all("*", async (req) => {
    console.info(req.protocol + "://" + req.get("host") + req.originalUrl);
    throw new NotFoundError("route not found");
});

app.use(errorHandler);

export { app as httpsServer };
