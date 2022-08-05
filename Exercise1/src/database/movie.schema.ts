import { model, Schema } from "mongoose";

export interface IMovie {
    _id?: string;
    name: string;
    genre: string;
    year: number;
    createDate: Date;
}

const movieSchema: Schema = new Schema({
    name: { type: String, index: true, require: true },
    genre: { type: String, require: true },
    year: { type: Number, require: true },
    createDate: { type: Date, default: Date.UTC },
});

const Movie = model<IMovie>("Movie", movieSchema);
export default Movie;
