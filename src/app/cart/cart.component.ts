import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { RecentlyWishedListedComponent } from '../recently-wished-listed/recently-wished-listed.component';
import { SimilarCoursesComponent } from '../similar-courses/similar-courses.component';
import { NavbarComponent } from "../navbar/navbar.component";
import { SecondNavComponent } from "../navbar/second-nav/second-nav.component";
import { CourseService } from '../services/course.service';
import { WishlistService } from '../services/wishlist.service';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RecentlyWishedListedComponent, SimilarCoursesComponent,SecondNavComponent,RouterLink,TranslocoPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  lectures: any[] = [];

  constructor(private cartService: CartService, private courseService: CourseService,private wishlistService: WishlistService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.updateTotalPrice();
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

  removeItem(itemId: number) {
    this.cartService.removeFromCart(itemId);
    this.updateTotalPrice();
  }

  updateTotalPrice() {
    this.totalPrice = this.cartService.getTotalPrice();
  }

  checkout() {
    this.cartService.checkout(); // استدعاء checkout() من CartService
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

