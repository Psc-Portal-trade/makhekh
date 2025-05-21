import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';
import { QuestionBankForAnyTopicComponent } from "../question-bank-for-any-topic/question-bank-for-any-topic.component";
import { QuestionsToYourUploadedCourseComponent } from "../questions-to-your-uploaded-course/questions-to-your-uploaded-course.component";

@Component({
  selector: 'app-quiz',
  imports: [FormsModule, CommonModule, RouterLink, TranslocoPipe, QuestionBankForAnyTopicComponent, QuestionsToYourUploadedCourseComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  step: number = 1; // تتبع رقم الخطوة الحالية
  selectedQuizType: number | null = null; // نوع الكويز المختار
  quizTitle: string = '';
  selectedCategory: string = ''; // الفئة المختارة
  learningObjectives: string = '';
  requirements: string = '';
  targetAudience: string = '';

  // بيانات الكويز
  quizData = {
    quizType: '', // نوع بنك الأسئلة
    category: '',
    learningObjectives: '',
    requirements: '',
    targetAudience: '',
    quizTitle: ''
  };
questionBankInfo = {
  title: '',
  description: '',
  time: '',
  duration: '',
  passingGrade: '',
  questionOrder: ''
};
uploadedQuizInfo = {
  title: '',
  description: '',
  time: '',
  duration: '',
  passingGrade: '',
  questionOrder: ''
};

  // قائمة أنواع الكويز
  quizzes = [
    {
      image: 'assets/quiz.png',
      title: 'quiz-component.title1',
      description: 'quiz-component.description1'
    },
    {
      image: 'assets/quiz2.png',
      title: 'quiz-component.title2',
      description: 'quiz-component.description2'
    }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  // اختيار نوع الكويز
  selectQuizType(index: number): void {
    this.selectedQuizType = index;
    this.quizData.quizType = this.quizzes[index].title; // حفظ نوع بنك الأسئلة المختار
  }

  // عدد الخطوات حسب نوع الكويز
  get maxSteps(): number {
    if (this.selectedQuizType === 0) return 1; // خطوات نوع 1
    if (this.selectedQuizType === 1) return 1; // خطوات نوع 2
    return 0;
  }

  continue(): void {
    if (this.step < this.maxSteps) {
      this.step++;
    }
  }

  previous(): void {
    if (this.step > 1) {
      this.step--;
    }
  }

  submitQuiz(): void {
    this.isLearningObjectivesEmpty = this.learningObjectives.trim() === '';
    this.isRequirementsEmpty = this.requirements.trim() === '';
    this.isTargetAudienceEmpty = this.targetAudience.trim() === '';

    if (!this.isLearningObjectivesEmpty && !this.isRequirementsEmpty && !this.isTargetAudienceEmpty) {
      this.quizData.quizTitle = this.quizTitle;
      this.quizData.category = this.selectedCategory;
      this.quizData.learningObjectives = this.learningObjectives;
      this.quizData.requirements = this.requirements;
      this.quizData.targetAudience = this.targetAudience;

      console.log("🚀 Quiz data before navigation:", this.quizData);

      this.router.navigate(['/createQuizDetails'], {
        queryParams: { quiz: encodeURIComponent(JSON.stringify(this.quizData)) }
      });
    }
  }

  // للتحقق من الحقول الفارغة
  isLearningObjectivesEmpty: boolean = false;
  isRequirementsEmpty: boolean = false;
  isTargetAudienceEmpty: boolean = false;
}
