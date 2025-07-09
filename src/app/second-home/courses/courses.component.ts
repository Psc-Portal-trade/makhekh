import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';
import { CategoriesService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core'; // ✅
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  imports: [ CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  categories: any[] = [];

  constructor(private categoriesService: CategoriesService,private router: Router) {}
selectedCategoryName: string | null = null;
@Output() categorySelected = new EventEmitter<string>(); // ✅

onSelectCategory(name: string) {
  this.selectedCategoryName = name;
  this.categorySelected.emit(name); // ✅ إرسال اسم الكاتيجوري للأب
}
goToExploreWithCategory(category: string) {
  this.router.navigate(['/explore'], {
    queryParams: { category }
  });
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
