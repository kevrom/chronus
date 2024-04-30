import { createSignal, onCleanup } from 'solid-js';
import { maxTimeState, currentTimeState, pauseState } from './state';
import { clickOutside } from './clickOutside';
import { enterPress } from './enterPress';
import { formatTime, parseTime, objToMs } from './utils';

const [maxTime, setMaxTime] = maxTimeState;
const [currentTime, setCurrentTime] = currentTimeState;
const [isPaused, setPause] = pauseState;

const [editing, setEditing] = createSignal<
  'hours' | 'minutes' | 'seconds' | null
>(null);

export const Counter = () => {
  const ct = () => formatTime(currentTime());
  const mt = () => formatTime(maxTime());

  return (
    <div
      class="absolute text-3xl z-50 flex items-center"
      style={{ top: '160px' }}
    >
      <span>
        {ct().h}:{ct().m}:{ct().s}
      </span>{' '}
      /{' '}
      {editing() === 'hours' ? (
        <input
          type="number"
          min={0}
          max={99}
          class="w-11 text-black text-2xl"
          value={parseTime(maxTime()).h}
          onChange={(e) =>
            setMaxTime((t) =>
              objToMs({
                h: Number(e.target.value),
                m: parseTime(t).m,
                s: parseTime(t).s,
              })
            )
          }
          use:clickOutside={() => {
            setEditing(null);
          }}
          use:enterPress={() => {
            setEditing(null);
          }}
        />
      ) : (
        <span
          onClick={() => {
            setPause(true);
            setEditing('hours');
          }}
        >
          {mt().h}
        </span>
      )}
      :
      {editing() === 'minutes' ? (
        <input
          type="number"
          min={0}
          max={59}
          class="w-11 text-black text-2xl"
          value={parseTime(maxTime()).m}
          onChange={(e) =>
            setMaxTime((t) =>
              objToMs({
                h: parseTime(t).h,
                m: Number(e.target.value),
                s: parseTime(t).s,
              })
            )
          }
          use:clickOutside={() => {
            setEditing(null);
          }}
          use:enterPress={() => {
            setEditing(null);
          }}
        />
      ) : (
        <span
          onClick={() => {
            setPause(true);
            setEditing('minutes');
          }}
        >
          {mt().m}
        </span>
      )}
      :
      {editing() === 'seconds' ? (
        <input
          type="number"
          min={0}
          max={59}
          class="w-11 text-black text-2xl"
          value={parseTime(maxTime()).s}
          onChange={(e) =>
            setMaxTime((t) =>
              objToMs({
                h: parseTime(t).h,
                m: parseTime(t).m,
                s: Number(e.target.value),
              })
            )
          }
          use:clickOutside={() => {
            setEditing(null);
          }}
          use:enterPress={() => {
            setEditing(null);
          }}
        />
      ) : (
        <span
          onClick={() => {
            setPause(true);
            setEditing('seconds');
          }}
        >
          {mt().s}
        </span>
      )}
    </div>
  );
};
