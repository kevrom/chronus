import { LINE_WIDTH, DIAL_RADIUS, CANVAS_MARGIN } from './constants';

export const Dial = () => (
  <div
    class="border-8 border-slate-700 rounded-full relative"
    style={{
      'border-width': `${LINE_WIDTH}px`,
      top: `${LINE_WIDTH / 2}px`,
      width: `${DIAL_RADIUS * 2 + CANVAS_MARGIN}px`,
      height: `${DIAL_RADIUS * 2 + CANVAS_MARGIN}px`,
    }}
  />
);
