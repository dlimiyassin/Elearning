import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-nav.component.html',
  styleUrl: './admin-nav.component.css',
})
export class AdminNavComponent {
  #router = inject(Router);
  #token = inject(TokenService);
  #toaster = inject(ToastrService);
  signOut() {
    this.#token.removeToken();
    this.#token.changeAuthStatus(false);
    this.#router.navigateByUrl('/sign-in');
    this.#toaster.success('see you soon', 'You Signed Out');
  }
}
