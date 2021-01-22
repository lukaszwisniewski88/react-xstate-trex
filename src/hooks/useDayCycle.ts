import { useState, useEffect, useMemo } from 'react';
import { interval } from 'rxjs';
export enum DayFlags {
  empty = 0,
  isDay = 1 << 0,
  isNight = 1 << 1,
}
function getInitialState(actualHour: number, sunrise = 7, sunset = 19) {
  if (actualHour >= sunrise && actualHour <= sunset) {
    return DayFlags.isDay;
  }
  return DayFlags.isNight;
}
/**
 * The hook which registers effects for mimic the time passing
 *
 * @param dayDuration Duration of full 24 h mimic in ms
 * @param sunrise Sunrise Hour
 * @param sunset  Sunset Hour
 */
function useDayCycle(dayDuration = 60000, sunrise = 7, sunset = 19) {
  const dayInterval = useMemo(() => interval(dayDuration / 24), []);
  const [actualHour, setHour] = useState(new Date().getHours());
  const [dayFlags, setFlags] = useState<DayFlags>(
    getInitialState(actualHour, sunrise, sunset),
  );
  useEffect(() => {
    const subscription = dayInterval.subscribe(() => {
      setHour((lastHour) => {
        if (lastHour === 23) {
          return 0;
        } else {
          return lastHour + 1;
        }
      });
    });
    return () => {
      console.log('UNSUB');
      subscription.unsubscribe;
    };
  }, []);
  useEffect(() => {
    switch (actualHour) {
      case sunrise:
        setFlags((flags) => {
          let newFlags = flags;
          newFlags &= ~DayFlags.isNight;
          newFlags |= DayFlags.isDay;
          return newFlags;
        });
        break;
      case sunset:
        setFlags((flags) => {
          let newFlags: DayFlags = flags;
          newFlags &= ~DayFlags.isDay;
          newFlags |= DayFlags.isNight;
          return newFlags;
        });
        break;
    }
  }, [actualHour]);
  return {
    actualHour,
    dayFlags,
  };
}

export { useDayCycle };
