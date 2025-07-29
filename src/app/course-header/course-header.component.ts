import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'; // ✅ تأكد من استيراد Router
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { QuizFormComponent } from '../quiz-form/quiz-form.component';
import { InstructorCoursesService } from '../services/instructor-courses.service';
import { QuizFormSectionComponent } from "../quiz-form-section/quiz-form-section.component";
import { QuizFormCourseComponent } from "../quiz-form-course/quiz-form-course.component";


type Lecture = {
  title: string;
  video: File | null;
  videoName: string;
  description: string;
  activeTab: 'video' | 'description';
  quizzes: any[];
  files: { file: File, name: string, description: string }[];
  fromSubSection:false ;
};
interface SubSectionLecture {
  title: string;
  video: File | null;
  videoName: string;
  description: string;
  activeTab: 'video' | 'description';
  quizzes: any[];
  files: { file: File; name: string; description: string }[];
  fromSubSection: true;
}


type SubSection = {
  name: string;
  description: string;
  attachments: { file: File, name: string, description: string }[];
  lectures: SubSectionLecture[]; // ⬅️ نوع المحاضرات جوا صب سيكشن
};


type SectionContentItem =
  | { type: 'lecture'; data: Lecture }
  | { type: 'subsection'; data: SubSection };

interface LessonFile {
  name: string;
  description: string;
  file: File | null;
}



interface LessonData {
  title: string;
  lecturerName: string;
  description: string;
  startTime: string;
  durationInMinutes: number;
  zoomMeetingId: string;
  zoomJoinUrl: string;
  zoomPassword: string;
  isInstant: boolean;
  status: string;
  maxParticipants: string;
  files: LessonFile[];
}

interface UnitData {
  name: string;
  description: string;
  lessons: LessonData[];
}

type ModuleContent =
  | { type: 'lesson'; data: LessonData }
  | { type: 'unit'; data: UnitData };

interface ModuleFile {
  name: string;
  description: string;
  file: File | null;
}

interface ModuleSection {
  title: string;
  description: string;
  files: ModuleFile[];
  content: ModuleContent[];
}


@Component({
  selector: 'app-course-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HttpClientModule, TranslocoPipe],
  templateUrl: './course-header.component.html',
  styleUrls: ['./course-header.component.css']
})



export class CourseHeaderComponent implements OnInit {
  isQuizModalOpen = false;
  selectedSectionIndex: number = 0;
  selectedLectureIndex: number = 0;
  selectedRowIndex: number = 0;


  activeLang: string = 'en'; // تعيين اللغة الافتراضية


  courseObj: any = {};
  originalCourseData: any = {};
  copiedCourse: any = null;
  currentStep = 0;
  allFormData: any = {};
  selectedSchedule: any[] = [];
  coupons: any[] = [{ code: '', status: 'Free', users: 'Limited', startDate: '', endDate: '' }];

  stepsRecorded_Educational_Courses = [
        { titleEn: 'Landing Page',titleAr: 'صفحة الهبوط', completed: false },

    {  titleEn: 'Curriculum',titleAr: 'مقرر',  completed: false },
    // { titleEn: 'Pricing & Promotions',titleAr: 'التسعير والعروض الترويجية', completed: false },
    { titleEn: 'Create Coupons',titleAr: 'إنشاء قسائم', completed: false }
  ];
  stepsLive_Streamed_Educational_Courses = [
    { titleEn: 'Instructor Schedules',titleAr: 'جداول المدربين', completed: false },
    { titleEn: 'Landing Page',titleAr: 'صفحة الهبوط', completed: false },
    { titleEn: 'Pricing & Promotions',titleAr: 'التسعير والعروض الترويجية', completed: false },
    { titleEn: 'Create Coupons',titleAr: 'إنشاء قسائم', completed: false }
  ];


sections: {
  name: string;
  description: string;
  attachments: { file: File, name: string, description: string }[];
  content: SectionContentItem[];
}[] = [
  {
    name: '',
    description: '',
    attachments: [],
    content: []
  }
];


 course = {
  title: '',
  description: '',
  language: 'English',
  level: 'Beginner',
  category: 'Design',
  duration: 'Week',
  bookTitle: '',
  bookDescription: '',
  video: null,
  photo: null,
    book: null, // ✅ أضف دي
  lecturer: '',
  lecturerDescription: ''
};



courseData = {
  isPaid: false, // default to Free
  price: null,
  currency: null,
  priceTier: 'Free'
};



//  courseData = {
//   currency: 'SAR',
//   priceTier: 'Free',
//   promoLink: '',
//   price: 0,
//   selectedVoucher: 'best_current_price',
//   voucherOptions: [
//     { value: 'best_current_price', labelEn: 'Best Current Price',labelAr: 'أفضل سعر حالي', featuresEn: ['Fixed price', 'Unlimited quantity', 'Limited validity period'],featuresAr: ['سعر ثابت', 'كمية غير محدودة', 'فترة صلاحية محدودة'] },
//     { value: 'custom_price', labelEn: 'Custom Price',labelAr: 'سعر مخصص', featuresEn: ['Select a price between two numbers', 'Unlimited quantity', 'Limited validity period'],featuresAr: ['اختر سعرًا بين رقمين', 'كمية غير محدودة', 'فترة صلاحية محدودة'] },
//     { value: 'Free period', labelEn: 'Free period',labelAr: 'فترة مجانية', featuresEn: ['Unlimited quantity', 'Limited validity period'],featuresAr: ['كمية غير محدودة', 'فترة صلاحية محدودة'] },

//  ]
// };



  constructor(private http: HttpClient, private route: ActivatedRoute,  private router: Router,private translocoService: TranslocoService,    private instructorCoursesService: InstructorCoursesService,
  ) {
    this.translocoService.langChanges$.subscribe(lang => {
      this.activeLang = lang;
    });

   }
addSubSectionLectureFile(sectionIndex: number, contentIndex: number, lectureIndex: number) {
  const item = this.sections[sectionIndex].content[contentIndex];
  if (item.type === 'subsection') {
    item.data.lectures[lectureIndex].files.push({
      file: null as any,
      name: '',
      description: ''
    });
  }
}

removeSubSectionLectureFile(sectionIndex: number, contentIndex: number, lectureIndex: number, fileIndex: number) {
  const item = this.sections[sectionIndex].content[contentIndex];
  if (item.type === 'subsection') {
    item.data.lectures[lectureIndex].files.splice(fileIndex, 1);
  }
}

onSubSectionLectureFileSelected(event: any, sectionIndex: number, contentIndex: number, lectureIndex: number, fileIndex: number) {
  const file = event.target.files?.[0];
  const item = this.sections[sectionIndex].content[contentIndex];

  if (item.type === 'subsection' && file?.type === 'application/pdf') {
    const lecture = item.data.lectures[lectureIndex];
    lecture.files[fileIndex].file = file;
    lecture.files[fileIndex].name = file.name;
  } else {
    alert("❌ Please upload a valid PDF file.");
  }
}




