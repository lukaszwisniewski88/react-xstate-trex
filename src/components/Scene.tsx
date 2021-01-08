import React, { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import './scene.css';
import gsap from 'gsap';

type Props = {
  children: ReactNode;
};
export default function Scene({ children }: Props) {
  const [moving, move] = useState(false);
  const ground = useRef<HTMLDivElement>(null);
  const groundSecond = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener('start', () => {
      move((state) => !state);
    });
    return () => {
      document.removeEventListener('start', () => {
        move((state) => !state);
      });
    };
  }, []);
  useEffect(() => {
    let groundMoving: gsap.core.Tween;
    if (moving) {
      groundMoving = gsap.to([ground.current, groundSecond.current], {
        x: -2400,
        duration: 5,
        ease: 'linear',
        repeat: -1,
      });
    }
    return () => {
      moving ? groundMoving.kill() : null;
    };
  }, [moving]);
  return (
    <div className="scene">
      {children}
      <div className="background" ref={ground}>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </div>
  );
}
