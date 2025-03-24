import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from "../footer/footer.component";
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { LangService } from '../services/lang.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-instructor-profile',
  imports: [FormsModule, CommonModule, SidebarComponent,TranslocoPipe,RouterLink],
  templateUrl: './instructor-profile.component.html',
  styleUrl: './instructor-profile.component.css'
})
export class InstructorProfileComponent {




 logoSrc: string = 'assets/Logo AR.png';

  constructor(private langService: LangService) {
    this.setLogo();
  }

  _translocoService = inject(TranslocoService);

  ngOnInit(): void {
    this.langService.lang$.subscribe((lang) => {
      this.logoSrc = lang === 'ar' ? 'assets/Logo AR.png' : 'assets/Logo EN.png';
    });
  }

  changeLang(): void {
    const htmlTag = document.documentElement;
    let lang = localStorage.getItem('lang');
    if (lang === 'ar') {
      htmlTag.setAttribute('dir', 'ltr');
      htmlTag.setAttribute('lang', 'en');
      this._translocoService.setActiveLang('en');
      this.langService.setLang('en');
    } else {
      htmlTag.setAttribute('dir', 'rtl');
      htmlTag.setAttribute('lang', 'ar');
      this._translocoService.setActiveLang('ar');
      this.langService.setLang('ar');
    }
    console.log('active lang', lang);
  }

  setLogo(): void {
    const lang = localStorage.getItem('lang');
    this.logoSrc = lang === 'ar' ? 'assets/Logo AR.png' : 'assets/Logo EN.png';
  }








  isExpanded = false;
  profileImg: string = '../../assets/download.jfif'; // صورة افتراضية
  selectFile: File | null = null;
  isPhotoUploaded: boolean = false;
  on(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImg = e.target.result;
        this.isPhotoUploaded = true;

         // تحديث الصورة
      };
      reader.readAsDataURL(file); // تحويل الملف إلى Base64
    }
  }
  Select(event: any) {
    const file = event.target.files[0]; // الحصول على الملف الأول المختار
    if (file) {
      this.selectFile = file;
      console.log('Selected File2:', file);
    }
  }

}
