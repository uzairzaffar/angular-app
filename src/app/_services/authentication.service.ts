import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from '../../environments/environment';

import { map } from "rxjs/operators";

import { User } from "../_models/user";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
    JSON.parse(localStorage.getItem("currentUser") || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    // post to fake back end, this url will be handled there...

    return this.http
      .post<any>(`${environment.APIUrl}/auth/login`, { email, password })
      .pipe(
        map(user => {
          // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
          user.authdata = window.btoa(email + ":" + password);
          user.email = email;
          localStorage.setItem("currentUser", JSON.stringify(user));
          console.log(localStorage.getItem("currentUser"))
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null as any);
  }
}
