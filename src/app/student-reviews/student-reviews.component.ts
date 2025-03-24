import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../services/review.service';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';



interface Review {
  userInitials: string;
  userName: string;
  rating: number;
  timeAgo: string;
  comment: string;
}


@Component({
  selector: 'app-student-reviews',
  imports: [FormsModule,CommonModule,TranslocoPipe],
  templateUrl: './student-reviews.component.html',
  styleUrl: './student-reviews.component.css'
})
export class StudentReviewsComponent {

// review //
courseRating: number = 0;
ratingDistribution = [
  { stars: 5, percentage: 39, count: 0 },
  { stars: 4, percentage: 36, count: 0 },
  { stars: 3, percentage: 18, count: 0 },
  { stars: 2, percentage: 4, count: 0 },
  { stars: 1, percentage: 3, count: 0 }
];


myUsername ="Juliana Silva";

reviews: Review[] = [
  { userInitials: 'MO', userName: 'Maryam A O.', rating: 5, timeAgo: '3/9/2025 , 11:49:43 AM', comment: 'Great teaching and met my expectations.' },
  { userInitials: 'SN', userName: 'Stephen N.', rating: 2, timeAgo: '16/5/2025 , 11:49:43 AM', comment: 'It has been great so far, but getting access to the database would be great.' }
];

filteredReviews: Review[] = [...this.reviews];
selectedFilter: string = 'all';
searchQuery: string = '';

// Form Variables for New Review
newUserName: string = '';
newRating: number = 5;
newComment: string = '';
noResultsFound: boolean = false;


filterReviews() {
  this.filteredReviews = this.reviews.filter(review => {
    const matchesRating = this.selectedFilter === 'all' || review.rating === parseInt(this.selectedFilter);
    const matchesSearch = this.searchQuery.trim() === '' || review.comment.toLowerCase().includes(this.searchQuery.toLowerCase());
    return matchesRating && matchesSearch;
  });
  this.noResultsFound = this.filteredReviews.length === 0;

}
addReview() {
  if (this.myUsername.trim() === '' || this.newComment.trim() === '') return;

  const newReview: Review = {
    userInitials: this.myUsername.slice(0, 2).toUpperCase(),
    userName: this.myUsername,
    rating: parseInt(this.newRating as any, 10),
    timeAgo: new Date().toLocaleString(),  // تنسيق التاريخ
    comment: this.newComment
  };

  this.reviews.unshift(newReview);
  this.filteredReviews = [...this.reviews];

  this.calculateAverageRating(); // تحديث التقييم بعد إضافة مراجعة جديدة
  this.calculateRatingDistribution(); // 🔥 تحديث توزيع التقييمات


  // Reset form
  this.newUserName = '';
  this.newRating = 5;
  this.newComment = '';
}

constructor(private reviewService: ReviewService,private translocoService: TranslocoService) {
  this.calculateAverageRating(); // حساب المتوسط عند تشغيل المكون
  this.calculateRatingDistribution(); // ⬅️ تحديث التوزيع عند بدء التشغيل
  this.calculateAverageInstructorRating();


}
calculateAverageRating() {
  if (this.reviews.length === 0) {
    this.courseRating = 0;
    this.starsArray = Array(5).fill('fa-star-o text-muted');
    return;
  }

  const totalStars = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  this.courseRating = parseFloat((totalStars / this.reviews.length).toFixed(1));

  // تحديث النجوم بناءً على التقييم
  this.updateStarsArray();
}

updateStarsArray() {
  this.starsArray = Array(5).fill('fa-star-o text-muted');
  let fullStars = Math.floor(this.courseRating);
  let hasHalfStar = this.courseRating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      this.starsArray[i] = 'fa-star text-warning';
    } else if (i === fullStars && hasHalfStar) {
      this.starsArray[i] = 'fa-star-half-alt text-warning';
    } else {
      this.starsArray[i] = 'fa-star-o text-muted';
    }
  }
}





