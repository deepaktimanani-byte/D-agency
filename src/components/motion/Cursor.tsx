"use client";
import { useEffect, useRef } from "react";

/** Elements that should enlarge the lens. */
const INTERACTIVE = 'a, button, [role="button"], summary, [data-cursor]';
/** Elements where the OS caret is genuinely more useful than the lens. */
const NATIVE = "input, textarea, select, [contenteditable='true']";
/** Text the lens actually magnifies. */
const ZOOMABLE = "h1, h2, h3, h4, p, li, blockquote, [data-zoom]";

const ZOOM = 1.8;
const SIZE_IDLE = 30;
/** Interactive but not text — just a nudge bigger. */
const SIZE_BIG = 48;
/** Over text the lens must be wide enough to frame a few characters:
    at 1.8x a 96px lens samples ~53px of source, which reads as words. */
const SIZE_TEXT = 96;
const SIZE_PRESS = 24;
/** Above this font size magnification stops helping: the lens fills with a
    single letter stroke. Display headings keep the plain glass effect. */
const MAX_ZOOM_FONT = 40;

/** Copied onto the clone so it renders identically outside its parent. */
const INHERITED = [
  "fontFamily", "fontSize", "fontWeight", "fontStyle", "lineHeight",
  "letterSpacing", "textTransform", "textAlign", "color", "textShadow",
] as const;

/**
 * Magnifier cursor — on brand for "Fix Your Gap": the pointer is the thing
 * that finds what you are missing.
 *
 * Over text it performs REAL magnification. There is no CSS that scales what
 * sits behind an element (backdrop-filter can blur and brighten, not zoom), so
 * the hovered element is cloned into the lens, scaled about the lens centre
 * and clipped to the circle. Only ever one clone, and only while hovering text.
 *
 * Over everything else the lens falls back to a glass effect that brightens
 * and saturates whatever is underneath.
 *
 * Desktop pointers only, and it bows out under reduced-motion: hiding the
 * system cursor is a real accessibility cost.
 */
export function Cursor() {
  const lens = useRef<HTMLDivElement>(null);
  const glass = useRef<HTMLDivElement>(null);
  const zoomLayer = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLDivElement>(null);
  const handle = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const l = lens.current;
    const g = glass.current;
    const z = zoomLayer.current;
    const p = pill.current;
    const h = handle.current;
    if (!l || !g || !z || !p || !h) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    let mx = -300, my = -300;   // pointer
    let x = -300, y = -300;     // lens centre (lags the pointer)
    let size = SIZE_IDLE;
    let targetSize = SIZE_IDLE;
    let zoomEl: HTMLElement | null = null;
    let visible = false;
    let raf = 0;

    /** Nearest ancestor with a real background, so the lens does not float. */
    const resolveBg = (el: Element): string => {
      let cur: Element | null = el;
      while (cur && cur !== document.documentElement) {
        const bg = getComputedStyle(cur).backgroundColor;
        if (bg && !bg.startsWith("rgba(0, 0, 0, 0)") && bg !== "transparent") return bg;
        cur = cur.parentElement;
      }
      return getComputedStyle(document.body).backgroundColor || "#0A0308";
    };

    const clearZoom = () => {
      zoomEl = null;
      z.replaceChildren();
      g.style.backgroundColor = "";
      g.dataset.zoom = "false";
    };

    const mountZoom = (el: HTMLElement) => {
      if (zoomEl === el) return;
      const clone = el.cloneNode(true) as HTMLElement;
      clone.removeAttribute("id");
      clone.querySelectorAll("[id]").forEach((n) => n.removeAttribute("id"));
      clone.setAttribute("aria-hidden", "true");

      // Styles the element inherited from its parent do not survive the clone.
      const cs = getComputedStyle(el);
      for (const prop of INHERITED) clone.style[prop] = cs[prop];
      clone.style.margin = "0";

      z.replaceChildren(clone);
      z.style.width = `${el.getBoundingClientRect().width}px`;
      g.style.backgroundColor = resolveBg(el);
      g.dataset.zoom = "true";
      zoomEl = el;
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        x = mx;
        y = my;
        l.dataset.visible = "true";
      }
    };

    const tick = () => {
      x += (mx - x) * 0.3;
      y += (my - y) * 0.3;
      size += (targetSize - size) * 0.2;

      l.style.width = `${size}px`;
      l.style.height = `${size}px`;
      l.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      p.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      // Frame and handle are proportional to the lens, and the handle starts
      // ON the rim (radius), not at the bounding-box corner — anchoring it to
      // the corner leaves a gap of R*(sqrt2 - 1) that grows with the lens.
      const radius = size / 2;
      const rim = Math.max(2, size * 0.045);
      const len = size * 0.42;
      const thick = Math.max(2.5, size * 0.075);
      g.style.borderWidth = `${rim}px`;
      h.style.width = `${len}px`;
      h.style.height = `${thick}px`;
      h.style.marginTop = `${-thick / 2}px`;
      h.style.transform = `rotate(45deg) translateX(${radius - rim * 0.5}px)`;

      if (zoomEl) {
        // Re-read every frame so scrolling and entrance animations stay aligned.
        const r = zoomEl.getBoundingClientRect();
        const left = x - size / 2;
        const top = y - size / 2;
        z.style.left = `${r.left - left}px`;
        z.style.top = `${r.top - top}px`;
        // Magnify about the lens centre, so that point sits still under the glass.
        z.style.transformOrigin = `${x - r.left}px ${y - r.top}px`;
        z.style.transform = `scale(${ZOOM})`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const setState = (state: string) => {
      l.dataset.state = state;
      p.dataset.state = state;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (!t?.closest) return;

      if (t.closest(NATIVE)) {
        setState("hidden");
        targetSize = SIZE_IDLE;
        clearZoom();
        return;
      }

      const candidate = t.closest(ZOOMABLE) as HTMLElement | null;
      const text =
        candidate &&
        candidate.textContent?.trim() &&
        parseFloat(getComputedStyle(candidate).fontSize) <= MAX_ZOOM_FONT
          ? candidate
          : null;

      if (text) mountZoom(text);
      else clearZoom();

      const hit = t.closest(INTERACTIVE) as HTMLElement | null;
      const label = hit?.dataset.cursorLabel?.trim();

      if (label) {
        p.textContent = label;
        setState("label");
      } else {
        p.textContent = "";
        setState(hit || text ? "hover" : "default");
      }
      targetSize = text ? SIZE_TEXT : hit ? SIZE_BIG : SIZE_IDLE;
    };

    const onLeave = () => {
      l.dataset.visible = "false";
      visible = false;
      clearZoom();
    };
    const onDown = () => { targetSize = SIZE_PRESS; };
    const onUp = () => { targetSize = zoomEl ? SIZE_TEXT : SIZE_IDLE; };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      root.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={lens} className="cursor-lens" data-state="default" data-visible="false" aria-hidden>
        <div ref={glass} className="cursor-lens-glass" data-zoom="false">
          <div ref={zoomLayer} className="cursor-lens-zoom" />
        </div>
        <span ref={handle} className="cursor-lens-handle" />
      </div>
      <div ref={pill} className="cursor-pill" data-state="default" aria-hidden />
    </>
  );
}
