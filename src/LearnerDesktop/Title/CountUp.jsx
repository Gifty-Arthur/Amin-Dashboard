import { useState, useEffect, useRef } from "react";

const useCountUpOnScroll = (endValue, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [triggered, setTriggered] = useState(false); // Add a state to track if it has been triggered

  useEffect(() => {
    // Do nothing if the animation has already been triggered
    if (!ref.current || triggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true); // Mark as triggered so it doesn't run again

          let start = 0;
          const end = endValue;
          const startTime = Date.now();

          const step = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const currentCount = Math.floor(progress * end);
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };
          requestAnimationFrame(step);
          observer.unobserve(ref.current);
        }
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [endValue, duration, triggered]); // Add 'triggered' to the dependency array

  return { count, ref };
};

export default useCountUpOnScroll;
