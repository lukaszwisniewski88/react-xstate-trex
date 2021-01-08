import gsap from 'gsap';
import { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { dayEvent, nightEvent } from './globalEvents';

export default function DayCycle() {
  const [isNight, toggleNight] = useState(false);
  const [gameStarted, start] = useState(false);
  useEffect(() => {
    document.addEventListener('start', () => {
      start((state) => !state);
    });
    return () => {
      document.removeEventListener('start', () => {
        start((state) => !state);
      });
    };
  }, []);
  useEffect(() => {
    let timer: any;
    if (gameStarted) {
      timer = setInterval(() => {
        toggleNight((state) => !state);
        isNight
          ? document.body.dispatchEvent(nightEvent)
          : document.body.dispatchEvent(dayEvent);
      }, 1000 * 10);
    }
    return () => {
      gameStarted ? clearInterval(timer) : null;
    };
  }, [gameStarted]);
  useLayoutEffect(() => {
    if (isNight && gameStarted) {
      gsap.to(document.body, {
        duration: 2,
        filter: 'invert(0)',
      });
    } else if (gameStarted) {
      gsap.to(document.body, {
        duration: 3,
        filter: 'invert(1)',
      });
    }
  }, [isNight]);
  return null;
}
