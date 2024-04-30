import { createSignal, Show } from 'solid-js';
import { maxTimeState, currentTimeState, pauseState } from '../state';
import { clickOutside } from '../utils/clickOutside';
import { enterPress } from '../utils/enterPress';
import { formatTime, parseTime, objToMs } from '../utils';

const [maxTime, setMaxTime] = maxTimeState;
const [currentTime] = currentTimeState;
const [, setPause] = pauseState;

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
      <span class="cursor-default">
        {ct().h}:{ct().m}:{ct().s}
      </span>
      <span>/</span>
      <Show when={editing() === 'hours'}>
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
          use:clickOutside={() => setEditing(null)}
          use:enterPress={() => setEditing(null)}
        />
      </Show>
      <Show when={editing() !== 'hours'}>
        <span
          class="hover:text-sky-200 hover:border-2 border-2 border-transparent hover:border-sky-200 cursor-text"
          onClick={() => {
            setPause(true);
            setEditing('hours');
          }}
        >
          {mt().h}
        </span>
      </Show>
      <span>:</span>
      <Show when={editing() === 'minutes'}>
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
          use:clickOutside={() => setEditing(null)}
          use:enterPress={() => setEditing(null)}
        />
      </Show>
      <Show when={editing() !== 'minutes'}>
        <span
          class="hover:text-sky-200 hover:border-2 border-2 border-transparent hover:border-sky-200 cursor-text"
          onClick={() => {
            setPause(true);
            setEditing('minutes');
          }}
        >
          {mt().m}
        </span>
      </Show>
      <span>:</span>
      <Show when={editing() === 'seconds'}>
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
          use:clickOutside={() => setEditing(null)}
          use:enterPress={() => setEditing(null)}
        />
      </Show>
      <Show when={editing() !== 'seconds'}>
        <span
          class="hover:text-sky-200 hover:border-2 border-2 border-transparent hover:border-sky-200 cursor-text"
          onClick={() => {
            setPause(true);
            setEditing('seconds');
          }}
        >
          {mt().s}
        </span>
      </Show>
    </div>
  );
};
