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


userRole: string = '';
  lectures: any[] = [];
   wishlistItems: any[] = [];


  constructor(private cartService: CartService, private wishlistService: WishlistService,private courseInfoService: CourseInformationService, private router: Router) {}
  ngOnInit() {
      window.scrollTo(0, 0);
       const user = JSON.parse(localStorage.getItem('user') || '{}');
       //console.log('User in cart component:', user); // 👈 هنا بنطبع بيانات المستخدم
       const token = user.token;
        console.log('Token in wishlist component:', token); // 👈 هنا بنطبع التوكن
    
    this.userRole = (user?.userRole || '').trim().toLowerCase();
    console.log('Role in nav:', this.userRole);
     this.wishlistService.loadWishlistFromApi();
    // Subscribe to cart items
     this.wishlistService.fetchWishlistFromAPI().subscribe({
    next: (response) => {
      console.log('🛒 Fetched wishlist from API:', response);
    },
    error: (err) => {
      console.error('❌ Error fetching cart:', err);
    }
  });

  this.wishlistService.listItems$.subscribe(items => {
    console.log('📦 Cart items in component:', items);
    this.wishlistItems = items;
    // this.totalPrice = this.cartService.getTotalPrice();
  });
    this.wishlistService.listItems$.subscribe(items => {
      this.wishlistItems = items;
    });



    this.wishlistItems.forEach(course => {
      course.isInCart = this.wishlistService.isCourseInCart(course.id);
    });

    this.cartService.cartItems$.subscribe(() => {
      this.wishlistItems.forEach(course => {
        course.isInCart = this.cartService.isItemInCart(course.id);
      });
    });


    this.lectures.forEach(course => {
      course.isInWishList = this.wishlistService.isItemInList(course.id);
    });

    this.wishlistService.listItems$.subscribe(() => {
      this.wishlistItems.forEach(course => {
        course.isInWishList = this.wishlistService.isItemInList(course.id);
      });
    });

    

  }

  goToCourseDetails(course: any) {
    this.courseInfoService.setCourse(course); // تخزين بيانات الكورس عند الضغط عليه
    this.router.navigate(['course-Information']); // الانتقال إلى صفحة التفاصيل
  }

   addToCart(course: any) {
  console.log('🛒 Add to cart clicked:', course); // ✅ تأكد إن الزر فعلاً اشتغل

  this.cartService.addToCartAPI(course.id).subscribe({
    next: (response) => {
      console.log('✅ Course added to cart:', response);
      course.isInCart = true;
    },
    error: (err) => {
      console.error('❌ Error adding course:', err);
    }
  });
}

    removeFromCart(course: any) {
    this.cartService.removeCourseFromCartAPI(course.id).subscribe({
    next: (response) => {
      console.log('✅ Course remove from cart:', response);
      course.isInCart = true;
    },
    error: (err) => {
      console.error('❌ Error removing course:', err);
    }
  });
  }

  addToWishList(course: any) {
    this.wishlistService.addToList(course);
    course.isInWishList = true;
  }

  removeFromWishList(course: any) {
   this.wishlistService.removeCourseFromWishlistAPI(course.id).subscribe({
    next: (response) => {
      console.log('✅ Course remove from wishlist Sucessfully:', response);
      course.isInCart = true;
    },
    error: (err) => {
      console.error('❌ Error removing course:', err);
    }
  });
  }












}
