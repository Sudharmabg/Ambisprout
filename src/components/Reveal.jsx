import { useEffect, useRef, useState } from 'react';

const PREMIUM_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Self-observing blur-rise reveal for a single element. Wrap grid items in this
 * and pass an incrementing `delay` to get a premium staggered cascade as the
 * cards scroll into view. Each item observes itself, so below-the-fold cards
 * animate when they are actually reached.
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  y = 28,
  blur = 8,
  threshold = 0.15,
  duration = 0.9,
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const reduce = prefersReducedMotion();
  const revealStyle = reduce
    ? {}
    : {
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? 0 : y}px)`,
        filter: visible ? 'blur(0px)' : `blur(${blur}px)`,
        transition:
          `opacity ${duration}s ${PREMIUM_EASE} ${delay}s, ` +
          `transform ${duration}s ${PREMIUM_EASE} ${delay}s, ` +
          `filter ${duration}s ${PREMIUM_EASE} ${delay}s`,
        willChange: 'opacity, transform, filter',
      };

  return (
    <Tag ref={ref} style={{ ...revealStyle, ...style }} {...rest}>
      {children}
    </Tag>
  );
}
