import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Teacher } from '../models/teacher';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private Api = environment.apiUrl;
  constructor(private http: HttpClient) {}

  private teachersStore = new BehaviorSubject<[]>([]);
  teachers$ = this.teachersStore.asObservable();
  public getTeachers(): Observable<[]> {
    return this.http.get<[]>(this.Api + '/admin');
  }
  public updateEmployesStore(teachers: []): void {
    this.teachersStore.next(teachers);
  }

  public addTeacher<T>(teacher : T): Observable<T> {
    return this.http.post<T>(this.Api + '/admin',teacher);
  }
}
