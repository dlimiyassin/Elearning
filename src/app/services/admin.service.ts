import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../models/student';
import { Teacher } from '../models/teacher';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  
  constructor(private http: HttpClient) {}
  private Api = environment.apiUrl;

  /********* GET USER **********/
  public getUser(email: string): Observable<Teacher> {
    const url = this.Api + `/admin?email=${email}`;
    return this.http.get<Teacher>(url);
  }

  /****************************************** teachers ***************************************/

  /********* STORE **********/
  private teachersStore = new BehaviorSubject<[]>([]);
  teachers$ = this.teachersStore.asObservable();
  public updateTeachersStore(teachers: []): void {
    this.teachersStore.next(teachers);
  }
  /********* GET **********/
  public getTeachers(): Observable<[]> {
    return this.http.get<[]>(this.Api + '/admin/teacher');
  }
  /********* POST **********/
  public addTeacher<T>(teacher: T): Observable<T> {
    return this.http.post<T>(this.Api + '/admin/teacher', teacher);
  }
  /********* PUT **********/
  public editTeacher<T>(teacher: T): Observable<T> {
    return this.http.put<T>(this.Api + '/admin/teacher', teacher);
  }
  /********* DELETED **********/
  public deleteTeacher(email: string): Observable<Object> {
    const url = this.Api + `/admin/teacher?email=${email}`;
    return this.http.delete<Object>(url);
  }

  /****************************************** students ***************************************/

  /********* STORE **********/
  private studentsStore = new BehaviorSubject<Student[]>([]);
  students$ = this.studentsStore.asObservable();
  public updateStudentsStore(students: Student[]): void {
    this.studentsStore.next(students);
  }

  /********* GET **********/
  public getstudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.Api + '/admin/student');
  }
  /********* POST **********/
  public addStudent<T>(student: T): Observable<T> {
    return this.http.post<T>(this.Api + '/admin/student', student);
  }
  /********* PUT **********/
  public editStudent<T>(student: T): Observable<T> {
    return this.http.put<T>(this.Api + '/admin/student', student);
  }
  /********* DELETED **********/
  public deleteStudent(email: string): Observable<Object> {
    const url = this.Api + `/admin/student?email=${email}`;
    return this.http.delete<Object>(url);
  }

  /****************************************** courses ***************************************/

  /********* GET **********/
  public getCourses(): Observable<[]> {
    return this.http.get<[]>(this.Api + '/admin/course');
  }
  /********* GET **********/
  public setCourseUser(email: string, title: string): Observable<[]> {
    const url =
      this.Api + `/admin/course/setting?email=${email}&title=${title}`;

    return this.http.get<[]>(url);
  }
  /********* POST **********/
  public addCourse<T>(course: T): Observable<T> {
    return this.http.post<T>(this.Api + '/admin/course', course);
  }
  /********* DELETED **********/
  public deleteCourse(title: string): Observable<Object> {
    const url = this.Api + `/admin/course?title=${title}`;
    return this.http.delete<Object>(url);
  }
  /********* PUT **********/
  public editCourse<T>(course: T, oldTitle: string): Observable<T> {
    const url = this.Api + `/admin/course?title=${oldTitle}`;
    return this.http.put<T>(url, course);
  }
}