   addSectionFile(sectionIndex: number) {
  this.sections[sectionIndex].attachments.push({
    file: null as any,
    name: '',
    description: ''
  });
}

onSectionFileSelected(event: any, sectionIndex: number, fileIndex: number): void {
  const file = event.target.files[0];
  if (file && file.type === 'application/pdf') {
    const attachment = this.sections[sectionIndex].attachments[fileIndex];
    attachment.file = file;
    attachment.name = file.name; // ⬅️ يظهر في input
  } else {
    alert('❌ Please select a valid PDF file.');
  }
}


removeSectionFile(sectionIndex: number, fileIndex: number) {
  this.sections[sectionIndex].attachments.splice(fileIndex, 1);
}

addLectureFile(sectionIndex: number, contentIndex: number) {
  const contentItem = this.sections[sectionIndex].content[contentIndex];
  if (contentItem.type === 'lecture') {
    contentItem.data.files.push({
      file: null as any,
      name: '',
      description: ''
    });
  }
}


onLectureFileSelected(event: any, sectionIndex: number, ci: number, fileIndex: number): void {
  const file = event.target.files[0];
  const contentItem = this.sections[sectionIndex].content[ci];
  if (file && file.type === 'application/pdf') {
    if (contentItem.type === 'lecture') {
      const target = contentItem.data.files[fileIndex];
      target.file = file;
      target.name = file.name; // ⬅️ علشان يظهر الاسم في الـ input
    }
  } else {
    alert('❌ Please select a valid PDF file.');
  }
}



removeLectureFile(sectionIndex: number, contentIndex: number, fileIndex: number) {
  const contentItem = this.sections[sectionIndex].content[contentIndex];
  if (contentItem.type === 'lecture') {
    contentItem.data.files.splice(fileIndex, 1);
  }
}
addLessonFileToUnit(moduleIndex: number, unitIndex: number, lessonIndex: number) {
  const content = this.instructorModules[moduleIndex].content[unitIndex];
  if (content.type === 'unit') {
    const lesson = content.data.lessons[lessonIndex];
    lesson.files ||= [];
    lesson.files.push({ name: '', description: '', file: null });
  }
}

removeLessonFileFromUnit(moduleIndex: number, unitIndex: number, lessonIndex: number, fileIndex: number) {
  const content = this.instructorModules[moduleIndex].content[unitIndex];
  if (content.type === 'unit') {
    content.data.lessons[lessonIndex].files.splice(fileIndex, 1);
  }
}

onUnitLessonFileUpload(event: any, moduleIndex: number, unitIndex: number, lessonIndex: number, fileIndex: number) {
  const file = event.target.files?.[0];
  if (!file || file.type !== "application/pdf") {
    alert("❌ Please upload a valid PDF.");
    return;
  }

  const content = this.instructorModules[moduleIndex].content[unitIndex];
  if (content.type === 'unit') {
    content.data.lessons[lessonIndex].files[fileIndex] = {
      ...content.data.lessons[lessonIndex].files[fileIndex],
      file,
      name: file.name
    };
  }
}



  ngOnInit() {
      window.scrollTo(0, 0);

    this.route.queryParams.subscribe(params => {
      console.log("📩 Received Params:", params);

      if (params['course']) {
        try {
          this.courseObj = JSON.parse(decodeURIComponent(params['course']));
          console.log('✅ Received Course Data:', this.courseObj);



        } catch (error) {
          console.error("❌ Error parsing course data:", error);
        }
      }
    });

    this.ensureMinimumRows();

  }


  resetToOriginalData() {
    this.courseObj = { ...this.originalCourseData };
  }

  saveCourseData() {
    this.copiedCourse = { ...this.courseObj };
    console.log("Copied Course Data:", this.copiedCourse);
  }


