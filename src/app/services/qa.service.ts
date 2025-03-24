import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QaService {
  private questions: { id: number, question: string, answer?: string }[] = [];
  private questionsSubject = new BehaviorSubject(this.questions);

  constructor() {}

  getQuestions(): Observable<{ id: number, question: string, answer?: string ,course?: string }[]> {
    return this.questionsSubject.asObservable();
  }

  addQuestion(questionText: string) {
    if (questionText.trim()) {
      const newQuestion = { id: this.questions.length + 1, question: questionText };
      this.questions.push(newQuestion);
      this.questionsSubject.next([...this.questions]); // تحديث القائمة مباشرةً
      console.log('New Question Added:', newQuestion); // ✅ تتبع البيانات
    }
  }
  addAnswer(questionId: number, answerText: string) {
    this.questions = this.questions.map(q =>
      q.id === questionId ? { ...q, answer: answerText } : q
    );
    this.questionsSubject.next([...this.questions]); // تحديث القائمة
  }

  
}
