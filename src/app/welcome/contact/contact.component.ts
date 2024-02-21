import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  complainForm = new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    number: new FormControl('',Validators.required,),
    message: new FormControl('',Validators.required),
  });

  complain(){

  }
}
