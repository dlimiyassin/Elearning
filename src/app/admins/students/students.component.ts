import { Component } from '@angular/core';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [AdminNavComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {

}
