import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from "../footer/footer.component";
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { LangService } from '../services/lang.service';
import { RouterLink } from '@angular/router';
import { SidebarStudentsComponent } from "../sidebar-students/sidebar-students.component";

@Component({
  selector: 'app-student-profile',
  imports: [FormsModule, CommonModule,  TranslocoPipe, RouterLink],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent {


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
  profileImage: string = '../../assets/download.jfif'; // صورة افتراضية
  selectedFile: File | null = null;
  isPhotoUploaded: boolean = false; // متغير للتحكم في ظهور الأزرار


  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result; // تحديث الصورة
        this.isPhotoUploaded = true; // تعطيل زر الرفع بعد تحديد الصورة

      };
      reader.readAsDataURL(file); // تحويل الملف إلى Base64
    }
  }

  Selected(event: any) {
    const file = event.target.files[0]; // الحصول على الملف الأول المختار
    if (file) {
      this.selectedFile = file;
      console.log('Selected File:', file);
    }
  }
  activeTab: string = 'profile';
  pageTitle: string = 'Student Profile';

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.pageTitle = this._translocoService.translate(tab === 'profile' ? 'profile.pageTitle' : 'profile.suggestionsTab');
  }





  //suggestions//
  address: string = '';
  proposal: string = '';
  description: string = '';
  category: string = 'design';
  courses: string = 'web-design';

  file: File | null = null;


  isFormValid(): boolean {
    return this.address.trim() !== '' && this.proposal.trim() !== '';
  }

}
