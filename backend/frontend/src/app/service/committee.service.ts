import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommitteeDto, CommitteesResponseDto, CommitteeDetailResponseDto } from '@shared/Committee.model';
import { AppConfigService } from './app-config/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class CommitteeService {
  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) {}

  getCommittees(params?: {
    offset?: number;
    limit?: number;
    chamber?: string;
    congress?: number;
    page?: number;
  }): Observable<CommitteesResponseDto> {
    let httpParams = new HttpParams();

    if (params?.offset !== undefined) {
      httpParams = httpParams.set('offset', params.offset.toString());
    }
    if (params?.limit !== undefined) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }
    if (params?.chamber) {
      httpParams = httpParams.set('chamber', params.chamber);
    }
    if (params?.congress !== undefined) {
      httpParams = httpParams.set('congress', params.congress.toString());
    }

    const url = this.appConfigService.getFullPath('/committee');
    return this.http.get<CommitteesResponseDto>(url, { params: httpParams });
  }

  getCommitteeDetails(chamber: string, committeeCode: string): Observable<CommitteeDetailResponseDto> {
    const url = this.appConfigService.getFullPath(`/committee/${chamber}/${committeeCode}`);
    return this.http.get<CommitteeDetailResponseDto>(url);
  }

  getCommitteeBills(chamber: string, committeeCode: string, params?: {
    offset?: number;
    limit?: number;
  }): Observable<any> {
    let httpParams = new HttpParams();

    if (params?.offset !== undefined) {
      httpParams = httpParams.set('offset', params.offset.toString());
    }
    if (params?.limit !== undefined) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }

    const url = this.appConfigService.getFullPath(`/committee/${chamber}/${committeeCode}/bills`);
    return this.http.get(url, { params: httpParams });
  }

  getCommitteeReports(chamber: string, committeeCode: string, params?: {
    offset?: number;
    limit?: number;
  }): Observable<any> {
    let httpParams = new HttpParams();

    if (params?.offset !== undefined) {
      httpParams = httpParams.set('offset', params.offset.toString());
    }
    if (params?.limit !== undefined) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }

    const url = this.appConfigService.getFullPath(`/committee/${chamber}/${committeeCode}/reports`);
    return this.http.get(url, { params: httpParams });
  }

  getCommitteeCommunications(chamber: string, committeeCode: string, params?: {
    offset?: number;
    limit?: number;
  }): Observable<any> {
    let httpParams = new HttpParams();

    if (params?.offset !== undefined) {
      httpParams = httpParams.set('offset', params.offset.toString());
    }
    if (params?.limit !== undefined) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }

    const url = this.appConfigService.getFullPath(`/committee/${chamber}/${committeeCode}/house-communication`);
    return this.http.get(url, { params: httpParams });
  }

  getCommitteeNominations(committeeCode: string, params?: {
    offset?: number;
    limit?: number;
  }): Observable<any> {
    let httpParams = new HttpParams();

    if (params?.offset !== undefined) {
      httpParams = httpParams.set('offset', params.offset.toString());
    }
    if (params?.limit !== undefined) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }

    const url = this.appConfigService.getFullPath(`/committee/senate/${committeeCode}/nominations`);
    return this.http.get(url, { params: httpParams });
  }
}
