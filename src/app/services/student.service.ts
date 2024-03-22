import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../models/course';
import { Module } from '../models/module';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}
  private Api = environment.apiUrl;

  /****************************** Store ********************************/
  private coursesStore = new BehaviorSubject<Course[]>([]);
  courses$ = this.coursesStore.asObservable();
  public updateCourses(courses: Course[]): void {
    this.coursesStore.next(courses);
  }

  /****************************** courses ********************************/

  public getCourses(email: string): Observable<Course[]> {
    const url = this.Api + `/student?email=${email}`;
    return this.http.get<Course[]>(url);
  }

  /****************************** course ********************************/

  public getCourse(courseId: number, email: string): Observable<Module> {
    const url = this.Api + `/student/course?courseId=${courseId}&email=${email}`;
    return this.http.get<Module>(url);
  }
}
