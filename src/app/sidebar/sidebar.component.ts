import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-sidebar',
  imports: [FormsModule, CommonModule, RouterLink, TranslocoPipe],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isExpanded = false;
  activeSection: string | null = null;
  selectedItem: string = '';
  sidebar1Opened = false;
  isMobileMenuOpen = false;

  constructor(private router: Router) {
    this.selectedItem = localStorage.getItem('selectedItem') || '';
    this.activeSection = localStorage.getItem('activeSection') || null;
    this.sidebar1Opened = !!this.selectedItem || !!this.activeSection;
  
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.split('?')[0].split('#')[0] === '/instructor-profile') {
          this.closeSidebar1();
        }
      }
    });
  
    // تأكد أن sidebar1 مغلق عند تحميل الصفحة على instructor-profile
    if (this.router.url.split('?')[0].split('#')[0] === '/instructor-profile') {
      this.closeSidebar1();
    }
  }
  

  expandSidebar() {
    if (!this.sidebar1Opened) {
      this.isExpanded = true;
    }
  }

  collapseSidebar() {
    if (!this.sidebar1Opened && !this.activeSection) {
      this.isExpanded = false;
    }
  }

  toggleSection(section: string) {
    if (section === 'courses') {
      this.activeSection = null;
      this.sidebar1Opened = false;
      this.isExpanded = false;
    } else {
      this.activeSection = this.activeSection === section ? null : section;
      this.sidebar1Opened = !!this.activeSection;
    }

    this.isExpanded = false;
    localStorage.setItem('activeSection', this.activeSection || '');
  }

  selectItem(item: string) {
    this.selectedItem = item;
    localStorage.setItem('selectedItem', item);
    this.sidebar1Opened = true;
    this.isExpanded = false;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  private closeSidebar1() {
    this.sidebar1Opened = false;
    this.activeSection = null;
    this.selectedItem = '';
    localStorage.removeItem('activeSection');
    localStorage.removeItem('selectedItem');
  }
  
}
