import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { SecondNavComponent } from "../navbar/second-nav/second-nav.component";
import { TranslocoPipe } from '@ngneat/transloco';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-parts',
  imports: [SecondNavComponent,TranslocoPipe,RouterLink],
  templateUrl: './course-parts.component.html',
  styleUrl: './course-parts.component.css'
})
export class CoursePartsComponent {


  ngOnInit(): void {
    window.scrollTo(0, 0);
  
  }


}
