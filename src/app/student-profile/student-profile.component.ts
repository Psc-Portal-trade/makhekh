import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { LangService } from '../services/lang.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-profile',
  imports: [FormsModule, CommonModule,  TranslocoPipe, RouterLink],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent {
 fullName: string = '';
 firstLetter: string = '';
  role: string = '';
  userRole: string = '';
email:string=''


 logoSrc: string = 'assets/Logo AR.png';

  constructor(private langService: LangService,private authService: AuthService,private router: Router,private http: HttpClient) {
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
    this.getProfile();


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
logout() {
  localStorage.removeItem('user');
  this.router.navigate(['login']);
}











 profile: any = {};
  isEditMode = false;




  getProfile(): void {
    this.http.get<any>('https://api.makhekh.com/api/Student/profile').subscribe({
      next: (res) => {
        this.profile = res.data;
      },
      error: (err) => {
        console.error('Error loading profile', err);
      }
    });
  }

  edit(): void {
    this.isEditMode = true;
  }

  update(): void {
    const body = {
      fullName: this.profile.fullName,
      email: this.profile.email,
      job: this.profile.job,
      facebook: this.profile.facebook,
      linkedIn: this.profile.linkedIn,
      description: this.profile.description,
      major: this.profile.major
    };

    this.http.put<any>('https://api.makhekh.com/api/Student/profile', body).subscribe({
      next: () => {
        this.isEditMode = false;
      },
      error: (err) => {
        console.error('Error updating profile', err);
      }
    });
  }









}
