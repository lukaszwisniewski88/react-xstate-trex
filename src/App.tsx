import { useMachine } from '@xstate/react';
import React, { useEffect } from 'react';
import EventBus from './common/EventBus';
import DinoGame from './components/game/DinoGame';
import { gameMachine, GameContext } from './components/game/game.machine';

interface AppProps {}

function App({}: AppProps) {
  const [state, send, service] = useMachine(gameMachine);
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
