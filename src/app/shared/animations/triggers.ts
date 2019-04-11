import { trigger, transition, style, animate } from '@angular/animations';

export const fadeInOutTrigger = trigger('fadeInOut', [
  transition(':enter', [
    style({opacity: 0}),
    animate('250ms cubic-bezier(0.770, 0.000, 0.175, 1.000)')
  ]),
  transition(':leave', [
    style({opacity: 1}),
    animate('250ms cubic-bezier(0.770, 0.000, 0.175, 1.000)', style({
      opacity: 0
    }))
  ])
])
