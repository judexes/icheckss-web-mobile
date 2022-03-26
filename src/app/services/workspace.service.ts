import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../helpers/constants';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  apiUrl = Constants.apiUrl;
  headers: HttpHeaders;


  private workspaceSource = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentWorkspace')));
  currentWorkspace = this.workspaceSource.asObservable();


  constructor(private http: HttpClient, private authService: AuthenticationService) {}

  syncWorkspace(workspace: any): any {
    localStorage.setItem('currentWorkspace', JSON.stringify(workspace));
    this.workspaceSource.next(workspace);
  }

  public get currentWorkspaceValue(): any {
    return JSON.parse(localStorage.getItem('currentWorkspace'));
  }

  getCurrentWorkspaceValue(): any {
    return JSON.parse(localStorage.getItem('currentWorkspace'));
  }

  getWorkspacess(): any{

    const endpoint = this.apiUrl + 'workspace';

    return this.http.get(endpoint, {observe: 'response'})
    .pipe(map(data => {
      console.log(data);
      return data;
    }));
  }

  getWorkspaces(): Observable<HttpResponse<any>> {
    const endpoint = this.apiUrl + 'workspace';

    return this.http.get(endpoint, {
      observe: 'response'
    });
  }

  getWorkspace(workspaceId: number): any{

    const endpoint = this.apiUrl + 'workspace/' + workspaceId.toString();
    return this.http.get(endpoint)
    .pipe(map(data => {
      return data;
    }));
  }




}
