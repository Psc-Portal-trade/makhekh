import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { LangService } from '../services/lang.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-student-suggestions',
  imports:[FormsModule,CommonModule,SidebarComponent,TranslocoPipe,RouterLink],
  templateUrl: './student-suggestions.component.html',
  styleUrls: ['./student-suggestions.component.css']
})
export class StudentSuggestionsComponent {
  suggestions = [
    { name: 'Hana', date: '12.12.2024', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam pharetra tellus nec viverra. Aenean tempus finibus sem, at sollicitudin magna luctus nec.' },
    { name: 'Ali', date: '10.11.2024', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam pharetra tellus nec viverra. Aenean tempus finibus sem, at sollicitudin magna luctus nec.' },
    { name: 'Sara', date: '05.10.2024', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam pharetra tellus nec viverra. Aenean tempus finibus sem, at sollicitudin magna luctus nec.' },
    { name: 'Mohamed', date: '20.09.2024', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam pharetra tellus nec viverra. Aenean tempus finibus sem, at sollicitudin magna luctus nec.' }
  ];

  selectedIndex: number | null = null; // لحفظ العنصر المحدد للرد عليه
  replyText: string = ''; // نص الرد
  logoSrc: string = 'assets/Logo AR.png';



fullName: string = '';
 firstLetter: string = '';
  role: string = '';
  userRole: string = '';
email:string=''





constructor(private langService: LangService,private authService: AuthService,private router: Router) {
    this.setLogo();
const userData = this.authService.getUserData();
    if (userData) {
      this.fullName = userData.fullName;
      this.role = userData.role;
  }
   }
      _translocoService = inject(TranslocoService);
      ngOnInit() {

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


  // عند الضغط على زر الرد
  reply(index: number) {
    this.selectedIndex = index; // تعيين العنصر المحدد
    this.replyText = ''; // تفريغ حقل الرد عند الفتح
  }

  // عند إرسال الرد
  sendReply() {
    if (this.replyText.trim()) {
      alert(`Reply Sent: ${this.replyText}`); // يمكنك تعديلها لحفظ الرد
      this.selectedIndex = null; // إخفاء مربع الإدخال بعد الإرسال
    }
  }
logout() {
  localStorage.removeItem('user');
  this.router.navigate(['login']);
}

}
