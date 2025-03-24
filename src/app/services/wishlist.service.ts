import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private listItems = new BehaviorSubject<any[]>([]);
  listItems$ = this.listItems.asObservable();

  private listCount = new BehaviorSubject<number>(0);
  listCount$ = this.listCount.asObservable();


  constructor() { }

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
