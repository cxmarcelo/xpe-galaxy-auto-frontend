import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../models/dto/page';
import { Sale } from '../models/dto/sale';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaleCommissionService {

  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) { }


  getAllSaleCommissions(currentPage: number, size: number,): Observable<Page<Sale>> {
    return this.http.get<Page<Sale>>(`${this.apiUrl}/sales/commissions?page=${currentPage}&size=${size}`);
  }

  exportAllSaleCommissions(currentPage: number, size: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/sales/commissions/export?page=${currentPage}&size=${size}`, { responseType: 'blob' });
  }

  uploadSaleCommision(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(`${this.apiUrl}/sales/commissions/upload`, formData);
  }

}
