import { Component, TemplateRef, inject } from '@angular/core';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
import { Teacher } from '../../models/teacher';
import { AdminService } from '../../services/admin.service';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [AdminNavComponent],
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
          this.#adminService.updateEmployesStore(teachers);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  /****************************  add new teacher   ************************/
  //#modalService = inject(NgbModal)
  openLg(content: TemplateRef<any>) {
    //this.#modalService.open(content, { size: 'lg' });
  }

  /******************************  unsubscribe  ***************************/
  private ngUnsubscribe = new Subject<void>();
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
