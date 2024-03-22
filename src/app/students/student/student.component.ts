import { Component, Input, OnInit, input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Module } from '../../models/module';
import { switchMap } from 'rxjs/operators';
import { TokenService } from '../../services/token.service';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [NgbAccordionModule],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
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
    private sanitizer: DomSanitizer
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
      });
  }
  FollowRouteParam() {
  this.route.paramMap
    .pipe(
      switchMap((params) => {
        const id = Number(params.get('id'));
        return this.studentService.getCourse(id,this.token.getInfos()?.sub as string);
      })
    )
    .subscribe((course) => {
      this.course = course;
    });
  }
  vedioURL(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
