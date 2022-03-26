import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Constants } from '../helpers/constants';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataUpdate: BehaviorSubject<number> = new BehaviorSubject(0);
  private dataChange = 0;

  constructor(private http: HttpClient) { }

  registerUpdate(): void {
    this.dataUpdate.next(this.dataUpdate.value + 1);
    this.dataChange++;
  }

  dataUpdate$(): Observable<number>{
    // return this.dataUpdate;
    return this.dataUpdate.asObservable();
  }

  loadIndex(s: string): Observable<HttpResponse<any>> {
    const endpoint = Constants.apiUrl + s;

    return this.http.get(endpoint, {
      observe: 'response'
    });
  }

  loadRelated(e: string, i: number, s: string): Observable<HttpResponse<any>> {
    const endpoint = Constants.apiUrl + e + '/' + i + '/' + s;

    return this.http.get(endpoint, {
      observe: 'response'
    });
  }

  loadRecord(s: string, i: number): Observable<HttpResponse<any>> {
    const endpoint = Constants.apiUrl + s + '/' + i;

    return this.http.get(endpoint, {
      observe: 'response'
    });
  }

  insert(s: string, d: any): Observable<HttpResponse<any>> {
    const endpoint = Constants.apiUrl + s;

    return this.http.post(endpoint, d, {
      observe: 'response'
    });
  }

  // insert(s: string, i: number, d: any): Observable<HttpResponse<any>> {
  //   const endpoint = Constants.apiUrl + s + '/' + i;

  //   return this.http.post(endpoint, d, {
  //     observe: 'response'
  //   });
  // }

  set(s: string, d: any): Observable<HttpResponse<any>> {
    const endpoint = Constants.apiUrl + s;    

    return this.http.post(endpoint, d, {
      observe: 'response'
    });
  }

  update(s: string, i: number, d: any): Observable<HttpResponse<any>> {
    const endpoint = Constants.apiUrl + s + '/' + i;

    return this.http.put(endpoint, d, {
      observe: 'response'
    });
  }

  delete(s: string, i: number): Observable<HttpResponse<any>> {
    const endpoint = Constants.apiUrl + s + '/' + i;

    return this.http.delete(endpoint, {
      observe: 'response'
    });
  }

  insertRelated(e: string, i: number, s: string, d: any): Observable<HttpResponse<any>> {
    const endpoint = Constants.apiUrl + e + '/' + i + '/' + s;

    return this.http.post(endpoint, d, {
      observe: 'response'
    });
  }

  insertAndUpload( e: string, i: number, file: File, d: any): any {

    const endpoint = Constants.apiUrl + 'multimedia';

    const payload: FormData = new FormData();

    payload.append('entity', e);
    payload.append('id', i.toString());
    payload.append('label', 'test');
    payload.append('type', 'jpt');
    payload.append('upload', file, file.name);

    return this.http.post(endpoint, payload, {
      observe: 'response'
    });

  }

}
