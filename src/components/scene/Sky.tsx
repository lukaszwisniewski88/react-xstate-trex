import gsap, { random } from 'gsap';
import React, { useEffect } from 'react';
export default function Sky() {
  const clouds: Array<null | HTMLDivElement> = [];
  useEffect(() => {
    const screenWidth = window.innerWidth + 90;
    clouds.forEach((cloud) => {
      gsap.set(cloud, {
        x: -100,
        y: gsap.utils.random(0, 150, 30),
      });
      gsap.to(cloud, {
        x: screenWidth,
        duration: gsap.utils.random(10, 20, 2),
        delay: gsap.utils.random(0, 10, 1),
        repeat: -1,
        ease: 'linear',
        onRepeat: () => {
          gsap.set(cloud, {
            x: -100,
            y: gsap.utils.random(0, 150, 30),
          });
        },
        modifiers: {
          x: gsap.utils.unitize((x) => {
            const position = x;
            return position % screenWidth;
          }),
        },
      });
    });
  }, []);

  return (
    <div className="sky">
      {new Array(6).fill(null).map((el, index) => (
        <div
          className="cloud"
          key={index}
          style={{
            left: -100,
          }}
          ref={(ref) => {
            if (ref) {
              clouds.push(ref);
            }
          }}
        ></div>
      ))}
    </div>
  );
}
