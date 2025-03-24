import { Component } from '@angular/core';
import { HeaderSectionComponent } from './header-section/header-section.component';
import { SecondarySectionHomeComponent } from './secondary-section-home/secondary-section-home.component';
import { ThirdSectionHomeComponent } from './third-section-home/third-section-home.component';
import { FourthSectionHomeComponent } from './fourth-section-home/fourth-section-home.component';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-home',
  imports: [HeaderSectionComponent, SecondarySectionHomeComponent, ThirdSectionHomeComponent, FourthSectionHomeComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
