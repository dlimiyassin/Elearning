import { Component, TemplateRef, inject } from '@angular/core';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
import { Student } from '../../models/student';
import { AdminService } from '../../services/admin.service';
import { Subject, takeUntil } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-students',
  standalone: true,
  imports: [AdminNavComponent, ReactiveFormsModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent {
  students: Student[] = [];
  #adminService = inject(AdminService);

  ngOnInit(): void {
    this.#adminService.students$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((students) => {
        this.students = students;
      });
    this.getStudents();
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
  /****************************  add new Student   ************************/
  studentForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    phone: new FormControl('', [Validators.required]),
  });
  #modalService = inject(NgbModal);
  openLg(content: TemplateRef<any>, email?: string) {
    this.#modalService.open(content);
    if (email) this.getStudent(email)
  }

  #toast = inject(ToastrService);
  addNewStudent() {
    const newStudent = {
      firstname: this.studentForm.get('firstname')?.value as string,
      lastname: this.studentForm.get('lastname')?.value as string,
      email: this.studentForm.get('email')?.value as string,
      phone: this.studentForm.get('phone')?.value as string,
      password: this.studentForm.get('password')?.value as string,
    };
    this.#adminService
      .addStudent(newStudent)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          this.getStudents();
          this.studentForm.reset();
          this.#modalService.dismissAll();
          this.#toast.success('Student added seccussfully', 'New Record');
        },
        error: (err) => {
          console.log(err);
          this.#toast.error('the email provided already exist', 'Warning');
        },
      });
  }

  /******************************  edit teacher  ***************************/
  editStudentForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required])
  });
  getStudent(email: string) {
    this.#adminService
      .getUser(email)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((user) => {
        this.editStudentForm.setValue({
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
        });
      });
  }
  editStudent() {
    const newStudent = {
      firstname: this.editStudentForm.get('firstname')?.value as string,
      lastname: this.editStudentForm.get('lastname')?.value as string,
      email: this.editStudentForm.get('email')?.value as string,
      phone: this.editStudentForm.get('phone')?.value as string,
    };
    this.#adminService
      .editStudent(newStudent)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          this.getStudents();
          this.studentForm.reset();
          this.#modalService.dismissAll();
          this.#toast.success('student edited seccussfully', 'Record edited');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  /******************************  delete student  ***************************/

  deleteStudent(email: string) {
    this.#adminService
      .deleteStudent(email)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          this.getStudents();
          this.#toast.warning('Student deleted seccussfully', 'Record Deleted');
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
