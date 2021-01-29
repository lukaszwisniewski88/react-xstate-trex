import { assign,createMachine, } from '@xstate/fsm';

type UserEvents = {
  type: 'JUMP' | 'DUCK';
};
type ExternalEvents = {
  type: 'HIT' | 'START' | "ANIMATION_END"
}
type DinoContext = {
  animationName :
  | 'standing'
  | 'running'
  | 'duck'
  | 'hitted'
}
type DinoState =
  | {
      value: 'standing';
      context: DinoContext
    }
  | {
      value: 'running';
      context: DinoContext
    }
  | {
      value: 'intro';
      context: DinoContext
    }
  | {
      value: 'jump';
      context: DinoContext
    }
  | {
      value: 'duck';
      context: DinoContext
    }
  | {
      value: 'hitted';
      context: DinoContext
    };

const dinoMachine = createMachine<DinoContext, UserEvents|ExternalEvents, DinoState>({
  id: 'dino',
  initial: 'standing',
  context: {
    animationName:'standing'
  },
  states: {
    standing: {
      on: {
        START: 'intro',
      },
    },
    intro: {
      entry:assign({
        animationName:(_ctx, _evt)=>'running'
      }),
      on:{
        ANIMATION_END: 'running'
      }
    },
    running: {
      entry:assign({
        animationName:(_ctx, _evt)=>'running'
      }),
      on: {
        JUMP: 'jump',
        DUCK: 'duck',
      },
    },
    jump: {
      on: {
        ANIMATION_END : 'running'
      },
    },
    duck: {
      entry:assign({
        animationName:(_ctx,_evt)=>'duck'
      }),
      on: {
        ANIMATION_END : 'running'
      },
    },
    hitted: {
      entry:assign({
        animationName:(_ctx, _evt)=>'hitted'
      }),

    },
  },
});

export default dinoMachine;
