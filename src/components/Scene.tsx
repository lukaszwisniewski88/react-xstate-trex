import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import './scene.css';
import gsap, { random } from 'gsap/all';

type Props = {
  children: ReactNode;
};
export default function Scene({ children }: Props) {
  const [moving, move] = useState(false);
  const sceneElement = useRef<HTMLDivElement>(null);
  const clouds: Array<null | HTMLDivElement> = [];
  useLayoutEffect(() => {
    gsap.to(clouds, {
      left: window.innerWidth + random(0, 2000),
      duration: 90,
      repeat: -1,
    });
  }, []);
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
      groundMoving = gsap.to(sceneElement.current, {
        x: -4800,
        duration: 10,
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
      <div className="sky">
        {new Array(10).fill(null).map((el, index) => (
          <div
            className="cloud"
            key={index}
            style={{
              left: random(-2400, -100, 100),
              top: random(0, 150, 30),
            }}
            ref={(ref) => {
              if (ref) {
                clouds.push(ref);
              }
            }}
          ></div>
        ))}
      </div>
      {children}
      <div className="background" ref={sceneElement}>
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
