import axios, { AxiosError, AxiosResponse } from "axios";
import Swal from "sweetalert2";

axios.interceptors.response.use(
    (response: AxiosResponse<ApiResponseResult<any>>) => {
        if (response && response.data && response.status) {
            const data: ApiResponseResult<any> = response.data;
            if (data.messages) {
                Swal.fire({ icon: "success", title: "success", html: messageBuilder(data.messages) });
            }
        }

        return response;
    },
    (error: AxiosError<ApiResponseResult<any>>) => {
        if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.messages &&
            error.response.data.messages.length > 0
        ) {
            Swal.fire({ icon: "error", title: "oops", html: messageBuilder(error.response.data.messages) });
        } else Swal.fire({ icon: "error", title: "oops", html: "something goes wrong" });
    }
);

const messageBuilder = (messages: any[]) => {
    let msg = "";
    if (messages.length === 1) return messages[0].message;
    messages.forEach((m, i) => (msg += `<div class="text-danger text-start">${i + 1} - ${m.message}</div>`));
    console.info(msg);
    return msg.trim();
};

export default interface ApiResponseResult<T> {
    success: boolean;
    result?: T;
    messages?: ResponseMessage[];
    exception?: Error;
}

export interface ResponseMessage {
    type: ResponseMessageType;
    message: string;
}

export enum ResponseMessageType {
    ERROR = 1,
    WARNING,
    INFO,
    SUCCESS,
    TRANSACTION,
}

export interface ListResult<T> {
    items: T;
    totalCount: number;
}

export { axios as axiosService };

export interface Movie {
    _id?: string;
    createDate?: Date;
    genre: string;
    name: string;
    year: number;
}
