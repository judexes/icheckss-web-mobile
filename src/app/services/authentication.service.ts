import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../helpers/constants';

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public token: string;

  redirectURL: string;

  constructor(private http: HttpClient){

    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  signIn(form: any): Observable<boolean> {

    return this.http.post<any>(Constants.apiUrl + 'authenticate', form)
    .pipe(map(data => {
      console.log(data);
      if (data.id > 0){

        const user: any = {};
        user.email = form.email;
        user.token = data.token;
        user.name = data.user_name;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return true;
      }
      else {
        return false;
      }

    }));

  }


  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  signOut(): void {

    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentWorkspace');
    this.currentUserSubject.next(null);
  }

}
