import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Course } from '../models/course';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private http: HttpClient) {}
  private Api = environment.apiUrl;

  /********* GET courses **********/
  public getCourses(email: string): Observable<Course[]> {
    const url = this.Api + `/teacher?email=${email}`;
    return this.http.get<Course[]>(url);
  }
}
