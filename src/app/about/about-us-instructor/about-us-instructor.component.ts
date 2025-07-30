import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { FirstAboutComponent } from "../first-about/first-about.component";
import { SecondAboutComponent } from "../second-about/second-about.component";
import { ThirdAboutComponent } from "../third-about/third-about.component";
import { FourthAboutComponent } from "../fourth-about/fourth-about.component";
import { SecondNavComponent } from "../../navbar/second-nav/second-nav.component";
import { FooterComponent } from "../../footer/footer.component";
import { CoursesComponent } from "../../second-home/courses/courses.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { Router } from '@angular/router';
import { CourseInformationService } from '../../services/course-information.service';
import { TranslocoPipe } from '@ngneat/transloco';
import { CourseApiService } from '../../services/course-api.service';
import { ActivatedRoute } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-about-us-instructor',
  imports: [ SecondNavComponent, CoursesComponent,CommonModule, FormsModule,TranslocoPipe],
  templateUrl: './about-us-instructor.component.html',
  styleUrl: './about-us-instructor.component.css'
})
export class AboutUsInstructorComponent  implements OnInit{

  private _searchQuery: string = ''; // تخزين قيمة البحث داخليًا
  currentPage = 1;
  itemsPerPage = 12;

 lectures: {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  averageRating: number;
  enrolledStudentsCount: number;
  price: number;
  currency: string;
  teacherName: string;
  category: string;
  language: string;
  level: number;
  prerequisites: string;
  targetAudience: string;
  type: number;
  isApproved: boolean;
  ratingsCount: number;
  totalDurationHours: number;
  createdAt: string;
  lastUpdatedAt: string | null;
  promoVideolUrl: string;
  isInCart: boolean;
  isInWishlist: boolean;
}[] = [];



