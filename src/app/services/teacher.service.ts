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

  /****************************** courses ********************************/

  public getCourses(email: string): Observable<Course[]> {
    const url = this.Api + `/teacher?email=${email}`;
    return this.http.get<Course[]>(url);
  }

  /****************************** course ********************************/

  public getCourse(id: number): Observable<Course> {
    const url = this.Api + `/teacher/course?id=${id}`;
    return this.http.get<Course>(url);
  }
  /****************************** chapters ********************************/

  /********* POST **********/
  public addChapter<T>(chapter: T): Observable<T> {
    return this.http.post<T>(this.Api + '/teacher', chapter);
  }
  /********* PUT **********/
  public editChapter<T>(chapter: T, chapter_id: number): Observable<T> {
    const url = this.Api + `/teacher?id=${chapter_id}`;
    return this.http.put<T>(url, chapter);
  }
  /********* DELETED **********/
  public deleteChapter(id: number): Observable<Object> {
    const url = this.Api + `/teacher?id=${id}`;
    return this.http.delete<Object>(url);
  }
  /****************************** tests ********************************/

  /********* POST **********/
  public addtTest<T>(test: T): Observable<T> {
    return this.http.post<T>(this.Api + '/teacher/test', test);
  }
  /********* PUT **********/
  public editTest<T>(test: T, test_id: number): Observable<T> {
    const url = this.Api + `/teacher/test?id=${test_id}`;
    return this.http.put<T>(url, test);
  }
  /********* DELETED **********/
  public deleteTest(id: number): Observable<Object> {
    const url = this.Api + `/teacher/test?id=${id}`;
    return this.http.delete<Object>(url);
  }
}
