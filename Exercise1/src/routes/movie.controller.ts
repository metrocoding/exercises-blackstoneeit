import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { CreateMovieDto, IdDto, UpdateMovieDto } from "../apimodels/dto/movie.dto";
import ApiResponseResult from "../apimodels/responses/ApiResponseResult";
import ResponseMessage from "../apimodels/responses/ResponseMessage";
import ResponseMessageType from "../apimodels/responses/ResponseMessageType";
import Movie, { IMovie } from "../database/movie.schema";

export const MovieController = {
    createProduct: async (req: Request, res: Response) => {
        const { genre, year, name } = plainToClass(CreateMovieDto, req.body);

        const movie = new Movie({ genre, year, name });
        await movie.save();

        return res
            .status(201)
            .send(
                new ApiResponseResult<IMovie>(true, movie, [
                    new ResponseMessage(ResponseMessageType.SUCCESS, "movie created successfully"),
                ])
            );
    },

    updateProduct: async (req: Request, res: Response) => {
        const { genre, year, name, id } = plainToClass(UpdateMovieDto, req.body);

        const movie = await Movie.findById(id);
        if (!movie) {
            return res
                .status(404)
                .send(
                    new ApiResponseResult(false, null, [
                        new ResponseMessage(ResponseMessageType.ERROR, "movie not found"),
                    ])
                );
        }

        movie.year = year;
        movie.genre = genre;
        movie.name = name;

        await movie.save();

        return res
            .status(200)
            .send(
                new ApiResponseResult<IMovie>(true, movie, [
                    new ResponseMessage(ResponseMessageType.SUCCESS, "movie updated successfully"),
                ])
            );
    },

    deleteProduct: async (req: Request, res: Response) => {
        const { id } = plainToClass(IdDto, req.params);

        await Movie.findByIdAndDelete(id);

        return res
            .status(200)
            .send(
                new ApiResponseResult<boolean>(true, true, [
                    new ResponseMessage(ResponseMessageType.SUCCESS, "movie deleted successfully"),
                ])
            );
    },

    getProduct: async (req: Request, res: Response) => {
        const { id } = plainToClass(IdDto, req.params);
        const movie = await Movie.findById(id);
        if (!movie) {
            return res
                .status(404)
                .send(
                    new ApiResponseResult(false, null, [
                        new ResponseMessage(ResponseMessageType.ERROR, "movie not found"),
                    ])
                );
        }

        return res
            .status(200)
            .send(
                new ApiResponseResult<IMovie>(true, movie, [
                    new ResponseMessage(ResponseMessageType.SUCCESS, "movie updated successfully"),
                ])
            );
    },
    getAllProducts: async (_req: Request, res: Response) => {
        const movies = await Movie.find();

        return res
            .status(200)
            .send(
                new ApiResponseResult<IMovie[]>(true, movies, [
                    new ResponseMessage(ResponseMessageType.SUCCESS, "movie updated successfully"),
                ])
            );
    },
};
