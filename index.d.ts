export {};

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      clickOutside: () => void;
      enterPress: () => void;
    }
  }
}
