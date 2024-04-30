import { Ref } from 'solid-js';
import { CANVAS_SIZE } from './constants';

interface Props {
  ref: Ref<HTMLCanvasElement>;
}

export const Canvas = (props: Props) => (
  <canvas
    ref={props.ref}
    width={CANVAS_SIZE}
    height={CANVAS_SIZE}
    class="z-20 absolute"
  />
);
