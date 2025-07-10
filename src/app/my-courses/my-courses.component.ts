import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../services/wishlist.service';
import { CartService } from '../services/cart.service';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SecondNavComponent } from '../navbar/second-nav/second-nav.component';
import { Router, RouterLink } from '@angular/router';
import { CourseInformationService } from '../services/course-information.service';
import { TranslocoPipe } from '@ngneat/transloco';
interface Quiz {
  id: string;
  title: string;
  attemptsAllowed: number;
  timeLimitInMinutes: number;
}

interface Lecture {
  id: string;
  title: string;
  quizzes?: Quiz[];
}

interface SubSection {
  id: string;
  title: string;
  lectures?: Lecture[];
  quizzes?: Quiz[];
}

interface Section {
  id: string;
  title: string;
  lectures?: Lecture[];
  subSections?: SubSection[];
  quizzes?: Quiz[];
}

interface Course {
  id: string;
  title: string;
  quizzes?: Quiz[];
  sections?: Section[];
}

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, SecondNavComponent, TranslocoPipe],
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
  courses: any[] = [];
  wishlistCourses: any[] = [];
  searchQuery: string = '';
  searchQueryWishlist: string = '';

  currentPage: number = 1;
  currentPageWishlist: number = 1;
  itemsPerPage: number = 6;
  lectures: any[] = [];
searchQueryLectures: string = '';
currentPageLectures: number = 1;

filteredLectures: any[] = [];
paginatedLectures: any[] = [];
allQuizzes: any[] = [];



allCourses: any[] = [];

selectedCourseId = '';
selectedSectionId = '';
selectedSubSectionId = '';
selectedLectureId = '';

sections: any[] = [];
subSections: any[] = [];

currentPageQuizzes: number = 1;






  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private courseService: CourseService,
    private courseInfoService: CourseInformationService, private router: Router
  ) {}

 ngOnInit() {
  this.courseService.purchasedCourses$.subscribe(courses => {
    this.lectures = courses || [];
    this.updateFilteredLectures(); // ⬅️ عند التحميل
  });
   this.courseService.purchasedCourses$.subscribe(courses => {
    this.extractAllQuizzes(courses || []);
  });
   this.courseService.purchasedCourses$.subscribe(courses => {
    this.allCourses = courses || [];
    this.extractAllQuizzes(this.allCourses);
  });

  console.log('All courses:', this.allCourses);
  console.log('All quizzes:', this.allQuizzes);
}

onCourseChange() {
  const course = this.allCourses.find(c => c.id === this.selectedCourseId);
  this.sections = course?.sections || [];
  this.subSections = [];
  this.lectures = [];
  this.selectedSectionId = '';
  this.selectedSubSectionId = '';
  this.selectedLectureId = '';
}

onSectionChange() {
  const section = this.sections.find(s => s.id === this.selectedSectionId);
  this.subSections = section?.subSections || [];
  this.lectures = (section?.lectures || []).concat(
    this.subSections.flatMap((s: any) => s.lectures || [])
  );
  this.selectedSubSectionId = '';
  this.selectedLectureId = '';
}

onSubSectionChange() {
  const sub = this.subSections.find(s => s.id === this.selectedSubSectionId);
  this.lectures = sub?.lectures || [];
  this.selectedLectureId = '';
}
get paginatedQuizzes() {
  const start = (this.currentPageQuizzes - 1) * this.itemsPerPage;
  return this.filteredQuizzes.slice(start, start + this.itemsPerPage);
}

get totalPagesQuizzes() {
  return Math.ceil(this.filteredQuizzes.length / this.itemsPerPage);
}

getPagesArrayQuizzes() {
  return Array.from({ length: this.totalPagesQuizzes }, (_, i) => i + 1);
}

goToPageQuizzes(page: number) {
  this.currentPageQuizzes = page;
}

extractAllQuizzes(courses: Course[]) {
  courses.forEach((course) => {
    course.quizzes?.forEach((quiz) => {
      this.allQuizzes.push({ ...quiz, courseId: course.id, courseTitle: course.title });
    });

    course.sections?.forEach((section) => {
      section.quizzes?.forEach((quiz) => {
        this.allQuizzes.push({ ...quiz, courseId: course.id, sectionId: section.id, courseTitle: course.title });
      });

      section.subSections?.forEach((sub) => {
        sub.quizzes?.forEach((quiz) => {
          this.allQuizzes.push({
            ...quiz,
            courseId: course.id,
            sectionId: section.id,
            subSectionId: sub.id,
            courseTitle: course.title,
          });
        });

        sub.lectures?.forEach((lecture) => {
          lecture.quizzes?.forEach((quiz) => {
            this.allQuizzes.push({
              ...quiz,
              courseId: course.id,
              sectionId: section.id,
              subSectionId: sub.id,
              lectureId: lecture.id,
              courseTitle: course.title,
            });
          });
        });
      });

      section.lectures?.forEach((lecture) => {
        lecture.quizzes?.forEach((quiz) => {
          this.allQuizzes.push({
            ...quiz,
            courseId: course.id,
            sectionId: section.id,
            lectureId: lecture.id,
            courseTitle: course.title,
          });
        });
      });
    });
  });
}


startQuiz(quiz: any) {
  console.log('🧪 Quiz to save:', quiz);

  // 🔍 العثور على الكورس الكامل من خلال courseId
  const course = this.allCourses.find(c => c.id === quiz.courseId);

  if (course) {
    localStorage.setItem('currentExam', JSON.stringify(quiz));
    localStorage.setItem('currentExamCourse', JSON.stringify(course));
    console.log('📚 Saved related course to localStorage:', course);
  } else {
    console.warn('⚠️ Course not found for this quiz');
  }

  this.router.navigate(['/exam'], {
    state: {
      quiz,
      quizIndex: 0,
      courseTitle: quiz.courseTitle
    }
  });
}



