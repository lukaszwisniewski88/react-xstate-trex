import { assign, createMachine } from '@xstate/fsm';

export type PositionEvent = {
  type: 'POSITION';
  x?: number;
  y?: number;
};
type UserEvents = {
  type: 'JUMP' | 'DUCK' | 'HIT';
};
export type AnimationEvents = {
  type: 'ANIMATION_END';
};
type DinoEvents = UserEvents | PositionEvent | AnimationEvents;
type DinoContext = { position?: { x?: number; y?: number } };
const positionAssignment = assign<DinoContext, PositionEvent>({
  position: (_, event) => ({
    x: event.x,
    y: event.y,
  }),
});
type DinoState =
  | {
      value: 'standing';
      context: {
        position: undefined;
      };
    }
  | {
      value: 'running';
      context: {
        position: undefined;
      };
    }
  | {
      value: 'intro';
      context: DinoContext;
    }
  | {
      value: 'jump';
      context: DinoContext;
    }
  | {
      value: 'duck';
      context: DinoContext;
    }
  | {
      value: 'hitted';
      context: {
        position: undefined;
      };
    };

const dinoMachine = createMachine<DinoContext, DinoEvents, DinoState>({
  id: 'dino',
  initial: 'standing',
  context: {
    position: undefined,
  },
  states: {
    standing: {
      on: {
        JUMP: 'intro',
      },
    },
    intro: {
      on: {
        ANIMATION_END: 'running',
        POSITION: {
          actions: positionAssignment,
        },
      },
    },
    running: {
      on: {
        HIT: 'hitted',
        JUMP: 'jump',
        DUCK: 'duck',
      },
    },
    jump: {
      on: {
        HIT: 'hitted',
        ANIMATION_END: 'running',
        POSITION: {
          actions: positionAssignment,
        },
      },
    },
    duck: {
      on: {
        HIT: 'hitted',
        POSITION: {
          actions: positionAssignment,
        },
        ANIMATION_END: 'running',
      },
    },
    hitted: {},
  },
});

export default dinoMachine;
