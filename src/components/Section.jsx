import useReveal from '../hooks/useReveal.js';

/**
 * Wraps a homepage section and applies the scroll-reveal animation.
 * `outerStyle` goes on the animated wrapper; `id` allows anchor scrolling.
 */
export default function Section({ id, outerStyle, children }) {
  const [ref, revealStyle] = useReveal(true);
  return (
    <div id={id} ref={ref} style={{ ...revealStyle, ...outerStyle }}>
      {children}
    </div>
  );
}
