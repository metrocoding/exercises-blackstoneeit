import ResponseMessage from "./ResponseMessage";

export default class ApiResponseResult<T> {
    constructor(
        public success: boolean,
        public result?: T,
        public messages?: ResponseMessage[],
        public exception?: Error
    ) {}
}
