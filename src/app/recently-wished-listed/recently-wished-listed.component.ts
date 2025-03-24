import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../services/wishlist.service';
import { CartService } from '../services/cart.service';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-recently-wished-listed',
  imports: [CommonModule,TranslocoPipe],
  templateUrl: './recently-wished-listed.component.html',
  styleUrl: './recently-wished-listed.component.css'
})
export class RecentlyWishedListedComponent implements OnInit{
  lectures: any[] = [];


  // lectures = [
  //   { id: 1, title: 'How the internet works ', rate: 5,src:'assets/course1.png' ,watched :'(1.5k)' ,price :'4,000 LE' ,describtion:'Youaccet Training',stars:'<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>'},
  //   { id: 2, title: 'The Complete PHP Full ', rate: 2.5, src:'assets/course2.png',watched :'(450)',price :'3,500 LE' ,describtion:'Youaccet Training',stars:'<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star-half-stroke"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i>' },
  //   { id: 3, title: 'Pre Programing everything you need', rate: 3,src:'assets/course3.png',watched :'(950)',price :'1,000 LE' ,describtion:'Youaccet Training',stars:'<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i>'},
  //   { id: 4, title: 'The Complete PHP Full', rate: 4,src:'assets/course1.png' , watched :'(1k)',price :'2,000 LE',describtion:'Youaccet Training',stars:'<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i>' },
  //   { id: 5, title: 'Pre Programing everything you need', rate: 2 ,src:'assets/course2.png' , watched :'(800)',price :'2,500 LE' ,describtion:'Youaccet Training',stars:'<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i>'},
  //   { id: 6, title: 'How the internet works', rate: 5 ,src:'assets/course3.png', watched :'(1,2k)',price :'5,000 LE' ,describtion:'Youaccet Training',stars:'<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>'}
  // ];


  constructor(private cartService: CartService, private wishlistService: WishlistService) {}


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






  private scrollContainer: HTMLElement | null = null;
  private isDragging = false;
  private startX = 0;
  private scrollLeft = 0;

  ngAfterViewInit() {
    this.scrollContainer = document.querySelector('.scroll-container');
  }

  // حركة الماوس
  onMouseMove(event: MouseEvent) {
    if (this.scrollContainer) {
      const { clientX } = event;
      const { offsetWidth, scrollWidth } = this.scrollContainer;
      const maxScroll = scrollWidth - offsetWidth;      const percentage = clientX / offsetWidth;
      this.scrollContainer.scrollLeft = maxScroll * percentage;
    }
  }

  // عند بدء التاتش
  onTouchStart(event: TouchEvent) {
    if (!this.scrollContainer) return;
    this.isDragging = true;
    this.startX = event.touches[0].pageX - this.scrollContainer.offsetLeft;
    this.scrollLeft = this.scrollContainer.scrollLeft;
  }

  // أثناء السحب بالتاتش
  onTouchMove(event: TouchEvent) {
    if (!this.scrollContainer || !this.isDragging) return;
    event.preventDefault();
    const x = event.touches[0].pageX - this.scrollContainer.offsetLeft;
    const walk = (x - this.startX) * 2; // التحكم في سرعة السحب
    this.scrollContainer.scrollLeft = this.scrollLeft - walk;
  }

  // عند إنهاء السحب
  onTouchEnd() {
    this.isDragging = false;
  }





}
