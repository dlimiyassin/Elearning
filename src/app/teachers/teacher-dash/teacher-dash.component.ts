import { Component } from '@angular/core';
import { TeacherNavComponent } from '../teacher-nav/teacher-nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-teacher-dash',
  standalone: true,
  imports: [TeacherNavComponent, RouterOutlet],
  templateUrl: './teacher-dash.component.html',
  styleUrl: './teacher-dash.component.css',
})
export class TeacherDashComponent {}
