import { User } from './../../models/User.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, observable } from 'rxjs';
import { DataBE } from 'src/app/models/DataBE.model';

@Injectable({
  providedIn: 'root',
})
export class UserserviceService {
  apiLink: string = `https://reqres.in/api/users`;

  headers: HttpHeaders;
  paramsForDeleteById = new HttpParams();
  paramsForUpdate = new HttpParams();

  constructor(private Http: HttpClient) {
    /////////prepare random headers//////////
    const header = { 'content-type': 'application/josn' };
    this.headers = new HttpHeaders(header);
  }

  /////////////////to get All users from Http
  getAll(): Observable<DataBE<User>> {
    return this.Http.get<DataBE<User>>(this.apiLink, {
      headers: this.headers,
      observe: `body`,
    });
  }

  //////////////to get one user by ID from http/////////
  getById(id: string): Observable<User> {
    return this.Http.get<User>(`${this.apiLink}/${id}`, {
      headers: this.headers,
      observe: `body`,
    }).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  /////////////add new user//////////
  add(newUser: User): Observable<User> {
    return this.Http.post<User>(this.apiLink, newUser, {
      headers: this.headers, //////////////////////////////////////////
      observe: `body`,
    });
  }
  /////////////delete user by id//////////
  delete(id: string): Observable<User> {
    this.paramsForDeleteById = this.paramsForDeleteById.append('id', id);
    return this.Http.delete<User>(this.apiLink, {
      observe: `body`,
      params: this.paramsForDeleteById,
    });
  }

  /////////////Edit user by id//////////
  update(updatedUser: User): Observable<User> {
    return this.Http.put<User>(
      ` ${this.apiLink}/${updatedUser.id}`,
      updatedUser,
      {
        headers: this.headers,
        observe: `body`,
      }
    );
  }
}
