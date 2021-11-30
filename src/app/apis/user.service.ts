import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.url;
  constructor(private http: HttpClient) {}
  ajouteruser(data: User): Observable<any> {
    return this.http.post(this.url + 'users/register', data);
  }
  getusers(): Observable<any> {
    return this.http.get(this.url + 'users');
  }
  deleteuser(id: string): Observable<any> {
    const body = { _id: id };
    return this.http.post(this.url + 'users/deleteUser', body);
  }
  editUsr(data: any): Observable<any> {
    console.log(data);

    return this.http.put(this.url + 'users/updateUser', data);
  }
}
