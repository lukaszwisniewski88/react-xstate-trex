import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { useMachine, useService } from '@xstate/react/lib/fsm';
import animations from './Dino.animations';
import dinoMachine from './Dino.machine';
import { GameContext } from '../game/game.machine';

export default function Dino() {
  const gameService = useContext(GameContext);
  const [current, send] = useMachine(dinoMachine, {
    actions: {
      startGame: () => {
        sendToGame('START');
      },
    },
  });
  const [gameState, sendToGame] = useService(gameService);
  const dinoElement = useRef<HTMLDivElement>(null);
  const dinoAnimations = useMemo(() => animations(dinoElement.current, send), [
    dinoElement.current,
  ]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case ' ':
          send('JUMP');
          break;
        case 'ArrowDown':
          send('DUCK');
          break;
        case 'h':
          send('HIT');
          break;
      }
    };
    let lastTouch = new Date().getTime();
    const mobileHandler = (e: TouchEvent) => {
      switch (e.type) {
        case 'touchstart':
          lastTouch = new Date().getTime();
          break;
        case 'touchend':
          if (new Date().getTime() - lastTouch > 500) {
            send('DUCK');
          } else send('JUMP');
          break;
        case 'touchmove':
          send('DUCK');
          break;
      }
    };
    document.addEventListener('keydown', handler);
    document.addEventListener('touchstart', mobileHandler);
    document.addEventListener('touchend', mobileHandler);
    document.addEventListener('touchmove', mobileHandler);
    return () => {
      document.removeEventListener('keydown', handler);
      document.removeEventListener('touchstart', mobileHandler);
      document.removeEventListener('touchend', mobileHandler);
      document.removeEventListener('touchmove', mobileHandler);
    };
  }, []);
  useEffect(() => {
    let animation: gsap.core.Tween;
    switch (true) {
      case current.matches('intro'):
        animation = dinoAnimations.intro();
        break;
      case current.matches('running'):
        animation = dinoAnimations.running();
        break;
      case current.matches('jump'):
        animation = dinoAnimations.jump();
        break;
      case current.matches('duck'):
        animation = dinoAnimations.duck();
        break;
      case current.matches('standing'):
        animation = dinoAnimations.standing();
        break;
      case current.matches('hitted'):
        animation = dinoAnimations.hit();
        break;
    }
    return () => {
      if (animation) animation.kill();
    };
  }, [current.value]);
  return (
    <div
      id="dino"
      ref={dinoElement}
      style={{
        position: 'absolute',
        top: 285,
        background: 'url(/assets/spritesheet.png) no-repeat -99px -116px',
        width: 88,
        height: 94,
      }}
    ></div>
  );
}
