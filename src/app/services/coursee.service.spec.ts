import { TestBed } from '@angular/core/testing';

import { CourseeService } from './coursee.service';

describe('CourseeService', () => {
  let service: CourseeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
