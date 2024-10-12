import { ExceptionErrorCodeEnum } from "../../enums/exception-error-code-enum";
import { ErrorMessage } from "./error-message";

export interface ErrorMessageList {

	status: number;
	msg: string;
	timeStamp: number;
	errorList: ErrorMessage[];
    code: ExceptionErrorCodeEnum;

}