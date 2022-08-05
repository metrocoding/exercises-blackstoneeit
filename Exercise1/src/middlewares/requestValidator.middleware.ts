import { plainToClass, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { forOwn } from "lodash";
import RequestType from "../apimodels/enums/requestType";
import ApiResponseResult from "../apimodels/responses/ApiResponseResult";
import ResponseMessage from "../apimodels/responses/ResponseMessage";
import ResponseMessageType from "../apimodels/responses/ResponseMessageType";

export default (dtoClass: any, requestType: RequestType) => {
    return function (req: Request, res: Response, next: NextFunction) {
        let output: any;
        // extract request data to output
        if (requestType == RequestType.BODY) output = plainToInstance(dtoClass, req.body);
        else if (requestType == RequestType.QUERY_STRING) output = plainToClass(dtoClass, req.query);
        else if (requestType == RequestType.PARAMS) output = plainToClass(dtoClass, req.params);

        // validate output
        validate(output).then((validationErrors) => {
            if (validationErrors.length > 0) {
                let messages: ResponseMessage[] = [];
                validationErrors.forEach((validationError) => {
                    let mes: string[] = [];
                    forOwn(validationError.constraints, (errorMessage, _key) => {
                        mes.push(errorMessage);
                    });
                    messages.push(new ResponseMessage(ResponseMessageType.ERROR, mes.join(", ")));
                });

                const result = new ApiResponseResult(false, null, messages);

                return res.status(400).send(result);
            } else {
                res.locals.input = output;
                next();
            }
        });
    };
};
