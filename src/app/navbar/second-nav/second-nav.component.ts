import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { CartIconComponent } from "../../cart-icon/cart-icon.component";
import { WishlistIconComponent } from "../../wishlist-icon/wishlist-icon.component";
import { LangService } from '../../services/lang.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-second-nav',
  imports: [RouterLink, TranslocoPipe, CartIconComponent, WishlistIconComponent,CommonModule],
  templateUrl: './second-nav.component.html',
  styleUrl: './second-nav.component.css'
})
export class SecondNavComponent implements OnInit {

 fullName: string = '';
 firstLetter: string = '';
  role: string = '';
  userRole: string = '';
email:string=''

  isSidebarOpen = false;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }


 logoSrc: string = 'assets/Logo AR.png';

  constructor(private langService: LangService,private authService: AuthService,private router: Router , private teacherService: TeacherService
) {
    this.setLogo();
 const userData = this.authService.getUserData();
    if (userData) {
      this.fullName = userData.fullName;
      this.role = userData.role;
  }



  }

  _translocoService = inject(TranslocoService);



profileImg: string = '../../assets/download.jfif';


  ngOnInit(): void {
    this.langService.lang$.subscribe((lang) => {
      this.logoSrc = lang === 'ar' ? 'assets/Logo AR.png' : 'assets/Logo EN.png';
    });



  const user = this.authService.getUserData(); // هنا بنجيب الداتا من السيرفيس
  this.userRole = user?.userRole || ''; // هنا بنستخرج الرول
  this.fullName = user?.fullName || '';
  this.email = user?.email || '';
this.firstLetter = this.fullName.charAt(0).toUpperCase();
this.teacherService.getInstructorProfile().subscribe({
  next: (res) => {
    const profile = res.data;
    this.profileImg = profile.profileImageUrl || this.profileImg;
  },
  error: (err) => {
    console.error('Error loading profile from API', err);
  }
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


logout() {
  localStorage.removeItem('user');
  this.router.navigate(['login']);
}


}
