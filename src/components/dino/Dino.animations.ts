import type { PositionEvent } from './Dino.machine';
import { gsap } from 'gsap';

export default (
  element: HTMLElement | null,
  dispatch: (event: PositionEvent | 'ANIMATION_END') => void,
) => ({
  jump: () => {
    let animation = gsap.to(element, {
      y: -150,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      onUpdate: () => {
        if (element) {
          const rect = element.getBoundingClientRect();
          dispatch({
            type: 'POSITION',
            x: rect.x,
            y: rect.y,
          });
        }
      },
      ease: 'power3.out',
      onComplete: () => dispatch('ANIMATION_END'),
    });
    return animation;
  },
  duck: () => {
    let animation = gsap.set(element, {
      top: 320,
      width: 118,
      height: 60,
      backgroundPositionX: -591,
      backgroundPositionY: -15,
    });
    animation = gsap.to(element, {
      backgroundPositionX: -709,
      duration: 0.4,
      repeat: 1,
      ease: 'steps(1)',
      onComplete: () => dispatch('ANIMATION_END'),
    });
    return animation;
  },
  running: () => {
    let animation = gsap.set(element, {
      top: 285,
      width: 88,
      height: 94,
      backgroundPositionX: -366,
      backgroundPositionY: -116,
    });
    animation = gsap.to(element, {
      backgroundPositionX: -277,
      duration: 0.4,
      repeat: -1,
      ease: 'steps(1)',
    });
    return animation;
  },
  standing: () => {
    let animation = gsap.set(element, {
      backgroundPositionX: -99,
    });
    animation = gsap.to(element, {
      backgroundPositionX: -188,
      repeat: -1,
      yoyo: true,
      ease: 'steps(1)',
    });
    return animation;
  },
  hit: () => {
    let animation = gsap.set(element, {
      top: 285,
      backgroundPositionX: -455,
      backgroundPositionY: -116,
      width: 88,
      height: 94,
    });
    return animation;
  },
  intro: () => {
    let animation = gsap.to(element, {
      x: 100,
      duration: 1,
      onComplete: () => {
        dispatch({
          type: 'POSITION',
          x: 100,
        });
        dispatch('ANIMATION_END');
      },
    });
    animation = gsap.set(element, {
      backgroundPositionX: -277,
    });
    animation = gsap.to(element, {
      backgroundPositionX: -366,
      duration: 0.4,
      repeat: -1,
      ease: 'steps(1)',
    });
    return animation;
  },
});
