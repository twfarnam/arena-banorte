import { useEffect, useRef } from 'react';
import { MilliSeconds } from './Types';

type AnimationStepFunc = (timestamp: MilliSeconds) => void;

export const useAnimationLoop = (animationStep: AnimationStepFunc) => {
  const requestRef = useRef(-1);
  const lastTimestamp = useRef(0)

  const animate = (timestamp: number) => {
    if (timestamp - lastTimestamp.current > 15) {
      animationStep(timestamp);
      lastTimestamp.current = timestamp
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, []);
};
