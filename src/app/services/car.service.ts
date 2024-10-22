import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarCreateUpdate } from '../models/dto/car-create-update';
import { Car } from '../models/dto/car';
import { Page } from '../models/dto/page';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  //TODO Page
  getAllCars(currentPage: number, size: number,): Observable<Page<Car>> {
    return this.http.get<Page<Car>>(`${this.apiUrl}/cars?page=${currentPage}&size=${size}`);
  }

  getCarById(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/cars/${id}`);
  }

  createCar(car: CarCreateUpdate, image: File): Observable<Car> {
    const formData: FormData = new FormData();
    formData.append('name', car.name);
    formData.append('brand', car.brand);
    formData.append('plate', car.plate);
    formData.append('status', car.status);
    formData.append('description', car.description);
    formData.append('price', car.price.toString());
    formData.append('image', image);

    return this.http.post<Car>(`${this.apiUrl}/cars`, formData);
  }

  updateCar(id: string, car: CarCreateUpdate): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/cars/${id}`, car);
  }

  updateCarImage(id: string, image: File): Observable<Car> {
    const formData: FormData = new FormData();
    formData.append('image', image);

    return this.http.put<Car>(`${this.apiUrl}/update-image/${id}`, formData);
  }

}