  constructor(private cartService: CartService, private wishlistService: WishlistService,private courseInfoService: CourseInformationService, private router: Router, private courseApiService: CourseApiService,  private route: ActivatedRoute // ✅ أضف دي
) {}
userRole: string = '';

ngOnInit() {
  window.scrollTo(0, 0);
 const user = localStorage.getItem('user');
  this.userRole = user ? JSON.parse(user).userRole : '';
this.courseApiService.getAllCourses().subscribe({
  next: (response: any) => {
    this.lectures = response.data.map((course: any) => {
      const sections = course.sections?.map((section: any) => ({
        id: section.id,
        title: section.title,
        quizzes: section.quizzes ?? [],
        summaryAttachments: section.summaryAttachments ?? [],
        lectures: section.lectures?.map((lecture: any) => ({
          id: lecture.id,
          title: lecture.title,
          type: lecture.type,
          description: lecture.description,
          videoUrl: lecture.videoUrl,
          startUrl: lecture.startUrl,
          startTime: lecture.startTime,
          durationInMinutes: lecture.durationInMinutes,
          zoomMeetingId: lecture.zoomMeetingId,
          zoomStartUrl: lecture.zoomStartUrl,
          zoomJoinUrl: lecture.zoomJoinUrl,
          zoomPassword: lecture.zoomPassword,
          isInstant: lecture.isInstant,
          status: lecture.status,
          quizzes: lecture.quizzes ?? [],
          summaryAttachments: lecture.summaryAttachments ?? []
        })) ?? [],
        subSections: section.subSections?.map((sub: any) => ({
          id: sub.id,
          title: sub.title,
          lectures: sub.lectures?.map((lecture: any) => ({
            id: lecture.id,
            title: lecture.title,
            type: lecture.type,
            description: lecture.description,
            videoUrl: lecture.videoUrl,
            startUrl: lecture.startUrl,
            startTime: lecture.startTime,
            durationInMinutes: lecture.durationInMinutes,
            zoomMeetingId: lecture.zoomMeetingId,
            zoomStartUrl: lecture.zoomStartUrl,
            zoomJoinUrl: lecture.zoomJoinUrl,
            zoomPassword: lecture.zoomPassword,
            isInstant: lecture.isInstant,
            status: lecture.status,
            quizzes: lecture.quizzes ?? [],
            summaryAttachments: lecture.summaryAttachments ?? []
          })) ?? [],
          quizzes: sub.quizzes ?? [],
          summaryAttachments: sub.summaryAttachments ?? []
        })) ?? []
      })) ?? [];

      return {
        id: course.id,
        title: course.title,
        description: course.description,
        thumbnailUrl: course.thumbnailUrl,
        averageRating: course.averageRating,
        enrolledStudentsCount: course.enrolledStudentsCount,
        price: course.price,
        currency: course.currency,
        teacherName: course.teacherName,
        category: course.category?.name,
        language: course.language,
        level: course.level,
        prerequisites: course.prerequisites,
        targetAudience: course.targetAudience,
        type: course.type,
        isApproved: course.isApproved,
        ratingsCount: course.ratingsCount,
        totalDurationHours: course.totalDurationHours,
        createdAt: course.createdAt,
        lastUpdatedAt: course.lastUpdatedAt,
        promoVideolUrl: course.promoVideolUrl,
        isInCart: this.cartService.isItemInCart(course.id),
        isInWishlist: this.wishlistService.isItemInList(course.id),
        sections: sections
      };
    });

    console.log("✅ mapped lectures:", this.lectures);
  },
  error: (err) => {
    console.error('❌ Error loading courses:', err);
  }
});

this.route.queryParams.subscribe(params => {
    const categoryFromQuery = params['category'];
    if (categoryFromQuery) {
      this.selectedCategory = categoryFromQuery;
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
     console.log('🛒 Add to cart clicked:', course); // ✅ تأكد إن الزر فعلاً اشتغل

  this.cartService.addToCartAPI(course.id).subscribe({
    next: (response) => {
      console.log('✅ Course added to cart:', response);
      course.isInCart = true;
    },
    error: (err) => {
      console.error('❌ Error adding course:', err);
    }
  });
    course.isInCart = true;
  }

  removeFromCart(course: any) {
    this.cartService.removeFromCart(course.id);
    course.isInCart = false;
  }


addToWishList(course: any) {
  // this.wishlistService.addToList(course); // الاحتفاظ بالوظيفة القديمة (لو مستخدمة داخليًا)
  

  // إضافة الكورس للويش ليست من الـ API
  this.wishlistService.addCourseToWishlistAPI(course.id).subscribe({
    next: () => {
      console.log('✅ Course added to wishlist API');
      course.isInWishList = true;
    },
    error: (err) => {
      console.error('❌ Error adding to wishlist API:', err);
    }
  });
  course.isInWishList = true;
}

removeFromWishList(course: any) {
  // this.wishlistService.removeFromList(course.id); // الاحتفاظ بالوظيفة القديمة
  course.isInWishList = false;

  // إزالة الكورس من الويش ليست من الـ API
  this.wishlistService.removeCourseFromWishlistAPI(course.id).subscribe({
    next: () => {
      console.log('✅ Course removed from wishlist API');
    },
    error: (err) => {
      console.error('❌ Error removing from wishlist API:', err);
    }
  });
   course.isInWishList = false;
}

  set searchQuery(value: string) {
    this._searchQuery = value;
    this.currentPage = 1; // إعادة ضبط الصفحة عند تغيير البحث
  }

  get searchQuery(): string {
    return this._searchQuery;
  }
selectedCategory: string | null = null;

onCategorySelected(categoryName: string) {
  this.selectedCategory = categoryName;
  this.currentPage = 1; // يرجع لأول صفحة لما الفلتر يتغير
}

get filteredCourses() {
  return this.lectures.filter(course =>
    (!this.searchQuery || course.title?.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
    (!this.selectedCategory || course.category?.toLowerCase() === this.selectedCategory.toLowerCase())
  );
}



  get paginatedCourses() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCourses.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filteredCourses.length / this.itemsPerPage);
  }

  get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(newPage: number) {
    this.currentPage = newPage;
  }

}

