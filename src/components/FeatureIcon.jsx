/**
 * Inline line-icon set for the "Everything You Need To Go Green" bento.
 * Stroke uses currentColor so the parent controls the accent. No dependency.
 */
const PATHS = {
  bot: (
    <>
      <rect x="4" y="8" width="16" height="12" rx="3" />
      <path d="M12 8V4" />
      <circle cx="12" cy="3" r="1.2" fill="currentColor" stroke="none" />
      <path d="M9 13h.01M15 13h.01" />
      <path d="M2 13v3M22 13v3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" />
    </>
  ),
  camera: (
    <>
      <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2l1.2-2h6.6L15.5 7h2A1.5 1.5 0 0 1 19 8.5v9A1.5 1.5 0 0 1 17.5 19h-13A1.5 1.5 0 0 1 3 17.5z" />
      <circle cx="11" cy="12.5" r="3.2" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 3h12v18l-2.2-1.4L13.6 21 11.4 19.6 9.2 21 7 19.6 6 21z" transform="translate(0 -1)" />
      <path d="M9 8h6M9 11.5h6M9 15h3.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.2a3.2 3.2 0 0 1 0 6.1" />
      <path d="M17 14.2A5.5 5.5 0 0 1 20.5 19" />
    </>
  ),
  coin: (
    <>
      <ellipse cx="12" cy="7" rx="7" ry="3.2" />
      <path d="M5 7v6c0 1.8 3.1 3.2 7 3.2s7-1.4 7-3.2V7" />
      <path d="M5 13v3c0 1.8 3.1 3.2 7 3.2s7-1.4 7-3.2v-3" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0" />
      <path d="M12 17.5V21" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5.2c0 4.4-2.9 7.9-7 9.8-4.1-1.9-7-5.4-7-9.8V6z" />
      <path d="M9 11.6l2.1 2.1 3.9-4.4" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2.5" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="15.5" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.2-6.5-10.3a6.5 6.5 0 0 1 13 0C18.5 15.8 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.3" />
    </>
  ),
  leaf: (
    <>
      <path d="M12 3C6 7.5 5 14 12 21 19 14 18 7.5 12 3Z" />
      <path d="M12 6v12" />
    </>
  ),
};

/* Icons rendered with a solid fill instead of a stroke. */
const FILLED = {
  heart: <path d="M12 20C5 15 3 10 5.5 7 7.5 4.7 10.5 5.2 12 8 13.5 5.2 16.5 4.7 18.5 7 21 10 19 15 12 20Z" />,
  sprout: (
    <>
      <rect x="11.2" y="12" width="1.6" height="9.5" rx="0.8" />
      <path d="M12 13.5C12 8.6 8.6 5.5 3.5 5.5c0 5.1 3.4 8 8.5 8Z" />
      <path d="M12 13.5c0-4.9 3.4-8 8.5-8 0 5.1-3.4 8-8.5 8Z" />
    </>
  ),
};

export default function FeatureIcon({ name, size = 24, filled = false }) {
  const useFilled = filled || name in FILLED;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={useFilled ? 'currentColor' : 'none'}
      stroke={useFilled ? 'none' : 'currentColor'}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {FILLED[name] || PATHS[name] || null}
    </svg>
  );
}
