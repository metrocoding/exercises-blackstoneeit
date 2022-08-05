import ApiResponseResult from "./ApiResponseResult";
import ResponseMessage from "./ResponseMessage";
import ResponseMessageType from "./ResponseMessageType";
import ServiceResult from "./ServiceResult";

const ServerError = (error: Error): ApiResponseResult<void> => {
    console.error("⛔ ", error);
    return new ApiResponseResult<void>(
        false,
        undefined,
        [new ResponseMessage(ResponseMessageType.ERROR, "Server error occurred. be patient and try again.")],
        error
    );
};

const ServiceError = <T>(error: Error): ServiceResult<T> => {
    console.error("⛔ ", error);
    return new ServiceResult<T>(
        500,
        false,
        undefined,
        [new ResponseMessage(ResponseMessageType.ERROR, "Server error occurred. be patient and try again.")],
        error
    );
};

export { ServerError, ServiceError };
