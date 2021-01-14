import { Machine, actions, assign } from 'xstate';
import { asEffect } from '@xstate/react';
import { startEvent, stopEvent } from '../globalEvents';
const { log } = actions;

export type PositionEvent = {
  type: 'POSITION';
  x?: number;
  y?: number;
};
type DinoEvents = KeyboardEvent | TouchEvent | PositionEvent;

const dinoMachine = Machine<
  { position?: { x?: number; y?: number } },
  DinoEvents
>(
  {
    id: 'dino',
    initial: 'idle',
    context: {
      position: undefined,
    },
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
        exit: 'stop',
        initial: 'run',
        on: {
          keyup: {
            target: 'hit',
            cond: (context, event) => {
              if (event instanceof KeyboardEvent) {
                return event.key === 'h';
              } else return false;
            },
          },
        },

        states: {
          run: {
            invoke: {
              src: 'intro',
            },
            on: {
              keyup: [
                {
                  target: 'jump',
                  cond: (_context, event) => {
                    if (event instanceof KeyboardEvent)
                      return event.key === ' ';
                    return false;
                  },
                },
                {
                  target: 'duck',
                  cond: (_context, event) => {
                    if (event instanceof KeyboardEvent)
                      return event.key === 'd';
                    return false;
                  },
                },
              ],
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
            on: {
              POSITION: {
                actions: [
                  assign({
                    position: (context, event) => {
                      const { x, y } = event as PositionEvent;
                      return { x, y };
                    },
                  }),
                ],
              },
            },
          },
          duck: {
            after: {
              500: 'run',
            },
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
  },
  {
    actions: {
      start: asEffect(() => document.dispatchEvent(startEvent)),
      stop: asEffect(() => document.dispatchEvent(stopEvent)),
    },
  },
);

export default dinoMachine;
