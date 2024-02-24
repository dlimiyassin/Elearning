import {  Routes } from '@angular/router';
import { HomeComponent } from './welcome/home/home.component';
import { AboutComponent } from './welcome/about/about.component';
import { ContactComponent } from './welcome/contact/contact.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AdminComponent } from './admin/admin.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'about', component: AboutComponent, title: 'About' },
  { path: 'contact', component: ContactComponent, title: 'Contact' },
  { path: 'sign-in', component: SignInComponent, title: 'Sign in' },
  { path: 'admin', component: AdminComponent, title: 'Dashboard' },
  { path: 'teacher', component: TeacherComponent, title: 'Dashboard' },
  { path: 'student', component: StudentComponent, title: 'Dashboard' },
];

