import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, TranslocoPipe, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    loginForm:FormGroup = new FormGroup({

      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.[a-zA-Z])(?=.\d)(?=.[@$!%?&]).{6,}$/)])
    })

  //   loginSubmit():void
  //   {
  //     if(this.loginForm.valid){
  //   console.log(this.loginForm.value);

  //  }

  //   }

  // profileImage: string = '../../assets/download.jfif'; // صورة افتراضية
  // onFileSelected(event: any): void {
  //   const file = event.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.profileImage = e.target.result; // تحديث الصورة
  //     };
  //     reader.readAsDataURL(file); // تحويل الملف إلى Base64
  //   }
  // }

}
