import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';
import { CategoriesService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  imports: [ CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
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
