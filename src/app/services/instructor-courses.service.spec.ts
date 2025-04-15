import { TestBed } from '@angular/core/testing';

import { InstructorCoursesService } from './instructor-courses.service';

describe('InstructorCoursesService', () => {
  let service: InstructorCoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstructorCoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
