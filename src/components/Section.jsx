import useReveal from '../hooks/useReveal.js';

/**
 * Wraps a homepage section and applies the scroll-reveal animation.
 * `outerStyle` goes on the animated wrapper; `id` allows anchor scrolling.
 */
export default function Section({ id, outerStyle, className, children, animate = true }) {
  const [ref, revealStyle] = useReveal(animate);
  return (
    <div id={id} ref={ref} className={className} style={{ ...revealStyle, ...outerStyle }}>
      {children}
    </div>
  );
}