  isStepTwoValid(): boolean {
  return !!this.courseData && this.courseData.isPaid
    ? this.courseData.price != null && this.courseData.price > 0
    : true; // لو الكورس مجاني، اعتبره Valid
}

async submitCourseFlow(isDrafted: boolean) {
  try {
    this.isLoading = true;

    const userData = localStorage.getItem('user');
    const token = userData ? JSON.parse(userData).token : null;
    if (!token) throw new Error('Missing token');

    const headers = { Authorization: `Bearer ${token}` };
    const formData = new FormData();

    const { landingPage, courseTitle, categoryId, subcategoryId, targetAudience, requirements, courseType } = this.courseObj;

    if (!(landingPage?.photo instanceof File)) return alert("❌ Please upload a valid image.");
    formData.append("thumbnail", landingPage.photo);

    if (!(landingPage?.video instanceof File)) return alert("❌ Please upload a valid video.");
    formData.append("promoVideo", landingPage.video);

    const typeMap: Record<string, string> = {
      "Recorded Educational Courses": "1",
      "Live Streamed Educational Courses": "2"
    };

    const finalPrice = this.courseData.isPaid ? (this.courseData.price ?? 0) : 0;
    const currency = this.courseData.isPaid ? (this.courseData.currency || "SAR") : "SAR";
    console.log(landingPage.description )

    formData.append("categoryId", categoryId);
    if (subcategoryId) formData.append("subcategoryId", subcategoryId);
    formData.append("title", courseTitle);
    formData.append("language", landingPage.language?.toLowerCase() || '');
    formData.append("prerequisites", requirements || '');
    formData.append("targetAudience", targetAudience || '');
    formData.append("description", landingPage.description || '');
    formData.append("level", landingPage.level?.toString() || '');
    formData.append("type", typeMap[courseType as keyof typeof typeMap] || '');
    formData.append("price", finalPrice.toString());
    formData.append("currency", currency);
    formData.append("isDrafted", `${isDrafted}`);

    console.log("📤 Sending Course FormData:");
    for (const [key, val] of formData.entries()) console.log(`- ${key}:`, val);

    const courseResponse: any = await this.http.post("https://api.makhekh.com/api/Courses", formData, { headers }).toPromise();
    console.log("✅ Course Created Response:", courseResponse);

    const courseId = courseResponse.data?.id;
    this.courseObj.curriculum = [...this.sections];

    for (const [sectionIndex, section] of this.courseObj.curriculum.entries()) {
      const sectionBody = {
        title: section.name,
        description: section.description,
        orderInCourse: sectionIndex
      };

      console.log("📤 Creating Section:", sectionBody);

      const sectionRes: any = await this.http.post(
        `https://api.makhekh.com/api/courses/${courseId}/Sections`,
        sectionBody,
        { headers: { ...headers, 'Content-Type': 'application/json' } }
      ).toPromise();
      console.log("✅ Section Created:", sectionRes);
      const sectionId = sectionRes.data.id;

      for (const file of section.attachments || []) {
        const sForm = new FormData();
        sForm.append("EntityId", sectionId);
        sForm.append("FileName", file.name);
        sForm.append("Description", file.description);
        sForm.append("attachment", file.file);
        sForm.append("EntityType", "2");

        console.log("📤 Uploading Section File:", file);
        const fileRes = await this.http.post("https://api.makhekh.com/api/summary-attachments", sForm, { headers }).toPromise();
        console.log("✅ Section File Uploaded:", fileRes);
      }

      for (const [contentIndex, content] of section.content.entries()) {
        if (content.type === "subsection") {
          const sub = content.data;
          const subBody = {
            title: sub.name,
            description: sub.description,
            orderInCourse: contentIndex
          };

          console.log("📤 Creating SubSection:", subBody);
          const subRes: any = await this.http.post(
            `https://api.makhekh.com/api/courses/section/${sectionId}/subsection`,
            subBody,
            { headers: { ...headers, 'Content-Type': 'application/json' } }
          ).toPromise();
          console.log("✅ SubSection Created:", subRes);
          const subId = subRes.data.id;

          for (const [subIndex, lecture] of sub.lectures.entries()) {
            const lForm = new FormData();
            lForm.append("Title", lecture.title);
            lForm.append("SectionId", sectionId);
            lForm.append("SubSectionId", subId);
            lForm.append("orderInCourse", subIndex.toString());
            if (lecture.video) lForm.append("videoFile", lecture.video);
            if (lecture.description) lForm.append("description", lecture.description);

            console.log("📤 Uploading Subsection Lecture:", lecture.title);
            const lecRes: any = await this.http.post(
              `https://api.makhekh.com/api/courses/${courseId}/Lectures/video`,
              lForm,
              { headers }
            ).toPromise();
            console.log("✅ Subsection Lecture Created:", lecRes);

            for (const file of lecture.files || []) {
              const f = new FormData();
              f.append("EntityId", lecRes.data.id);
              f.append("FileName", file.name);
              f.append("Description", file.description);
              f.append("attachment", file.file);
              f.append("EntityType", "3");

              console.log("📤 Uploading Subsection Lecture File:", file.name);
              const fileRes = await this.http.post("https://api.makhekh.com/api/summary-attachments", f, { headers }).toPromise();
              console.log("✅ Subsection Lecture File Uploaded:", fileRes);
            }
          }

        } else if (
  content.type === "lecture" &&
  !content.data.fromSubSection &&
  !section.content.some((c: SectionContentItem) =>
    c.type === "subsection" &&
    (c.data as SubSection).lectures?.some(
      (l: SubSectionLecture) => l.title === content.data.title
    )
  )
)
{
          const lec = content.data;
          const lForm = new FormData();
          lForm.append("Title", lec.title);
          lForm.append("SectionId", sectionId);
          lForm.append("orderInCourse", contentIndex.toString());
          if (lec.video) lForm.append("videoFile", lec.video);
          if (lec.description) lForm.append("description", lec.description);

          console.log("📤 Uploading Lecture:", lec.title);
          const lecRes: any = await this.http.post(
            `https://api.makhekh.com/api/courses/${courseId}/Lectures/video`,
            lForm,
            { headers }
          ).toPromise();
          console.log("✅ Lecture Created:", lecRes);

          for (const file of lec.files || []) {
            const f = new FormData();
            f.append("EntityId", lecRes.data.id);
            f.append("FileName", file.name);
            f.append("Description", file.description);
            f.append("attachment", file.file);
            f.append("EntityType", "3");

            console.log("📤 Uploading Lecture File:", file.name);
            const fileRes = await this.http.post("https://api.makhekh.com/api/summary-attachments", f, { headers }).toPromise();
            console.log("✅ Lecture File Uploaded:", fileRes);
          }
        } else {
          console.log("⏭️ Skipping:", content);
        }
      }
    }

    for (const coupon of this.coupons) {
      if (!coupon.code || coupon.discount == null) continue;

      const body = {
        courseId,
        code: coupon.code,
        discountPercentage: coupon.discount
      };
      console.log("📤 Creating Coupon:", body);
      const couponRes = await this.http.post("https://api.makhekh.com/api/Coupons", body, {
        headers: { ...headers, 'Content-Type': 'application/json' }
      }).toPromise();
      console.log("✅ Coupon Created:", couponRes);
    }

    if (this.course.book && this.course.bookTitle && this.course.bookDescription) {
      const f = new FormData();
      f.append("EntityId", courseId);
      f.append("FileName", this.course.bookTitle);
      f.append("Description", this.course.bookDescription);
      f.append("attachment", this.course.book);
      f.append("EntityType", "1");

      console.log("📤 Uploading Book File:", this.course.bookTitle);
      const bookUploadRes = await this.http.post("https://api.makhekh.com/api/summary-attachments", f, { headers }).toPromise();
      console.log("✅ Book File Uploaded:", bookUploadRes);
    }

    const approveBody = {
      courseId,
      approve: true,
      comment: "ok"
    };
const approveToken = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjdiMGY1ZDkwLWJmNTAtNGQ5Mi1iNzE1LTY4MmUxYWZmODEwYSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2dpdmVubmFtZSI6Ik11c3RhZmEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZG1pbkBtYWhrZWhrLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzUyMTM5ODAwLCJpc3MiOiJodHRwczovL2FwaS5tYWtoZWtoLmNvbS8iLCJhdWQiOiJNeVNlY3VyZUtleSJ9.PbFINqS-9vEDeZAxZt5vBqZ5pIKMFHeoi-_T-04exo4'; // كامل التوكن

    // console.log("📤 Approving Course:", approveBody);
    // const approveRes = await this.http.post("https://api.makhekh.com/api/admin/courses/approve", approveBody, {
    //   headers: {
    //     Authorization: `Bearer ${approveToken}`,
    //     'Content-Type': 'application/json'
    //   }
    // }).toPromise();
    // console.log("✅ Course Approved:", approveRes);

    this.isLoading = false;
    this.router.navigate(['instructor-profile/create-course'], {
      queryParams: { data: JSON.stringify({ ...this.courseObj, id: courseId }) }
    });

  } catch (error) {
    this.isLoading = false;
    console.error("❌ Error during course submission:", error);
    this.warningMessageKey = "warnings.courseUploadFailed";
  }
}






areAllSectionsComplete(): boolean {
  if (!this.instructorModules || this.instructorModules.length === 0) {
    return false;
  }

  for (const module of this.instructorModules) {
    // تحقق من العنوان والوصف
    if (!module.title || !module.description) {
      return false;
    }

    // تحقق من وجود محتوى
    if (!module.content || module.content.length === 0) {
      return false;
    }

    let hasAtLeastOneValidLesson = false;
    let hasAtLeastOneValidUnit = false;

    for (const item of module.content) {
      if (item.type === 'lesson') {
        const lesson = item.data;
        if (
          lesson.title &&
          lesson.lecturerName &&
          lesson.description &&
          lesson.startTime &&
          lesson.zoomJoinUrl &&
          lesson.zoomPassword &&

          lesson.maxParticipants !== null &&
          lesson.maxParticipants !== undefined
        ) {
          hasAtLeastOneValidLesson = true;
        } else {
          return false; // بيانات lesson غير مكتملة
        }
      }

      if (item.type === 'unit') {
        const unit = item.data;

        if (!unit.name || !unit.description || !unit.lessons || unit.lessons.length === 0) {
          return false;
        }

        for (const lesson of unit.lessons) {
          if (
            !lesson.title ||
            !lesson.lecturerName ||
            !lesson.description ||

            !lesson.zoomJoinUrl ||
            !lesson.zoomPassword ||
            lesson.status === null || lesson.status === undefined ||
            lesson.maxParticipants === null || lesson.maxParticipants === undefined
          ) {
            return false;
          }
        }

        hasAtLeastOneValidUnit = true;
      }
    }

    // لازم يكون في واحدة على الأقل: valid lesson أو valid unit
    if (!hasAtLeastOneValidLesson && !hasAtLeastOneValidUnit) {
      return false;
    }
  }

  return true;
}



isLoading: boolean = false;


 nextStep1() {
  if (this.currentStep === 0 && !this.isFirstStepValid()) {
    this.warningMessageKey = 'warnings.fillFirstSection';
    return;
  }

  if (this.currentStep === 1 && !this.isStepThreeValid()) {
    this.warningMessageKey = 'warnings.fillCourseData';
    return;
  }

  if (this.currentStep === 2 && !this.isStepTwoValid()) {
    this.warningMessageKey = 'warnings.fillPriceData';
    return;
  }

  this.warningMessageKey = '';

  switch (this.currentStep) {
    case 0:
       this.courseObj.landingPage = {
        ...this.course,
        photo: this.courseObj.landingPage.photo,
        video: this.courseObj.landingPage.video
      };
      this.courseObj.pricing = { ...this.courseData };

      break;


    case 1:



       this.courseObj.curriculum = this.sections;
      break;

    case 2:
      this.courseObj.coupons = [...this.coupons];
      // this.instructorCoursesService.addCourse(this.courseObj);

      // ✅ نشغّل السبنر ونستدعي الارسال
      this.isLoading = true;
      this.submitCourseFlow(false);
      return; // ⛔ نحذف التنقل من هنا
  }

  if (this.currentStep < this.stepsRecorded_Educational_Courses.length - 1) {
    this.currentStep++;
  }

  console.log(this.courseObj);
}



