import { ExceptionErrorCodeEnum } from "../../enums/exception-error-code-enum";

export interface LoginError {

    status: number;
    msg: string;
    timeStamp: number;
    loginErrorCode: string;
    session: string;
    code: ExceptionErrorCodeEnum;

}