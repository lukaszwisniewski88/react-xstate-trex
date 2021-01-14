import React, { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import './scene.css';
import Sky from './Sky';
import Obstacle from '../obstacles/Obstacle';
import { gsap } from 'gsap';

type Props = {
  children: ReactNode;
};
export default function Scene({ children }: Props) {
  const [moving, move] = useState(false);
  let movingAnim = useRef<gsap.core.Tween>();
  const [obstacleVariant, setVariant] = useState(0);
  const sceneElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('start', () => {
      move((state) => !state);
    });
    document.addEventListener('stop', () => {
      move((state) => !state);
    });
    return () => {
      document.removeEventListener('start', () => {
        move((state) => !state);
      });
      document.addEventListener('stop', () => {
        move((state) => !state);
      });
    };
  }, []);
  useEffect(() => {
    if (moving && movingAnim.current === undefined) {
      movingAnim.current = gsap.to(sceneElement.current, {
        x: -4800,
        duration: 10,
        ease: 'linear',
        repeat: -1,
        onRepeat: () => setVariant(gsap.utils.random(0, 5, 1)),
      });
    } else if (moving) movingAnim.current?.play();
    return () => {
      movingAnim.current?.pause();
    };
  }, [moving]);
  return (
    <div className="scene">
      <Sky />
      {children}
      <div className="background" ref={sceneElement}>
        <Obstacle version={obstacleVariant} />
        <div className="ground"></div>
        <div
          className="ground"
          style={{ transform: 'translateX(2400px)' }}
        ></div>
        <div
          className="ground"
          style={{ transform: 'translateX(4800px)' }}
        ></div>
      </div>
    </div>
  );
}
