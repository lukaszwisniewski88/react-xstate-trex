import { useMachine } from '@xstate/react';
import React from 'react';
import './App.css';
import DayCycle from './components/game/DayCycle';
import Dino from './components/dino/Dino';
import { gameMachine, GameContext } from './components/game/game.machine';
import Scene from './components/scene/Scene';

interface AppProps {}

function App({}: AppProps) {
  const [state, send, service] = useMachine(gameMachine);
  return (
    <div className="App">
      <GameContext.Provider value={service}>
        <DayCycle />
        <Scene>
          <Dino />
        </Scene>
      </GameContext.Provider>
    </div>
  );
}

export default App;
