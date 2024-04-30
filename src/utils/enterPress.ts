import { onCleanup } from 'solid-js';

export const enterPress = (el: HTMLElement, accessor: () => () => void) => {
  const onEnter = (e: KeyboardEvent) =>
    document.activeElement === el && e.key === 'Enter' && accessor()?.();
  document.body.addEventListener('keypress', onEnter);
  onCleanup(() => document.body.removeEventListener('keypress', onEnter));
};
