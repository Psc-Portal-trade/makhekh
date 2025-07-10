import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecondNavComponent } from '../navbar/second-nav/second-nav.component';
import { TranslocoPipe } from '@ngneat/transloco';
interface StructuredQuestion {
  title: string;
  contentItems: {
    title: { type: string; name?: string; parent?: string } | string;
    questions: any[];
  }[];
}

@Component({
  selector: 'app-exam-result',
  imports: [CommonModule,SecondNavComponent,TranslocoPipe],
  templateUrl: './exam-result.component.html',
  styleUrl: './exam-result.component.css'
})
export class ExamResultComponent implements OnInit {
  quiz: any;
  examAttempts: any;
  currentExamCourse: any;
structuredQuestions: StructuredQuestion[] = [];
quizType: number = 1;

  constructor(private router: Router) {}

ngOnInit(): void {
  window.scrollTo(0, 0);

  const examAttemptsStr = localStorage.getItem('examAttempts');
  const currentExamCourseStr = localStorage.getItem('currentExamCourse');

  if (examAttemptsStr && currentExamCourseStr) {
    const attempts = JSON.parse(examAttemptsStr);
    this.currentExamCourse = JSON.parse(currentExamCourseStr);

    this.examAttempts = attempts[0];
    this.quiz = this.examAttempts;

this.quizType = this.findQuizType(this.quiz.quizId, this.currentExamCourse);

    // ✅ ربط الأسئلة الكاملة من الكويز
    const fullQuiz = this.currentExamCourse?.quizzes?.find(
      (q: any) => q.id === this.quiz.quizId
    );

    if (fullQuiz) {
      this.quiz.questions.forEach((q: any) => {
        const match = fullQuiz.questions.find((fq: any) => fq.text === q.text);

        if (match) {
          q.choices = match.choices;
          q.modelAnswer = match.modelAnswer;
          q.sectionId = match.sectionId;
          q.subSectionId = match.subSectionId;
          q.lectureId = match.lectureId;
          q.courseId = match.courseId;
        }
      });
    }

    this.structureQuestionsByCourse();
  } else {
    this.router.navigate(['/my-courses']);
  }
}
get isPassed(): boolean {
  return this.examAttempts?.passed;
}

get timeUsed(): string {
  return this.examAttempts?.timeUsed;
}

get totalQuestions(): number {
  return this.examAttempts?.questions?.length || 0;
}

get correctAnswers(): number {
  return this.getCorrectAnswersCount(this.examAttempts.questions || []);
}

get unanswered(): number {
  return this.examAttempts?.unanswered || 0;
}

get percentage(): number {
  return this.examAttempts?.percentage || 0;
}


getCorrectAnswersCount(questions: any[]): number {
  return questions.filter(q => this.isCorrect(q)).length;
}
isTitleObject(title: any): title is { type: string; name?: string; parent?: string } {
  return typeof title === 'object' && title !== null && 'type' in title;
}

findQuizType(quizId: string, course: any): number {
  // 1️⃣ بحث داخل الكورس نفسه
  const quizAtCourse = course.quizzes?.find((q: any) => q.id === quizId);
  if (quizAtCourse) return quizAtCourse.type;

  // 2️⃣ بحث داخل السكاشن
  for (const section of course.sections || []) {
    const sectionQuiz = section.quizzes?.find((q: any) => q.id === quizId);
    if (sectionQuiz) return sectionQuiz.type;

    // 3️⃣ بحث داخل الصب سيكشنز
    for (const sub of section.subSections || []) {
      const subQuiz = sub.quizzes?.find((q: any) => q.id === quizId);
      if (subQuiz) return subQuiz.type;
    }

    // 4️⃣ بحث داخل المحاضرات
    for (const lecture of section.lectures || []) {
      const lectureQuiz = lecture.quizzes?.find((q: any) => q.id === quizId);
      if (lectureQuiz) return lectureQuiz.type;
    }

    // 5️⃣ محاضرات داخل الصب سيكشنز
    for (const sub of section.subSections || []) {
      for (const lecture of sub.lectures || []) {
        const lectureQuiz = lecture.quizzes?.find((q: any) => q.id === quizId);
        if (lectureQuiz) return lectureQuiz.type;
      }
    }
  }

  // ❌ لم يتم العثور: نرجع النوع الافتراضي 1
  return 1;
}

structureQuestionsByCourse() {
  const courseSections = this.currentExamCourse.sections;
  const allQuestions = this.quiz.questions;

  const result: StructuredQuestion[] = [];
  const matchedQuestionIds = new Set<number>();

  for (const section of courseSections) {
    const sectionItem: StructuredQuestion = {
      title: section.title,
      contentItems: []
    };

    // ⬅️ أولًا: محاضرات مباشرة داخل السيكشن
    const directLectures = section.lectures || [];
    for (const lecture of directLectures) {
      const questions = allQuestions.filter((q: any) => q.lectureId === lecture.id);
      questions.forEach((q: any) => matchedQuestionIds.add(q.id));

      if (questions.length > 0) {
        sectionItem.contentItems.push({
          title: {
            type: 'lecture',
            name: lecture.title
          },
          questions
        });
      }
    }

    // ⬅️ ثانيًا: الصب سيكشنز
    const subSections = section.subSections || [];
    for (const sub of subSections) {
      // 1) أسئلة على الصب سيكشن نفسه
      const subSectionQuestions = allQuestions.filter((q: any) =>
        q.subSectionId === sub.id && !q.lectureId
      );
      subSectionQuestions.forEach((q: any) => matchedQuestionIds.add(q.id));

      if (subSectionQuestions.length > 0) {
        sectionItem.contentItems.push({
          title: {
            type: 'subSection',
            name: sub.title
          },
          questions: subSectionQuestions
        });
      }

      // 2) المحاضرات داخل الصب سيكشن
      const lecturesInSub = sub.lectures || [];
      for (const lecture of lecturesInSub) {
        const questions = allQuestions.filter((q: any) => q.lectureId === lecture.id);
        questions.forEach((q: any) => matchedQuestionIds.add(q.id));

        if (questions.length > 0) {
          sectionItem.contentItems.push({
            title: {
              type: 'subSectionLecture',
              name: lecture.title,
              parent: sub.title
            },
            questions
          });
        }
      }
    }

    // ⬅️ ثالثًا: أسئلة مباشرة على السيكشن بدون محاضرة أو صب سيكشن
    const sectionOnlyQuestions = allQuestions.filter((q: any) =>
      q.sectionId === section.id &&
      !q.subSectionId && !q.lectureId
    );
    sectionOnlyQuestions.forEach((q: any) => matchedQuestionIds.add(q.id));

    if (sectionOnlyQuestions.length > 0) {
      sectionItem.contentItems.push({
        title: {
          type: 'sectionQuestions'
        },
        questions: sectionOnlyQuestions
      });
    }

    if (sectionItem.contentItems.length > 0) {
      result.push(sectionItem);
    }
  }

  // ⬅️ رابعًا: أسئلة عامة على الكورس كله
  const unmatched = allQuestions.filter((q: any) => !matchedQuestionIds.has(q.id));
  if (unmatched.length > 0) {
    result.push({
      title: 'examResult.generalQuestions',
      contentItems: [
        {
          title: {
            type: 'general'
          },
          questions: unmatched
        }
      ]
    });
  }

  this.structuredQuestions = result;
}



getAnsweredCount(questions: any[]): number {
  return questions.filter(q => q.studentAnswer !== null && q.studentAnswer !== undefined).length;
}

  isCorrect(question: any): boolean {
    return question.studentAnswer === question.modelAnswer;
  }

  currentPage: number = 1;
  questionsPerPage: number = 10;

  get paginatedQuestions() {
    const start = (this.currentPage - 1) * this.questionsPerPage;
    return this.quiz.questions.slice(start, start + this.questionsPerPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  get totalPages(): number {
    return Math.ceil(this.quiz.questions.length / this.questionsPerPage);
  }

  getOptionLetter(index: number): string {
    return String.fromCharCode(97 + index); // a), b), ...
  }


}
