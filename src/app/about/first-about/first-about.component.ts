import { Component } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';
import { InstructorSignupComponent } from "../../instructor-signup/instructor-signup.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-first-about',
  imports: [TranslocoPipe, InstructorSignupComponent],
  templateUrl: './first-about.component.html',
  styleUrl: './first-about.component.css'
})
export class FirstAboutComponent {

}
