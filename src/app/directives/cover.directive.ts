import { Directive, ElementRef, Input, inject } from '@angular/core';

// shared cover behaviour: tries the fallback once, then hides so the
// .cover-placeholder sibling shows. exposes `loaded` for components that fade in
@Directive({
  selector: 'img[appCover]',
  exportAs: 'cover',
  host: {
    '[hidden]': 'failed',
    '(load)': 'loaded = true',
    '(error)': 'onError()',
  },
})
export class CoverDirective {
  @Input() fallback = '';
  private img: HTMLImageElement = inject(ElementRef).nativeElement;
  loaded = false;
  failed = false;

  onError() {
    if (this.fallback && this.img.src !== this.fallback) this.img.src = this.fallback;
    else this.failed = true;
  }
}
