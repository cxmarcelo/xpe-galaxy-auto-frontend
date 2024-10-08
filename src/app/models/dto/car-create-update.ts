import { CarStatusEnum } from "../enums/car-status-enum";

export interface CarCreateUpdate {

    name: string;
    brand: string;
    plate: string;
    description: string;
    price: number;
    status: CarStatusEnum;

}