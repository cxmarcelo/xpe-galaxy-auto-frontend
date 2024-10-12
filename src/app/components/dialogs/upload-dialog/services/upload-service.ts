import { Observable } from "rxjs";
import { UploadServiceEnum } from "../../../../models/enums/upload-service-enum";

export interface UploadService {

    getUploadServiceEnum(): UploadServiceEnum;

    acceptFiles(): string;

    getTitle(): string;

    uploadFile(file: File): Observable<any>;

}