starsArray = Array(5).fill(0);


calculateRatingDistribution() {
  const totalReviews = this.reviews.length;

  if (totalReviews === 0) {
    this.ratingDistribution = [
      { stars: 5, percentage: 39, count: 0 },
      { stars: 4, percentage: 36, count: 0 },
      { stars: 3, percentage: 18, count: 0 },
      { stars: 2, percentage: 4, count: 0 },
      { stars: 1, percentage: 3, count: 0 }
    ];
    return;
  }

  // حساب عدد التقييمات لكل نجمة
  const countMap = new Map<number, number>([
    [5, 0], [4, 0], [3, 0], [2, 0], [1, 0]
  ]);

  this.reviews.forEach(review => {
    countMap.set(review.rating, (countMap.get(review.rating) || 0) + 1);
  });

  // تحديث النسبة المئوية لكل نجمة
  this.ratingDistribution = Array.from(countMap.entries()).map(([stars, count]) => ({
    stars,
    count,  // ✅ إضافة عدد التقييمات لكل نجمة
    percentage: Math.round((count / totalReviews) * 100)
  }));

}
getStarsArray(rating: number): string[] {
  let starsArray = Array(5).fill('fa fa-star-o text-muted');
  let fullStars = Math.floor(rating);
  let hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      starsArray[i] = 'fa fa-star text-warning';
    } else if (i === fullStars && hasHalfStar) {
      starsArray[i] = 'fa fa-star-half-alt text-warning';
    }
  }

  return starsArray;
}

displayedReviewsCount: number = 3; // عدد المراجعات المعروضة في البداية
reviewsPerPage: number = 3; // عدد المراجعات التي ستظهر عند كل ضغط على "Show More"

// باقي الكود كما هو...

showMoreReviews() {
  this.displayedReviewsCount += this.reviewsPerPage;
}


selectedRating = 0;
hoverRatingValue = 0;
hasSubmittedRating = false; // متغير لتتبع حالة الإرسال
averageRating: number = 0;
totalReviewers: number = 0;

successMessage = ''; // لتخزين رسالة النجاح

stars = Array(5).fill(0);


rateInstructor(rating: number) {
  this.selectedRating = rating;
}

hoverRating(rating: number) {
  this.hoverRatingValue = rating;
}

submitReview() {
  if (!this.hasSubmittedRating && this.selectedRating > 0) {
    const newReview1 = {
      userInitials: this.myUsername.slice(0, 2).toUpperCase(),
      userName: this.myUsername,
      timeAgo: new Date().toLocaleString(),  // تنسيق التاريخ
      comment: '',  // تصحيح التعليق
      rating: this.selectedRating
    };

    this.reviews.unshift(newReview1);
    this.totalReviewers = this.reviews.length;

    // ✅ طباعة المراجعات بطريقة واضحة
    console.log("📢 The instructor reviews: ", JSON.stringify(this.reviews, null, 2) ,this.totalReviewers);
    this.calculateAverageInstructorRating() ;
    this.reviewService.updateTotalReviewers(this.totalReviewers);

    // إعادة تعيين القيم بعد الإرسال
    this.hasSubmittedRating = true;

    // this.successMessage = "You submitted your rate successfully!";
    this.translocoService.selectTranslate('successMessage').subscribe(message => {
      this.successMessage = message;
    });

    // ⏳ إخفاء الرسالة بعد 2 ثانية
    setTimeout(() => {
      this.successMessage = '';
    }, 1000);

    this.selectedRating = 0;
  }
}
calculateAverageInstructorRating() {
  if (this.reviews.length > 0) {
    const totalRatings = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.averageRating = totalRatings / this.reviews.length;
  } else {
    this.averageRating = 0; // في حالة عدم وجود مراجعات
  }
  this.reviewService.updateAverageRating(this.averageRating);


}
}








