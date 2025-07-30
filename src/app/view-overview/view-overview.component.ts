import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QaService } from '../services/qa.service';
import jsPDF from 'jspdf';
import { StudentReviewsComponent } from '../student-reviews/student-reviews.component';
import { ReviewService } from '../services/review.service';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { SecondNavComponent } from "../navbar/second-nav/second-nav.component";
import { ActivatedRoute } from '@angular/router';
import { CourseInformationService } from '../services/course-information.service';
import { AttachmentService } from '../services/attachment.service';



interface Lecture {
  id: string;
  title: string;
  durationInMinutes: number;
  videoUrl: string;
  // ... وغيرها
}

interface SubSection {
  id: string;
  title: string;
  lectures: Lecture[];
}

interface Section {
  id: string;
  title: string;
  lectures: Lecture[];
  subSections: SubSection[];
  expanded?: boolean;
}



@Component({
  selector: 'app-view-overview',
  imports: [FormsModule, CommonModule, StudentReviewsComponent, SecondNavComponent,TranslocoPipe],
  templateUrl: './view-overview.component.html',
  styleUrl: './view-overview.component.css'
})
export class ViewOverviewComponent implements OnInit{
  isArabic: boolean = false;

    currentLang: any = localStorage.getItem("lang")
    courseObj: any = {};
    selectedMonth = '';
    course2={
      "courseType": "Live Streamed Educational Courses",
      "category": "Finance & Accounting",
      "learningObjectives": "z",
      "requirements": "z",
      "targetAudience": "z",
      "courseTitle": "z",
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
      src: 'assets/course-2.png',
    }

