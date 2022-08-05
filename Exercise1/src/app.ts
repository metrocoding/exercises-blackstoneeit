import { json } from "body-parser";
import express, { Router } from "express";
import "express-async-errors";
import helmet, { frameguard, xssFilter } from "helmet";
import asyncMiddleware from "./middlewares/async.middleware";
import cors = require("cors");

import { CreateMovieDto, IdDto, UpdateMovieDto } from "./apimodels/dto/movie.dto";
import RequestType from "./apimodels/enums/requestType";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import requestValidatorMiddleware from "./middlewares/requestValidator.middleware";
import { MovieController } from "./routes/movie.controller";

const app = express();

app.use(json());

// Helmet Security - - - - - - - - - - - - - - - - - -
app.use(helmet());
app.use(frameguard({ action: "deny" }));
app.use(xssFilter());

// Enable CORS - - - - - - - - - - - - - - - - - - - -
app.use(cors());

// register routes
const router = Router();
router.post(
    "/",
    requestValidatorMiddleware(CreateMovieDto, RequestType.BODY),
    asyncMiddleware(MovieController.createProduct)
);
router.patch(
    "/",
    requestValidatorMiddleware(UpdateMovieDto, RequestType.BODY),
    asyncMiddleware(MovieController.updateProduct)
);
router.delete(
    "/:id",
    requestValidatorMiddleware(IdDto, RequestType.PARAMS),
    asyncMiddleware(MovieController.deleteProduct)
);
router.get("/:id", requestValidatorMiddleware(IdDto, RequestType.PARAMS), asyncMiddleware(MovieController.getProduct));
router.get("/all", asyncMiddleware(MovieController.getAllProducts));

app.use("/api/product", router);

// error handler
app.all("*", async (req) => {
    console.info(req.protocol + "://" + req.get("host") + req.originalUrl);
    throw new NotFoundError("route not found");
});

app.use(errorHandler);

export { app as httpsServer };
