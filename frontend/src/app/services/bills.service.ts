import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BillsService {
  private readonly API_URL = 'http://localhost:3000/api/bills?fromDateTime=2023-01-01T00%3A00%3A00Z';

  constructor(private http: HttpClient) { }

  getBills(): Observable<any> {
    return this.http.get(this.API_URL);
  }
}
