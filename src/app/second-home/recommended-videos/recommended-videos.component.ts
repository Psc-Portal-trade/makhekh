import { Component , HostListener,AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { Router } from '@angular/router';
import { CourseInformationService } from '../../services/course-information.service';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-recommended-videos',
  imports: [CommonModule,TranslocoPipe],
  templateUrl: './recommended-videos.component.html',
  styleUrl: './recommended-videos.component.css'
})
export class RecommendedVideosComponent implements OnInit{


  lectures = [
    {
      "courseType": "Live Streamed Educational Courses",
      "category": "Finance & Accounting",
      "learningObjectives": "z",
      "requirements": "z",
      "targetAudience": "z",
      "courseTitle": "Pre Programing everything you need",
      "schedules": [
          {
              "id":"1",
              "courseTitle": "z",
              "date": "2025-03-11",
              "time": "13:38",
              "lecturerName": "z",
              "registered": 10,
              "status": "zz",
              "joinLink": "zzz",
              "limit": 8
          },
          {
            "id":"2",
              "courseTitle": "xxcx",
              "date": "2025-03-21",
              "time": "15:36",
              "lecturerName": "h",
              "registered": 2,
              "status": "hh",
              "joinLink": "jbljk",
              "limit": 9
          }
      ],
      "landingPage": {
          "title": "sad",
          "description": "ssdd",
          "language": "Arabic",
          "level": "Intermediate",
          "category": "Design",
          "duration": "Month",
          "lecturer": "a",
          "lecturerDescription": "a",
          "photo": {},
          "video": {}
      },
      "pricing": {
          "currency": "USD",
          price: 4000,
          "priceTier": "Free",
          "promoLink": "",
          "selectedVoucher": "best_current_price"
      },
      "coupons": [
          {
              "code": "a",
              "status": "Free",
              "users": "Limited",
              "startDate": "",
              "endDate": ""
          }
      ],
      isInWishlist: false,
      isInCart: false,
      id: 1,
      rate: 4.7,
      ratingsCount: 9,
      instructor: 'Ahmed Abbas',
      instructorImage: "assets/image.jpg",
      lastUpdate: '11/2025',
      language: 'English',
      seatsLeft: 10,
      watched: 107,
      src: 'assets/course-1.png',
    },
    {
      "courseType": "Live Streamed Educational Courses",
      "category": "Finance & Accounting",
      "learningObjectives": "z",
      "requirements": "z",
      "targetAudience": "z",
      "courseTitle": "Pre Programing everything you need",
      "schedules": [
          {
              "id":"1",
              "courseTitle": "z",
              "date": "2025-03-11",
              "time": "13:38",
              "lecturerName": "z",
              "registered": 10,
              "status": "zz",
              "joinLink": "zzz",
              "limit": 8
          },
          {
            "id":"2",
              "courseTitle": "xxcx",
              "date": "2025-03-21",
              "time": "15:36",
              "lecturerName": "h",
              "registered": 2,
              "status": "hh",
              "joinLink": "jbljk",
              "limit": 9
          }
      ],
      "landingPage": {
          "title": "sad",
          "description": "ssdd",
          "language": "Arabic",
          "level": "Intermediate",
          "category": "Design",
          "duration": "Month",
          "lecturer": "a",
          "lecturerDescription": "a",
          "photo": {},
          "video": {}
      },
      "pricing": {
          "currency": "USD",
          price: 4000,
          "priceTier": "Free",
          "promoLink": "",
          "selectedVoucher": "best_current_price"
      },
      "coupons": [
          {
              "code": "a",
              "status": "Free",
              "users": "Limited",
              "startDate": "",
              "endDate": ""
          }
      ],
      isInWishlist: false,
      isInCart: false,
      id: 2,
      rate: 4.7,
      ratingsCount: 9,
      instructor: 'Ahmed Abbas',
      instructorImage: "assets/image.jpg",
      lastUpdate: '11/2025',
      language: 'English',
      seatsLeft: 10,
      watched: 107,
      src: 'assets/course-1.png',
    },
    {
      "courseType": "Live Streamed Educational Courses",
      "category": "Finance & Accounting",
      "learningObjectives": "z",
      "requirements": "z",
      "targetAudience": "z",
      "courseTitle": "The Complete PHP Full",
      "schedules": [
          {

              "courseTitle": "z",
              "date": "2025-03-11",
              "time": "13:38",
              "lecturerName": "z",
              "registered": 10,
              "status": "zz",
              "joinLink": "zzz",
              "limit": 8
          },
          {

              "courseTitle": "xxcx",
              "date": "2025-03-21",
              "time": "15:36",
              "lecturerName": "h",
              "registered": 2,
              "status": "hh",
              "joinLink": "jbljk",
              "limit": 9
          }
      ],
      "landingPage": {
          "title": "sad",
          "description": "ssdd",
          "language": "Arabic",
          "level": "Intermediate",
          "category": "Design",
          "duration": "Month",
          "lecturer": "a",
          "lecturerDescription": "a",
          "photo": {},
          "video": {}
      },
      "pricing": {
          "currency": "USD",
          price: 4000,
          "priceTier": "Free",
          "promoLink": "",
          "selectedVoucher": "best_current_price"
      },
      "coupons": [
          {
              "code": "a",
              "status": "Free",
              "users": "Limited",
              "startDate": "",
              "endDate": ""
          }
      ],
      isInWishlist: false,
      isInCart: false,
      id: 3,
      rate: 4.7,
      ratingsCount: 9,
      instructor: 'Ahmed Abbas',
      instructorImage: "assets/image.jpg",
      lastUpdate: '11/2025',
      language: 'English',
      seatsLeft: 10,
      watched: 107,
      src: 'assets/course-3.png',
    },
    {
      "courseType": "Live Streamed Educational Courses",
      "category": "Finance & Accounting",
      "learningObjectives": "z",
      "requirements": "z",
      "targetAudience": "z",
      "courseTitle": "The Complete PHP Full",
      "schedules": [
          {
              "id":"1",
              "courseTitle": "z",
              "date": "2025-03-11",
              "time": "13:38",
              "lecturerName": "z",
              "registered": 10,
              "status": "zz",
              "joinLink": "zzz",
              "limit": 8
          },
          {
            "id":"2",
              "courseTitle": "xxcx",
              "date": "2025-03-21",
              "time": "15:36",
              "lecturerName": "h",
              "registered": 2,
              "status": "hh",
              "joinLink": "jbljk",
              "limit": 9
          }
      ],
      "landingPage": {
          "title": "sad",
          "description": "ssdd",
          "language": "Arabic",
          "level": "Intermediate",
          "category": "Design",
          "duration": "Month",
          "lecturer": "a",
          "lecturerDescription": "a",
          "photo": {},
          "video": {}
      },
      "pricing": {
          "currency": "USD",
          price: 4000,
          "priceTier": "Free",
          "promoLink": "",
          "selectedVoucher": "best_current_price"
      },
      "coupons": [
          {
              "code": "a",
              "status": "Free",
              "users": "Limited",
              "startDate": "",
              "endDate": ""
          }
      ],
      isInWishlist: false,
      isInCart: false,
      id: 4,
      rate: 4.7,
      ratingsCount: 9,
      instructor: 'Ahmed Abbas',
      instructorImage: "assets/image.jpg",
      lastUpdate: '11/2025',
      language: 'English',
      seatsLeft: 10,
      watched: 107,
      src: 'assets/course-2.png',
    },
    {
      "courseType": "Recorded Educational Courses",
      "category": "Development",
      "learningObjectives": "qqqqqqqqqq",
      "requirements": "qqqqqqqqqqqqqqqqqq",
      "targetAudience": "qqqqqqqqqqqqqqqqqqqqq",
      "courseTitle": "database",
      "curriculum": [
          {
              "name": "w",
              "lectures": [
                  {
                      "title": "w",
                      "video": {},
                      "videoName": "[EgyBest].Aashiqui.2.2013.720p.x264.mp4",
                      "description": "w",
                      "activeTab": "video",
                      "duration":"10 min"
                  },
                  {
                      "title": "www",
                      "video": {},
                      "videoName": "[EgyBest].Ashtata.Ashtwt.2004.BluRay.720p.x264.mp4",
                      "description": "www",
                      "activeTab": "video",
                      "duration":"14 min"
                  },
                  {
                      "title": "www",
                      "video": {},
                      "videoName": "[EgyBest].Al.Ghasala.2020.WEB-DL.720p.x264.mp4",
                      "description": "qq",
                      "activeTab": "video",
                      "duration":"17 min"
                  }
              ]
          },
          {
              "name": "www",
              "lectures": [
                  {
                      "title": "www",
                      "video": {},
                      "videoName": "[EgyBest].Ashtata.Ashtwt.2004.BluRay.720p.x264.mp4",
                      "description": "ww",
                      "activeTab": "video",
                      "duration":"14 min"
                  },
                  {
                      "title": "www",
                      "video": {},
                      "videoName": "[EgyBest].Bang.Bang.2014.BluRay.480p.x264.mp4",
                      "description": "wqw",
                      "activeTab": "description",
                      "duration":"10 min"
                  },
                  {
                      "title": "www",
                      "video": {},
                      "videoName": "[EgyBest].Bang.Bang.2014.BluRay.480p.x264.mp4",
                      "description": "qweq",
                      "activeTab": "description",
                      "duration":"14 min"
                  }
              ]
          }
      ],
      "landingPage": {
          "title": "qww",
          "description": "qq",
          "language": "English",
          "level": "Advanced",
          "category": "Development",
          "duration": "Week",
          "video": {},
          "photo": {},
          "lecturer": "ww",
          "lecturerDescription": "ww"
      },
      "pricing": {
          "currency": "USD",
          price: 5000,
          "priceTier": "Free",
          "promoLink": "",
          "selectedVoucher": "best_current_price",
          "voucherOptions": [
              {
                  "value": "best_current_price",
                  "label": "Best current price",
                  "features": [
                      "Fixed price",
                      "Unlimited quantity",
                      "Limited validity period"
                  ]
              },
              {
                  "value": "custom_price",
                  "label": "Custom price",
                  "features": [
                      "Select a price between two numbers",
                      "Unlimited quantity",
                      "Limited validity period"
                  ]
              }
          ]
      },
      "coupons": [
          {
              "code": "",
              "status": "Free",
              "users": "Limited",
              "startDate": "",
              "endDate": ""
          }
      ],
      isInWishlist: false,
      isInCart: false,
      id: 5,
      rate: 4.7,
      ratingsCount: 9,
      instructor: 'Ahmed Abbas',
      instructorImage: "assets/image.jpg",
      lastUpdate: '11/2025',
      language: 'English',
      seatsLeft: 10,
      watched: 107,
      src: 'assets/course-2.png',
  },
  {
    "courseType": "Recorded Educational Courses",
    "category": "Development",
    "learningObjectives": "qqqqqqqqqq",
    "requirements": "qqqqqqqqqqqqqqqqqq",
    "targetAudience": "qqqqqqqqqqqqqqqqqqqqq",
    "courseTitle": "database",
    "curriculum": [
        {
            "name": "w",
            "lectures": [
                {
                    "title": "w",
                    "video": {},
                    "videoName": "[EgyBest].Aashiqui.2.2013.720p.x264.mp4",
                    "description": "w",
                    "activeTab": "video",
                    "duration":"10 min"
                },
                {
                    "title": "www",
                    "video": {},
                    "videoName": "[EgyBest].Ashtata.Ashtwt.2004.BluRay.720p.x264.mp4",
                    "description": "www",
                    "activeTab": "video",
                    "duration":"14 min"
                },
                {
                    "title": "www",
                    "video": {},
                    "videoName": "[EgyBest].Al.Ghasala.2020.WEB-DL.720p.x264.mp4",
                    "description": "qq",
                    "activeTab": "video",
                    "duration":"17 min"
                }
            ]
        },
        {
            "name": "www",
            "lectures": [
                {
                    "title": "www",
                    "video": {},
                    "videoName": "[EgyBest].Ashtata.Ashtwt.2004.BluRay.720p.x264.mp4",
                    "description": "ww",
                    "activeTab": "video",
                    "duration":"14 min"
                },
                {
                    "title": "www",
                    "video": {},
                    "videoName": "[EgyBest].Bang.Bang.2014.BluRay.480p.x264.mp4",
                    "description": "wqw",
                    "activeTab": "description",
                    "duration":"10 min"
                },
                {
                    "title": "www",
                    "video": {},
                    "videoName": "[EgyBest].Bang.Bang.2014.BluRay.480p.x264.mp4",
                    "description": "qweq",
                    "activeTab": "description",
                    "duration":"14 min"
                }
            ]
        }
    ],
    "landingPage": {
        "title": "qww",
        "description": "qq",
        "language": "English",
        "level": "Advanced",
        "category": "Development",
        "duration": "Week",
        "video": {},
        "photo": {},
        "lecturer": "ww",
        "lecturerDescription": "ww"
    },
    "pricing": {
        "currency": "USD",
        price: 5000,
        "priceTier": "Free",
        "promoLink": "",
        "selectedVoucher": "best_current_price",
        "voucherOptions": [
            {
                "value": "best_current_price",
                "label": "Best current price",
                "features": [
                    "Fixed price",
                    "Unlimited quantity",
                    "Limited validity period"
                ]
            },
            {
                "value": "custom_price",
                "label": "Custom price",
                "features": [
                    "Select a price between two numbers",
                    "Unlimited quantity",
                    "Limited validity period"
                ]
            }
        ]
    },
    "coupons": [
        {
            "code": "",
            "status": "Free",
            "users": "Limited",
            "startDate": "",
            "endDate": ""
        }
    ],
    isInWishlist: false,
    isInCart: false,
    id: 6,
    rate: 4.7,
    ratingsCount: 9,
    instructor: 'Ahmed Abbas',
    instructorImage: "assets/image.jpg",
    lastUpdate: '11/2025',
    language: 'English',
    seatsLeft: 10,
    watched: 107,
    src: 'assets/course-2.png',
},
{
  "courseType": "Recorded Educational Courses",
  "category": "Development",
  "learningObjectives": "qqqqqqqqqq",
  "requirements": "qqqqqqqqqqqqqqqqqq",
  "targetAudience": "qqqqqqqqqqqqqqqqqqqqq",
  "courseTitle": "database",
  "curriculum": [
      {
          "name": "w",
          "lectures": [
              {
                  "title": "w",
                  "video": {},
                  "videoName": "[EgyBest].Aashiqui.2.2013.720p.x264.mp4",
                  "description": "w",
                  "activeTab": "video",
                  "duration":"10 min"
              },
              {
                  "title": "www",
                  "video": {},
                  "videoName": "[EgyBest].Ashtata.Ashtwt.2004.BluRay.720p.x264.mp4",
                  "description": "www",
                  "activeTab": "video",
                  "duration":"14 min"
              },
              {
                  "title": "www",
                  "video": {},
                  "videoName": "[EgyBest].Al.Ghasala.2020.WEB-DL.720p.x264.mp4",
                  "description": "qq",
                  "activeTab": "video",
                  "duration":"17 min"
              }
          ]
      },
      {
          "name": "www",
          "lectures": [
              {
                  "title": "www",
                  "video": {},
                  "videoName": "[EgyBest].Ashtata.Ashtwt.2004.BluRay.720p.x264.mp4",
                  "description": "ww",
                  "activeTab": "video",
                  "duration":"14 min"
              },
              {
                  "title": "www",
                  "video": {},
                  "videoName": "[EgyBest].Bang.Bang.2014.BluRay.480p.x264.mp4",
                  "description": "wqw",
                  "activeTab": "description",
                  "duration":"10 min"
              },
              {
                  "title": "www",
                  "video": {},
                  "videoName": "[EgyBest].Bang.Bang.2014.BluRay.480p.x264.mp4",
                  "description": "qweq",
                  "activeTab": "description",
                  "duration":"14 min"
              }
          ]
      }
  ],
  "landingPage": {
      "title": "qww",
      "description": "qq",
      "language": "English",
      "level": "Advanced",
      "category": "Development",
      "duration": "Week",
      "video": {},
      "photo": {},
      "lecturer": "ww",
      "lecturerDescription": "ww"
  },
  "pricing": {
      "currency": "USD",
      price: 5000,
      "priceTier": "Free",
      "promoLink": "",
      "selectedVoucher": "best_current_price",
      "voucherOptions": [
          {
              "value": "best_current_price",
              "label": "Best current price",
              "features": [
                  "Fixed price",
                  "Unlimited quantity",
                  "Limited validity period"
              ]
          },
          {
              "value": "custom_price",
              "label": "Custom price",
              "features": [
                  "Select a price between two numbers",
                  "Unlimited quantity",
                  "Limited validity period"
              ]
          }
      ]
  },
  "coupons": [
      {
          "code": "",
          "status": "Free",
          "users": "Limited",
          "startDate": "",
          "endDate": ""
      }
  ],
  isInWishlist: false,
  isInCart: false,
  id:7,
  rate: 4.7,
  ratingsCount: 9,
  instructor: 'Ahmed Abbas',
  instructorImage: "assets/image.jpg",
  lastUpdate: '11/2025',
  language: 'English',
  seatsLeft: 10,
  watched: 107,
  src: 'assets/course-1.png',
}


  ];

  constructor(private cartService: CartService, private wishlistService: WishlistService,private courseInfoService: CourseInformationService, private router: Router) {}
  ngOnInit() {
    this.lectures.forEach(course => {
      course.isInCart = this.cartService.isItemInCart(course.id);
    });

    this.cartService.cartItems$.subscribe(() => {
      this.lectures.forEach(course => {
        course.isInCart = this.cartService.isItemInCart(course.id);
      });
    });


    this.lectures.forEach(course => {
      course.isInWishlist = this.wishlistService.isItemInList(course.id);
    });

    this.wishlistService.listItems$.subscribe(() => {
      this.lectures.forEach(course => {
        course.isInWishlist = this.wishlistService.isItemInList(course.id);
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
