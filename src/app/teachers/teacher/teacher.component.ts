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
import { Subject, takeUntil } from 'rxjs';
import { Test } from '../../models/test';
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
  filterchapters(chapters: Chapter[], level: number): Chapter[] {
    return chapters.filter((chapter) => chapter.level === level);
  }
  filtertests(tests: Test[], level: number): Test[] {
    return tests.filter((test) => test.level === level);
  }
  /****************************** add chapter ********************************/

  NewChapter = new FormGroup({
    title: new FormControl(''),
    lien: new FormControl(''),
  });
  course_id!: number;
  level!: number;
  addChapterr() {
    const chapter = {
      title: this.NewChapter.get('title')?.value as string,
      lien: this.NewChapter.get('lien')?.value as string,
      level: this.level,
      course_id: this.course_id,
    };
    this.#teacher
      .addChapter(chapter)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data) => {
          this.getCourses();
          this.#modalService.dismissAll();
          this.NewChapter.reset();
          this.#toaster.success('Chapter added seccussfully', 'New Record');
          this.level = 0;
          this.course_id = 0;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  /****************************** edit chapter ********************************/
  chapter_id!: number;
  EditChapter = new FormGroup({
    title: new FormControl(''),
    lien: new FormControl(''),
  });
  editChapter() {
    const chapter = {
      title: this.EditChapter.get('title')?.value as string,
      lien: this.EditChapter.get('lien')?.value as string,
      level: this.level,
      course_id: this.course_id,
    };
    this.#teacher
      .editChapter(chapter, this.chapter_id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data) => {
          this.getCourses();
          this.#modalService.dismissAll();
          this.EditChapter.reset();
          this.#toaster.success('Chapter edited seccussfully', 'Record Edited');
          this.level = 0;
          this.course_id = 0;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  /****************************** delete chapter ********************************/

  deleteChapter(id: number) {
    this.#teacher
      .deleteChapter(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          this.getCourses();
          this.#toaster.warning(
            'Chapter deleted seccussfully',
            'Record Deleted'
          );
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  /****************************** add test ********************************/

  NewTest = new FormGroup({
    question: new FormControl(''),
    response_1: new FormControl(''),
    response_2: new FormControl(''),
    response_3: new FormControl(''),
    response_4: new FormControl(''),
    response_correct: new FormControl(''),
  });
  addTest() {
    const test = {
      question: this.NewTest.get('question')?.value as string,
      response_1: this.NewTest.get('response_1')?.value as string,
      response_2: this.NewTest.get('response_2')?.value as string,
      response_3: this.NewTest.get('response_3')?.value as string,
      response_4: this.NewTest.get('response_4')?.value as string,
      response_correct: this.NewTest.get('response_correct')?.value as string,
      level: this.level,
      course_id: this.course_id,
    };
    this.#teacher
      .addtTest(test)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data) => {
          this.getCourses();
          this.#modalService.dismissAll();
          this.NewTest.reset();
          this.#toaster.success('Test added seccussfully', 'New Record');
          this.level = 0;
          this.course_id = 0;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  /****************************** edit test ********************************/
  editTestForm = new FormGroup({
    question: new FormControl(''),
    response_1: new FormControl(''),
    response_2: new FormControl(''),
    response_3: new FormControl(''),
    response_4: new FormControl(''),
    response_correct: new FormControl(''),
  });
  test_id! : number;
  editTest() {
        const test = {
      question: this.editTestForm.get('question')?.value as string,
      response_1: this.editTestForm.get('response_1')?.value as string,
      response_2: this.editTestForm.get('response_2')?.value as string,
      response_3: this.editTestForm.get('response_3')?.value as string,
      response_4: this.editTestForm.get('response_4')?.value as string,
      response_correct: this.editTestForm.get('response_correct')?.value as string,
      level: this.level,
      course_id: this.course_id,
    };
        this.#teacher
      .editTest(test,this.test_id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data) => {
          this.getCourses();
          this.#modalService.dismissAll();
          this.editTestForm.reset();
          this.#toaster.success('Test edited seccussfully', 'Record Edited');
          this.level = 0;
          this.course_id = 0;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  /****************************** delete test ********************************/

  deleteTest(id: number) {
        this.#teacher
          .deleteTest(id)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe({
            next: () => {
              this.getCourses();
              this.#toaster.warning(
                'Test deleted seccussfully',
                'Record Deleted'
              );
            },
            error: (err) => {
              console.log(err);
            },
          });
  }
  /****************************** modals ********************************/

  openSm(content: TemplateRef<any>, level: number, course_id: number) {
    this.#modalService.open(content);
    this.level = level;
    this.course_id = course_id;
  }
  openEditChapterModal(
    content: TemplateRef<any>,
    level: number,
    course_id: number,
    chapter: Chapter
  ) {
    this.#modalService.open(content);
    this.level = level;
    this.course_id = course_id;
    this.chapter_id = chapter.id;
    this.EditChapter.setValue({
      title: chapter.title,
      lien: chapter.lien,
    });
  }
  openEditTestModal(
    content: TemplateRef<any>,
    level: number,
    course_id: number,
    test: Test
  ) {
    this.#modalService.open(content);
    this.level = level;
    this.course_id = course_id;
    this.test_id = test.id;
    this.editTestForm.setValue({
      question: test.question,
      response_1: test.response_1,
      response_2: test.response_2,
      response_3: test.response_3,
      response_4: test.response_4,
      response_correct: test.response_correct
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
