import { CarStatusEnum } from "../enums/car-status-enum";

export interface Car {

    id: string;
    name: string;
    plate: string;
    brand: string;
    description: string;
    imageUrl: string;
    status: CarStatusEnum;
    price: number;
    createDate: Date;
    lastUpdate: Date;

}