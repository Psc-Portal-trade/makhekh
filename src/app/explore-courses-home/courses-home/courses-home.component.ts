import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // <-- هنا
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';
import { CategoriesService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses-home',
  standalone: true,
  imports: [ HttpClientModule,CommonModule], // <-- هنا
  templateUrl: './courses-home.component.html',
  styleUrl: './courses-home.component.css'
})
export class CoursesHomeComponent implements OnInit {
  categories: any[] = [];

  constructor(private categoriesService: CategoriesService) {}
selectedCategoryName: string | null = null;

onSelectCategory(name: string) {
  this.selectedCategoryName = name;
}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getCategories();
  }

  getCategories() {
  this.categoriesService.getCategories().subscribe({
    next: (res) => {
      this.categories = res.data; // <-- نوصل للـ data هنا
    },
    error: (err) => {
      console.error('Error fetching categories:', err);
    }
  });
}

}
