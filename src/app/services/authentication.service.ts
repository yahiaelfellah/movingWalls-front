import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { User } from '../model/user';
import { map } from 'rxjs/operators';
import { Tokens } from '../model/tokens';
import * as jwt_decode from 'jwt-decode';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private loggedUser: string;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  public jwt ;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.jwt = this.getJwtToken();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }
  getJwtToken() {
    return  localStorage.getItem(this.JWT_TOKEN);
  }
  refreshToken() {
    return this.http.post<any>(`${config.apiUrl}/auth/refresh`, {
      'authorization': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.accessToken);
    }));
  }
  login(username: string, password: string) {
    return this.http.post<any>(`${config.apiUrl}/auth`, { username, password })
      .pipe(
        catchError((error: Response) => {
          if (error.status == 404)
            return throwError(error);
        }),
        tap(tokens => this.doLoginUser(username, tokens)),
        map((tokens: Tokens) => {
          this.currentUserSubject.next(jwt_decode(tokens.accessToken));
          return this.currentUserSubject.asObservable()
        })
      );


  }

  logout() {
    this.currentUserSubject.next(null);
    this.removeTokens();
  }
  getExpiration() {
    const token = this.getJwtToken();
    const ex = jwt_decode(token).exp;
    var currentUnixTime = new Date().getTime()/1000;

    return (ex - currentUnixTime < 10)
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private getRefreshToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
  

}
