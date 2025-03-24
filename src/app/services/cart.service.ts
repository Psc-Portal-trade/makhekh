import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CourseService } from './course.service';
import { WishlistService } from './wishlist.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  constructor(private courseService: CourseService,private WishlistService: WishlistService) {}

  addToCart(item: any) {
    const currentItems = this.cartItems.getValue();
    if (!currentItems.some(cartItem => cartItem.id === item.id)) {
      const updatedItems = [...currentItems, item];
      this.cartItems.next(updatedItems);
      this.cartCount.next(updatedItems.length);
    }
  }

  removeFromCart(itemId: number) {
    const updatedItems = this.cartItems.getValue().filter(cartItem => cartItem.id !== itemId);
    this.cartItems.next(updatedItems);
    this.cartCount.next(updatedItems.length);
  }

  isItemInCart(itemId: number): boolean {
    return this.cartItems.getValue().some(cartItem => cartItem.id === itemId);
  }

  getTotalPrice(): number {
    return this.cartItems.getValue().reduce((total, item) => total + item.pricing.price, 0);
  }

  checkout() {
    const purchasedCourses = this.cartItems.getValue();
    if (purchasedCourses.length > 0) {
      this.courseService.addPurchasedCourses(purchasedCourses); // إضافة إلى المشتريات

      // إزالة الكورسات التي تم شراؤها من الوش ليست
      purchasedCourses.forEach(course => {
        if (this.WishlistService.isItemInList(course.id)) {
          this.WishlistService.removeFromList(course.id);
        }
      });

      this.cartItems.next([]); // تفريغ السلة
      this.cartCount.next(0);
    }
  }
}
