import { Machine, actions } from 'xstate';
import { asEffect, useMachine } from '@xstate/react';
import { gsap } from 'gsap';
import './sprites/sprites.css';
import { startEvent } from './globalEvents';
import React, { useCallback, useEffect, useRef } from 'react';
const { log } = actions;

const dinoMachine = Machine({
  id: 'dino',
  initial: 'idle',
  states: {
    idle: {
      entry: log('idle'),
      on: {
        keyup: {
          target: 'running',
        },
        touchend: {
          target: 'running',
        },
        hit: 'hit',
      },
    },
    running: {
      entry: 'start',
      initial: 'run',
      states: {
        run: {
          invoke: {
            src: 'intro',
          },
          on: {
            keyup: {
              target: 'jump',
            },
            touchend: {
              target: 'jump',
            },
          },
        },
        jump: {
          entry: log('jump'),
          invoke: {
            src: 'jump',
            onDone: 'run',
          },
        },
        duck: {
          entry: log('duck'),
          on: { keyup: '#dino.hit' },
        },
      },
    },
    hit: {
      entry: log('hit'),
      on: {
        keyup: 'idle',
      },
    },
  },
});
export default function Dino() {
  const [current, send] = useMachine(dinoMachine, {
    logger: (data) => console.log('Machine Log: ', data),
    actions: {
      start: asEffect(() => document.dispatchEvent(startEvent)),
    },
    services: {
      jump: (context, event) => {
        return new Promise((resolve, _reject) => {
          gsap.to(dinoElement.current, {
            y: -150,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: 'power3.inOut',
            onComplete: resolve,
          });
        });
      },
      intro: (context, event) => {
        return new Promise((resolve, _reject) => {
          gsap.to(dinoElement.current, {
            x: 100,
            duration: 1,
            onComplete: resolve,
          });
        });
      },
    },
  });
  const dinoElement = useRef<HTMLDivElement>(null);
  const keyboardHandler = useCallback((event: KeyboardEvent | TouchEvent) => {
    send({
      type: event.type,
    });
  }, []);
  useEffect(() => {
    document.addEventListener('keyup', keyboardHandler);
    document.addEventListener('touchend', keyboardHandler);
    return () => document.removeEventListener('keyup', keyboardHandler);
  }, [current]);

  useEffect(() => {
    let animation: gsap.core.Tween;
    switch (true) {
      case current.matches('running.run') || current.matches('running.duck'):
        animation = gsap.set(dinoElement.current, {
          backgroundPositionX: -277,
        });
        animation = gsap.to(dinoElement.current, {
          backgroundPositionX: -366,
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
          duration: Math.random(),
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
