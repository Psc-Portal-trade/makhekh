import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-exam-summary-modal',
  standalone: true,
  imports: [CommonModule,TranslocoPipe],
  templateUrl: './exam-summary-modal.component.html',
  styleUrls: ['./exam-summary-modal.component.css']
})
export class ExamSummaryModalComponent {
  @Input() isOpen: boolean = false;
  @Input() questions: any[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() finishAttempt = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onFinishAttempt() {
    this.finishAttempt.emit();
  }
}
