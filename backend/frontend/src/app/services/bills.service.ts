import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBill } from '@shared/Bill.model';

@Injectable({
  providedIn: 'root',
})
export class BillsService {
  private readonly API_URL = 'http://localhost:3000/api/bills?fromDateTime=2023-01-01T00%3A00%3A00Z';

  constructor(private http: HttpClient) { }

  getBills(): Observable<IBill[]> {
    return this.http.get<IBill[]>(this.API_URL)
  }
  getBillInfo(url: string): Observable<any> {
    return this.http.get<any>(url)
  }
}