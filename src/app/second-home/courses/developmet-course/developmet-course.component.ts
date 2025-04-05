import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { SecondNavComponent } from "../../../navbar/second-nav/second-nav.component";
import { CoursesComponent } from "../courses.component";
import { FooterComponent } from "../../../footer/footer.component"; // استيراد FormsModule لاستخدام [(ngModel)]
import { WishlistService } from '../../../services/wishlist.service';
import { Router } from '@angular/router';
import { CourseInformationService } from '../../../services/course-information.service';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-developmet-course',
  imports: [CommonModule, FormsModule, SecondNavComponent, CoursesComponent,TranslocoPipe],
  templateUrl: './developmet-course.component.html',
  styleUrl: './developmet-course.component.css'
})
export class DevelopmetCourseComponent implements OnInit{

  private _searchQuery: string = ''; // تخزين قيمة البحث داخليًا
  currentPage = 1;
  itemsPerPage = 6;

  lectures = [
    {
      "courseType": "Live Streamed Educational Courses",
      "category": "Finance & Accounting",
      "learningObjectives": "z",
      "requirements": "z",
      "targetAudience": "z",
      "courseTitle": "How the internet works",
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
      id: 50,
      rate: 4.7,
      ratingsCount: 9,
      instructor: 'Ahmed Abbas',
      instructorImage: "assets/image.jpg",
      lastUpdate: '11/2025',
      language: 'English',
      seatsLeft: 10,
      watched: 107,
      src: 'assets/course1.png',
    },
    {
      "courseType": "Live Streamed Educational Courses",
      "category": "Finance & Accounting",
      "learningObjectives": "z",
      "requirements": "z",
      "targetAudience": "z",
      "courseTitle": "How the internet works",
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
      id: 51,
      rate: 4.7,
      ratingsCount: 9,
      instructor: 'Ahmed Abbas',
      instructorImage: "assets/image.jpg",
      lastUpdate: '11/2025',
      language: 'English',
      seatsLeft: 10,
      watched: 107,
      src: 'assets/course2.png',
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
      id: 52,
      rate: 4.7,
      ratingsCount: 9,
      instructor: 'Ahmed Abbas',
      instructorImage: "assets/image.jpg",
      lastUpdate: '11/2025',
      language: 'English',
      seatsLeft: 10,
      watched: 107,
      src: 'assets/course1.png',
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
      id: 53,
      rate: 4.7,
      ratingsCount: 9,
      instructor: 'Ahmed Abbas',
      instructorImage: "assets/image.jpg",
      lastUpdate: '11/2025',
      language: 'English',
      seatsLeft: 10,
      watched: 107,
      src: 'assets/course3.png',
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
                    "duration":"10 min",
                    "quizzes":[ {
                      "duration": 10,
                      "questions":[{
                        "answerExplanation":"qqq",
                        "correctAnswer":"q",
                        "options":[
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'q'}],
                          "text":"qq",
                      },
                      {
                        "answerExplanation":"qqq",
                        "correctAnswer":"q",
                        "options":[
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'q'}],
                          "text":"qq",
                      },
                      {
                        "answerExplanation":"qqq",
                        "correctAnswer":"q",
                        "options":[
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'q'}],
                          "text":"qq",
                      }]

                    },]
                },
                {
                    "title": "www",
                    "video": {},
                    "videoName": "[EgyBest].Ashtata.Ashtwt.2004.BluRay.720p.x264.mp4",
                    "description": "www",
                    "activeTab": "video",
                    "duration":"14 min",
                    "quizzes":[ {
                      "duration": 10,
                      "questions":[{
                        "answerExplanation":"qqq",
                        "correctAnswer":"q",
                        "options":[
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'q'}],
                          "text":"qq",
                      },
                      {
                        "answerExplanation":"qqq",
                        "correctAnswer":"q",
                        "options":[
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'q'}],
                          "text":"qq",
                      },
                      {
                        "answerExplanation":"qqq",
                        "correctAnswer":"q",
                        "options":[
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'q'}],
                          "text":"qq",
                      }]

                    },]
                },
                {
                    "title": "www",
                    "video": {},
                    "videoName": "[EgyBest].Al.Ghasala.2020.WEB-DL.720p.x264.mp4",
                    "description": "qq",
                    "activeTab": "video",
                    "duration":"17 min",
                    "quizzes":[ {
                      "duration": 10,
                      "questions":[{
                        "answerExplanation":"qqq",
                        "correctAnswer":"q",
                        "options":[
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'q'}],
                          "text":"qq",
                      },
                      {
                        "answerExplanation":"qqq",
                        "correctAnswer":"q",
                        "options":[
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'q'}],
                          "text":"qq",
                      },
                      {
                        "answerExplanation":"qqq",
                        "correctAnswer":"q",
                        "options":[
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'q'}],
                          "text":"qq",
                      }]

                    },]
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
                    "duration":"14 min",
                    "quizzes":[ {
                      "duration": 10,
                      "questions":[{
                        "answerExplanation":"qqq",
                        "correctAnswer":"q",
                        "options":[
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'q'}],
                          "text":"qq",
                      },
                      {
                        "answerExplanation":"qqq",
                        "correctAnswer":"q",
                        "options":[
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'q'}],
                          "text":"qq",
                      },
                      {
                        "answerExplanation":"qqq",
                        "correctAnswer":"q",
                        "options":[
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'q'}],
                          "text":"qq",
                      }]

                    },]
                },
                {
                    "title": "www",
                    "video": {},
                    "videoName": "[EgyBest].Bang.Bang.2014.BluRay.480p.x264.mp4",
                    "description": "wqw",
                    "activeTab": "description",
                    "duration":"10 min",
                    "quizzes":[ {
                      "duration": 10,
                      "questions":[{
                        "answerExplanation":"qqq",
                        "correctAnswer":"q",
                        "options":[
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'q'}],
                          "text":"qq",
                      },
                      {
                        "answerExplanation":"qqq",
                        "correctAnswer":"q",
                        "options":[
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'q'}],
                          "text":"qq",
                      },
                      {
                        "answerExplanation":"qqq",
                        "correctAnswer":"q",
                        "options":[
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'q'}],
                          "text":"qq",
                      }]

                    },]
                },
                {
                    "title": "www",
                    "video": {},
                    "videoName": "[EgyBest].Bang.Bang.2014.BluRay.480p.x264.mp4",
                    "description": "qweq",
                    "activeTab": "description",
                    "duration":"14 min",
                    "quizzes":[ {
                      "duration": 10,
                      "questions":[{
                        "answerExplanation":"qqq",
                        "correctAnswer":"q",
                        "options":[
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'q'}],
                          "text":"qq",
                      },
                      {
                        "answerExplanation":"qqq",
                        "correctAnswer":"q",
                        "options":[
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'q'}],
                          "text":"qq",
                      },
                      {
                        "answerExplanation":"qqq",
                        "correctAnswer":"q",
                        "options":[
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'w'},
                          {optionValue: 'q'}],
                          "text":"qq",
                      }]

                    },]
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
      id: 54,
      rate: 4.7,
      ratingsCount: 9,
      instructor: 'Ahmed Abbas',
      instructorImage: "assets/image.jpg",
      lastUpdate: '11/2025',
      language: 'English',
      seatsLeft: 10,
      watched: 107,
      src: 'assets/course2.png',
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
                  "duration":"10 min",
                  "quizzes":[ {
                    "duration": 10,
                    "questions":[{
                      "answerExplanation":"qqq",
                      "correctAnswer":"q",
                      "options":[
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'q'}],
                        "text":"qq",
                    },
                    {
                      "answerExplanation":"qqq",
                      "correctAnswer":"q",
                      "options":[
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'q'}],
                        "text":"qq",
                    },
                    {
                      "answerExplanation":"qqq",
                      "correctAnswer":"q",
                      "options":[
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'q'}],
                        "text":"qq",
                    }]

                  },]
              },
              {
                  "title": "www",
                  "video": {},
                  "videoName": "[EgyBest].Ashtata.Ashtwt.2004.BluRay.720p.x264.mp4",
                  "description": "www",
                  "activeTab": "video",
                  "duration":"14 min",
                  "quizzes":[ {
                    "duration": 10,
                    "questions":[{
                      "answerExplanation":"qqq",
                      "correctAnswer":"q",
                      "options":[
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'q'}],
                        "text":"qq",
                    },
                    {
                      "answerExplanation":"qqq",
                      "correctAnswer":"q",
                      "options":[
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'q'}],
                        "text":"qq",
                    },
                    {
                      "answerExplanation":"qqq",
                      "correctAnswer":"q",
                      "options":[
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'q'}],
                        "text":"qq",
                    }]

                  },]
              },
              {
                  "title": "www",
                  "video": {},
                  "videoName": "[EgyBest].Al.Ghasala.2020.WEB-DL.720p.x264.mp4",
                  "description": "qq",
                  "activeTab": "video",
                  "duration":"17 min",
                  "quizzes":[ {
                    "duration": 10,
                    "questions":[{
                      "answerExplanation":"qqq",
                      "correctAnswer":"q",
                      "options":[
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'q'}],
                        "text":"qq",
                    },
                    {
                      "answerExplanation":"qqq",
                      "correctAnswer":"q",
                      "options":[
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'q'}],
                        "text":"qq",
                    },
                    {
                      "answerExplanation":"qqq",
                      "correctAnswer":"q",
                      "options":[
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'q'}],
                        "text":"qq",
                    }]

                  },]
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
                  "duration":"14 min",
                  "quizzes":[ {
                    "duration": 10,
                    "questions":[{
                      "answerExplanation":"qqq",
                      "correctAnswer":"q",
                      "options":[
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'q'}],
                        "text":"qq",
                    },
                    {
                      "answerExplanation":"qqq",
                      "correctAnswer":"q",
                      "options":[
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'q'}],
                        "text":"qq",
                    },
                    {
                      "answerExplanation":"qqq",
                      "correctAnswer":"q",
                      "options":[
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'q'}],
                        "text":"qq",
                    }]

                  },]
              },
              {
                  "title": "www",
                  "video": {},
                  "videoName": "[EgyBest].Bang.Bang.2014.BluRay.480p.x264.mp4",
                  "description": "wqw",
                  "activeTab": "description",
                  "duration":"10 min",
                  "quizzes":[ {
                    "duration": 10,
                    "questions":[{
                      "answerExplanation":"qqq",
                      "correctAnswer":"q",
                      "options":[
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'q'}],
                        "text":"qq",
                    },
                    {
                      "answerExplanation":"qqq",
                      "correctAnswer":"q",
                      "options":[
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'q'}],
                        "text":"qq",
                    },
                    {
                      "answerExplanation":"qqq",
                      "correctAnswer":"q",
                      "options":[
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'q'}],
                        "text":"qq",
                    }]

                  },]
              },
              {
                  "title": "www",
                  "video": {},
                  "videoName": "[EgyBest].Bang.Bang.2014.BluRay.480p.x264.mp4",
                  "description": "qweq",
                  "activeTab": "description",
                  "duration":"14 min",
                  "quizzes":[ {
                    "duration": 10,
                    "questions":[{
                      "answerExplanation":"qqq",
                      "correctAnswer":"q",
                      "options":[
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'q'}],
                        "text":"qq",
                    },
                    {
                      "answerExplanation":"qqq",
                      "correctAnswer":"q",
                      "options":[
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'q'}],
                        "text":"qq",
                    },
                    {
                      "answerExplanation":"qqq",
                      "correctAnswer":"q",
                      "options":[
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'w'},
                        {optionValue: 'q'}],
                        "text":"qq",
                    }]

                  },]
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
    id: 55,
    rate: 4.7,
    ratingsCount: 9,
    instructor: 'Ahmed Abbas',
    instructorImage: "assets/image.jpg",
    lastUpdate: '11/2025',
    language: 'English',
    seatsLeft: 10,
    watched: 107,
    src: 'assets/course3.png',
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
                "duration":"10 min",
                "quizzes":[ {
                  "duration": 10,
                  "questions":[{
                    "answerExplanation":"qqq",
                    "correctAnswer":"q",
                    "options":[
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'q'}],
                      "text":"qq",
                  },
                  {
                    "answerExplanation":"qqq",
                    "correctAnswer":"q",
                    "options":[
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'q'}],
                      "text":"qq",
                  },
                  {
                    "answerExplanation":"qqq",
                    "correctAnswer":"q",
                    "options":[
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'q'}],
                      "text":"qq",
                  }]

                },]
            },
            {
                "title": "www",
                "video": {},
                "videoName": "[EgyBest].Ashtata.Ashtwt.2004.BluRay.720p.x264.mp4",
                "description": "www",
                "activeTab": "video",
                "duration":"14 min",
                "quizzes":[ {
                  "duration": 10,
                  "questions":[{
                    "answerExplanation":"qqq",
                    "correctAnswer":"q",
                    "options":[
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'q'}],
                      "text":"qq",
                  },
                  {
                    "answerExplanation":"qqq",
                    "correctAnswer":"q",
                    "options":[
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'q'}],
                      "text":"qq",
                  },
                  {
                    "answerExplanation":"qqq",
                    "correctAnswer":"q",
                    "options":[
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'q'}],
                      "text":"qq",
                  }]

                },]
            },
            {
                "title": "www",
                "video": {},
                "videoName": "[EgyBest].Al.Ghasala.2020.WEB-DL.720p.x264.mp4",
                "description": "qq",
                "activeTab": "video",
                "duration":"17 min",
                "quizzes":[ {
                  "duration": 10,
                  "questions":[{
                    "answerExplanation":"qqq",
                    "correctAnswer":"q",
                    "options":[
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'q'}],
                      "text":"qq",
                  },
                  {
                    "answerExplanation":"qqq",
                    "correctAnswer":"q",
                    "options":[
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'q'}],
                      "text":"qq",
                  },
                  {
                    "answerExplanation":"qqq",
                    "correctAnswer":"q",
                    "options":[
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'q'}],
                      "text":"qq",
                  }]

                },]
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
                "duration":"14 min",
                "quizzes":[ {
                  "duration": 10,
                  "questions":[{
                    "answerExplanation":"qqq",
                    "correctAnswer":"q",
                    "options":[
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'q'}],
                      "text":"qq",
                  },
                  {
                    "answerExplanation":"qqq",
                    "correctAnswer":"q",
                    "options":[
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'q'}],
                      "text":"qq",
                  },
                  {
                    "answerExplanation":"qqq",
                    "correctAnswer":"q",
                    "options":[
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'q'}],
                      "text":"qq",
                  }]

                },]
            },
            {
                "title": "www",
                "video": {},
                "videoName": "[EgyBest].Bang.Bang.2014.BluRay.480p.x264.mp4",
                "description": "wqw",
                "activeTab": "description",
                "duration":"10 min",
                "quizzes":[ {
                  "duration": 10,
                  "questions":[{
                    "answerExplanation":"qqq",
                    "correctAnswer":"q",
                    "options":[
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'q'}],
                      "text":"qq",
                  },
                  {
                    "answerExplanation":"qqq",
                    "correctAnswer":"q",
                    "options":[
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'q'}],
                      "text":"qq",
                  },
                  {
                    "answerExplanation":"qqq",
                    "correctAnswer":"q",
                    "options":[
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'q'}],
                      "text":"qq",
                  }]

                },]
            },
            {
                "title": "www",
                "video": {},
                "videoName": "[EgyBest].Bang.Bang.2014.BluRay.480p.x264.mp4",
                "description": "qweq",
                "activeTab": "description",
                "duration":"14 min",
                "quizzes":[ {
                  "duration": 10,
                  "questions":[{
                    "answerExplanation":"qqq",
                    "correctAnswer":"q",
                    "options":[
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'q'}],
                      "text":"qq",
                  },
                  {
                    "answerExplanation":"qqq",
                    "correctAnswer":"q",
                    "options":[
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'q'}],
                      "text":"qq",
                  },
                  {
                    "answerExplanation":"qqq",
                    "correctAnswer":"q",
                    "options":[
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'w'},
                      {optionValue: 'q'}],
                      "text":"qq",
                  }]

                },]
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
  id:56,
  rate: 4.7,
  ratingsCount: 9,
  instructor: 'Ahmed Abbas',
  instructorImage: "assets/image.jpg",
  lastUpdate: '11/2025',
  language: 'English',
  seatsLeft: 10,
  watched: 107,
  src: 'assets/course1.png',
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
  set searchQuery(value: string) {
    this._searchQuery = value;
    this.currentPage = 1; // إعادة ضبط الصفحة عند تغيير البحث
  }

  get searchQuery(): string {
    return this._searchQuery;
  }

  get filteredCourses() {
    return this.lectures.filter(course =>
      course.courseTitle.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  get paginatedCourses() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCourses.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filteredCourses.length / this.itemsPerPage);
  }

  get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(newPage: number) {
    this.currentPage = newPage;
  }

}
