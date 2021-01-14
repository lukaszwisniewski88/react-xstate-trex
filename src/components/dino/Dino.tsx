import { useMachine } from '@xstate/react';
import { gsap } from 'gsap';
import { Observable } from 'rxjs';

import React, { useCallback, useEffect, useRef } from 'react';
import dinoMachine, { PositionEvent } from './Dino.machine';

export default function Dino() {
  const [current, send] = useMachine(dinoMachine, {
    logger: (data) => console.log('Machine Log: ', data),
    devTools: true,
    services: {
      jump: (context, event) => {
        return new Observable<PositionEvent>((subscriber) => {
          const count = 0;
          const jumpAnimation = gsap.to(dinoElement.current, {
            y: -150,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            onUpdate: () => {
              const rect = dinoElement.current?.getBoundingClientRect()!;
              subscriber.next({
                type: 'POSITION',
                x: rect.x,
                y: rect.y,
              });
            },
            ease: 'power3.out',
            onComplete: () => subscriber.complete(),
          });
          return () => jumpAnimation.kill();
        });
      },
      intro: (context, event) => {
        return new Observable((subscriber) => {
          gsap.to(dinoElement.current, {
            x: 100,
            duration: 1,
            onComplete: () => {
              subscriber.complete();
            },
          });
        });
      },
    },
  });
  const dinoElement = useRef<HTMLDivElement>(null);
  const keyboardHandler = useCallback((event: KeyboardEvent) => {
    send(event);
  }, []);

  useEffect(() => {
    document.addEventListener('keyup', keyboardHandler);
    // document.addEventListener('touchend', keyboardHandler);
    return () => document.removeEventListener('keyup', keyboardHandler);
  }, [current]);

  useEffect(() => {
    let animation: gsap.core.Tween;
    switch (true) {
      case current.matches('running.run'):
        animation = gsap.set(dinoElement.current, {
          width: 88,
          height: 94,
          backgroundPositionX: -277,
          backgroundPositionY: -116,
        });
        animation = gsap.to(dinoElement.current, {
          backgroundPositionX: -366,
          duration: 0.4,
          repeat: -1,
          ease: 'steps(1)',
        });
        break;
      case current.matches('running.duck'):
        animation = gsap.set(dinoElement.current, {
          width: 118,
          height: 60,
          backgroundPositionX: -591,
          backgroundPositionY: -15,
        });
        animation = gsap.to(dinoElement.current, {
          backgroundPositionX: 709,
          duration: 0.4,
          repeat: -1,
          ease: 'steps(1)',
        });
        break;
      case current.matches('idle') || current.matches('hit'):
        animation = gsap.set(dinoElement.current, {
          backgroundPositionX: -99,
        });
        animation = gsap.to(dinoElement.current, {
          backgroundPositionX: -188,
          repeat: -1,
          yoyo: true,
          ease: 'steps(1)',
        });
        break;
    }
    return () => {
      if (animation) animation.kill();
    };
  }, [current.value, dinoElement]);
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
