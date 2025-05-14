import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from "../footer/footer.component";
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { LangService } from '../services/lang.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-instructor-profile',
  imports: [FormsModule, CommonModule, SidebarComponent,TranslocoPipe,RouterLink],
  templateUrl: './instructor-profile.component.html',
  styleUrl: './instructor-profile.component.css'
})
export class InstructorProfileComponent {

 fullName: string = '';
 firstLetter: string = '';
  role: string = '';
  userRole: string = '';
email:string=''



 logoSrc: string = 'assets/Logo AR.png';

  constructor(private langService: LangService,private authService: AuthService,private router: Router) {
    this.setLogo();
     const userData = this.authService.getUserData();
    if (userData) {
      this.fullName = userData.fullName;
      this.role = userData.role;
  }
  }

  _translocoService = inject(TranslocoService);

  ngOnInit(): void {
    this.langService.lang$.subscribe((lang) => {
      this.logoSrc = lang === 'ar' ? 'assets/Logo AR.png' : 'assets/Logo EN.png';
    });


  const user = this.authService.getUserData(); // هنا بنجيب الداتا من السيرفيس
  this.userRole = user?.userRole || ''; // هنا بنستخرج الرول
  this.fullName = user?.fullName || '';
  this.email = user?.email || '';
this.firstLetter = this.fullName.charAt(0).toUpperCase();



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
logout() {
  localStorage.removeItem('user');
  this.router.navigate(['login']);
}
}
