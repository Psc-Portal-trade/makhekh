import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDraftsComponent } from './course-drafts.component';

describe('CourseDraftsComponent', () => {
  let component: CourseDraftsComponent;
  let fixture: ComponentFixture<CourseDraftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseDraftsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseDraftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
