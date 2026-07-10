import { useState } from 'react';

/**
 * Renders an element that merges `hoverStyle` on top of `style` while hovered.
 * Replaces the design's `style-hover` attribute, which React inline styles
 * cannot express on their own.
 */
export default function Hoverable({
  as: Tag = 'div',
  style,
  hoverStyle,
  children,
  ...rest
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Tag
      style={hovered ? { ...style, ...hoverStyle } : style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
