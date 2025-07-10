import { Component, OnInit } from '@angular/core';
import { SecondNavComponent } from '../navbar/second-nav/second-nav.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WishlistService } from '../services/wishlist.service';
import { CartService } from '../services/cart.service';
import { CourseInformationService } from '../services/course-information.service';
import { TranslocoPipe } from '@ngneat/transloco';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CourseService } from '../services/course.service';
declare var bootstrap: any;

@Component({
  selector: 'app-course-information',
  standalone: true,
  imports: [SecondNavComponent, CommonModule, RouterLink, TranslocoPipe],
  templateUrl: './course-information.component.html',
  styleUrl: './course-information.component.css'
})
export class CourseInformationComponent implements OnInit {
  selectedMonth = '';
  courseObj: any = {};
  safePromoUrl: SafeResourceUrl | null = null;

  course1: any = {};
  course2: any = {};
  course: any = {};
  instructor = {
    Rating: 4.7,
    Courses: 2,
    Students: 107,
    Reviews: 9
  };
  isArabic = false;

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private route: ActivatedRoute,
    private courseService: CourseInformationService,
    private sanitizer: DomSanitizer,
      private courseStorageService: CourseService, // <-- تمت الإضافة هنا

  ) {}
userRole: string = '';

  ngOnInit() {
    window.scrollTo(0, 0);
    const user = localStorage.getItem('user');
  this.userRole = user ? JSON.parse(user).userRole : '';
    this.courseObj = this.courseService.getCourse();

    if (!this.courseObj) {
      console.log("❌ لا يوجد بيانات متاحة للكورس.");
      return;
    }

    console.log("✅ تم جلب بيانات الكورس:", this.courseObj);

    if (this.courseObj.promoVideolUrl) {
      this.safePromoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.courseObj.promoVideolUrl);
    }

    if (this.courseObj.type === 2) {
      this.course2 = { ...this.courseObj };
      this.course1 = {};
    } else {
      this.course1 = { ...this.courseObj };
      this.course2 = {};
    }
  }


openStudentOnlyModal() {
  const modalEl = document.getElementById('studentOnlyModal');
  if (modalEl) {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
  const modalEl1 = document.getElementById('studentOnlyModal1');
  if (modalEl1) {
    const modal = new bootstrap.Modal(modalEl1);
    modal.show();
  }
}
get uniqueMonths(): string[] {
  return [...new Set(this.course2?.schedules?.map((course: any) => String(course.date)))] as string[];
}


  onMonthChange(event: Event) {
    this.selectedMonth = (event.target as HTMLSelectElement).value;
  }

  get filteredCourses() {
    return this.selectedMonth
      ? this.course2.schedules.filter((course: any) => course.date === this.selectedMonth)
      : this.course2.schedules;
  }

  addToCart1() {
    this.cartService.addToCart(this.course1);
    this.course1.isInCart = true;
  }

  removeFromCart1() {
    this.cartService.removeFromCart(this.course1.id);
    this.course1.isInCart = false;
  }

  addToWishlist1() {
    this.wishlistService.addToList(this.course1);
    this.course1.isInWishlist = true;
  }

  removeFromWishlist1() {
    this.wishlistService.removeFromList(this.course1.id);
    this.course1.isInWishlist = false;
  }

  addToCart2() {
    this.cartService.addToCart(this.course2);
    this.course2.isInCart = true;
  }
buyNow() {
  const course = this.courseObj;

  if (!course || !course.id) {
    console.warn('❌ لا يوجد بيانات صالحة للكورس لإتمام عملية الشراء.');
    return;
  }

  const purchasedCourses = this.courseStorageService.getPurchasedCourses();
  console.log('📦 الكورسات الحالية في السيرفيس:', purchasedCourses);

  const alreadyPurchased = purchasedCourses.some(c => c.id === course.id);

  if (!alreadyPurchased) {
    this.courseStorageService.addPurchasedCourses([course]);
    console.log(course)
    console.log('✅ تم شراء الكورس بنجاح.');
  } else {
    console.log('ℹ️ الكورس موجود مسبقًا في قائمة المشتريات.');
  }

  console.log('📦 الكورسات بعد الإضافة:', this.courseStorageService.getPurchasedCourses());
}


  removeFromCart2() {
    this.cartService.removeFromCart(this.course2.id);
    this.course2.isInCart = false;
  }

  addToWishlist2() {
    this.wishlistService.addToList(this.course2);
    this.course2.isInWishlist = true;
  }

  removeFromWishlist2() {
    this.wishlistService.removeFromList(this.course2.id);
    this.course2.isInWishlist = false;
  }

 totalLectures(): number {
  return this.course1?.curriculum?.reduce((sum: number, section: any) => {
    return sum + (section.lectures?.length || 0);
  }, 0) || 0;
}

}
