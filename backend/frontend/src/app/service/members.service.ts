
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// Import shared DTOs to avoid duplication
import { MemberDto } from '../../../../shared/Member.model';

// Frontend-specific interfaces (if needed beyond DTO)
export interface MemberSearchParams {
  search?: string;
  state?: string;
  party?: string;
  chamber?: string;
  offset?: number;
  limit?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private apiUrl = `${environment.apiUrl}/member`;

  constructor(private http: HttpClient) { }

  getMembers(params?: MemberSearchParams): Observable<{ members: MemberDto[] }> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key as keyof MemberSearchParams];
        // Only include parameters that are defined and not empty strings
        if (value !== undefined && value !== null && value !== '') {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }

    return this.http.get<{ members: MemberDto[] }>(`${this.apiUrl}`, { params: httpParams });
  }

  getMemberById(bioguideId: string): Observable<{ member: MemberDto }> {
    return this.http.get<{ member: MemberDto }>(`${this.apiUrl}/${bioguideId}`);
  }

  searchMembers(query: string): Observable<{ members: MemberDto[] }> {
    const params = new HttpParams()
      .set('search', query)
      .set('limit', '50');

    return this.http.get<{ members: MemberDto[] }>(`${this.apiUrl}`, { params });
  }
}
