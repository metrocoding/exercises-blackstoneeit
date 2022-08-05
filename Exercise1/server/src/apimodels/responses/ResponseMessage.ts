import ResponseMessageType from "./ResponseMessageType";

export default class ResponseMessage {
    constructor(public type: ResponseMessageType, public message: string) {}
}
