import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { config } from '../config';
import { User } from '../model/user';
import { first, catchError, mapTo, map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class DataFetcherService {

  private userId;
  constructor(private http: HttpClient,private authService:AuthenticationService) {
     this.userId = jwt_decode(this.authService.getJwtToken()).userId;

   }

  getUser() {
    return this.http.get(`${config.apiUrl}/users/${this.userId}`);
  }
  getUsers(){
    return this.http.get<User>(`${config.apiUrl}/users`);
  }
  public getCompaign(){
    return this.http.get(`${config.apiUrl}/compaign/${this.userId}`)
    .pipe( 
      catchError((err:Response) => {
        if (err.status == 404)
          return throwError(err);
      }),
      map( compaign =>  {return compaign } )
    )
  }

  public putCompaign(data){
    return this.http.put( `${config.apiUrl}/compaign`,data ).pipe(
      catchError((err:Response) => {
        if (err.status == 404)
        return throwError(err);
      })
    )  }
}
