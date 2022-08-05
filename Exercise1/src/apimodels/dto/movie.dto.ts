import { Expose } from "class-transformer";
import { IsDefined, IsNumber, IsNumberString } from "class-validator";

export class CreateMovieDto {
    @IsDefined()
    @Expose()
    name: string;

    @IsDefined()
    @Expose()
    genre: string;

    @IsDefined()
    @Expose()
    @IsNumber()
    year: number;
}

export class UpdateMovieDto extends CreateMovieDto {
    @IsDefined()
    @Expose()
    @IsNumberString()
    id: number;
}

export class IdDto {
    @IsDefined()
    @Expose()
    @IsNumberString()
    id: number;
}
