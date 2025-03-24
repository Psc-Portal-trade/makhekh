import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-second-home-header',
  imports: [TranslocoPipe,RouterLink],
  templateUrl: './second-home-header.component.html',
  styleUrl: './second-home-header.component.css'
})
export class SecondHomeHeaderComponent {

}
