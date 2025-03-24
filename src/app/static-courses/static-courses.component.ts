import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../services/wishlist.service';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-static-courses',
  imports: [CommonModule],
  templateUrl: './static-courses.component.html',
  styleUrl: './static-courses.component.css'
})
export class StaticCoursesComponent implements OnInit {


  course = {
    id: 1,
    title: 'Learn web development course with programming techniques',
    rate: 4.7,
    ratingsCount: 9,
    watched: 107,
    instructor: 'Ahmed Abbas',
    instructorImage: "assets/image.jpg",
    lastUpdate: '11/2025',
    language: 'English',
    level: 'Advanced',
    price: 3000,
    seatsLeft: 10,
    src: 'assets/course-2.png',
    isInCart: false,
    isInWishlist: false,
    courseType:"static-courses"
  };
  instructor = {
    Rating:4.7,
    Courses:2,
    Students:107,
    Reviews:9
  };


  courseTotal = {
    instructorName: "Ahmed Abbas",
    courseName: "Web Development Course",
    courseSections: [
      {
        id: 1,
        title: 'Section 1: Introduction to Web Development',
        expanded: false,
        lectures: [
          { title: 'Lecture 1: What is Web Development?', duration: '5 min', completed: false },
          { title: 'Lecture 2: Frontend vs Backend', duration: '7 min', completed: false },
          { title: 'Lecture 3: Overview of Technologies', duration: '6 min', completed: false }
        ]
      },
      {
        id: 2,
        title: 'Section 2: HTML & CSS Basics',
        expanded: false,
        lectures: [
          { title: 'Lecture 1: HTML Structure', duration: '10 min', completed: false },
          { title: 'Lecture 2: CSS Styling Basics', duration: '12 min', completed: false },
          { title: 'Lecture 3: Responsive Design', duration: '8 min', completed: false },
          { title: 'Lecture 4: CSS Flexbox & Grid', duration: '10 min', completed: false }
        ]
      },
      {
        id: 3,
        title: 'Section 3: JavaScript & TypeScript',
        expanded: false,
        lectures: [
          { title: 'Lecture 1: JavaScript Basics', duration: '15 min', completed: false },
          { title: 'Lecture 2: ES6 Features', duration: '12 min', completed: false },
          { title: 'Lecture 3: Introduction to TypeScript', duration: '10 min', completed: false },
          { title: 'Lecture 4: Async JavaScript (Promises & Async/Await)', duration: '14 min', completed: false }
        ]
      },
      {
        id: 4,
        title: 'Section 4: Frontend Frameworks (Angular)',
        expanded: false,
        lectures: [
          { title: 'Lecture 1: Introduction to Angular', duration: '10 min', completed: false },
          { title: 'Lecture 2: Components & Modules', duration: '12 min', completed: false },
          { title: 'Lecture 3: Services & Dependency Injection', duration: '14 min', completed: false },
          { title: 'Lecture 4: Routing & Navigation', duration: '10 min', completed: false },
          { title: 'Lecture 5: Forms & Validation', duration: '12 min', completed: false }
        ]
      },
      {
        id: 5,
        title: 'Section 5: Backend Development (Node.js & Express)',
        expanded: false,
        lectures: [
          { title: 'Lecture 1: Introduction to Node.js', duration: '10 min', completed: false },
          { title: 'Lecture 2: Setting up Express.js', duration: '12 min', completed: false },
          { title: 'Lecture 3: RESTful APIs & CRUD Operations', duration: '15 min', completed: false },
          { title: 'Lecture 4: Database Integration with MongoDB', duration: '14 min', completed: false },
          { title: 'Lecture 5: Authentication & Security', duration: '16 min', completed: false }
        ]
      },
      {
        id: 6,
        title: 'Section 6: Deployment & Optimization',
        expanded: false,
        lectures: [
          { title: 'Lecture 1: Hosting & Deployment Options', duration: '12 min', completed: false },
          { title: 'Lecture 2: Version Control with Git', duration: '10 min', completed: false },
          { title: 'Lecture 3: Performance Optimization', duration: '8 min', completed: false },
          { title: 'Lecture 4: SEO Best Practices', duration: '9 min', completed: false }
        ]
      }
    ]
  };


  // courseTotal = {
  //   sections: [
  //     { name: 'Section 1: Name', lectures: ['Lecture 1', 'Lecture 2', 'Lecture 3', 'Lecture 4'] },
  //     { name: 'Section 2: Name', lectures: ['Lecture 1', 'Lecture 2', 'Lecture 3', 'Lecture 4'] },
  //     { name: 'Section 3: Name', lectures: ['Lecture 1', 'Lecture 2', 'Lecture 3', 'Lecture 4'] },
  //     { name: 'Section 4: Name', lectures: ['Lecture 1', 'Lecture 2', 'Lecture 3', 'Lecture 4'] },
  //     { name: 'Section 5: Name', lectures: ['Lecture 1', 'Lecture 2', 'Lecture 3', 'Lecture 4'] }
  //   ]
  // };


  constructor(private cartService: CartService, private wishlistService: WishlistService) {}

  ngOnInit() {
    this.course.isInCart = this.cartService.isItemInCart(this.course.id);
    this.course.isInWishlist = this.wishlistService.isItemInList(this.course.id);

    this.cartService.cartItems$.subscribe(cartItems => {
      this.course.isInCart = this.cartService.isItemInCart(this.course.id);
    });

    this.wishlistService.listItems$.subscribe(listItems => {
      this.course.isInWishlist = this.wishlistService.isItemInList(this.course.id);
    });
    this.course.isInWishlist = this.wishlistService.isItemInList(this.course.id);

    this.wishlistService.listItems$.subscribe(() => {
      this.course.isInWishlist = this.wishlistService.isItemInList(this.course.id);
    });
  }


  addToCart() {
    this.cartService.addToCart(this.course);
    this.course.isInCart = true;
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.course.id);
    this.course.isInCart = false;
  }

  addToWishlist() {
    this.wishlistService.addToList(this.course);
    this.course.isInWishlist = true;
  }

  removeFromWishlist() {
    this.wishlistService.removeFromList(this.course.id);
    this.course.isInWishlist = false;
  }
  totalLectures(): number {
    return this.courseTotal.courseSections.reduce((sum, section) => sum + section.lectures.length, 0);
  }
  isArabic = false; // يمكن تغييره بناءً على اللغة المطلوبة


}
