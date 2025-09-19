import { Component, Input } from '@angular/core';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  @Input() pageHeading = 'Government Data Buddy';
  @Input() subtitle: string | null = null;
  @Input() showNav: boolean = false;
}
