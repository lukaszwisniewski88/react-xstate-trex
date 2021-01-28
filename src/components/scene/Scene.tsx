import React, { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { gsap } from 'gsap';

type Props = {
  children: ReactNode;
  isMoving: boolean;
};
export default function Scene({ children, isMoving = false }: Props) {
  let movingAnim = useRef<gsap.core.Tween>();
  const sceneElement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isMoving && movingAnim.current === undefined) {
      movingAnim.current = gsap.to(sceneElement.current, {
        x: -4800,
        duration: 10,
        ease: 'linear',
        repeat: -1,
      });
    } else if (isMoving) movingAnim.current?.play();
    return () => {
      movingAnim.current?.pause();
    };
  }, [isMoving]);

  return (
    <div className="scene">
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
