import React, { useEffect } from 'react';
import Dino from '../Dino';
import Obstacle from '../obstacles/Obstacle';
import Scene from '../scene/Scene';
import Sky from '../scene/Sky';
import { useMachine } from '@xstate/react/lib/fsm';
import { GameContext, gameMachine } from './game.machine';

/**
 * Jakie dane w komponencie nadrzędnym?
 * DinoPos ?
 * ObstaclePos ?
 * 
 */

export default function DinoGame() {
  const [current, send, service] = useMachine(gameMachine);
  return (
    <GameContext.Provider value={service}>
      <div id="GameContainer" className="game">
        <Scene isMoving={current.matches('game')}>
          <Obstacle /> // Obstacles witch will spawn one obstacles
          <Dino /> //
        </Scene>
      </div>
    </GameContext.Provider>
  );
}
