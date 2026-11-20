import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { STATUS_META } from "@/lib/project-status";

const DRAG_FACTOR = 0.35;
const TOP_OFFSET = 76;
// Only the top slice of the wheel stays on screen; a line cuts off the rest.
const BAND_MIN = 124;

export default function ProjectWheel({ projects = [] }) {
  const shellRef = useRef(null);
  const drag = useRef({ active: false, lastX: 0, moved: false, velocity: 0, raf: 0 });
  const [radius, setRadius] = useState(240);
  const [rotation, setRotation] = useState(0);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    const measure = () => {
      const { width } = el.getBoundingClientRect();
      setRadius(Math.max(150, Math.min(width * 0.29, 250)));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => cancelAnimationFrame(drag.current.raf), []);

  const stopSpin = () => {
    cancelAnimationFrame(drag.current.raf);
    drag.current.velocity = 0;
  };

  const onPointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    stopSpin();
    drag.current.active = true;
    drag.current.lastX = event.clientX;
    drag.current.moved = false;
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // pointers without a capture target (automation) still drag fine
    }
  };

  const onPointerMove = (event) => {
    const state = drag.current;
    if (!state.active) return;
    const dx = event.clientX - state.lastX;
    if (!dx) return;
    state.lastX = event.clientX;
    state.velocity = -dx * DRAG_FACTOR;
    if (Math.abs(dx) > 1.5) state.moved = true;
    setRotation((value) => value - dx * DRAG_FACTOR);
  };

  const endDrag = () => {
    const state = drag.current;
    if (!state.active) return;
    state.active = false;
    const spin = () => {
      state.velocity *= 0.94;
      if (Math.abs(state.velocity) < 0.06) return;
      setRotation((value) => value + state.velocity);
      state.raf = requestAnimationFrame(spin);
    };
    state.raf = requestAnimationFrame(spin);
  };

  const step = projects.length ? 360 / projects.length : 360;
  const centreTop = TOP_OFFSET + radius;
  const bandHeight = Math.max(radius * 0.4, BAND_MIN);

  return (
    <div className="mt-10">
      <div
        ref={shellRef}
        className="wheel-shell relative w-full overflow-hidden"
        style={{ height: TOP_OFFSET + bandHeight }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        <div
          className="pointer-events-none absolute left-1/2 rounded-full border border-dashed border-foreground/20"
          style={{
            width: radius * 2,
            height: radius * 2,
            top: TOP_OFFSET,
            transform: "translateX(-50%)",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute left-1/2 rounded-full bg-primary/10"
          style={{
            width: radius * 0.9,
            height: radius * 0.9,
            top: centreTop - radius * 0.45,
            transform: "translateX(-50%)",
          }}
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-px bg-foreground/20"
          aria-hidden="true"
        />

        {projects.map((project, index) => {
          const meta = STATUS_META[project.status] ?? STATUS_META.idea;
          const angle = step * index + rotation;
          const isActive = hovered?.id === project.id;

          return (
            <div
              key={project.id}
              className="absolute left-1/2"
              style={{
                top: centreTop,
                zIndex: isActive ? 30 : 1,
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(${-radius}px) rotate(${-angle}deg)`,
              }}
            >
              <Link
                to={`/lab/${project.slug}`}
                onMouseOver={() => setHovered(project)}
                onMouseOut={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setHovered(null);
                }}
                onFocus={() => setHovered(project)}
                onBlur={() => setHovered(null)}
                onClick={(event) => {
                  if (drag.current.moved) event.preventDefault();
                }}
                className={`glass block w-[148px] rounded-2xl p-2 text-left sm:w-[176px] ${
                  isActive ? "glass-gold" : ""
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="h-9 w-9 shrink-0 overflow-hidden rounded-xl bg-muted">
                    {project.image_url ? (
                      <Image
                        src={project.image_url}
                        alt=""
                        fittingType="fill"
                        className="h-9 w-9 object-cover"
                      />
                    ) : (
                      <span className={`block h-full w-full ${meta.dot}`} />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-heading text-[0.8rem] font-medium text-foreground">
                      {project.title}
                    </span>
                    <span className="mt-0.5 block font-mono text-[0.55rem] uppercase tracking-[0.16em] text-muted-foreground">
                      {meta.label}
                    </span>
                  </span>
                </span>
                <span
                  className={`block overflow-hidden transition-all duration-200 ${
                    isActive ? "mt-2 max-h-28 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <span className="block text-[0.7rem] leading-snug text-muted-foreground">
                    {project.summary}
                  </span>
                </span>
              </Link>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-center font-mono text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">
        Drag the wheel to spin it
      </p>
    </div>
  );
}