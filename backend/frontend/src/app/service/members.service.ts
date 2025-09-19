
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
  fromDateTime?: string;
  toDateTime?: string;
}

export interface MemberSearchResponse {
  members: MemberDto[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private apiUrl = `${environment.apiUrl}/member`;

  constructor(private http: HttpClient) { }

  getMembers(params?: MemberSearchParams): Observable<MemberSearchResponse> {
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

    return this.http.get<MemberSearchResponse>(`${this.apiUrl}`, { params: httpParams });
  }

  getMemberById(bioguideId: string): Observable<{ member: MemberDto }> {
    return this.http.get<{ member: MemberDto }>(`${this.apiUrl}/${bioguideId}`);
  }

  searchMembers(query: string): Observable<MemberSearchResponse> {
    const params = new HttpParams()
      .set('search', query)
      .set('limit', '50');

    return this.http.get<MemberSearchResponse>(`${this.apiUrl}`, { params });
  }

  getMemberSponsoredLegislation(bioguideId: string, params?: { offset?: number; limit?: number }): Observable<any> {
    let httpParams = new HttpParams();

    if (params) {
      if (params.offset !== undefined) {
        httpParams = httpParams.set('offset', params.offset.toString());
      }
      if (params.limit !== undefined) {
        httpParams = httpParams.set('limit', params.limit.toString());
      }
    }

    return this.http.get(`${this.apiUrl}/${bioguideId}/sponsored-legislation`, { params: httpParams });
  }

  getMemberCosponsoredLegislation(bioguideId: string, params?: { offset?: number; limit?: number }): Observable<any> {
    let httpParams = new HttpParams();

    if (params) {
      if (params.offset !== undefined) {
        httpParams = httpParams.set('offset', params.offset.toString());
      }
      if (params.limit !== undefined) {
        httpParams = httpParams.set('limit', params.limit.toString());
      }
    }

    return this.http.get(`${this.apiUrl}/${bioguideId}/cosponsored-legislation`, { params: httpParams });
  }
}
