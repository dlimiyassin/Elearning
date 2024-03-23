import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, timeout } from 'rxjs';
import { Module } from '../../models/module';
import { StudentService } from '../../services/student.service';
import { TokenService } from '../../services/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-test',
  standalone: true,
  imports: [],
  templateUrl: './student-test.component.html',
  styleUrl: './student-test.component.css',
})
export class StudentTestComponent implements OnInit {
  course: Module = {
    userId: 0,
    courseId: 0,
    title: '',
    level: 0,
    chapters: [],
    tests: [],
  };

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private token: TokenService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCourse();
    this.FollowRouteParam();
  }

  @Input() id!: number;

  getCourse() {
    this.studentService
      .getCourse(this.id, this.token.getInfos()?.sub as string)
      .subscribe((course) => {
        this.course = course;
        console.log(course);
      });
  }
  FollowRouteParam() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = Number(params.get('id'));
          return this.studentService.getCourse(
            id,
            this.token.getInfos()?.sub as string
          );
        })
      )
      .subscribe((course) => {
        this.course = course;
      });
  }

  /*--------------------- For binding the selected radio button to the selected option-------------------- */
  selectedOptions: { questionId: number; selectedOption: string }[] = [];
  onOptionSelected(questionId: any, selectedOption: string) {
    const index = this.selectedOptions.findIndex(
      (option) => option.questionId === questionId
    );
    if (index !== -1) {
      this.selectedOptions[index].selectedOption = selectedOption;
    } else {
      this.selectedOptions.push({ questionId, selectedOption });
    }
  }

  submitAnswers() {
    const submittedAnswers = this.selectedOptions;

    this.studentService
      .submitAnswers(submittedAnswers,this.course.courseId,this.course.userId)
      .subscribe({
        next: (rep) => {
              if (this.course.level == 0) {
                if (rep < 8) {
                  this.toaster.success('you passed to level 1', 'Congratulations', {timeOut : 10000});
                }
                else if (rep < 14) {
                  this.toaster.success('you passed to level 2', 'Congratulations', {timeOut : 10000});
                }
                else {
                  this.toaster.success('you passed to level 3', 'Congratulations', {timeOut : 10000});
                }
              } else if (this.course.level == 3){
                if (rep < 12) {
                  this.toaster.error('review the course and try again', 'Failed', {timeOut : 10000});
                }
                else {
                  this.toaster.success('you finished the course', 'Congratulations', {timeOut : 10000});
                }
              } 
              else {
                if (rep < 12) {
                  this.toaster.error('review the course and try again', 'Failed', {timeOut : 10000});
                }
                else {
                  this.toaster.success('you passed to level 3', 'Congratulations', {timeOut : 10000});
                }
              }
              this.toaster.info('your scroe is : '+rep+' of 20', 'Result');
              this.router.navigateByUrl('/student/course/'+this.course.courseId);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
