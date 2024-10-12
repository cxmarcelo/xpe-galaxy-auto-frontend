import { ExceptionErrorCodeEnum } from "../../enums/exception-error-code-enum";

export interface StandardError {

    status: number;
    msg: string;
    timeStamp: number;
    code: ExceptionErrorCodeEnum;

}