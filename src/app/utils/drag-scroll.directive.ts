import { Directive, ElementRef, inject } from '@angular/core';

// mouse drag-to-scroll for horizontal scrollers. touch already scrolls natively.
@Directive({
  selector: '[dragScroll]',
  host: {
    '(pointerdown)': 'start($event)',
    '(pointermove)': 'move($event)',
    '(pointerup)': 'end()',
    '(pointerleave)': 'end()',
    '(dragstart)': '$event.preventDefault()', // stop native image/link drag ghost
  },
})
export class DragScrollDirective {
  private el: HTMLElement = inject(ElementRef).nativeElement;
  private startX = 0;
  private startScroll = 0;
  private dragging = false;
  private moved = false;

  constructor() {
    // capture phase: block the click (link/routerLink) that follows a drag
    this.el.addEventListener(
      'click',
      (e) => {
        if (this.moved) {
          e.preventDefault();
          e.stopPropagation();
        }
      },
      true,
    );
  }

  start(e: PointerEvent) {
    if (e.pointerType !== 'mouse') return;
    this.dragging = true;
    this.moved = false;
    this.startX = e.clientX;
    this.startScroll = this.el.scrollLeft;
  }

  move(e: PointerEvent) {
    if (!this.dragging) return;
    const dx = e.clientX - this.startX;
    if (Math.abs(dx) > 5) {
      this.moved = true;
      this.el.classList.add('dragging');
    }
    this.el.scrollLeft = this.startScroll - dx;
  }

  end() {
    if (!this.dragging) return;
    this.dragging = false;
    this.el.classList.remove('dragging'); // snap kicks back in, settles on nearest card
  }
}
