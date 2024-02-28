import { Component } from '@angular/core';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [AdminNavComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {

}
