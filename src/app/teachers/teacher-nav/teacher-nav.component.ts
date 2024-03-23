import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntil, Subject } from 'rxjs';
import { Chapter } from '../../models/chapter';
import { Course } from '../../models/course';
import { Test } from '../../models/test';
import { TeacherService } from '../../services/teacher.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-teacher-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './teacher-nav.component.html',
  styleUrl: './teacher-nav.component.css',
})
export class TeacherNavComponent implements OnInit {
  #teacher = inject(TeacherService);
  #router = inject(Router);
  #token = inject(TokenService);
  #toaster = inject(ToastrService);
  ngOnInit(): void {
    this.getCourses();
  }
  courses: Course[] = [];
  chapters: Chapter[] = [];
  tests: Test[] = [];

  /****************************** get courses ********************************/

  getCourses() {
    this.#teacher
      .getCourses((this.#token.getInfos() as any).sub)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data: Course[]) => {
          this.courses = data;
          console.log(data);
          
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  /****************************** sign out ********************************/

  signOut() {
    this.#token.removeToken();
    this.#token.changeAuthStatus(false);
    this.#router.navigateByUrl('/sign-in');
    this.#toaster.success('see you soon', 'You Signed Out');
  }
  /******************************  unsubscribe  ***************************/
  private ngUnsubscribe = new Subject<void>();
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
