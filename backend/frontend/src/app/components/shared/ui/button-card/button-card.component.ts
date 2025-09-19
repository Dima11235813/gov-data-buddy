import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-card',
  templateUrl: './button-card.component.html',
  styleUrls: ['./button-card.component.scss']
})
export class ButtonCardComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() icon: string | undefined;
  @Input() routerLink: string | string[] | null = null;

  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    this.clicked.emit();
  }
}


