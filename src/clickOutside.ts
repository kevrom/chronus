import { onCleanup } from 'solid-js';

export const clickOutside = (el: HTMLElement, accessor: () => () => void) => {
  const onClick = (e: MouseEvent) =>
    !el.contains(e.target as Node) && accessor()?.();
  document.body.addEventListener('click', onClick);
  onCleanup(() => document.body.removeEventListener('click', onClick));
};
