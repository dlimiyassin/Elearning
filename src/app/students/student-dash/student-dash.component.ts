import { Component } from '@angular/core';
import { StudentNavComponent } from '../student-nav/student-nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-student-dash',
  standalone: true,
  imports: [StudentNavComponent, RouterOutlet],
  templateUrl: './student-dash.component.html',
  styleUrl: './student-dash.component.css',
})
export class StudentDashComponent {}
