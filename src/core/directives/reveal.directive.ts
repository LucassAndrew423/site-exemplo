import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input, numberAttribute, signal } from '@angular/core';

import { prefersReducedMotion } from '@core/utils/motion.util';

const REVEAL_THRESHOLD = 0.15;
const REVEAL_ROOT_MARGIN = '0px 0px -8% 0px';

/** Faz o elemento aparecer com fade e deslocamento quando entra na tela. O valor é o atraso em ms. */
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
    '[class.reveal--in]': 'isVisible()',
    '[style.--reveal-delay.ms]': 'delay()',
  },
})
export class Reveal {
  public readonly delay = input<number, number | string>(0, {
    alias: 'appReveal',
    transform: (value) => numberAttribute(value, 0),
  });
  public readonly isVisible = signal(false);

  private readonly _element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly _destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
        this.isVisible.set(true);
        return;
      }
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            this.isVisible.set(true);
            observer.disconnect();
          }
        },
        { threshold: REVEAL_THRESHOLD, rootMargin: REVEAL_ROOT_MARGIN },
      );
      observer.observe(this._element);
      this._destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
