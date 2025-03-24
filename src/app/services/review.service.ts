import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private averageRatingSubject = new BehaviorSubject<number>(0);
  averageRating$ = this.averageRatingSubject.asObservable();

  private totalReviewersSubject = new BehaviorSubject<number>(0);
  totalReviewers$ = this.totalReviewersSubject.asObservable();

  updateAverageRating(newRating: number) {
    this.averageRatingSubject.next(newRating);
  }

  updateTotalReviewers(newTotal: number) {
    this.totalReviewersSubject.next(newTotal);
  }

}
