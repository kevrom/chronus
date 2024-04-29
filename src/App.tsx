import type { Component } from 'solid-js';
import { Timer } from './Timer';

const App: Component = () => {
  return (
    <div class="container w-96 my-12">
      <Timer />
    </div>
  );
};

export default App;
