import { Component, OnInit } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../services/wishlist.service';
import { Router, RouterLink } from '@angular/router';
import { CourseInformationService } from '../../services/course-information.service';

@Component({
  selector: 'app-secondary-section-home',
  imports: [TranslocoPipe,CommonModule,RouterLink],
  templateUrl: './secondary-section-home.component.html',
  styleUrl: './secondary-section-home.component.css'
})
export class SecondarySectionHomeComponent implements OnInit{


  // lecturesJS = [
  //   { id: 1, title: 'How the internet works', rate: 5, src: 'assets/course1.png', watched: '(1.5k)', price: 4000, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>' ,isInCart: false,isInWishList: false},
  //   { id: 2, title: 'The Complete PHP Full', rate: 2.5, src: 'assets/course2.png', watched: '(450)', price: 3500, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>' ,isInCart: false,isInWishList: false},
  //   { id: 3, title: 'Pre Programming everything you need', rate: 3, src: 'assets/course3.png', watched: '(950)', price: 1000, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>',isInCart: false, isInWishList: false},
  //   { id: 4, title: 'The Complete PHP Full', rate: 4, src: 'assets/course1.png', watched: '(1k)', price: 2000, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>',isInCart: false , isInWishList: false},
  //   { id: 5, title: 'Pre Programming everything you need', rate: 2, src: 'assets/course2.png', watched: '(800)', price: 2500, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>',isInCart: false , isInWishList: false},
  //   { id: 6, title: 'How the internet works', rate: 5, src: 'assets/course3.png', watched: '(1.2k)', price: 5000, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>',isInCart: false , isInWishList: false},

  // ];


