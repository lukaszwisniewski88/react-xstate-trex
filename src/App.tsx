import React, { useEffect } from 'react';
import EventBus from './common/EventBus';
import DinoGame from './components/game/DinoGame';
import './scene.css';

interface AppProps {}

function App({}: AppProps) {
  useEffect(() => {
    const subscription = EventBus.subscribe((event) => {});
    return () => subscription.unsubscribe();
  }, []);
  return (
    <div className="App">
      <DinoGame />
    </div>
  );
}

export default App;
