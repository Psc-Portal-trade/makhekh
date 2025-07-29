import { TestBed } from '@angular/core/testing';

import { ExamReviewService } from './exam-review.service';

describe('ExamReviewService', () => {
  let service: ExamReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
