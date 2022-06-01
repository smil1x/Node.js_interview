import { animate, group, query, style, transition, trigger } from '@angular/animations';

export const animation1 = trigger('routeAnimations', [
  transition('* => *', [
    query(':enter > *', style({ opacity: 0, position: 'fixed' }), {
      optional: true,
    }),
    query(
      ':leave > *',
      [
        style({ transform: 'translateY(0%)', opacity: 1 }),
        animate('0.2s ease-in-out', style({ transform: 'translateY(-3%)', opacity: 0 })),
        style({ position: 'fixed' }),
      ],
      { optional: true },
    ),
    query(
      ':enter > *',
      [
        style({
          transform: 'translateY(-3%)',
          opacity: 0,
          position: 'static',
        }),
        animate('0.5s ease-in-out', style({ transform: 'translateY(0%)', opacity: 1 })),
      ],
      { optional: true },
    ),
  ]),
]);

export const animation2 = trigger('routeAnimations', [
  transition('* => *', [
    style({
      position: 'relative',
    }),

    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }),
      ],
      { optional: true },
    ),

    query(':enter', [style({ opacity: 0 })], { optional: true }),

    group([
      query(':leave', [animate(500, style({ opacity: 0 }))], { optional: true }),

      query(
        ':enter',
        [
          animate(
            500,
            style({
              opacity: 1,
            }),
          ),
        ],
        { optional: true },
      ),
    ]),
  ]),
]);
