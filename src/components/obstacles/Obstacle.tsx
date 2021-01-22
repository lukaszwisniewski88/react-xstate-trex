import React, { useEffect, useRef, useContext, lazy } from 'react';
import { GameContext } from '../game/game.machine';
import EventBus from '../../common/EventBus';
import { useService } from '@xstate/react/lib/fsm';
const obstaclePositions = [-652, -702, -752, -802, -852, -902];

export default function Obstacle({ visible = true, version = 0 }) {
  const service = useContext(GameContext);
  const [state, send] = useService(service);
  const obstacleElement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const tick = setInterval(() => {
      if (obstacleElement.current) {
        const rect = obstacleElement.current.getBoundingClientRect();
        EventBus.next({
          type: 'OBSTACLE',
          payload: { ...rect },
        });
      }
    }, 100);
    return () => clearInterval(tick);
  }, [obstacleElement]);
  if (visible)
    return (
      <div
        ref={obstacleElement}
        className="obstacle"
        style={{
          backgroundPositionX: obstaclePositions[version],
          transform: 'translateX(2400px)',
        }}
      ></div>
    );
  else return null;
}
