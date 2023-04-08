import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBill } from '@shared/Bill.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BillsService {
  private readonly API_URL = 'http://localhost:3000/bill?fromDateTime=2022-01-01T00%3A00%3A00Z';
  private readonly API_URL_ROOT = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getBills(): Observable<IBill[]> {
    return this.http.get<IBill[]>(this.API_URL)
  }
  getBillSummary = (url: string): Observable<any> => {
    const composedUrl = `${this.API_URL_ROOT}/bill${url}`
    return this.http.get<any>(composedUrl)
  }
  getBillDetails = (url: string): Observable<any> => {
    const composedUrl = `${this.API_URL_ROOT}/bill${url.split('bill')[1]}`
    console.log("composedUrl")
    console.log(composedUrl)
    return this.http.get<any>(composedUrl)
  }
}