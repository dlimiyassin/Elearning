import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TeacherService } from '../../services/teacher.service';
import { Course } from '../../models/course';
import { Chapter } from '../../models/chapter';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [NgbModule, ReactiveFormsModule, NgbAccordionModule],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css',
})
export class TeacherComponent implements OnInit {
  #teacher = inject(TeacherService);
  #router = inject(Router);
  #token = inject(TokenService);
  #toaster = inject(ToastrService);
  #modalService = inject(NgbModal);
  ngOnInit(): void {
    this.getCourses();
  }
  courses: Course[] = [];
  chapters: Chapter[] = [];

  /****************************** get courses ********************************/

  getCourses() {
    this.#teacher.getCourses((this.#token.getInfos() as any).sub).subscribe({
      next: (data: Course[]) => {
        this.courses = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  filterchapters(chapters: Chapter[], level: number): Chapter[] {
    return chapters.filter((chapter) => chapter.level === level);
  }
  /****************************** add chapter ********************************/

  NewChapter = new FormGroup({
    title: new FormControl(''),
    lien: new FormControl(''),
  });

  /****************************** modals ********************************/
  openLg(content: TemplateRef<any>, course: Course) {
    this.#modalService.open(content, { size: 'xl' });
    this.chapters = course.chapters;
  }

  openSm(content: TemplateRef<any>, level?: number) {
    this.#modalService.open(content);
  }

  /****************************** sign out ********************************/

  signOut() {
    this.#token.removeToken();
    this.#token.changeAuthStatus(false);
    this.#router.navigateByUrl('/sign-in');
    this.#toaster.success('see you soon', 'You Signed Out');
  }
}
