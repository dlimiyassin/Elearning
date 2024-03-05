import { Component, TemplateRef, inject } from '@angular/core';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { Teacher } from '../../models/teacher';
import { AdminService } from '../../services/admin.service';
import { Student } from '../../models/student';
import { FormsModule, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Course } from '../../models/course';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [AdminNavComponent, NgbModule, FormsModule, NgClass],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent {
  #adminService = inject(AdminService);
  teachers: Teacher[] = [];
  students: Student[] = [];
  courses: Course[] = [];
  items = ['Teachers', 'Students'];

  getSwitchClasses(teacherId: number, users: Teacher[]): boolean {
    for (const user of users) {
      if (user.id == teacherId) {
        return true;
      }
    }
    return false;
  }

  isToggled: boolean = true;
  toggleSwitch(title: string, email: string) {
    this.#adminService
      .setCourseUser(email, title)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          this.getCourses();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  ngOnInit(): void {
    this.#adminService.teachers$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((teachers) => {
        this.teachers = teachers;
      });
    this.#adminService.students$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((students) => {
        this.students = students;
      });
    this.getStudents();
    this.getTeachers();
    this.getCourses();
  }

  getTeachers() {
    this.#adminService
      .getTeachers()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (teachers) => {
          this.#adminService.updateTeachersStore(teachers);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getStudents() {
    this.#adminService
      .getstudents()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (students) => {
          this.#adminService.updateStudentsStore(students);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getCourses() {
    this.#adminService
      .getCourses()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (courses) => {
          this.courses = courses;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  /******************************  Create course  ***************************/
  #modalService = inject(NgbModal);
  #toast = inject(ToastrService);
  openLg(content: TemplateRef<any>, title?: string) {
    this.#modalService.open(content);
    if (title) this.oldTitle = title;
  }
  title = '';
  addCourse() {
    const course = {
      title: this.title,
    };
    this.#adminService
      .addCourse(course)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          this.getCourses();
          this.title = '';
          this.#modalService.dismissAll();
          this.#toast.success('Course added seccussfully', 'New Record');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  /******************************  edit course  ***************************/
  oldTitle = '';
  newTitle = '';
  editCourse() {
    const course = {
      title: this.newTitle,
    };
    this.#adminService
      .editCourse(course, this.oldTitle)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          this.getCourses();
          this.newTitle = '';
          this.#modalService.dismissAll();
          this.#toast.success('Course edited seccussfully', 'Record Edited');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  /******************************  delete course  ***************************/
  deleteCourse(title: string) {
    this.#adminService
      .deleteCourse(title)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          this.getCourses();
          this.#toast.warning('Course deleted seccussfully', 'Record Deleted');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  /******************************  unsubscribe  ***************************/
  private ngUnsubscribe = new Subject<void>();
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

/******************************  Course class  ***************************/


