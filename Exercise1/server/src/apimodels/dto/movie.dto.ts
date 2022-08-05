import { Expose } from "class-transformer";
import { IsDefined, IsNotEmpty, IsNumber } from "class-validator";
import { IsObjectId } from "class-validator-mongo-object-id";

export class CreateMovieDto {
    @IsDefined()
    @Expose()
    @IsNotEmpty()
    name: string;

    @IsDefined()
    @Expose()
    @IsNotEmpty()
    genre: string;

    @IsDefined()
    @Expose()
    @IsNumber()
    year: number;
}

export class UpdateMovieDto extends CreateMovieDto {
    @IsDefined()
    @Expose()
    @IsObjectId({ message: "invalid objectId" })
    id: number;
}

export class IdDto {
    @IsDefined()
    @Expose()
    @IsObjectId({ message: "invalid objectId" })
    id: number;
}
