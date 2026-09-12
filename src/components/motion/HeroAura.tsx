"use client";

/**
 * Hero backdrop: slow drifting colour fields in the brand ramp, crossed by a
 * light sweep. Replaces the earlier orbiting-icon version — literal icons
 * circling a headline read as clip-art and competed with the copy.
 *
 * Pure CSS transforms on four elements, no JS per frame. Decorative only.
 */
export function HeroAura() {
  return (
    <div className="hero-aura" aria-hidden>
      <span className="hero-aura-blob hero-aura-blob--magenta" />
      <span className="hero-aura-blob hero-aura-blob--plum" />
      <span className="hero-aura-blob hero-aura-blob--amber" />
      <span className="hero-aura-sweep" />
    </div>
  );
}
