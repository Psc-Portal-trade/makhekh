import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service';
import { SimilarCoursesComponent } from "../similar-courses/similar-courses.component";
import { Router } from '@angular/router';
import { CourseInformationService } from '../services/course-information.service';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-wishlist-start',
  imports: [NavbarComponent, CommonModule,TranslocoPipe],
  templateUrl: './wishlist-start.component.html',
  styleUrl: './wishlist-start.component.css'
})
export class WishlistStartComponent implements OnInit{

  wishlistCourses: any[] = [];
  lectures: any[] = [];
  searchQueryWishlist: string = '';


  constructor(private cartService: CartService, private wishlistService: WishlistService,private courseInfoService: CourseInformationService, private router: Router) {}
  ngOnInit() {
    this.wishlistService.listItems$.subscribe(items => {
      this.lectures = items;
    });
    this.lectures.forEach(course => {
      course.isInCart = this.cartService.isItemInCart(course.id);
    });

    this.cartService.cartItems$.subscribe(() => {
      this.lectures.forEach(course => {
        course.isInCart = this.cartService.isItemInCart(course.id);
      });
    });

    this.lectures.forEach(course => {
      course.isInWishList = this.wishlistService.isItemInList(course.id);
    });

    this.wishlistService.listItems$.subscribe(() => {
      this.lectures.forEach(course => {
        course.isInWishList = this.wishlistService.isItemInList(course.id);
      });
    });
    this.wishlistService.listItems$.subscribe(items => {
      this.wishlistCourses = items; // تحديث قائمة الـ WishlistCourses مباشرة
      this.updateCourseStates();
    });

    this.cartService.cartItems$.subscribe(() => {
      this.updateCourseStates();
    });
  }

  updateCourseStates() {
    this.wishlistCourses.forEach(course => {
      course.isInCart = this.cartService.isItemInCart(course.id);
      course.isInWishList = this.wishlistService.isItemInList(course.id);
    });

  }

  goToCourseDetails(course: any) {
    this.courseInfoService.setCourse(course); // تخزين بيانات الكورس عند الضغط عليه
    this.router.navigate(['course-Informations']); // الانتقال إلى صفحة التفاصيل
  }


  get filteredWishlistCourses() {
    return this.wishlistCourses.filter(course =>
      course.courseTitle.toLowerCase().includes(this.searchQueryWishlist.toLowerCase())
    );
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
    course.isInWishList = true;
  }

  removeFromWishList(course: any) {
    this.wishlistService.removeFromList(course.id);
    course.isInWishList = false;
  }





}
