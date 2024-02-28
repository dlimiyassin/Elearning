import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  /* -----------------------------  sign in----------------------------- */
  #router = inject(Router);
  signInForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  #auth = inject(AuthService);
  #token = inject(TokenService);
  #toastr = inject(ToastrService);
  signIn() {
    const crediantils = {
      email: this.signInForm.get('username')?.value as string,
      password: this.signInForm.get('password')?.value as string,
    };
    this.#auth
      .signIn(crediantils)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data) => {
          this.#token.handleResponse(data);
          let Role = (this.#token.getInfos() as any)?.role[0].authority;
          switch (Role) {
            case 'ADMIN':
              this.#router.navigateByUrl('/admin/teachers');
              this.#toastr.success('welcome dear admin', 'You Signed In');
              break;
            case 'TEACHER':
              this.#router.navigateByUrl('/teacher');
              this.#toastr.success('welcome dear teacher', 'You Signed In');
              break;
            case 'STUDENT':
              this.#router.navigateByUrl('/student');
              this.#toastr.success('welcome dear student', 'You Signed In');
              break;
            default:
              break;
          }
        },
        error: (err) => {
          this.#toastr.warning(err.error.message, 'Warning');
        },
      });
  }

  /****************************  unsubscribe   ************************/
  private ngUnsubscribe = new Subject<void>();
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
