import { onMount, onCleanup } from 'solid-js';
import { Play } from './Play';
import { Pause } from './Pause';
import { Close } from './Close';
import { Knob } from './Knob';
import { Counter } from './Counter';
import { Dial } from './Dial';
import {
  maxTimeState,
  pauseState,
  currentTimeState,
  knobState,
  counter$,
  belowZero$,
  arcChange$,
  dialCoords$,
  normalizeTime$,
} from './state';
import { drawArc } from './utils';
import { Canvas } from './Canvas';

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

const [maxTime, setMaxTime] = maxTimeState;
const [currentTime, setCurrentTime] = currentTimeState;
const [isPaused, setPause] = pauseState;
const [knob] = knobState;

export const Timer = () => {
  onMount(() => {
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  });

  const counter = counter$.subscribe();
  const belowZero = belowZero$.subscribe();
  const arcChange = arcChange$.subscribe((v) => drawArc(ctx, v));
  const dialCoords = dialCoords$.subscribe();
  const normalizeTime = normalizeTime$.subscribe();

  const handleIncClick = () => {
    setMaxTime((c) => c + 60 * 1000);
    setCurrentTime((c) => c + 60 * 1000);
  };

  onCleanup(() => {
    counter.unsubscribe();
    belowZero.unsubscribe();
    arcChange.unsubscribe();
    dialCoords.unsubscribe();
    normalizeTime.unsubscribe();
  });

  return (
    <div class="container text-cyan-100">
      <div class="grid grid-cols-3 bg-slate-800 text-2xl text-center p-4 rounded-t-lg">
        <div></div>
        <div>Timer</div>
        <div class="flex justify-end items-center">
          <Close />
        </div>
      </div>
      <div class="container flex flex-col p-4 items-center bg-cyan-800 bg-opacity-70 rounded-b-lg relative">
        <Knob coords={knob()} />
        <Canvas ref={canvas} />
        <Dial />
        <Counter />
        <div class="flex flex-row items-center justify-between w-full text-2xl px-4 mt-8">
          <button onClick={handleIncClick}>+1:00</button>
          <button
            class="rounded-full bg-slate-700 p-2"
            onClick={() => setPause((c) => !c)}
          >
            {isPaused() ? <Play /> : <Pause />}
          </button>
          <button onClick={() => setCurrentTime(maxTime)}>Reset</button>
        </div>
      </div>
    </div>
  );
};
