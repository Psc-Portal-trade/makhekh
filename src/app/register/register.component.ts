import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, NavbarComponent,TranslocoPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm:FormGroup = new FormGroup({

    name: new FormControl(null,[Validators.required]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/)])
  })

  registerSubmit():void
  {
    if(this.registerForm.valid){
  console.log(this.registerForm.value);

 }

  }

}
