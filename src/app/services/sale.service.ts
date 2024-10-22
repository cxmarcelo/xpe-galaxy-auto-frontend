import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../models/dto/page';
import { Sale } from '../models/dto/sale';
import { SaleCreate } from '../models/dto/sale-create';
import { SaleUpdate } from '../models/dto/sale-update';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) { }


  getAllSales(currentPage: number, size: number,): Observable<Page<Sale>> {
    return this.http.get<Page<Sale>>(`${this.apiUrl}/sales?page=${currentPage}&size=${size}`);
  }

  getSaleById(id: string): Observable<Sale> {
    return this.http.get<Sale>(`${this.apiUrl}/sales/${id}`);
  }

  createSale(saleCreate: SaleCreate): Observable<Sale> {
    return this.http.post<Sale>(`${this.apiUrl}/sales`, saleCreate);
  }

  updateSale(saleId: string, SaleUpdate: SaleUpdate): Observable<Sale> {
    return this.http.put<Sale>(`${this.apiUrl}/sales/${saleId}`, SaleUpdate);
  }

  approveSale(saleId: string): Observable<Sale> {
    return this.http.post<Sale>(`${this.apiUrl}/sales/approve/${saleId}`, {});
  }

  rejectSale(saleId: string): Observable<Sale> {
    return this.http.post<Sale>(`${this.apiUrl}/sales/reject/${saleId}`, {});
  }

}
