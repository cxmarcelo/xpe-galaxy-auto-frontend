import { ExceptionErrorCodeEnum } from "../../enums/exception-error-code-enum";
import { FormFieldError } from "./form-field-error";

export interface FormsError {

    status: number;
    msg: string;
    timeStamp: number;
    errors: FormFieldError[];
    code: ExceptionErrorCodeEnum;

}