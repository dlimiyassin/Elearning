import { Component } from '@angular/core';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-dash',
  standalone: true,
  imports: [AdminNavComponent,RouterOutlet],
  templateUrl: './admin-dash.component.html',
  styleUrl: './admin-dash.component.css'
})
export class AdminDashComponent {

}