  nextStep2() {
    console.log("Before Saving:", this.courseObj); // لمعرفة البيانات قبل الحفظ
    if (this.currentStep === 0) {
  if (!this.areAllSectionsComplete()) {
    this.warningMessageKey = 'warnings.fillAllSectionData';
    return;
  }
  this.courseObj.schedules = this.selectedScheduleSections;
}

    if (this.currentStep === 1 && !this.isStepThreeValid()) {
      this.warningMessageKey = 'warnings.fillCourseData';
      return;
    }

    if (this.currentStep === 2 && !this.isStepTwoValid()) {
      this.warningMessageKey = 'warnings.fillPriceData';
      return;
    }

    this.warningMessageKey = '';



    if (this.currentStep === 0) {
  this.courseObj.schedules = JSON.parse(JSON.stringify(this.instructorModules));
    }
    else if (this.currentStep === 1) {
      this.courseObj.landingPage = {
        title: this.course.title,
        description: this.course.description,
        language: this.course.language,
        level: this.course.level,
        category: this.course.category,
        duration: this.course.duration,
        lecturer: this.course.lecturer,
        lecturerDescription: this.course.lecturerDescription,
        photo: this.course.photo,  // ✅ حفظ الصورة
        video: this.course.video   // ✅ حفظ الفيديو
      };
    }

    else if (this.currentStep === 2) {
  this.courseObj.pricing = {
    currency: this.courseData.currency,
    priceTier: this.courseData.priceTier,
    // promoLink: this.courseData.promoLink,
    // selectedVoucher: this.courseData.selectedVoucher,
    price: this.courseData.price
  };
}

    else if (this.currentStep === 3) {
  this.courseObj.coupons =
      // this.instructorCoursesService.addCourse(this.courseObj);
      this.submitCourseFlow2();
      // this.router.navigate(['courseDetails'], { queryParams: { data: JSON.stringify(this.courseObj) } });

    }


    // التنقل إلى الخطوة التالية
    if (this.currentStep < this.stepsLive_Streamed_Educational_Courses.length - 1) {
      this.currentStep++;
    }
console.log("Course Object:", this.courseObj);

  }

async submitCourseFlow2() {
  try {
    this.isLoading = true;

    const userData = localStorage.getItem('user');
    const token = userData ? JSON.parse(userData).token : null;
    if (!token) throw new Error('Missing token');

    const headers = { Authorization: `Bearer ${token}` };
    const formData = new FormData();

    const {
      landingPage,
      courseTitle,
      categoryId,
      subcategoryId,
      targetAudience,
      requirements,
      courseType,
    } = this.courseObj;

    if (!(this.courseAssets.photo instanceof File)) return alert('❌ Please upload a valid image.');
    if (!(this.courseAssets.video instanceof File)) return alert('❌ Please upload a valid video.');

    formData.append('thumbnail', this.courseAssets.photo);
    formData.append('promoVideo', this.courseAssets.video);

    const typeMap: Record<string, string> = {
      'Recorded Educational Courses': '1',
      'Live Streamed Educational Courses': '2',
    };

    const finalPrice = this.courseData.isPaid ? this.courseData.price ?? 0 : 0;
    const currency = this.courseData.isPaid ? this.courseData.currency || 'SAR' : 'SAR';
    formData.append('categoryId', categoryId);
    if (subcategoryId) formData.append('subcategoryId', subcategoryId);
    formData.append('title', courseTitle);
    formData.append('language', landingPage.language?.toLowerCase() || '');
    formData.append('prerequisites', requirements || '');
    formData.append('targetAudience', targetAudience || '');
    formData.append('description', landingPage.description || '');
    formData.append('level', landingPage.level?.toString() || '');
    formData.append('type', typeMap[courseType as keyof typeof typeMap] || '');
    formData.append('price', finalPrice.toString());
    formData.append('currency', currency);

    console.log('📤 Creating course with:', Object.fromEntries(formData.entries()));

    const courseResponse: any = await this.http.post('https://api.makhekh.com/api/Courses', formData, { headers }).toPromise();
    console.log('✅ Course created:', courseResponse);

    const courseId = courseResponse.data?.id;
    if (!courseId) throw new Error('Failed to create course.');

    for (const [sectionIndex, section] of this.instructorModules.entries()) {
      const sectionBody = {
        title: section.title,
        description: section.description,
        orderInCourse: sectionIndex,
      };

      console.log('📤 Creating section:', sectionBody);

      const sectionRes: any = await this.http.post(
        `https://api.makhekh.com/api/courses/${courseId}/Sections`,
        sectionBody,
        { headers: { ...headers, 'Content-Type': 'application/json' } }
      ).toPromise();
      console.log('✅ Section created:', sectionRes);

      const sectionId = sectionRes.data.id;

      for (const file of section.files || []) {
        const sForm = new FormData();
        sForm.append('EntityId', sectionId);
        sForm.append('FileName', file.name);
        sForm.append('Description', file.description);
        if (file.file) {
          sForm.append('attachment', file.file);
        }
        sForm.append('EntityType', '2');

        console.log('📤 Uploading section file:', file);
        const fileRes = await this.http.post('https://api.makhekh.com/api/summary-attachments', sForm, { headers }).toPromise();
        console.log('✅ Section file uploaded:', fileRes);
      }

      for (const [contentIndex, content] of section.content.entries()) {
        if (content.type === 'lesson') {
          const body = {
            title: content.data.title,
            sectionId,
            description: content.data.description,
            orderInCourse: contentIndex,
            status: 1,
            maxParticipants: 0,
            zoomJoinUrl: content.data.zoomJoinUrl,
            zoomPassword: content.data.zoomPassword,
            lecturerName: content.data.lecturerName || '',
          };

          console.log('📤 Uploading lecture:', body);
          const lecRes: any = await this.http.post(
            `https://api.makhekh.com/api/Courses/${courseId}/Lectures/live`,
            body,
            { headers: { ...headers, 'Content-Type': 'application/json' } }
          ).toPromise();
          console.log('✅ Lecture created:', lecRes);

          for (const file of content.data.files || []) {
            const f = new FormData();
            f.append('EntityId', lecRes.data.id);
            f.append('FileName', file.name);
            f.append('Description', file.description);
            if (file.file) {
              f.append('attachment', file.file);
            }
            f.append('EntityType', '3');

            console.log('📤 Uploading lecture file:', file.name);
            const fileRes = await this.http.post('https://api.makhekh.com/api/summary-attachments', f, { headers }).toPromise();
            console.log('✅ Lecture file uploaded:', fileRes);
          }
        }

        if (content.type === 'unit') {
          const subBody = {
            title: content.data.name,
            description: content.data.description,
          };

          console.log('📤 Creating subsection:', subBody);

          const subRes: any = await this.http.post(
            `https://api.makhekh.com/api/courses/section/${sectionId}/subsection`,
            subBody,
            { headers: { ...headers, 'Content-Type': 'application/json' } }
          ).toPromise();
          console.log('✅ Subsection created:', subRes);

          const subId = subRes.data.id;

          for (const lesson of content.data.lessons || []) {
            const body = {
              title: lesson.title,
              sectionId,
              subSectionId: subId,
              description: lesson.description,
              orderInCourse: 0,
              status: 1,
              isInstant: true,
              maxParticipants: 0,
              zoomJoinUrl: lesson.zoomJoinUrl,
              zoomPassword: lesson.zoomPassword,
              lecturerName: lesson.lecturerName || '',
            };

            console.log('📤 Uploading subsection lecture:', body);
            const lecRes: any = await this.http.post(
              `https://api.makhekh.com/api/Courses/${courseId}/Lectures/live`,
              body,
              { headers: { ...headers, 'Content-Type': 'application/json' } }
            ).toPromise();
            console.log('✅ Subsection lecture created:', lecRes);

            for (const file of lesson.files || []) {
              const f = new FormData();
              f.append('EntityId', lecRes.data.id);
              f.append('FileName', file.name);
              f.append('Description', file.description);
              if (file.file) {
                f.append('attachment', file.file);
              }
              f.append('EntityType', '3');

              console.log('📤 Uploading subsection lecture file:', file.name);
              const fileRes = await this.http.post('https://api.makhekh.com/api/summary-attachments', f, { headers }).toPromise();
              console.log('✅ Subsection lecture file uploaded:', fileRes);
            }
          }
        }
      }
    }

    for (const coupon of this.coupons) {
      if (!coupon.code || coupon.discount == null) continue;

      const body = {
        courseId,
        code: coupon.code,
        discountPercentage: coupon.discount
      };
      console.log("📤 Creating Coupon:", body);
      const couponRes = await this.http.post("https://api.makhekh.com/api/Coupons", body, {
        headers: { ...headers, 'Content-Type': 'application/json' }
      }).toPromise();
      console.log("✅ Coupon Created:", couponRes);
    }

    if (this.course.book && this.course.bookTitle && this.course.bookDescription) {
      const f = new FormData();
      f.append("EntityId", courseId);
      f.append("FileName", this.course.bookTitle);
      f.append("Description", this.course.bookDescription);
      f.append("attachment", this.course.book);
      f.append("EntityType", "1");

      console.log("📤 Uploading Book File:", this.course.bookTitle);
      const bookUploadRes = await this.http.post("https://api.makhekh.com/api/summary-attachments", f, { headers }).toPromise();
      console.log("✅ Book File Uploaded:", bookUploadRes);
    }

    // const approveToken = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjdiMGY1ZDkwLWJmNTAtNGQ5Mi1iNzE1LTY4MmUxYWZmODEwYSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2dpdmVubmFtZSI6Ik11c3RhZmEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZG1pbkBtYWhrZWhrLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzUyMTM5ODAwLCJpc3MiOiJodHRwczovL2FwaS5tYWtoZWtoLmNvbS8iLCJhdWQiOiJNeVNlY3VyZUtleSJ9.PbFINqS-9vEDeZAxZt5vBqZ5pIKMFHeoi-_T-04exo4'; // Replace with real token
    // const approveBody = {
    //   courseId,
    //   approve: true,
    //   comment: 'ok',
    // };
    // console.log('📤 Approving course:', approveBody);
    // const approveRes = await this.http.post('https://api.makhekh.com/api/admin/courses/approve', approveBody, {
    //   headers: {
    //     Authorization: `Bearer ${approveToken}`,
    //     'Content-Type': 'application/json',
    //   },
    // }).toPromise();
    // console.log('✅ Course approved:', approveRes);

    this.isLoading = false;
    this.router.navigate(['instructor-profile/create-course'], {
      queryParams: { data: JSON.stringify({ ...this.courseObj, id: courseId }) },
    });
  } catch (error: any) {
    this.isLoading = false;
    console.error('❌ Error during course submission:', error);
    alert('❌ Course submission failed.');
    this.warningMessageKey = 'warnings.courseUploadFailed';
  }
}



courseAssets = {
  photo: null as File | null,
  video: null as File | null,
  book: null as File | null,
  bookTitle: '',
  bookDescription: ''
};
onFileSelectedd2(event: any, type: string) {
  const file = event.target.files[0];
  if (!file) return;

  switch (type) {
    case 'photo':
      this.courseAssets.photo = file;
      break;
    case 'video':
      this.courseAssets.video = file;
      break;
    case 'book':
      this.courseAssets.book = file;
      break;
  }
}


