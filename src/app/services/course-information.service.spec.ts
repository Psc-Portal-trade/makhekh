import { TestBed } from '@angular/core/testing';

import { CourseInformationService } from './course-information.service';

describe('CourseInformationService', () => {
  let service: CourseInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
