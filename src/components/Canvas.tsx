import { onMount, onCleanup } from 'solid-js';
import { CANVAS_SIZE } from '../constants';
import {
  counter$,
  belowZero$,
  arcChange$,
  dialCoords$,
  normalizeTime$,
  smartReset$,
} from '../state';
import { drawArc } from '../utils';

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

export const Canvas = () => {
  onMount(() => {
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  });

  const counter = counter$.subscribe();
  const belowZero = belowZero$.subscribe();
  const arcChange = arcChange$.subscribe((v) => drawArc(ctx, v));
  const dialCoords = dialCoords$.subscribe();
  const normalizeTime = normalizeTime$.subscribe();
  const smartReset = smartReset$.subscribe();

  onCleanup(() => {
    counter.unsubscribe();
    belowZero.unsubscribe();
    arcChange.unsubscribe();
    dialCoords.unsubscribe();
    normalizeTime.unsubscribe();
    smartReset.unsubscribe();
  });

  return (
    <canvas
      ref={canvas}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      class="z-20 absolute"
    />
  );
};