 ensureMinimumRows() {
    while (this.selectedSchedule.length < 1) {
      this.selectedSchedule.push({
        courseTitle: '', date: '', time: '', lecturerName: '',
        registered: '', status: '', joinLink: '', limit: '', quizzes: []as any[]
      });
    }
  }
  isFirstRowComplete(): boolean {
    if (this.selectedSchedule.length === 0) return false; // تأكد من وجود صف واحد على الأقل

    const firstRow = this.selectedSchedule[0]; // الحصول على الصف الأول

    return firstRow.courseTitle?.trim() !== '' &&
           firstRow.date !== '' &&
           firstRow.time !== '' &&
           firstRow.lecturerName?.trim() !== '' &&
           firstRow.registered != null && firstRow.registered !== '' &&
           firstRow.status?.trim() !== '' &&
           firstRow.joinLink?.trim() !== '' &&
           firstRow.limit != null && firstRow.limit !== '';
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }



  addCoupon() {
  this.coupons.push({
    code: '',
    discount: null,
    active: true
  });
}

 removeCoupon(index: number) {
  this.coupons.splice(index, 1);
}


  saveData() {
    console.log('Saved Data:', this.courseData);
  }

  // pastePromoLink() {
  //   this.courseData.promoLink = 'https://your-promo-link.com';
  //   console.log('Promo link pasted:', this.courseData.promoLink);
  // }

// isFirstStepValid(): boolean {
//   const firstSection = this.sections[0];
//   if (
//     !firstSection ||
//     firstSection.name.trim() === '' ||
//     firstSection.description.trim() === ''
//   ) {
//     return false;
//   }

//   // نحاول نلاقي أول محاضرة مباشرة داخل content
//   const firstLectureItem = firstSection.content.find(item => item.type === 'lecture');

//   if (
//     !firstLectureItem ||
//     firstLectureItem.data.title.trim() === '' ||
//     firstLectureItem.data.description.trim() === '' ||
//     !firstLectureItem.data.video
//   ) {
//     return false;
//   }

//   return true;
// }

isFirstStepValid(): boolean {
  // التأكد من وجود معلومات في الكورس
  if (
    !this.course.description ||
    !this.course.language ||
    !this.course.level ||
    !this.course.duration
  ) {
    return false;
  }

  // التأكد من أن landingPage موجودة
  if (!this.courseObj.landingPage) {
    return false;
  }

  // التأكد من رفع الصورة والفيديو
  if (
    !this.courseObj.landingPage.photo ||
    !this.courseObj.landingPage.video
  ) {
    return false;
  }

  // التأكد من رفع الكتاب (PDF)
  if (!this.course.book) {
    return false;
  }

  // التحقق من تسعير الدورة إذا كانت مدفوعة
  if (this.courseData.isPaid) {
    if (
      this.courseData.price === undefined ||
      this.courseData.price === null ||
      this.courseData.price <= 0 ||
      !this.courseData.currency
    ) {
      return false;
    }
  }

  // في حال وجود شروط إضافية مثل اسم الكتاب ووصفه
  if (!this.course.bookTitle || !this.course.bookDescription) {
    return false;
  }

  // ✅ جميع الشروط مستوفية
  return true;
}


 changeTab(sectionIndex: number, contentIndex: number, tab: 'video' | 'description') {
  const item = this.sections[sectionIndex].content[contentIndex];
  if (item.type === 'lecture') {
    item.data.activeTab = tab;
  }
}


