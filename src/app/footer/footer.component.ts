import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { LangService } from '../services/lang.service';

interface LangObject {
  lang: string;
  src: string;
}

@Component({
  selector: 'app-footer',
  imports: [TranslocoPipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {


  _translocoService = inject(TranslocoService);

  oppositeLang: LangObject = { lang: "English", src: "assets/Logo AR.png" };

  constructor(private langService: LangService) {
    this.setOppositeLang();
  }


  changeLang(): void {
    const htmlTag = document.documentElement;
    let lang = localStorage.getItem('lang');
    if (lang === 'ar') {
      htmlTag.setAttribute('dir', 'ltr');
      htmlTag.setAttribute('lang', 'en');
      this._translocoService.setActiveLang('en');
      this.langService.setLang('en');
      this.oppositeLang = {"lang":"Arabic","src":"assets/Logo EN.png"};
    } else {
      htmlTag.setAttribute('dir', 'rtl');
      htmlTag.setAttribute('lang', 'ar');
      this._translocoService.setActiveLang('ar');
      this.langService.setLang('ar');
      this.oppositeLang ={"lang":"English","src":"assets/Logo AR.png"};
    }
    console.log("active lang", lang);
  }

  setOppositeLang(): void {
    const lang = localStorage.getItem('lang');
    if (lang === 'ar') {
      this.oppositeLang = { lang: "English", src: "assets/Logo AR.png" };
    } else {
      this.oppositeLang = { lang: "Arabic", src: "assets/Logo EN.png" };
    }
  }
}

