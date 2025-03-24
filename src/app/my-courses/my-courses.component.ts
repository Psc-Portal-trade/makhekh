import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../services/wishlist.service';
import { CartService } from '../services/cart.service';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SecondNavComponent } from '../navbar/second-nav/second-nav.component';
import { Router } from '@angular/router';
import { CourseInformationService } from '../services/course-information.service';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [CommonModule, FormsModule,SecondNavComponent,TranslocoPipe],
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

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private courseService: CourseService,
    private courseInfoService: CourseInformationService, private router: Router
  ) {}

  ngOnInit() {
    this.courseService.purchasedCourses$.subscribe(courses => {
      this.courses = courses;
    });

    this.wishlistService.listItems$.subscribe(items => {
      this.wishlistCourses = items.map(course => this.updateCourseState(course));
    });
  }
  goToCourseDetails(course: any) {
    this.courseInfoService.setCourse(course); // تخزين بيانات الكورس عند الضغط عليه
    this.router.navigate(['course-content']); // الانتقال إلى صفحة التفاصيل
  }
  private updateCourseState(course: any): any {
    return {
      ...course,
      isInCart: this.cartService.isItemInCart(course.id),
      isInWishList: this.wishlistService.isItemInList (course.id),
    };
  }

  get filteredCourses() {
    return this.courses.filter(course =>
      course.courseTitle.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  get paginatedCourses() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCourses.slice(start, start + this.itemsPerPage);
  }

  get filteredWishlistCourses() {
    return this.wishlistCourses.filter(course =>
      course.courseTitle.toLowerCase().includes(this.searchQueryWishlist.toLowerCase())
    );
  }

  get paginatedWishlistCourses() {
    const start = (this.currentPageWishlist - 1) * this.itemsPerPage;
    return this.filteredWishlistCourses.slice(start, start + this.itemsPerPage);
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
  }

  removeFromWishList(course: any) {
    this.wishlistService.removeFromList(course.id);
  }


  getPagesArrayWishlist() {
    return Array.from({ length: this.totalPagesWishlist }, (_, i) => i + 1);
  }
  get totalPagesWishlist() {
    return Math.ceil(this.filteredWishlistCourses.length / this.itemsPerPage);
  }
  goToPageWishlist(page: number) {
    this.currentPageWishlist = page;
  }

  goToPage(page: number) {
    this.currentPage = page;
  }
  getPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  get totalPages() {
    return Math.ceil(this.filteredCourses.length / this.itemsPerPage);
  }


}
