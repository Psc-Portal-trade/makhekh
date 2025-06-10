import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from "../footer/footer.component";
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { LangService } from '../services/lang.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-instructor-profile',
  imports: [FormsModule, CommonModule, SidebarComponent, TranslocoPipe, RouterLink],
  templateUrl: './instructor-profile.component.html',
  styleUrl: './instructor-profile.component.css'
})
export class InstructorProfileComponent {

  fullName: string = '';
  firstLetter: string = '';
  role: string = '';
  userRole: string = '';
  email: string = '';

  logoSrc: string = 'assets/Logo AR.png';

  constructor(
    private langService: LangService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
    this.setLogo();
    const userData = this.authService.getUserData();
    if (userData) {
      this.fullName = userData.fullName;
      this.role = userData.role;
    }
  }

  _translocoService = inject(TranslocoService);

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.langService.lang$.subscribe((lang) => {
      this.logoSrc = lang === 'ar' ? 'assets/Logo AR.png' : 'assets/Logo EN.png';
    });

    const user = this.authService.getUserData();
    this.userRole = user?.userRole || '';
    this.fullName = user?.fullName || '';
    this.email = user?.email || '';
    this.firstLetter = this.fullName.charAt(0).toUpperCase();
    this.getInstructorProfile();
  }

  profile: any = {};
  isEditMode: boolean = false;

  getInstructorProfile(): void {
    this.http.get<any>('https://api.makhekh.com/api/Teachers/profile').subscribe({
      next: (res) => {
        this.profile = res.data;
        this.profileImg = this.profile.profileImageUrl || this.profileImg;
      },
      error: (err) => {
        console.error('Error loading profile', err);
      }
    });
  }

  updateInstructorProfile(): void {
    const body = {
      teachingType: this.profile.teachingType,
      experienceYears: this.profile.experienceYears,
      cvUrl: this.profile.cvUrl,
      facebook: this.profile.facebook,
      linkedIn: this.profile.linkedIn,
      twitter: this.profile.twitter,
      youTube: this.profile.youTube
    };

    this.http.put<any>('https://api.makhekh.com/api/Teachers/profile', body).subscribe({
      next: () => {
        this.isEditMode = false;
      },
      error: (err) => {
        console.error('Error updating profile', err);
      }
    });
  }

uploadDirectToApi(event: any): void {
  const file = event.target.files[0];

  if (!file) return;

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

  if (!allowedTypes.includes(file.type)) {
    alert('Only JPG and PNG images are allowed.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  this.http.post<any>('https://api.makhekh.com/api/Teachers/profile/image', formData).subscribe({
    next: (res) => {
      console.log('Image uploaded successfully', res);
      this.getInstructorProfile();
    },
    error: (err) => {
      console.error('Error uploading image', err);
      alert(err?.error?.message || 'Upload failed.');
    }
  });
}


  toggleEdit(): void {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      this.updateInstructorProfile();
    }
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
  profileImg: string = '../../assets/download.jfif';
  selectFile: File | null = null;
  isPhotoUploaded: boolean = false;

 on(event: any): void {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.profileImg = e.target.result;
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('file', file);

    this.http.post<any>('https://api.makhekh.com/api/Teachers/profile/image', formData).subscribe({
      next: (res) => {
        console.log('Image uploaded successfully', res);
        this.getInstructorProfile();
      },
      error: (err) => {
        console.error('Error uploading image', err);
      }
    });
  }
}


  Select(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectFile = file;
      console.log('Selected File2:', file);
    }
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
}