  lecturesJS = [
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
}


  ];


  lecturesReact= [
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
}


  ];

  // lecturesReact = [
  //   { id: 1, title: 'How the internet works', rate: 5, src: 'assets/course1.png', watched: '(1.5k)', price: 4000, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>' ,isInCart: false, isInWishList: false},
  //   { id: 2, title: 'The Complete PHP Full', rate: 2.5, src: 'assets/course2.png', watched: '(450)', price: 3500, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>' ,isInCart: false, isInWishList: false},
  //   { id: 3, title: 'Pre Programming everything you need', rate: 3, src: 'assets/course3.png', watched: '(950)', price: 1000, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>',isInCart: false , isInWishList: false},
  //   { id: 4, title: 'The Complete PHP Full', rate: 4, src: 'assets/course1.png', watched: '(1k)', price: 2000, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>',isInCart: false , isInWishList: false},
  //   { id: 5, title: 'Pre Programming everything you need', rate: 2, src: 'assets/course2.png', watched: '(800)', price: 2500, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>',isInCart: false, isInWishList: false },
  //   { id: 6, title: 'How the internet works', rate: 5, src: 'assets/course3.png', watched: '(1.2k)', price: 5000, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>',isInCart: false, isInWishList: false },
  // ];
  // lecturesAngylar = [
  //   { id: 1, title: 'How the internet works', rate: 5, src: 'assets/course1.png', watched: '(1.5k)', price: 4000, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>' ,isInCart: false, isInWishList: false},
  //   { id: 2, title: 'The Complete PHP Full', rate: 2.5, src: 'assets/course2.png', watched: '(450)', price: 3500, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>' ,isInCart: false, isInWishList: false},
  //   { id: 3, title: 'Pre Programming everything you need', rate: 3, src: 'assets/course3.png', watched: '(950)', price: 1000, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>',isInCart: false, isInWishList: false },
  //   { id: 4, title: 'The Complete PHP Full', rate: 4, src: 'assets/course1.png', watched: '(1k)', price: 2000, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>',isInCart: false , isInWishList: false},
  //   { id: 5, title: 'Pre Programming everything you need', rate: 2, src: 'assets/course2.png', watched: '(800)', price: 2500, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>',isInCart: false, isInWishList: false },
  //   { id: 6, title: 'How the internet works', rate: 5, src: 'assets/course3.png', watched: '(1.2k)', price: 5000, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>',isInCart: false , isInWishList: false},
  // ];
  lecturesAngylar= [
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
}


  ];
  lecturesJava= [
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
}


  ];

  // lecturesJava = [
  //   { id: 1, title: 'How the internet works', rate: 5, src: 'assets/course1.png', watched: '(1.5k)', price: 4000, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>' ,isInCart: false, isInWishList: false},
  //   { id: 2, title: 'The Complete PHP Full', rate: 2.5, src: 'assets/course2.png', watched: '(450)', price: 3500, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>' ,isInCart: false, isInWishList: false},
  //   { id: 3, title: 'Pre Programming everything you need', rate: 3, src: 'assets/course3.png', watched: '(950)', price: 1000, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>',isInCart: false, isInWishList: false },
  //   { id: 4, title: 'The Complete PHP Full', rate: 4, src: 'assets/course1.png', watched: '(1k)', price: 2000, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>',isInCart: false, isInWishList: false },
  //   { id: 5, title: 'Pre Programming everything you need', rate: 2, src: 'assets/course2.png', watched: '(800)', price: 2500, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>',isInCart: false , isInWishList: false},
  //   { id: 6, title: 'How the internet works', rate: 5, src: 'assets/course3.png', watched: '(1.2k)', price: 5000, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>',isInCart: false , isInWishList: false},
  // ];


  lecturesAndroud= [
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
}


  ];


  // lecturesAndroud = [
  //   { id: 1, title: 'How the internet works', rate: 5, src: 'assets/course1.png', watched: '(1.5k)', price: 4000, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>' ,isInCart: false, isInWishList: false},
  //   { id: 2, title: 'The Complete PHP Full', rate: 2.5, src: 'assets/course2.png', watched: '(450)', price: 3500, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>' ,isInCart: false, isInWishList: false},
  //   { id: 3, title: 'Pre Programming everything you need', rate: 3, src: 'assets/course3.png', watched: '(950)', price: 1000, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>',isInCart: false, isInWishList: false },
  //   { id: 4, title: 'The Complete PHP Full', rate: 4, src: 'assets/course1.png', watched: '(1k)', price: 2000, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>',isInCart: false, isInWishList: false },
  //   { id: 5, title: 'Pre Programming everything you need', rate: 2, src: 'assets/course2.png', watched: '(800)', price: 2500, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>',isInCart: false , isInWishList: false},
  //   { id: 6, title: 'How the internet works', rate: 5, src: 'assets/course3.png', watched: '(1.2k)', price: 5000, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>',isInCart: false , isInWishList: false},
  // ];

  // lecturesCSS = [
  //   { id: 1, title: 'How the internet works', rate: 5, src: 'assets/course1.png', watched: '(1.5k)', price: 4000, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>' ,isInCart: false, isInWishList: false},
  //   { id: 2, title: 'The Complete PHP Full', rate: 2.5, src: 'assets/course2.png', watched: '(450)', price: 3500, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>' ,isInCart: false, isInWishList: false},
  //   { id: 3, title: 'Pre Programming everything you need', rate: 3, src: 'assets/course3.png', watched: '(950)', price: 1000, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>',isInCart: false, isInWishList: false },
  //   { id: 4, title: 'The Complete PHP Full', rate: 4, src: 'assets/course1.png', watched: '(1k)', price: 2000, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>',isInCart: false , isInWishList: false},
  //   { id: 5, title: 'Pre Programming everything you need', rate: 2, src: 'assets/course2.png', watched: '(800)', price: 2500, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>',isInCart: false , isInWishList: false},
  //   { id: 6, title: 'How the internet works', rate: 5, src: 'assets/course3.png', watched: '(1.2k)', price: 5000, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>',isInCart: false, isInWishList: false },
  // ];

  lecturesCSS= [
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
}

  ];



  // lecturesWEB = [
  //   { id: 1, title: 'How the internet works', rate: 5, src: 'assets/course1.png', watched: '(1.5k)', price: 4000, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>' ,isInCart: false, isInWishList: false},
  //   { id: 2, title: 'The Complete PHP Full', rate: 2.5, src: 'assets/course2.png', watched: '(450)', price: 3500, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>' ,isInCart: false, isInWishList: false},
  //   { id: 3, title: 'Pre Programming everything you need', rate: 3, src: 'assets/course3.png', watched: '(950)', price: 1000, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>',isInCart: false, isInWishList: false },
  //   { id: 4, title: 'The Complete PHP Full', rate: 4, src: 'assets/course1.png', watched: '(1k)', price: 2000, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>',isInCart: false , isInWishList: false},
  //   { id: 5, title: 'Pre Programming everything you need', rate: 2, src: 'assets/course2.png', watched: '(800)', price: 2500, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>',isInCart: false, isInWishList: false },
  //   { id: 6, title: 'How the internet works', rate: 5, src: 'assets/course3.png', watched: '(1.2k)', price: 5000, describtion: 'Youaccet Training', stars: '<i class="fa-solid fa-star"></i>',isInCart: false , isInWishList: false},
  // ];


  lecturesWEB= [
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


  ];



  constructor(private cartService: CartService, private wishlistService: WishlistService,private courseInfoService: CourseInformationService, private router: Router) {}
  ngOnInit() {

    this.lecturesJS.forEach(course => {
      course.isInCart = this.cartService.isItemInCart(course.id);
    });

    this.cartService.cartItems$.subscribe(() => {
      this.lecturesJS.forEach(course => {
        course.isInCart = this.cartService.isItemInCart(course.id);
      });
    });

    this.lecturesReact.forEach(course => {
      course.isInCart = this.cartService.isItemInCart(course.id);
    });

    this.cartService.cartItems$.subscribe(() => {
      this.lecturesReact.forEach(course => {
        course.isInCart = this.cartService.isItemInCart(course.id);
      });
    });


    this.lecturesAngylar.forEach(course => {
      course.isInCart = this.cartService.isItemInCart(course.id);
    });

    this.cartService.cartItems$.subscribe(() => {
      this.lecturesAngylar.forEach(course => {
        course.isInCart = this.cartService.isItemInCart(course.id);
      });
    });


    this.lecturesJava.forEach(course => {
      course.isInCart = this.cartService.isItemInCart(course.id);
    });

    this.cartService.cartItems$.subscribe(() => {
      this.lecturesJava.forEach(course => {
        course.isInCart = this.cartService.isItemInCart(course.id);
      });
    });


    this.lecturesAndroud.forEach(course => {
      course.isInCart = this.cartService.isItemInCart(course.id);
    });

    this.cartService.cartItems$.subscribe(() => {
      this.lecturesAndroud.forEach(course => {
        course.isInCart = this.cartService.isItemInCart(course.id);
      });
    });

    this.lecturesCSS.forEach(course => {
      course.isInCart = this.cartService.isItemInCart(course.id);
    });

    this.cartService.cartItems$.subscribe(() => {
      this.lecturesCSS.forEach(course => {
        course.isInCart = this.cartService.isItemInCart(course.id);
      });
    });



    this.lecturesWEB.forEach(course => {
      course.isInCart = this.cartService.isItemInCart(course.id);
    });

    this.cartService.cartItems$.subscribe(() => {
      this.lecturesWEB.forEach(course => {
        course.isInCart = this.cartService.isItemInCart(course.id);
      });
    });




















    this.lecturesJS.forEach(course => {
      course.isInWishlist = this.wishlistService.isItemInList(course.id);
    });

    this.wishlistService.listItems$.subscribe(() => {
      this.lecturesJS.forEach(course => {
        course.isInWishlist = this.wishlistService.isItemInList(course.id);
      });
    });

    this.lecturesReact.forEach(course => {
      course.isInWishlist = this.wishlistService.isItemInList(course.id);
    });

    this.wishlistService.listItems$.subscribe(() => {
      this.lecturesReact.forEach(course => {
        course.isInWishlist = this.wishlistService.isItemInList(course.id);
      });
    });


    this.lecturesAngylar.forEach(course => {
      course.isInWishlist = this.wishlistService.isItemInList(course.id);
    });

    this.wishlistService.listItems$.subscribe(() => {
      this.lecturesAngylar.forEach(course => {
        course.isInWishlist = this.wishlistService.isItemInList(course.id);
      });
    });


    this.lecturesJava.forEach(course => {
      course.isInWishlist = this.wishlistService.isItemInList(course.id);
    });

    this.wishlistService.listItems$.subscribe(() => {
      this.lecturesJava.forEach(course => {
        course.isInWishlist = this.wishlistService.isItemInList(course.id);
      });
    });


    this.lecturesAndroud.forEach(course => {
      course.isInWishlist = this.wishlistService.isItemInList(course.id);
    });

    this.wishlistService.listItems$.subscribe(() => {
      this.lecturesAndroud.forEach(course => {
        course.isInWishlist = this.wishlistService.isItemInList(course.id);
      });
    });

    this.lecturesCSS.forEach(course => {
      course.isInWishlist = this.wishlistService.isItemInList(course.id);
    });

    this.wishlistService.listItems$.subscribe(() => {
      this.lecturesCSS.forEach(course => {
        course.isInWishlist = this.wishlistService.isItemInList(course.id);
      });
    });



    this.lecturesWEB.forEach(course => {
      course.isInWishlist = this.wishlistService.isItemInList(course.id);
    });

    this.wishlistService.listItems$.subscribe(() => {
      this.lecturesWEB.forEach(course => {
        course.isInWishlist = this.wishlistService.isItemInList(course.id);
      });
    });







  }


  goToCourseDetails(course: any) {
    this.courseInfoService.setCourse(course); // تخزين بيانات الكورس عند الضغط عليه
    this.router.navigate(['course-Informations']); // الانتقال إلى صفحة التفاصيل
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
