import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

export const cn = (...parts: Array<string | false | undefined | null>) =>
  parts.filter(Boolean).join(" ");

/* ------------------------------------------------------------------ */
/* Hand-drawn monogram: a ruled square with register ticks and a       */
/* high-contrast serif B cut from a single evenodd path.               */
/* ------------------------------------------------------------------ */
export function Monogram({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Boily Real Estate monogram"
    >
      <rect
        x="1.5"
        y="1.5"
        width="61"
        height="61"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      {/* register ticks */}
      <g stroke="currentColor" strokeWidth="1">
        <path d="M1.5 12.5h5M12.5 1.5v5M62.5 51.5h-5M51.5 62.5v-5" opacity="0.85" />
      </g>
      <path
        fillRule="evenodd"
        fill="currentColor"
        d="M19 14h18.2c6.9 0 11.2 3.5 11.2 9.1 0 3.7-2 6.5-5.4 7.8 4.4 1.2 7.1 4.4 7.1 8.9 0 6.3-4.8 10.2-12.7 10.2H19V14Zm7.6 5.6v9.4h8.6c3.4 0 5.4-1.8 5.4-4.7s-2-4.7-5.4-4.7h-8.6Zm0 14.8v10.9h9.3c3.9 0 6.1-2.1 6.1-5.5s-2.2-5.4-6.1-5.4h-9.3Z"
      />
      {/* stem serifs */}
      <path fill="currentColor" d="M16.4 14h3.2v36h-3.2z" opacity="0" />
    </svg>
  );
}

/* Scroll reveal — pages settling onto the desk. */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Component = Tag as ElementType;

  return (
    <Component
      ref={ref as never}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", inView && "is-in", className)}
    >
      {children}
    </Component>
  );
}

/* Small-caps standfirst label with a hairline that draws out. */
export function Eyebrow({
  no,
  children,
  tone = "ink",
  className,
}: {
  no?: string;
  children: ReactNode;
  tone?: "ink" | "paper";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-2", className)}>
      {no && (
        <span
          className={cn(
            "font-mono text-[11px] tracking-[0.16em]",
            tone === "ink" ? "text-wax" : "text-[#e2a08f]"
          )}
        >
          No. {no}
        </span>
      )}
      <span
        className={cn(
          "h-px w-8",
          tone === "ink" ? "bg-rule" : "bg-white/40"
        )}
      />
      <span
        className={cn(
          "font-mono text-[11px] uppercase tracking-[0.22em]",
          tone === "ink" ? "text-inksoft" : "text-white/75"
        )}
      >
        {children}
      </span>
    </div>
  );
}

/* A plate that degrades into a ruled hatched panel rather than a broken icon. */
export function PlateImage({
  src,
  alt,
  className,
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex items-center justify-center border border-rule bg-plate",
          className
        )}
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(18,33,43,0.05) 0 1px, transparent 1px 9px)",
        }}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-inksoft">
          Plate withheld
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      onError={() => setFailed(true)}
    />
  );
}

export function StatusTag({ status }: { status: "ACTIVE" | "BY REQUEST" }) {
  const active = status === "ACTIVE";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-2 py-[3px] font-mono text-[10px] uppercase tracking-[0.18em]",
        active
          ? "border-wax/35 bg-wax/[0.07] text-wax"
          : "border-rule text-inksoft/75"
      )}
    >
      <span
        className={cn(
          "h-[5px] w-[5px] rounded-full",
          active ? "bg-wax" : "bg-inksoft/40"
        )}
      />
      {status}
    </span>
  );
}
