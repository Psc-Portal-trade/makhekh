import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private baseUrl = 'https://api.makhekh.com/api/wishlist';

  private listItems = new BehaviorSubject<any[]>([]);
  listItems$ = this.listItems.asObservable();

  private listCount = new BehaviorSubject<number>(0);
  listCount$ = this.listCount.asObservable();

  constructor(private http: HttpClient) {}

  // ✅ استخراج التوكن من localStorage عند كل طلب
  private getHeaders(): HttpHeaders {
    const user = localStorage.getItem('user');
    const token = user ? JSON.parse(user).token : null;

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // ==========================
  // ✅ API-based methods
  // ==========================

 loadWishlistFromApi() {
  this.http.get<any>(`${this.baseUrl}`).subscribe(response => {
    console.log('wishlist response from API:', response);

    const items = response.data || [];  // 👈 Extract the `data` array
    this.listItems.next(items);
    this.listCount.next(items.length);
  });
}

  fetchWishlistFromAPI(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, {
      headers: this.getHeaders()
    }).pipe(
      tap((items) => {
        this.listItems.next(items);
        this.listCount.next(items.length);
      })
    );
  }

  addCourseToWishlistAPI(courseId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${courseId}`, null, {
      headers: this.getHeaders()
    }).pipe(
     tap(response => {
      console.log('✅ addTowishlistAPI response:', response); // 👈 هنا بنطبع البيانات
      this.fetchWishlistFromAPI().subscribe();
    })
    );
  }

  removeCourseFromWishlistAPI(courseId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${courseId}`, {
      headers: this.getHeaders()
    }).pipe(
      tap(() => this.fetchWishlistFromAPI().subscribe())
    );
  }

  isCourseInCart(courseId: string): boolean {
    return this.listItems.getValue().some(item => item.id === courseId);
  }

  // ==========================
  // ✅ Local-only logic
  // ==========================

  addToList(item: any) {
    const currentItems = this.listItems.getValue();
    if (!currentItems.some(listItem => listItem.id === item.id)) {
      const updatedItems = [...currentItems, item];
      this.listItems.next(updatedItems);
      this.listCount.next(updatedItems.length);
    }
  }

  removeFromList(itemId: number) {
    const updatedItems = this.listItems.getValue().filter(listItem => listItem.id !== itemId);
    this.listItems.next(updatedItems);
    this.listCount.next(updatedItems.length);
  }

  isItemInList(itemId: number): boolean {
    return this.listItems.getValue().some(listItem => listItem.id === itemId);
  }
}
