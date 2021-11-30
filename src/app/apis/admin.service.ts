import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Road } from '../types/road';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  url = environment.url;
  constructor(private http: HttpClient) {}
  login(data: any): Observable<any> {
    return this.http.post(this.url + 'users/adminlogin', data);
  }
  getRoads(): Observable<any> {
    return this.http.get(this.url + 'roads');
  }
  addRoad(data: Road): Observable<any> {
    return this.http.post(this.url + 'roads/createRoad', data);
  }
  deleteRoad(id: string): Observable<any> {
    const body = { _id: id };
    return this.http.post(this.url + 'roads/deleteRoad', body);
  }
  editRoad(data: any): Observable<any> {
    console.log(data);

    return this.http.put(this.url + 'roads/updateRoad', data);
  }
}