 addSection() {
  this.sections.push({
    name: '',
    description: '',
    attachments: [] as { file: File, name: string, description: string }[],
    content: [

    ]
  });
}

onSubSectionLectureVideoSelected(event: Event, sectionIndex: number, contentIndex: number, lectureIndex: number) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  const item = this.sections[sectionIndex].content[contentIndex];

  if (item.type === 'subsection') {
    const lecture = item.data.lectures[lectureIndex];
    if (file && file.type.startsWith('video/')) {
      lecture.video = file;
      lecture.videoName = file.name;
    } else {
      alert('Please upload a valid video file.');
    }
  }

  input.value = ''; // Clear input
}



addLecture(sectionIndex: number) {
  const newLecture: Lecture = {
    title: '',
    video: null,
    videoName: '',
    description: '',
    activeTab: 'video',
    quizzes: [],
    files: [],
    fromSubSection: false
  };

  this.sections[sectionIndex].content.push({
    type: 'lecture',
    data: newLecture
  });
}


  warningMessageKey: string = '';

// isStepThreeValid(): boolean {
//   if (this.currentStep !== 1) return true;

//   return !!this.course.description?.trim() &&
//          !!this.course.language &&
//          !!this.course.level &&
//          !!this.course.duration &&
//          !!this.course.bookTitle?.trim() &&
//          !!this.course.bookDescription?.trim();
// }


isStepThreeValid(): boolean {
  if (!this.sections || this.sections.length === 0) {
    return false; // لازم على الأقل Section واحد
  }

  for (const section of this.sections) {
    // تحقق من اسم ووصف السكشن
    if (!section.name || !section.description) {
      return false;
    }

    // تحقق من وجود محتوى في السكشن
    if (!section.content || section.content.length === 0) {
      return false;
    }

    for (const item of section.content) {
      if (item.type === 'lecture') {
        const lecture = item.data;
        if (
          !lecture.title ||
          !lecture.videoName ||
          !lecture.description
        ) {
          return false;
        }
      } else if (item.type === 'subsection') {
        const subsection = item.data;

        // تحقق من اسم ووصف الساب سيكشن
        if (!subsection.name || !subsection.description) {
          return false;
        }

        // تحقق من وجود محاضرات داخل الساب سيكشن
        if (!subsection.lectures || subsection.lectures.length === 0) {
          return false;
        }

        for (const lecture of subsection.lectures) {
          if (
            !lecture.title ||
            !lecture.videoName ||
            !lecture.description
          ) {
            return false;
          }
        }
      } else {
        return false; // نوع غير معروف
      }
    }
  }

  return true; // ✅ كل الشروط اتحققت
}


// &&
// !!this.course.photo

onFileSelectedd(event: any, type: string) {
  const file = event.target.files?.[0];
  if (!file) return;

  console.log('📦 File selected:', file);
  console.log('📎 File type:', file.type);
  console.log('📎 File name:', file.name);

  if (!this.courseObj.landingPage) {
    this.courseObj.landingPage = {};
  }

  const validImageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'bmp', 'gif', 'svg', 'jfif'];
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  const isImageByType = file.type.startsWith('image/');
  const isImageByExtension = fileExtension && validImageExtensions.includes(fileExtension);

  if (type === 'photo') {
    if (isImageByType || isImageByExtension) {
      this.courseObj.landingPage.photo = file;
      console.log('✅ Valid image file set:', file);
    } else {
      alert(`❌ Invalid image format!\nName: ${file.name}\nType: ${file.type}`);
    }
  } else if (type === 'video') {
    const validVideoTypes = ['video/mp4', 'video/avi', 'video/mov'];
    if (validVideoTypes.includes(file.type)) {
      this.courseObj.landingPage.video = file;
    } else {
      alert(`❌ Invalid video format!`);
    }
  }





if (type === 'book') {
  if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {  this.course.book = file; // ✅ صح

    console.log('📘 Book file set:', file);
  } else {
    alert(`❌ Invalid file! Please upload a PDF.\nName: ${file.name}`);
  }
}





}





  // deleteRow(index: number) {
  //   this.selectedSchedule.splice(index, 1);
  // }
selectedScheduleSections = [
  {
    title: '',
    description: '',
    schedules: [
      {
        courseTitle: '',
        date: '',
        time: '',
        lecturerName: '',
        registered: '',
        status: '',
        joinLink: '',
        limit: null
      }
    ]
  }
];


// إضافة سيكشن جديد



deleteSection(sectionIndex: number) {
  this.selectedScheduleSections.splice(sectionIndex, 1);
}





  // addRow() {
  //   this.selectedSchedule.push({
  //     courseTitle: '', date: '', time: '', lecturerName: '',
  //     registered: '', status: '', joinLink: '', limit: ''
  //   });
  // }

  onFileSelected(event: any, sectionIndex: number, contentIndex: number) {
  const file = event.target.files?.[0];
  const item = this.sections[sectionIndex].content[contentIndex];

  if (item.type !== 'lecture') return;

  if (file && file.type.startsWith('video/')) {
    item.data.video = file;
    item.data.videoName = file.name;
  } else {
    alert("Please select a valid video file.");
  }
}


  removeLecture(sectionIndex: number, contentIndex: number) {
  const item = this.sections[sectionIndex].content[contentIndex];

  if (item.type === 'lecture') {
    this.sections[sectionIndex].content.splice(contentIndex, 1);
  }
}


addSubSection(sectionIndex: number) {
  this.sections[sectionIndex].content.push({
    type: 'subsection',
    data: {
      name: '',
      description: '',
      attachments: [],
      lectures: [] // ⬅️ هيتم تعبئتها بـ SubSectionLecture فقط
    }
  });
}

removeSubSection(sectionIndex: number, contentIndex: number) {
    const contentItem = this.sections[sectionIndex].content[contentIndex];
    if (contentItem.type === 'subsection') {
      this.sections[sectionIndex].content.splice(contentIndex, 1);
    }
  }

addSubSectionFile(sectionIndex: number, contentIndex: number) {
  const item = this.sections[sectionIndex].content[contentIndex];
  if (item.type === 'subsection') {
    item.data.attachments.push({
      file: null as any,
      name: '',
      description: ''
    });
  }
}




addLectureToSubSection(sectionIndex: number, contentIndex: number) {
  const item = this.sections[sectionIndex].content[contentIndex];
  if (item.type === 'subsection') {
    const newLecture: SubSectionLecture = {
      title: '',
      video: null,
      videoName: '',
      description: '',
      activeTab: 'video',
      quizzes: [],
      files: [],
      fromSubSection: true
    };

    item.data.lectures.push(newLecture);
  }
}



removeLectureFromSubSection(sectionIndex: number, contentIndex: number, lectureIndex: number) {
  const item = this.sections[sectionIndex].content[contentIndex];
  if (item.type === 'subsection') {
    item.data.lectures.splice(lectureIndex, 1);
  }
}


  removeSection(index: number) {
    this.sections.splice(index, 1);
  }

instructorModules: ModuleSection[] = [
  {
    title: '',
    description: '',
    files: [],
    content: []
  }
];


addModule() {
  this.instructorModules.push({
    title: '',
    description: '',
    files: [],
    content: []
  });
}

removeModule(index: number) {
  this.instructorModules.splice(index, 1);
}

addModuleFile(moduleIndex: number) {
  this.instructorModules[moduleIndex].files.push({
    name: '',
    description: '',
    file: null
  });
}

removeModuleFile(moduleIndex: number, fileIndex: number) {
  this.instructorModules[moduleIndex].files.splice(fileIndex, 1);
}

