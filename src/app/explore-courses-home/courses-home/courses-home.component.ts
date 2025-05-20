import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-courses-home',
  imports: [RouterLink,TranslocoPipe],
  templateUrl: './courses-home.component.html',
  styleUrl: './courses-home.component.css'
})
export class CoursesHomeComponent {
ngOnInit() {
  window.scrollTo(0, 0);
}

}
