import { useState, useEffect, useRef } from 'react';

interface UseCounterAnimationOptions {
  target: number;
  duration?: number;
  delay?: number;
  enabled?: boolean;
}

export const useCounterAnimation = ({
  target,
  duration = 2000,
  delay = 0,
  enabled = true
}: UseCounterAnimationOptions): number => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!enabled || hasAnimated) return;

    const animateCounter = () => {
      setHasAnimated(true);
      const increment = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);

      return () => clearInterval(timer);
    };

    const timeout = setTimeout(animateCounter, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay, enabled, hasAnimated]);

  return count;
};
