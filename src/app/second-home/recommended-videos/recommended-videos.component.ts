import { Component , HostListener,AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { Router } from '@angular/router';
import { CourseInformationService } from '../../services/course-information.service';
import { TranslocoPipe } from '@ngneat/transloco';
import { CourseApiService } from '../../services/course-api.service';
declare var bootstrap: any;

@Component({
  selector: 'app-recommended-videos',
  imports: [CommonModule,TranslocoPipe],
  templateUrl: './recommended-videos.component.html',
  styleUrl: './recommended-videos.component.css'
})
export class RecommendedVideosComponent implements OnInit{


  lectures = [
    {
      "courseType": "Live Streamed Educational Courses",
      "category": "Finance & Accounting",
      "learningObjectives": "z",
      "currency": "SAR",
      "targetAudience": "z",
      "title": "Pre Programing everything you need",
      "schedules": [
          {
              "id":"1",
              "courseTitle": "z",
              "date": "2025-03-11",
              "time": "13:38",
              "lecturerName": "z",
              "registered": 10,
              "status": "zz",
              "joinLink": "zzz",
              "limit": 8
          },
          {
            "id":"2",
              "courseTitle": "xxcx",
              "date": "2025-03-21",
              "time": "15:36",
              "lecturerName": "h",
              "registered": 2,
              "status": "hh",
              "joinLink": "jbljk",
              "limit": 9
          }
      ],
      "landingPage": {
          "title": "sad",
          "description": "ssdd",
          "language": "Arabic",
          "level": "Intermediate",
          "category": "Design",
          "duration": "Month",
          "lecturer": "a",
          "lecturerDescription": "a",
          "photo": {},
          "video": {}
      },
      "pricing": {
          "currency": "USD",
          price: 4000,
          "priceTier": "Free",
          "promoLink": "",
          "selectedVoucher": "best_current_price"
      },
      "coupons": [
          {
              "code": "a",
              "status": "Free",
              "users": "Limited",
              "startDate": "",
              "endDate": ""
          }
      ],
      isInWishlist: false,
      isInCart: false,
      id: 1,
      rate: 4.7,
      ratingsCount: 9,
      instructor: 'Ahmed Abbas',
      instructorImage: "assets/image.jpg",
      lastUpdate: '11/2025',
      language: 'English',
      seatsLeft: 10,
      watched: 107,
      thumbnailUrl: 'assets/course-1.png',
      price: 4000,
      description:""
    }

  ];

  constructor(private cartService: CartService, private wishlistService: WishlistService,private courseInfoService: CourseInformationService, private router: Router,  private courseApiService: CourseApiService // ✅ أضفناها
) {}
userRole: string = '';

  ngOnInit() {
  const user = localStorage.getItem('user');
  this.userRole = user ? JSON.parse(user).userRole : '';

  this.courseApiService.getAllCourses().subscribe({
  next: (response) => {
    const allCourses = response?.data || [];
    this.lectures = allCourses.slice(0, 7); // ✅ خدي أول 7 بس

    console.log('Courses loaded:', this.lectures);

    this.lectures.forEach(course => {
      course.isInCart = this.cartService.isItemInCart(course.id);
      course.isInWishlist = this.wishlistService.isItemInList(course.id);
    });

    this.cartService.cartItems$.subscribe(() => {
      this.lectures.forEach(course => {
        course.isInCart = this.cartService.isItemInCart(course.id);
      });
    });

    this.wishlistService.listItems$.subscribe(() => {
      this.lectures.forEach(course => {
        course.isInWishlist = this.wishlistService.isItemInList(course.id);
      });
    });
  },
  error: (err) => {
    console.error('Error loading courses:', err);
  }
});

}

  openStudentOnlyModal() {
  const modalEl = document.getElementById('studentOnlyModal');
  if (modalEl) {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
}

  goToCourseDetails(course: any) {
    this.courseInfoService.setCourse(course); // تخزين بيانات الكورس عند الضغط عليه
    this.router.navigate(['course-Information']); // الانتقال إلى صفحة التفاصيل
  }

  addToCart(course: any) {
    this.cartService.addToCart(course);
    course.isInCart = true;
  }

  removeFromCart(course: any) {
    this.cartService.removeFromCart(course.id);
    course.isInCart = false;
  }



  addToWishList(course: any) {
    this.wishlistService.addToList(course);
    course.isInWishList = true;
  }

  removeFromWishList(course: any) {
    this.wishlistService.removeFromList(course.id);
    course.isInWishList = false;
  }


  private scrollContainer: HTMLElement | null = null;
  private isDragging = false;
  private startX = 0;
  private scrollLeft = 0;

  ngAfterViewInit() {
    this.scrollContainer = document.querySelector('.scroll-container');
  }

  // حركة الماوس
  onMouseMove(event: MouseEvent) {
    if (this.scrollContainer) {
      const { clientX } = event;
      const { offsetWidth, scrollWidth } = this.scrollContainer;
      const maxScroll = scrollWidth - offsetWidth;      const percentage = clientX / offsetWidth;
      this.scrollContainer.scrollLeft = maxScroll * percentage;
    }
  }

  // عند بدء التاتش
  onTouchStart(event: TouchEvent) {
    if (!this.scrollContainer) return;
    this.isDragging = true;
    this.startX = event.touches[0].pageX - this.scrollContainer.offsetLeft;
    this.scrollLeft = this.scrollContainer.scrollLeft;
  }

  // أثناء السحب بالتاتش
  onTouchMove(event: TouchEvent) {
    if (!this.scrollContainer || !this.isDragging) return;
    event.preventDefault();
    const x = event.touches[0].pageX - this.scrollContainer.offsetLeft;
    const walk = (x - this.startX) * 2; // التحكم في سرعة السحب
    this.scrollContainer.scrollLeft = this.scrollLeft - walk;
  }

  // عند إنهاء السحب
  onTouchEnd() {
    this.isDragging = false;
  }


}
