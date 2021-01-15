import React, { useEffect, useRef, useContext } from 'react';
import { GameContext } from '../game/game.machine';
import EventBus from '../../common/EventBus';
import { useService } from '@xstate/react';
const obstaclePositions = [-652, -702, -752, -802, -852, -902];

export default function Obstacle({ visible = true, version = 0 }) {
  const service = useContext(GameContext);
  const [state, send] = useService(service);
  const obstacleElement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const tick = setInterval(() => {
      if (obstacleElement.current) {
        const rect = obstacleElement.current.getBoundingClientRect();
        send({
          type: 'OBSTACLE',
          payload: { ...rect },
        });
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
