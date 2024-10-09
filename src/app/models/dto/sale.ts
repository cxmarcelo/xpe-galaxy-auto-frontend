import { SaleStatusEnum } from "../enums/sale-status-enum";
import { Car } from "./car";

export interface Sale {

    id: string;
    sellerId: string;
    sellerName: string;
    car: Car;
    clientName: string;
    clientCpfOrCnpj: string;
    status: SaleStatusEnum;
    commission: number;
    createDate: Date;
    lastUpdate: Date;

}