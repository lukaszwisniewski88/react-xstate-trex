import { createMachine, interpret } from '@xstate/fsm';
import { createContext } from 'react';

type GameEvents = {
  type: 'START' | 'END' | 'STOP';
};

export const gameMachine = createMachine<{}, GameEvents>(
  {
    id: 'game',
    initial: 'stopped',
    states: {
      stopped: {
        on: {
          START: 'game',
        },
      },
      game: {
        on: {
          END: 'gameOver',
          STOP: 'stopped',
        },
      },
      gameOver: {},
    },
  },
  {
    actions: {},
  },
);

export const GameContext = createContext(interpret(gameMachine));
