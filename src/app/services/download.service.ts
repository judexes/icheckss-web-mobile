import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../helpers/constants';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http: HttpClient) { }

  download(s: string, i: number): Observable<HttpResponse<any>> {
    const endpoint = Constants.apiUrl + s + '/' + i;

    const h = new HttpHeaders();
    h.set('Accept', 'application/pdf');

    return this.http.get(endpoint, {
      observe: 'response',
      responseType: 'blob' as 'json'
    });
  }

}