onModuleFileUpload(event: any, moduleIndex: number, fileIndex: number) {
  const file = event.target.files[0];
  if (file) {
    this.instructorModules[moduleIndex].files[fileIndex].file = file;
  }
}

addLesson(moduleIndex: number) {
  this.instructorModules[moduleIndex].content.push({
    type: 'lesson',
    data: {
      title: '',
      lecturerName: '',
      description: '',
      startTime: '',
      durationInMinutes: 0,
      zoomMeetingId: '',
      zoomJoinUrl: '',
      zoomPassword: '',
      isInstant: false,
      status: '',
      maxParticipants: '',
      files: []
    }
  });
}

removeLesson(moduleIndex: number, lessonIndex: number) {
  this.instructorModules[moduleIndex].content.splice(lessonIndex, 1);
}

addLessonFile(moduleIndex: number, lessonIndex: number) {
  const item = this.instructorModules[moduleIndex].content[lessonIndex];
  if (item.type === 'lesson') {
    item.data.files.push({
      name: '',
      description: '',
      file: null
    });
  }
}

removeLessonFile(moduleIndex: number, lessonIndex: number, fileIndex: number) {
  const item = this.instructorModules[moduleIndex].content[lessonIndex];
  if (item.type === 'lesson') {
    item.data.files.splice(fileIndex, 1);
  }
}

onLessonFileUpload(event: any, moduleIndex: number, lessonIndex: number, fileIndex: number) {
  const file = event.target.files[0];
  const item = this.instructorModules[moduleIndex].content[lessonIndex];
  if (item.type === 'lesson' && file) {
    item.data.files[fileIndex].file = file;
  }
}

addUnit(moduleIndex: number) {
  this.instructorModules[moduleIndex].content.push({
    type: 'unit',
    data: {
      name: '',
      description: '',
      lessons: []
    }
  });
}

removeUnit(moduleIndex: number, unitIndex: number) {
  this.instructorModules[moduleIndex].content.splice(unitIndex, 1);
}

addLessonToUnit(moduleIndex: number, unitIndex: number) {
  const item = this.instructorModules[moduleIndex].content[unitIndex];
  if (item.type === 'unit') {
    item.data.lessons.push({
      title: '',
      lecturerName: '',
      description: '',
      startTime: '',
      durationInMinutes: 0,
      zoomMeetingId: '',
      zoomJoinUrl: '',
      zoomPassword: '',
      isInstant: false,
      status: '',
      maxParticipants: '',
      files: []
    });
  }
}

removeLessonFromUnit(moduleIndex: number, unitIndex: number, lessonIndex: number) {
  const item = this.instructorModules[moduleIndex].content[unitIndex];
  if (item.type === 'unit') {
    item.data.lessons.splice(lessonIndex, 1);
  }
}

// save draft
isLoading2: boolean = false;

