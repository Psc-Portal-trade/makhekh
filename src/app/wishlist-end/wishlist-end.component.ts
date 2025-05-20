import { SecondNavComponent } from "../navbar/second-nav/second-nav.component";
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service';
import { SimilarCoursesComponent } from "../similar-courses/similar-courses.component";
import { Router } from "@angular/router";
import { CourseInformationService } from "../services/course-information.service";
import { TranslocoPipe } from "@ngneat/transloco";

@Component({
  selector: 'app-wishlist-end',
  imports: [SecondNavComponent,  CommonModule, SimilarCoursesComponent,TranslocoPipe],
  templateUrl: './wishlist-end.component.html',
  styleUrl: './wishlist-end.component.css'
})
export class WishlistEndComponent implements OnInit{



  lectures: any[] = [];


  constructor(private cartService: CartService, private wishlistService: WishlistService,private courseInfoService: CourseInformationService, private router: Router) {}
  ngOnInit() {
      window.scrollTo(0, 0);

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




  }

  goToCourseDetails(course: any) {
    this.courseInfoService.setCourse(course); // تخزين بيانات الكورس عند الضغط عليه
    this.router.navigate(['course-Information']); // الانتقال إلى صفحة التفاصيل
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
