import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./footer/footer.component";
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  imports: [FooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Makhekh';
  private translocoService = inject(TranslocoService);
  constructor() {
    let currentLang: any = localStorage.getItem("lang")
    if (!currentLang) {
      localStorage.setItem("lang", 'ar')
      currentLang = localStorage.getItem("lang")
    }
    this.translocoService.setActiveLang(currentLang)
    // this.dateAdapter.setLocale(currentLang)
    const htmlTag = document.documentElement;
    if (currentLang === 'ar') {
      htmlTag.setAttribute('dir', 'rtl');
      htmlTag.setAttribute('lang', 'ar');
    } else {
      htmlTag.setAttribute('dir', 'ltr');
      htmlTag.setAttribute('lang', 'en');
    }
  }
}