async saveAsDraft(): Promise<void> {
  this.warningMessageKey = '';


  // Step 1: إذا كانت في الخطوة الأولى، تحقق من البيانات
  if (this.currentStep === 0) {

    if (!this.isFirstStepValid()) {
      this.warningMessageKey = 'warnings.completeStepOne';
      return;
    }

    try {
       this.isLoading2 = true;
      const userData = localStorage.getItem('user');
      const token = userData ? JSON.parse(userData).token : null;
      if (!token) throw new Error('Missing token');

      const headers = { Authorization: `Bearer ${token}` };
      const formData = new FormData();

      const {
        landingPage,
        courseTitle,
        categoryId,
        subcategoryId,
        targetAudience,
        requirements,
        courseType
      } = this.courseObj;

      // Validate and append files
      if (!(landingPage?.photo instanceof File)) {
        alert("❌ Please upload a valid image.");
        return;
      }
      formData.append("thumbnail", landingPage.photo);

      if (!(landingPage?.video instanceof File)) {
        alert("❌ Please upload a valid video.");
        return;
      }
      formData.append("promoVideo", landingPage.video);

      // Map course type
      const typeMap: Record<string, string> = {
        "Recorded Educational Courses": "1",
        "Live Streamed Educational Courses": "2"
      };

      // Determine price & currency
      const finalPrice = this.courseData.isPaid ? (this.courseData.price ?? 0) : 0;
      const currency = this.courseData.isPaid ? (this.courseData.currency || "SAR") : "SAR";

      // Append all course basic data
      formData.append("categoryId", categoryId);
      if (subcategoryId) formData.append("subcategoryId", subcategoryId);
      formData.append("title", courseTitle);
      formData.append("language", this.course.language?.toLowerCase() || 'english');
      formData.append("prerequisites", requirements || '');
      formData.append("targetAudience", targetAudience || '');
      formData.append("description", this.course.description || 'Draft description');
      formData.append("level", this.course.level?.toString() || '1');
      formData.append("type", typeMap[courseType as keyof typeof typeMap] || '');
      formData.append("price", finalPrice.toString());
      formData.append("currency", currency);
      formData.append("isDrafted", "true");  // Append draft flag

      // Send draft
      console.log("📤 Sending Draft Course FormData:");
      for (const [key, val] of formData.entries()) {
        console.log(`- ${key}:`, val);
      }

      const courseResponse: any = await this.http
        .post("https://api.makhekh.com/api/Courses", formData, { headers })
        .toPromise();

      console.log("✅ Draft Course Created Response:", courseResponse);
      const courseId = courseResponse.data?.id;

      if (this.course.book && this.course.bookTitle && this.course.bookDescription) {
        const f = new FormData();
        f.append("EntityId", courseId);
        f.append("FileName", this.course.bookTitle);
        f.append("Description", this.course.bookDescription);
        f.append("attachment", this.course.book);
        f.append("EntityType", "1");

        console.log("📤 Uploading Book File:", this.course.bookTitle);
        const bookUploadRes = await this.http.post("https://api.makhekh.com/api/summary-attachments", f, { headers }).toPromise();
        console.log("✅ Book File Uploaded:", bookUploadRes);
      }

      // Navigate back to course creation screen with course data
      this.router.navigate(['instructor-profile/create-course'], {
        queryParams: {
          data: JSON.stringify({ ...this.courseObj, id: courseResponse.data?.id })
        }
      });

    } catch (error) {
      console.error('❌ Error saving draft:', error);
      this.warningMessageKey = 'warnings.draftSaveFailed';
    } finally {
      this.isLoading2 = false;
    }

  } else if (this.currentStep === 1) {  // Step 2: Curriculum step
    // تحقق من step ثلاثة فقط إذا كنت في الخطوة 1
    if (!this.isStepThreeValid()) {
      this.warningMessageKey = 'warnings.completeStepOne';
      this.isLoading2 = false;
      return;
    }

    try {
       this.isLoading2 = true;
      // Continue the course flow with isDraft = true to save as draft
      await this.submitCourseFlowDraft(true);
      this.isLoading2 = false;

    } catch (error) {
      console.error('❌ Error submitting course flow:', error);
      this.warningMessageKey = 'warnings.courseUploadFailed';
    }
  }
}
async submitCourseFlowDraft(isDrafted: boolean) {
  try {
    this.isLoading2 = true;

    const userData = localStorage.getItem('user');
    const token = userData ? JSON.parse(userData).token : null;
    if (!token) throw new Error('Missing token');

    const headers = { Authorization: `Bearer ${token}` };
    const formData = new FormData();

    const { landingPage, courseTitle, categoryId, subcategoryId, targetAudience, requirements, courseType } = this.courseObj;

    if (!(landingPage?.photo instanceof File)) return alert("❌ Please upload a valid image.");
    formData.append("thumbnail", landingPage.photo);

    if (!(landingPage?.video instanceof File)) return alert("❌ Please upload a valid video.");
    formData.append("promoVideo", landingPage.video);

    const typeMap: Record<string, string> = {
      "Recorded Educational Courses": "1",
      "Live Streamed Educational Courses": "2"
    };

    const finalPrice = this.courseData.isPaid ? (this.courseData.price ?? 0) : 0;
    const currency = this.courseData.isPaid ? (this.courseData.currency || "SAR") : "SAR";
    console.log(landingPage.description )

    formData.append("categoryId", categoryId);
    if (subcategoryId) formData.append("subcategoryId", subcategoryId);
    formData.append("title", courseTitle);
    formData.append("language", landingPage.language?.toLowerCase() || '');
    formData.append("prerequisites", requirements || '');
    formData.append("targetAudience", targetAudience || '');
    formData.append("description", landingPage.description || '');
    formData.append("level", landingPage.level?.toString() || '');
    formData.append("type", typeMap[courseType as keyof typeof typeMap] || '');
    formData.append("price", finalPrice.toString());
    formData.append("currency", currency);
    formData.append("isDrafted", `${isDrafted}`);

    console.log("📤 Sending Course FormData:");
    for (const [key, val] of formData.entries()) console.log(`- ${key}:`, val);

    const courseResponse: any = await this.http.post("https://api.makhekh.com/api/Courses", formData, { headers }).toPromise();
    console.log("✅ Course Created Response:", courseResponse);

    const courseId = courseResponse.data?.id;
    this.courseObj.curriculum = [...this.sections];

    for (const [sectionIndex, section] of this.courseObj.curriculum.entries()) {
      const sectionBody = {
        title: section.name,
        description: section.description,
        orderInCourse: sectionIndex
      };

      console.log("📤 Creating Section:", sectionBody);

      const sectionRes: any = await this.http.post(
        `https://api.makhekh.com/api/courses/${courseId}/Sections`,
        sectionBody,
        { headers: { ...headers, 'Content-Type': 'application/json' } }
      ).toPromise();
      console.log("✅ Section Created:", sectionRes);
      const sectionId = sectionRes.data.id;

      for (const file of section.attachments || []) {
        const sForm = new FormData();
        sForm.append("EntityId", sectionId);
        sForm.append("FileName", file.name);
        sForm.append("Description", file.description);
        sForm.append("attachment", file.file);
        sForm.append("EntityType", "2");

        console.log("📤 Uploading Section File:", file);
        const fileRes = await this.http.post("https://api.makhekh.com/api/summary-attachments", sForm, { headers }).toPromise();
        console.log("✅ Section File Uploaded:", fileRes);
      }

      for (const [contentIndex, content] of section.content.entries()) {
        if (content.type === "subsection") {
          const sub = content.data;
          const subBody = {
            title: sub.name,
            description: sub.description,
            orderInCourse: contentIndex
          };

          console.log("📤 Creating SubSection:", subBody);
          const subRes: any = await this.http.post(
            `https://api.makhekh.com/api/courses/section/${sectionId}/subsection`,
            subBody,
            { headers: { ...headers, 'Content-Type': 'application/json' } }
          ).toPromise();
          console.log("✅ SubSection Created:", subRes);
          const subId = subRes.data.id;

          for (const [subIndex, lecture] of sub.lectures.entries()) {
            const lForm = new FormData();
            lForm.append("Title", lecture.title);
            lForm.append("SectionId", sectionId);
            lForm.append("SubSectionId", subId);
            lForm.append("orderInCourse", subIndex.toString());
            if (lecture.video) lForm.append("videoFile", lecture.video);
            if (lecture.description) lForm.append("description", lecture.description);

            console.log("📤 Uploading Subsection Lecture:", lecture.title);
            const lecRes: any = await this.http.post(
              `https://api.makhekh.com/api/courses/${courseId}/Lectures/video`,
              lForm,
              { headers }
            ).toPromise();
            console.log("✅ Subsection Lecture Created:", lecRes);

            for (const file of lecture.files || []) {
              const f = new FormData();
              f.append("EntityId", lecRes.data.id);
              f.append("FileName", file.name);
              f.append("Description", file.description);
              f.append("attachment", file.file);
              f.append("EntityType", "3");

              console.log("📤 Uploading Subsection Lecture File:", file.name);
              const fileRes = await this.http.post("https://api.makhekh.com/api/summary-attachments", f, { headers }).toPromise();
              console.log("✅ Subsection Lecture File Uploaded:", fileRes);
            }
          }

        } else if (
  content.type === "lecture" &&
  !content.data.fromSubSection &&
  !section.content.some((c: SectionContentItem) =>
    c.type === "subsection" &&
    (c.data as SubSection).lectures?.some(
      (l: SubSectionLecture) => l.title === content.data.title
    )
  )
)
{
          const lec = content.data;
          const lForm = new FormData();
          lForm.append("Title", lec.title);
          lForm.append("SectionId", sectionId);
          lForm.append("orderInCourse", contentIndex.toString());
          if (lec.video) lForm.append("videoFile", lec.video);
          if (lec.description) lForm.append("description", lec.description);

          console.log("📤 Uploading Lecture:", lec.title);
          const lecRes: any = await this.http.post(
            `https://api.makhekh.com/api/courses/${courseId}/Lectures/video`,
            lForm,
            { headers }
          ).toPromise();
          console.log("✅ Lecture Created:", lecRes);

          for (const file of lec.files || []) {
            const f = new FormData();
            f.append("EntityId", lecRes.data.id);
            f.append("FileName", file.name);
            f.append("Description", file.description);
            f.append("attachment", file.file);
            f.append("EntityType", "3");

            console.log("📤 Uploading Lecture File:", file.name);
            const fileRes = await this.http.post("https://api.makhekh.com/api/summary-attachments", f, { headers }).toPromise();
            console.log("✅ Lecture File Uploaded:", fileRes);
          }
        } else {
          console.log("⏭️ Skipping:", content);
        }
      }
    }

    for (const coupon of this.coupons) {
      if (!coupon.code || coupon.discount == null) continue;

      const body = {
        courseId,
        code: coupon.code,
        discountPercentage: coupon.discount
      };
      console.log("📤 Creating Coupon:", body);
      const couponRes = await this.http.post("https://api.makhekh.com/api/Coupons", body, {
        headers: { ...headers, 'Content-Type': 'application/json' }
      }).toPromise();
      console.log("✅ Coupon Created:", couponRes);
    }

    if (this.course.book && this.course.bookTitle && this.course.bookDescription) {
      const f = new FormData();
      f.append("EntityId", courseId);
      f.append("FileName", this.course.bookTitle);
      f.append("Description", this.course.bookDescription);
      f.append("attachment", this.course.book);
      f.append("EntityType", "1");

      console.log("📤 Uploading Book File:", this.course.bookTitle);
      const bookUploadRes = await this.http.post("https://api.makhekh.com/api/summary-attachments", f, { headers }).toPromise();
      console.log("✅ Book File Uploaded:", bookUploadRes);
    }

    const approveBody = {
      courseId,
      approve: true,
      comment: "ok"
    };

    this.isLoading2 = false;
    this.router.navigate(['instructor-profile/create-course'], {
      queryParams: { data: JSON.stringify({ ...this.courseObj, id: courseId }) }
    });

  } catch (error) {
    this.isLoading2 = false;
    console.error("❌ Error during course submission:", error);
    this.warningMessageKey = "warnings.courseUploadFailed";
  }
}






}
