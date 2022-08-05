import ApiResponseResult from "./ApiResponseResult";
import ResponseMessage from "./ResponseMessage";

export default class ServiceResult<T> extends ApiResponseResult<T> {
    constructor(
        public httpMethodCode: number,
        success: boolean,
        result?: T,
        messages?: ResponseMessage[],
        exception?: Error
    ) {
        super(success, result, messages, exception);
    }
}
