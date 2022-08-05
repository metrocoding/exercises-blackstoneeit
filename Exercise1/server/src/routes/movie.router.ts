import { Router } from "express";
import { CreateMovieDto, IdDto, UpdateMovieDto } from "../apimodels/dto/movie.dto";
import RequestType from "../apimodels/enums/requestType";
import { MovieController } from "../controller/movie.controller";
import asyncMiddleware from "../middlewares/async.middleware";
import requestValidatorMiddleware from "../middlewares/requestValidator.middleware";

const movieRouter = Router();
movieRouter.post(
    "/",
    requestValidatorMiddleware(CreateMovieDto, RequestType.BODY),
    asyncMiddleware(MovieController.createProduct)
);
movieRouter.patch(
    "/",
    requestValidatorMiddleware(UpdateMovieDto, RequestType.BODY),
    asyncMiddleware(MovieController.updateProduct)
);
movieRouter.delete(
    "/:id",
    requestValidatorMiddleware(IdDto, RequestType.PARAMS),
    asyncMiddleware(MovieController.deleteProduct)
);
movieRouter.get("/all", asyncMiddleware(MovieController.getAllProducts));
movieRouter.get(
    "/:id",
    requestValidatorMiddleware(IdDto, RequestType.PARAMS),
    asyncMiddleware(MovieController.getProduct)
);

export default movieRouter;
