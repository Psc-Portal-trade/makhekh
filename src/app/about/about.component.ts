import { Component } from '@angular/core';
import { FirstAboutComponent } from './first-about/first-about.component';
import { SecondAboutComponent } from './second-about/second-about.component';
import { ThirdAboutComponent } from './third-about/third-about.component';
import { FourthAboutComponent } from './fourth-about/fourth-about.component';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-about',
  imports: [FirstAboutComponent, SecondAboutComponent, ThirdAboutComponent, FourthAboutComponent, NavbarComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
