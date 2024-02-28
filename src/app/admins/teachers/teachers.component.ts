import { Component, TemplateRef, inject } from '@angular/core';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
import { Teacher } from '../../models/teacher';
import { AdminService } from '../../services/admin.service';
import { Subject, takeUntil } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [AdminNavComponent, ReactiveFormsModule],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css',
})
export class TeachersComponent {
  teachers: Teacher[] = [];
  #adminService = inject(AdminService);

  ngOnInit(): void {
    this.#adminService.teachers$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((teachers) => {
        this.teachers = teachers;
      });
    this.getTeachers();
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
  /****************************  add new teacher   ************************/
  teacherForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });
  #modalService = inject(NgbModal);
  openLg(content: TemplateRef<any>, email?: string) {
    this.#modalService.open(content);
    if (email) {
      this.getTeacher(email);
    }
  }
  #toast = inject(ToastrService);
  addNewTeacher() {
    const newTeacher = {
      firstname: this.teacherForm.get('firstname')?.value as string,
      lastname: this.teacherForm.get('lastname')?.value as string,
      email: this.teacherForm.get('email')?.value as string,
      phone: this.teacherForm.get('phone')?.value as string,
      password: this.teacherForm.get('password')?.value as string,
    };
    this.#adminService
      .addTeacher(newTeacher)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          this.getTeachers();
          this.teacherForm.reset();
          this.#modalService.dismissAll();
          this.#toast.success('teacher added seccussfully', 'New Record');
        },
        error: (err) => {
          console.log(err);
          this.#toast.error('the email provided already exist', 'Warning');
        },
      });
  }

  /******************************  edit teacher  ***************************/
  editTeacherForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required])});
  getTeacher(email: string) {
    this.#adminService
      .getUser(email)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((user) => {
        this.editTeacherForm.setValue({
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
        });
      });
  }
  editTeacher() {
    const newTeacher = {
      firstname: this.editTeacherForm.get('firstname')?.value as string,
      lastname: this.editTeacherForm.get('lastname')?.value as string,
      email: this.editTeacherForm.get('email')?.value as string,
      phone: this.editTeacherForm.get('phone')?.value as string,
    };
    this.#adminService
      .editTeacher(newTeacher)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          this.getTeachers();
          this.teacherForm.reset();
          this.#modalService.dismissAll();
          this.#toast.success('teacher edited seccussfully', 'Record edited');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  /******************************  delete teacher  ***************************/

  deleteTeacher(email: string) {
    this.#adminService
      .deleteTeacher(email)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          this.getTeachers();
          this.#toast.warning('Teacher deleted seccussfully', 'Record Deleted');
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
