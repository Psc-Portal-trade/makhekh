import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

interface Course {
  id: number;
  title: string;
  date: string;
  time: string;
  lecturer: string;
  status: string;
  joinLink: string;
  month:string;
}


@Component({
  selector: 'app-online-live-courses',
  imports: [CommonModule ],
  templateUrl: './online-live-courses.component.html',
  styleUrl: './online-live-courses.component.css'
})
export class OnlineLiveCoursesComponent implements OnInit {
  selectedMonth = '';

  courses: Course[] = [
    { id: 1, title: 'Lecture 1', date: 'Sunday - Tuesday', time: '10:00 AM', lecturer: 'John Doe', status: 'Available', joinLink: '#', month: 'January' },
    { id: 2, title: 'Lecture 2', date: 'Sunday - Tuesday', time: '12:00 PM', lecturer: 'Jane Smith', status: 'Reserved', joinLink: '#', month: 'January' },
    { id: 3, title: 'Lecture 3', date: 'Sunday - Tuesday', time: '2:00 PM', lecturer: 'Emily Johnson', status: 'Canceled', joinLink: '#', month: 'January' },
    { id: 4, title: 'Lecture 4', date: 'Sunday - Tuesday', time: '4:00 PM', lecturer: 'Michael Brown', status: 'Reserved', joinLink: '#', month: 'January' },
    { id: 5, title: 'Lecture 5', date: 'Sunday - Tuesday', time: '10:00 AM', lecturer: 'John Doe', status: 'Available', joinLink: '#', month: 'February' },
    { id: 6, title: 'Lecture 6', date: 'Sunday - Tuesday', time: '12:00 PM', lecturer: 'Jane Smith', status: 'Reserved', joinLink: '#', month: 'February' },
    { id: 7, title: 'Lecture 7', date: 'Sunday - Tuesday', time: '2:00 PM', lecturer: 'Emily Johnson', status: 'Canceled', joinLink: '#', month: 'February' },
    { id: 8, title: 'Lecture 8', date: 'Sunday - Tuesday', time: '4:00 PM', lecturer: 'Michael Brown', status: 'Reserved', joinLink: '#', month: 'February' },
    { id: 9, title: 'Lecture 9', date: 'Sunday - Tuesday', time: '10:00 AM', lecturer: 'John Doe', status: 'Available', joinLink: '#', month: 'March' },
    { id: 10, title: 'Lecture 10', date: 'Sunday - Tuesday', time: '12:00 PM', lecturer: 'Jane Smith', status: 'Reserved', joinLink: '#', month: 'March' },
    { id: 11, title: 'Lecture 11', date: 'Sunday - Tuesday', time: '2:00 PM', lecturer: 'Emily Johnson', status: 'Canceled', joinLink: '#', month: 'March' },
    { id: 12, title: 'Lecture 12', date: 'Sunday - Tuesday', time: '4:00 PM', lecturer: 'Michael Brown', status: 'Reserved', joinLink: '#', month: 'March' },
  ];

  get uniqueMonths(): string[] {
    return [...new Set(this.courses.map(course => course.month))];
  }

  onMonthChange(event: Event) {
    this.selectedMonth = (event.target as HTMLSelectElement).value;
  }

  get filteredCourses() {
    return this.selectedMonth ? this.courses.filter(course => course.month === this.selectedMonth) : this.courses;
  }
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
    courseType:"online-live"
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
