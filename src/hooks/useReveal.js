import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-reveal via IntersectionObserver. Returns a ref to attach to the
 * section and a style object that fades/slides the section in once visible.
 * Mirrors the `sectionRevealStyle` behaviour from the original design.
 */
export default function useReveal(animate = true, threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!animate) {
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

  const style = animate
    ? {
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? 0 : 24}px)`,
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }
    : {};

  return [ref, style];
}
