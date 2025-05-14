import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from "../footer/footer.component";
import { LangService } from '../services/lang.service';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { InstructorCoursesComponent } from "../instructor-courses/instructor-courses.component";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-course',
  imports: [RouterLink, SidebarComponent, TranslocoPipe, InstructorCoursesComponent],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css'
})
export class CreateCourseComponent {


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


logout() {
  localStorage.removeItem('user');
  this.router.navigate(['/logOut']);
}


}
