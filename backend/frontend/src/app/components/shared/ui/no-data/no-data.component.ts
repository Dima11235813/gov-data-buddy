import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss']
})
export class NoDataComponent {
  @Input() message: string = 'No data available';
  @Input() subtitle: string = 'Try adjusting your filters or check back later.';
  @Input() icon: string = 'inbox';
}
