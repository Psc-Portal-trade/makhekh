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
  userRole: string = '';
  total: number = 0;
currency: string = '';
  
 


  constructor(private cartService: CartService, private courseService: CourseService,private wishlistService: WishlistService) {}

  ngOnInit() {
      window.scrollTo(0, 0);
       const user = JSON.parse(localStorage.getItem('user') || '{}');
       console.log('User in cart component:', user); // 👈 هنا بنطبع بيانات المستخدم
       const token = user.token;
        console.log('Token in cart component:', token); // 👈 هنا بنطبع التوكن
    
    this.userRole = (user?.userRole || '').trim().toLowerCase();
    console.log('Role in nav:', this.userRole);

    this.cartService.cartItems$.subscribe(items => {
    this.cartItems = items;

    const result = this.cartService.getTotalPriceAndCurrency();
    this.total = result.total;
    this.currency = result.currency ?? '';
  });
     this.cartService.loadCartFromApi();
    // Subscribe to cart items
     this.cartService.fetchCartFromAPI().subscribe({
    next: (response) => {
      console.log('🛒 Fetched cart from API:', response);
    },
    error: (err) => {
      console.error('❌ Error fetching cart:', err);
    }
  });

  // ✅ اشتراك في البيانات المحدثة بعد ما توصل
  this.cartService.cartItems$.subscribe(items => {
    console.log('📦 Cart items in component:', items);
    this.cartItems = items;
    this.totalPrice = this.cartService.getTotalPrice();
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

  removeItem(itemId: any) {
  this.cartService.removeCourseFromCartAPI(itemId).subscribe({
    next: () => {
      console.log('🗑️ Course removed from cart');
      this.updateTotalPrice();
    },
    error: (err) => {
      console.error('❌ Error removing item from cart:', err);
    }
  });
}


  updateTotalPrice() {
    this.totalPrice = this.cartService.getTotalPrice();
  }
  

  checkout() {

this.cartService.checkout();
    // if (this.userRole === 'teacher') {
    //   // فتح الـ modal يدويًا
    //   const modal = document.getElementById('Modal');
    //   if (modal) {
    //     const bootstrapModal = new (window as any).bootstrap.Modal(modal);
    //     bootstrapModal.show();
    //   }
    //   return; // وقف تنفيذ الشراء
    // }else{
    //   this.cartService.checkout(); // استدعاء checkout() من CartService
    // }
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
    console.log('🛒 Add to wishlist clicked:', course); // ✅ تأكد إن الزر فعلاً اشتغل

  this.wishlistService.addCourseToWishlistAPI(course.id).subscribe({
    next: (response) => {
      console.log('✅ Course added to wishlist:', response);
      course.isInCart = true;
    },
    error: (err) => {
      console.error('❌ Error adding wishlist:', err);
    }
  });
   
    course.isInWishList = true;
  }

  removeFromWishList(course: any) {
    this.wishlistService.removeFromList(course.id);
    course.isInWishList = false;
  }









}

