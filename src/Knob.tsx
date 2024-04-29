interface Props {
  coords: [number, number];
}

export const Knob = (props: Props) => (
  <div
    class="w-6 h-6 bg-white rounded-full shadow-xl absolute z-50"
    style={{ left: `${props.coords[0]}px`, top: `${props.coords[1]}px` }}
  />
);
