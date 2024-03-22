import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../services/token.service';
import { StudentService } from '../../services/student.service';
import { Course } from '../../models/course';

@Component({
  selector: 'app-student-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './student-nav.component.html',
  styleUrl: './student-nav.component.css',
})
export class StudentNavComponent implements OnInit {
  #router = inject(Router);
  #token = inject(TokenService);
  #toaster = inject(ToastrService);
  #student = inject(StudentService);

  courses: Course[] = [];

  ngOnInit(): void {
    this.getcourses();
    this.#student.courses$.subscribe({
      next: (courses) => {
        this.courses = courses;
      },
    });
  }
  getcourses() {
    this.#student.getCourses(this.#token.getInfos()?.sub as string).subscribe({
      next: (data) => {
        this.#student.updateCourses(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  signOut() {
    this.#token.removeToken();
    this.#token.changeAuthStatus(false);
    this.#router.navigateByUrl('/sign-in');
    this.#toaster.success('see you soon', 'You Signed Out');
  }
}
