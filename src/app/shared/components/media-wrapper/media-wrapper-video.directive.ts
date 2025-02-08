import { Directive, input } from '@angular/core';

@Directive({
  selector: '[appMediaWrapperVideo]',
  host: {
    slot: 'media',
    preload: 'none',
    loop: 'true',
    '[src]': 'src()',
  },
})
export class MediaWrapperVideoDirective {
  readonly src = input.required<string>({ alias: 'appMediaWrapperVideo' });
}
