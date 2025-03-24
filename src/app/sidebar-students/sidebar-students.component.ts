import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar-students',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './sidebar-students.component.html',
  styleUrl: './sidebar-students.component.css'
})
export class SidebarStudentsComponent {

  isExpanded = false; // لتوسيع/تصغير الـ Sidebar
  activeSection: string | null = null; // لتحديد القسم المفتوح حاليًا

  // توسيع القائمة عند مرور الماوس عليها
  expandSidebar() {
    if (!this.activeSection) {
      this.isExpanded = true;
    }
  }

  // تصغير القائمة عند مغادرة الماوس
  collapseSidebar() {
    if (!this.activeSection) {
      this.isExpanded = false;
    }
  }


  toggleSection(section: string) {
    if (this.activeSection === section) {
      this.activeSection = null; // فتح القسم المحدد

    } else {
      this.activeSection = section; // فتح القسم المحدد
      this.isExpanded = false;

  }}


  // فتح/غلق القوائم الفرعية
  // toggleSection(section: string) {
  //   if (this.activeSection !== section) {
  //     this.activeSection = section; // فتح القسم المحدد
  //     this.isExpanded = false;
  //   }

  // }

  selectedItem: string = '';

selectItem(item: string) {
  this.selectedItem = item;
}


}