    course1 = {
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
      id: 1,
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




    get uniqueMonths(): string[] {
      return [...new Set(this.course2.schedules.map(course => course.date))];
    }

    onMonthChange(event: Event) {
      this.selectedMonth = (event.target as HTMLSelectElement).value;
    }

    get filteredCourses() {
      return this.selectedMonth ? this.course2.schedules.filter(course => course.date === this.selectedMonth) : this.course;
    }


    instructor = {
      Rating:4.7,
      Courses:2,
      Students:107,
      Reviews:9
    };

  constructor(private qaService: QaService ,private reviewService: ReviewService,private route: ActivatedRoute,private courseService: CourseInformationService ,private translocoService: TranslocoService,  private attachmentService: AttachmentService // ✅ أضفنا دي
) {



    }



  tooltipVisible = false;

  toggleTooltip() {
    this.tooltipVisible = !this.tooltipVisible;
  }

  // إغلاق التولتيب عند الضغط خارج الزر
  @HostListener('document:click', ['$event'])
  closeTooltip(event: Event) {
    const button = document.getElementById('progressBtn');
    const tooltip = document.getElementById('tooltip');

    if (button && tooltip && !button.contains(event.target as Node) && !tooltip.contains(event.target as Node)) {
      this.tooltipVisible = false;
    }
  }

  course = {
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

toggleSection(index: number) {
  this.courseObj.sections[index].expanded = !this.courseObj.sections[index].expanded;

  this.courseObj.sections.forEach((section: any, i: number) => {
    if (i !== index) {
      section.expanded = false;
    }
  });
}


  toggleLectureCompletion(lecture: any) {
    lecture.completed = !lecture.completed;

    if (lecture.completed) {
      console.log('✅ Lecture Completed:', lecture.title);
    }
  }


  get totalLectures(): number {
    return this.course.courseSections.reduce((total, section) => total + section.lectures.length, 0);
  }

  get completedLectures(): number {
    return this.course.courseSections.reduce((total, section) => total + section.lectures.filter(lecture => lecture.completed).length, 0);
  }
  get completionPercentage(): number {
    return (this.completedLectures / this.totalLectures) * 100;
  }

  get canGetCertificate(): boolean {
    return this.completionPercentage >= 75;
  }



  getLectureCount(section: any): number {
    return section.lectures.length;
  }
getTotalLectureCount(section: any): number {
  const directLectures = section.lectures?.length || 0;
  const subLectures = section.subSections?.reduce((total: number, sub: any) => {
    return total + (sub.lectures?.length || 0);
  }, 0);

  return directLectures + subLectures;
}

  getTotalDuration(section: any): string {
    let totalMinutes = section.lectures.reduce((sum: number, lecture: any) => {
      return sum + parseInt(lecture.duration.split(' ')[0]); // استخراج الأرقام فقط
    }, 0);

    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;

    // الحصول على اللغة الحالية
    const currentLang = this.translocoService.getActiveLang();

    if (currentLang === 'ar') {
      return hours > 0
        ? `${hours} ${this.translocoService.translate('content.hours')} ${minutes} ${this.translocoService.translate('content.minutes')}`
        : `${minutes} ${this.translocoService.translate('content.minutes')}`;
    } else {
      return hours > 0
        ? `${hours}h ${minutes}m`
        : `${minutes} min`; // الإنجليزية تبقى كما هي
    }
  }



  activeTab: string = 'overview'; // الحالة الافتراضية عند فتح الصفحة

  setActiveTab(tab: string) {
    this.activeTab = tab;

  }


  noteInput: string = '';
maxChars: number = 1000;

getRemainingChars(): number {
  return this.maxChars - this.noteInput.length;
}


selectedLecture: string = 'Current lecture';
selectedLectureTitle: string | null = null;
selectedSectionTitle: string | null = null;


selectLecture(type: string, sectionTitle?: string, lectureTitle?: string) {
  if (type === 'All lectures') {
    this.selectedLecture = 'All lectures';
    this.selectedSectionTitle = null;
    this.selectedLectureTitle = null;
  } else if (type === 'Current lecture' && sectionTitle && lectureTitle) {
    this.selectedLecture = 'Current lecture';
    this.selectedSectionTitle = sectionTitle;
    this.selectedLectureTitle = lectureTitle;

    // البحث عن المحاضرة المختارة داخل الأقسام
    const selectedLectureObj = this.course.courseSections
      .flatMap(section => section.lectures)
      .find(lecture => lecture.title === lectureTitle);

    // التأكد من أنها موجودة وأنها مكتملة ثم طباعتها
    if (selectedLectureObj && selectedLectureObj.completed) {
      console.log('✅ Selected Completed Lecture:', selectedLectureObj.title);
    }
  }
}


  notes: { lecture: string; text: string }[] = [];

  newNoteText: string = '';

saveNote() {
  if (!this.noteInput.trim()) return; // التأكد من عدم حفظ ملاحظة فارغة

  let lectureName = this.selectedLecture === 'Current lecture' && this.selectedLectureTitle
    ? this.selectedLectureTitle
    : this.selectedLecture;

  lectureName = lectureName ?? 'Unknown Lecture';

  // إضافة الملاحظة الجديدة إلى المصفوفة
  this.notes.unshift({ lecture: lectureName, text: this.noteInput });

  // تفريغ الحقل بعد الحفظ
  this.noteInput = '';
}
questionText: string = '';
  questions: { id: number, question: string, answer?: string ,course?:string }[] = [];
  averageRating: number = 0;  // ✅ تعريف المتغير هنا
  totalReviewers: number = 0;  // ✅ تعريف المتغير هنا

selectedVideoUrl: string | null = null;

playVideo(videoUrl: string) {
  this.selectedVideoUrl = videoUrl;
}


ngOnInit() {
  this.translocoService.langChanges$.subscribe(lang => {
    this.isArabic = lang === 'ar';
  });

  this.courseObj = this.courseService.getCourse();

  if (!this.courseObj) {
    console.log("لا يوجد بيانات متاحة للكورس.");
    return;
  } else {
    console.log("تم جلب بيانات الكورس:", this.courseObj);
  }

  const courseId = this.courseObj.id;

  // ✅ نداء مرفقات الكورس
  this.attachmentService.getCourseAttachments(courseId).subscribe({
    next: (res) => {
      console.log("📎 مرفقات الكورس:", res.data);
    },
    error: (err) => {
      console.error("❌ خطأ في تحميل المرفقات:", err);
    }
  });
this.attachmentService.fetchCourseDetails(courseId).subscribe({
  next: (res) => {
    console.log('🎓 بيانات الكورس:', res.data);
    this.courseObj = res.data; // خزينها لو هتستخدمها
  },
  error: (err) => {
    console.error('❌ خطأ في جلب بيانات الكورس:', err);
  }
});

  // ... باقي الكود بتاع courseType وغيره
}


  sendQuestion() {
    if (this.questionText.trim()) {
      this.qaService.addQuestion(this.questionText);
      this.questionText = ''; // مسح الحقل بعد الإرسال
    }
  }




  showQuestions: boolean = false;

  webDevQuestions = [
    "What is the language used to structure web pages?",
    "Which language is used for styling web pages?",
    "Which programming language is used to make web pages interactive?",
    "What is the most popular JavaScript library for DOM manipulation?",
    "What version control system is commonly used in web development?",
    "What does HTML stand for?",
    "What is the difference between 'id' and 'class' in CSS?",
    "What is the purpose of the 'alt' attribute in an <img> tag?",
    "What is the role of a web framework like Angular or React?",
    "What does the term 'responsive design' mean?"
  ];

  toggleQuestions() {
    this.showQuestions = !this.showQuestions;
  }
  downloadPDF() {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Web Development Questions', 70, 10);

    let y = 20;
    this.webDevQuestions.forEach((question, index) => {
      doc.text(`${index + 1}. ${question}`, 10, y);
      y += 10;
    });

    doc.save('Web_Development_Questions.pdf');
  }


//// certification /////
@ViewChild('certificateCanvas', { static: false }) certificateCanvas!: ElementRef<HTMLCanvasElement>;

certificateVisible = false;
userName: string = "Juliana Silva";


generateCertificate() {
  this.certificateVisible = true;


  setTimeout(() => {
    const canvas = this.certificateCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error("Error: Unable to get canvas context.");
      return;
    }

    const img = new Image();
    img.src = 'assets/certification.png'; // تأكد من أن الصورة موجودة داخل مجلد assets
    img.crossOrigin = "anonymous";

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // إعدادات الخط
      ctx.font = 'italic 30px bold Arial';
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';

      // اسم المستخدم
      ctx.fillText(this.userName, canvas.width / 2, 280);

      // نص الشهادة
      const completionText = `Has successfully completed the ${this.course.courseName}`;
      ctx.font = 'italic 16px bold Arial';
      ctx.fillText(completionText, canvas.width / 2, 360);
      ctx.fillText("and demonstrated proficiency in the subject matter.", canvas.width / 2, 390);

      // اسم المحاضر
      ctx.font = 'bold 16px Arial';
      ctx.fillStyle = '#000';
      ctx.fillText(`Instructor: ${this.course.instructorName}`, canvas.width / 2, 480);
    };

    img.onerror = () => {
      console.error("Error: Failed to load image. Check the file path.");
    };
  }, 100);
}

downloadCertificate() {
  const canvas = this.certificateCanvas.nativeElement;
  const link = document.createElement('a');
  link.download = 'certificate.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

printCertificate() {
  const canvas = this.certificateCanvas.nativeElement;
  const dataUrl = canvas.toDataURL('image/png');
  const newTab = window.open();
  if (newTab) {
    newTab.document.write('<img src="' + dataUrl + '" style="width:100%"/>');
    newTab.document.close();
    newTab.print();
  }













}

numbers: number[] = Array.from({ length: 30 }, (_, i) => i + 1);






}

