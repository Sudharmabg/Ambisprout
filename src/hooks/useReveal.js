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
 * Scroll-reveal via IntersectionObserver. Returns a ref to attach to the
 * section and a style object that blur-rises the section in once visible.
 * Ported to the premium easing / blur-rise feel of the Lithos hero spec.
 *
 * @param {boolean} animate  set false to opt a section out of the reveal
 * @param {number}  threshold IntersectionObserver visibility threshold
 * @param {number}  delay    seconds to stagger this reveal behind others
 */
export default function useReveal(animate = true, threshold = 0.2, delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!animate || prefersReducedMotion()) {
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
  }, [animate, threshold]);

  const style =
    animate && !prefersReducedMotion()
      ? {
          opacity: visible ? 1 : 0,
          transform: `translateY(${visible ? 0 : 30}px)`,
          filter: visible ? 'blur(0px)' : 'blur(8px)',
          transition:
            `opacity 0.9s ${PREMIUM_EASE} ${delay}s, ` +
            `transform 0.9s ${PREMIUM_EASE} ${delay}s, ` +
            `filter 0.9s ${PREMIUM_EASE} ${delay}s`,
          willChange: 'opacity, transform, filter',
        }
      : {};

  return [ref, style];
}
