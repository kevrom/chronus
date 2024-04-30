import { createSignal, observable } from 'solid-js';
import {
  map,
  from,
  interval,
  filter,
  switchMap,
  EMPTY,
  takeUntil,
  tap,
  combineLatest,
} from 'rxjs';
import { degreesToPoint } from './utils';
import {
  DIAL_RADIUS,
  TIME_ACCURACY,
  KNOB_RADIUS,
  LINE_WIDTH,
  CANVAS_MARGIN,
} from './constants';

export const maxTimeState = createSignal<number>(0);
export const currentTimeState = createSignal<number>(0);
export const pauseState = createSignal<boolean>(true);
const arcState = createSignal<number>(0);
export const knobState = createSignal<[number, number]>([0, 0]);

const [maxTime] = maxTimeState;
const [currentTime, setCurrentTime] = currentTimeState;
const [isPaused, setPause] = pauseState;
const [arc, setArc] = arcState;
const [, setKnob] = knobState;

// STATE STREAMS

// emit only when timer is paused
export const pause$ = from(observable(isPaused));
// emit when the timer is counting down
export const currentTime$ = from(observable(currentTime));
// emit when the max time is changed in some fashion
export const maxTime$ = from(observable(maxTime));
// emit when the arc of the radial progress bar is changed
export const arc$ = from(observable(arc));

// while unpaused, keep a timer running and listening for a pause
export const counter$ = pause$.pipe(
  switchMap((p) => {
    if (p) {
      return EMPTY;
    }
    // create a timer
    return interval(TIME_ACCURACY).pipe(
      // keep the timer going until the pause stream emits something
      takeUntil(pause$.pipe(filter((v) => !!v)))
    );
  }),
  tap(() => setCurrentTime((c) => c - TIME_ACCURACY))
);

// keep the time above zero, and pause when reached
export const belowZero$ = currentTime$.pipe(
  // only listen for when the timer dips below zero
  filter((v) => v < 0),
  tap(() => {
    setPause(true);
    setCurrentTime(0);
  })
);

// set arc degree of radial based on time
export const arcChange$ = combineLatest([currentTime$, maxTime$]).pipe(
  // map the current time and max time into a degree value
  map(([ct, mt]) => (mt > 0 ? (ct / mt) * 360 : 0)),
  tap((v) => setArc(v))
);

// set x and y coords of knob based on degree of arc
export const dialCoords$ = arc$.pipe(
  // convert the arc degrees into an [x, y] coordinate
  map(degreesToPoint),
  tap(([x, y]) =>
    setKnob([
      x + DIAL_RADIUS + KNOB_RADIUS + LINE_WIDTH + CANVAS_MARGIN,
      y + DIAL_RADIUS + CANVAS_MARGIN + LINE_WIDTH / 2,
    ])
  )
);

// if the currentTime ends up larger than the maxTime, fix it
export const normalizeTime$ = combineLatest([currentTime$, maxTime$]).pipe(
  filter(([ct, mt]) => ct > mt + 0.5),
  tap(([, mt]) => setCurrentTime(mt))
);
