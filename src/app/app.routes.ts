import {  Routes } from '@angular/router';
import { HomeComponent } from './welcome/home/home.component';
import { AboutComponent } from './welcome/about/about.component';
import { ContactComponent } from './welcome/contact/contact.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { TeacherComponent } from './teachers/teacher/teacher.component';
import { StudentComponent } from './students/student/student.component';
import { TeachersComponent } from './admins/teachers/teachers.component';
import { StudentsComponent } from './admins/students/students.component';
import { CoursesComponent } from './admins/courses/courses.component';
import { AdminDashComponent } from './admins/admin-dash/admin-dash.component';
import { StudentDashComponent } from './students/student-dash/student-dash.component';
import { TeacherDashComponent } from './teachers/teacher-dash/teacher-dash.component';
import { StudentTestComponent } from './students/student-test/student-test.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'about', component: AboutComponent, title: 'About' },
  { path: 'contact', component: ContactComponent, title: 'Contact' },
  { path: 'sign-in', component: SignInComponent, title: 'Sign in' },
  {
    path: 'admin',
    component: AdminDashComponent,
    children: [
      { path: 'teachers', component: TeachersComponent, title: 'Admin' },
      { path: 'students', component: StudentsComponent, title: 'Admin' },
      { path: 'courses', component: CoursesComponent, title: 'Admin' },
    ],
  },
  { path: 'teacher', component: TeacherDashComponent, 
      children: [
      { path: 'course/:id', component: TeacherComponent, title: 'Teacher' },
    ] 
 },

  { path: 'student', component: StudentDashComponent, 
    children: [
      { path: 'course/:id', component: StudentComponent, title: 'Student' },
      { path: 'test/:id', component: StudentTestComponent, title: 'Student' },

    ] 
},
];
