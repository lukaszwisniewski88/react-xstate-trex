import { actions, Machine, Interpreter, interpret } from 'xstate';
import { createContext } from 'react';

export const gameMachine = Machine(
  {
    id: 'game',
    initial: 'welcome',
    states: {
      welcome: {},
      game: {},
      gameOver: {},
    },
  },
  {
    actions: {},
    guards: {},
    services: {},
  },
);

export const GameContext = createContext(interpret(gameMachine));