get filteredQuizzes() {
  return this.allQuizzes
    .filter(quiz =>
      quiz.title?.toLowerCase().includes(this.searchQuery.toLowerCase())
    )
    .filter(quiz =>
      !this.selectedCourseId || quiz.courseId === this.selectedCourseId
    )
    .filter(quiz =>
      !this.selectedSectionId || quiz.sectionId === this.selectedSectionId
    )
    .filter(quiz =>
      !this.selectedSubSectionId || quiz.subSectionId === this.selectedSubSectionId
    )
    .filter(quiz =>
      !this.selectedLectureId || quiz.lectureId === this.selectedLectureId
    );
}


updateFilteredLectures() {
  this.filteredLectures = this.lectures.filter(course =>
    course.title?.toLowerCase().includes(this.searchQueryLectures.toLowerCase())
  );

  const start = (this.currentPageLectures - 1) * this.itemsPerPage;
  this.paginatedLectures = this.filteredLectures.slice(start, start + this.itemsPerPage);
}
goToPageLectures(page: number) {
  this.currentPageLectures = page;
  this.updateFilteredLectures();
}

getPagesArrayLectures() {
  return Array.from({ length: this.totalPagesLectures }, (_, i) => i + 1);
}

get totalPagesLectures() {
  return Math.ceil(this.filteredLectures.length / this.itemsPerPage);
}

  goToCourseDetails(course: any) {
    this.courseInfoService.setCourse(course); // تخزين بيانات الكورس عند الضغط عليه
    this.router.navigate(['course-content']); // الانتقال إلى صفحة التفاصيل
  }
  // private updateCourseState(course: any): any {
  //   return {
  //     ...course,
  //     isInCart: this.cartService.isItemInCart(course.id),
  //     isInWishList: this.wishlistService.isItemInList (course.id),
  //   };
  // }

  // get filteredCourses() {
  //   return this.courses.filter(course =>
  //     course.courseTitle.toLowerCase().includes(this.searchQuery.toLowerCase())
  //   );
  // }

  // get paginatedCourses() {
  //   const start = (this.currentPage - 1) * this.itemsPerPage;
  //   return this.filteredCourses.slice(start, start + this.itemsPerPage);
  // }

  // get filteredWishlistCourses() {
  //   return this.wishlistCourses.filter(course =>
  //     course.courseTitle.toLowerCase().includes(this.searchQueryWishlist.toLowerCase())
  //   );
  // }

  // get paginatedWishlistCourses() {
  //   const start = (this.currentPageWishlist - 1) * this.itemsPerPage;
  //   return this.filteredWishlistCourses.slice(start, start + this.itemsPerPage);
  // }

  // addToCart(course: any) {
  //   this.cartService.addToCart(course);
  //   course.isInCart = true;
  // }

  // removeFromCart(course: any) {
  //   this.cartService.removeFromCart(course.id);
  //   course.isInCart = false;
  // }

  // addToWishList(course: any) {
  //   this.wishlistService.addToList(course);
  // }

  // removeFromWishList(course: any) {
  //   this.wishlistService.removeFromList(course.id);
  // }


  // getPagesArrayWishlist() {
  //   return Array.from({ length: this.totalPagesWishlist }, (_, i) => i + 1);
  // }
  // get totalPagesWishlist() {
  //   return Math.ceil(this.filteredWishlistCourses.length / this.itemsPerPage);
  // }
  // goToPageWishlist(page: number) {
  //   this.currentPageWishlist = page;
  // }

  // goToPage(page: number) {
  //   this.currentPage = page;
  // }
  // getPagesArray() {
  //   return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  // }
  // get totalPages() {
  //   return Math.ceil(this.filteredCourses.length / this.itemsPerPage);
  // }
  // startQuiz(quizSource: any, sIndex: number, lIndex: number, course: any) {
  //   const attempts = this.getQuizAttempts(sIndex, lIndex);
  //   const updatedAttempts = attempts + 1;
  //   localStorage.setItem(`quiz_attempts_${sIndex}_${lIndex}`, updatedAttempts.toString());

  //   let quizToPass;

  //   if (course.courseType === 'Live Streamed Educational Courses') {
  //     // ✅ النوع Live Streamed → الـ quiz جاي جاهز
  //     quizToPass = quizSource;
  //   } else if (course.courseType === 'Recorded Educational Courses') {
  //     // ✅ النوع Recorded → الـ quiz جواه quizzes
  //     quizToPass = quizSource.quizzes;
  //   }

  //   if (quizToPass) {
  //     this.router.navigate(['/exam'], {
  //       state: {
  //         quiz: quizToPass,
  //         quizIndex: lIndex,
  //         courseTitle: course.courseTitle
  //       }
  //     });
  //   } else {
  //     console.warn('No quiz found!');
  //   }
  // }

  // isScheduleAvailable(dateStr: string, timeStr: string): boolean {
  //   const now = new Date();

  //   // تاريخ ووقت المحاضرة
  //   const fullDateTime = new Date(`${dateStr}T${timeStr}`);

  //   return now >= fullDateTime;
  // }


  // getQuizAttempts(sIndex: number, lIndex: number): number {
  //   const attempts = localStorage.getItem(`quiz_attempts_${sIndex}_${lIndex}`);
  //   return attempts ? parseInt(attempts, 10) : 0; // إذا لم تكن هناك محاولات مسجلة، نعيد 0
  // }


  // viewResult() {
  //   // من هنا يمكنك إضافة منطق لعرض نتيجة الامتحان
  //   console.log('Viewing results...');
  //   localStorage.clear();

  // }


}
