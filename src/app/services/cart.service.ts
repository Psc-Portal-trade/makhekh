import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CourseService } from './course.service';
import { WishlistService } from './wishlist.service';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'https://api.makhekh.com/api/cart';

  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();
constructor(private courseService: CourseService,private WishlistService: WishlistService, private http: HttpClient) {}
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();
  private getHeaders(): HttpHeaders {
      const user = localStorage.getItem('user');
      const token = user ? JSON.parse(user).token : null;
     console.log('Token in getHeaders:', token); // 👈 هنا بنطبع التوكن
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

  
    }

   fetchCartFromAPI(): Observable<{ data: any[] }> {
  return this.http.get<{ data: any[] }>(this.baseUrl, {
    headers: this.getHeaders()
  }).pipe(
    tap((response) => {
      const items = response.data || [];
      this.cartItems.next(items);
      this.cartCount.next(items.length);
    })
  );
}


//load cart item from api 
 loadCartFromApi() {
  this.http.get<any>(`${this.baseUrl}`).subscribe(response => {
    console.log('Cart response from API:', response);

    const items = response.data || [];  // 👈 Extract the `data` array
    this.cartItems.next(items);
    this.cartCount.next(items.length);
  });
}
//add to cart from API 
 addToCartAPI(courseId: string): Observable<any> {
  console.log('📥 addToCartAPI CALLED with:', courseId);
    return this.http.post(`${this.baseUrl}/${courseId}`, null, {
      headers: this.getHeaders()
    }).pipe(
      tap(response => {
      console.log('✅ addToCartAPI response:', response); // 👈 هنا بنطبع البيانات
      this.fetchCartFromAPI().subscribe();
    })
    );
  }

    removeCourseFromCartAPI(courseId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${courseId}`, {
      headers: this.getHeaders()
    }).pipe(
      tap(() => this.fetchCartFromAPI().subscribe())
    );
  }

  //=========================== Local-only logic ===========================

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
    return this.cartItems.getValue().reduce((total, item) => total + item.price ,0);
  }

  getTotalPriceAndCurrency(): { total: number; currency: string | null } {
  const items = this.cartItems.getValue();

  if (!items.length) {
    return { total: 0, currency: null };
  }

  const total = items.reduce((sum, item) => sum + item.price, 0);
  const currency = items[0].currency || null; // 👈 ناخد العملة من أول عنصر فقط

  return { total, currency };
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
