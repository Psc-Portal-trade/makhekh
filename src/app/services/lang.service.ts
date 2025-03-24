import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // معناه ان السيرفيس دي هتبقى Global لكل الابليكشن
})
export class LangService {
  private langSubject = new BehaviorSubject<string>(localStorage.getItem('lang') || 'en');
  lang$ = this.langSubject.asObservable(); // دي اللي الكومبوننتات هتسمعها

  setLang(lang: string): void {
    this.langSubject.next(lang); // بتبعت قيمة اللغة الجديدة لكل المشتركين
    localStorage.setItem('lang', lang); // تخزين اللغة الجديدة في LocalStorage
  }
}
