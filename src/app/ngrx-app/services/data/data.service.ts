import { Injectable } from '@angular/core';
import { IUserData } from '../../interfaces/ngrx-app.interface';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class DataService {
  public userData: IUserData = {
    name: 'Test User',
    age: 30
  };
  constructor(private http: HttpClient) { }

  public getUserData(): Observable<IUserData> {
    return of(this.userData);
  }

  public saveData(data: string): Observable<boolean> {
    const url = `//localhost:3000/sendData?data=${data}`;
    return this.http.post(url, {})
      .pipe(
        map(resp => !!resp),
        catchError(err => of(false) )
      );
  }
}
