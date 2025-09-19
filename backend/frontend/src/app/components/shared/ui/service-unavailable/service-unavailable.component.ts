import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-service-unavailable',
  templateUrl: './service-unavailable.component.html',
  styleUrls: ['./service-unavailable.component.scss']
})
export class ServiceUnavailableComponent {
  @Input() message: string = 'Service Unavailable';
  @Input() subtitle: string = 'We\'re experiencing technical difficulties. Please try again later.';
  @Input() showRetry: boolean = true;
  @Input() retryText: string = 'Try Again';

  @Output() retryClicked = new EventEmitter<void>();

  onRetry() {
    this.retryClicked.emit();
  }
}
