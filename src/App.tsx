import React from 'react';
import './App.css';
import DayCycle from './components/DayCycle';
import Dino from './components/Dino';
import Scene from './components/Scene';

interface AppProps {}

function App({}: AppProps) {
  return (
    <div className="App">
      <DayCycle />
      <Scene>
        <Dino />
      </Scene>
    </div>
  );
}

export default App;
