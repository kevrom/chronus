import { Show } from 'solid-js';
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
} from '../state';
import { Canvas } from './Canvas';

const [maxTime, setMaxTime] = maxTimeState;
const [, setCurrentTime] = currentTimeState;
const [isPaused, setPause] = pauseState;
const [knob] = knobState;

export const Timer = () => {
  const handleIncClick = () => {
    setMaxTime((c) => c + 60 * 1000);
    setCurrentTime((c) => c + 60 * 1000);
  };
  const handlePlayPause = () => setPause((c) => !c);
  const handleReset = () => setCurrentTime(maxTime);

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
        <Canvas />
        <Dial />
        <Counter />
        <div class="flex flex-row items-center justify-between w-full text-2xl px-4 mt-8">
          <button onClick={handleIncClick}>+1:00</button>
          <button
            class="rounded-full bg-slate-700 p-2"
            onClick={handlePlayPause}
          >
            <Show when={isPaused()}>
              <Play />
            </Show>
            <Show when={!isPaused()}>
              <Pause />
            </Show>
          </button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
};
