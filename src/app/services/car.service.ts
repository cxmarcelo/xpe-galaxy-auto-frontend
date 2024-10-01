import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarCreateUpdate } from '../models/dto/car-create-update';
import { Car } from '../models/dto/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = 'baseUrl';

  constructor(private http: HttpClient) { }

  //TODO Page
  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/cars`);
  }

  getCarById(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/cars/${id}`);
  }

  createCar(car: CarCreateUpdate, image: File): Observable<Car> {
    const formData: FormData = new FormData();
    formData.append('name', car.name);
    formData.append('brand', car.brand);
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
