import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-finish-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-finish-popup.component.html',
  styleUrls: ['./confirm-finish-popup.component.css']
})
export class ConfirmFinishPopupComponent {
  @Input() isOpen: boolean = false;
  @Input() answeredCount: number = 0;
  @Input() unansweredCount: number = 0;
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }
  onCancel() {
    this.cancel.emit();
  }
}
