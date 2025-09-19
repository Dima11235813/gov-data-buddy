import { Component, Input, OnInit, Attribute, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {
  // Ensure the host wrapper is not focusable or announced as an interactive element
  @HostBinding('attr.tabindex') hostTabIndex: string | null = null;
  @HostBinding('attr.role') hostRole: string | null = null;
  @HostBinding('attr.aria-label') hostAriaLabel: string | null = null;
  @Input() routerLink: string | any[] | null = null;
  @Input() queryParams: Record<string, unknown> | null = null;
  @Input() queryParamsHandling: 'merge' | 'preserve' | undefined = 'preserve';
  @Input() fragment: string | undefined;
  @Input() preserveFragment = true;

  @Input() href: string | null = null; // External links fallback
  @Input() target: string | null = null;
  @Input() rel: string | null = null;

  @Input() ariaLabel: string | null = null;
  @Input() linkClass: string | string[] | null = null;

  // RouterLinkActive support
  @Input() routerLinkActive: string | string[] | undefined;

  // Angular Material style support for anchors
  @Input() materialStyle: 'button' | 'raised' | 'stroked' | 'flat' | 'icon' | null = null;
  @Input() color: 'primary' | 'accent' | 'warn' | undefined;

  computedFragment: string | undefined;

  private readonly hostClassAttr: string | null;

  constructor(
    private route: ActivatedRoute,
    @Attribute('class') hostClassAttr: string | null
  ) {
    this.hostClassAttr = hostClassAttr;
  }

  ngOnInit(): void {
    // Preserve current route fragment if requested and none provided
    if (this.preserveFragment && !this.fragment) {
      this.computedFragment = this.route.snapshot.fragment ?? undefined;
    } else {
      this.computedFragment = this.fragment;
    }

    // If no explicit linkClass was provided, forward any static classes
    // applied to the host <app-link> element to the inner anchor element.
    if ((this.linkClass == null || (Array.isArray(this.linkClass) && this.linkClass.length === 0)) && this.hostClassAttr) {
      this.linkClass = this.hostClassAttr;
    }

    // Remove any perceivable interactivity from the host wrapper so
    // screen readers and keyboard navigation only interact with the inner <a>.
    this.hostTabIndex = null;
    this.hostRole = null;
    this.hostAriaLabel = null;
  }

  get relAttr(): string | null {
    if (this.rel) return this.rel;
    if (this.target === '_blank') return 'noopener';
    return null;
  }
}


