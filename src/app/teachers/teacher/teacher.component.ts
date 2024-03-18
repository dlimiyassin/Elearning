import { Component, TemplateRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [NgbModule, MatExpansionModule, ReactiveFormsModule],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css',
})
export class TeacherComponent {

NewChapter = new FormGroup({
  title : new FormControl(''),
  lien : new FormControl('')
})










  /*         modals       */
  #modalService = inject(NgbModal);
  openLg(content: TemplateRef<any>) {
    this.#modalService.open(content, { size: 'xl' });
  }
  openSm(content: TemplateRef<any>) {
    this.#modalService.open(content);
  }


  /*           sign out         */
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
