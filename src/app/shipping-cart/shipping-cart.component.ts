import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { RecentlyWishedListedComponent } from '../recently-wished-listed/recently-wished-listed.component';
import { SimilarCoursesComponent } from '../similar-courses/similar-courses.component';
import { NavbarComponent } from "../navbar/navbar.component";
import { WishlistService } from '../services/wishlist.service';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-shipping-cart',
  imports: [CommonModule, RecentlyWishedListedComponent, SimilarCoursesComponent, NavbarComponent,RouterLink,TranslocoPipe],
  templateUrl: './shipping-cart.component.html',
  styleUrl: './shipping-cart.component.css'
})
export class ShippingCartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  lectures: any[] = [];

  constructor(private cartService: CartService, private wishlistService: WishlistService) {}

  ngOnInit() {
      window.scrollTo(0, 0);

    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.updateTotalPrice();




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
  removeItem(itemId: number) {
    this.cartService.removeFromCart(itemId);
    this.updateTotalPrice();

  }


  updateTotalPrice() {
    this.totalPrice = this.cartService.getTotalPrice();
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
