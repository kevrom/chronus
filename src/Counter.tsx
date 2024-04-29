import { formatTime } from './utils';

interface Props {
  currentTime: number;
  maxTime: number;
}

export const Counter = (props: Props) => (
  <div class="absolute text-3xl" style={{ top: '160px' }}>
    {formatTime(props.currentTime)} / {formatTime(props.maxTime)}
  </div>
);
