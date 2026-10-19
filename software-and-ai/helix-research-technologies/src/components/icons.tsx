import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...p,
});

export const ArrowUpRight = (p: P) => (
  <svg {...base(p)}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);
export const ArrowRight = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 12h15m-6-6 6 6-6 6" />
  </svg>
);
export const Check = (p: P) => (
  <svg {...base(p)}>
    <path d="m5 12 4.5 4.5L19 7" />
  </svg>
);
export const X = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const Minus = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 12h12" />
  </svg>
);
export const Plus = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 6v12M6 12h12" />
  </svg>
);
export const Phone = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
);
export const Mail = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
export const Quote = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 5h16v11H9l-4 4z" />
    <path d="M8 9h8M8 12h5" />
  </svg>
);
export const Repeat = (p: P) => (
  <svg {...base(p)}>
    <path d="M17 2l4 4-4 4" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <path d="M7 22l-4-4 4-4" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>
);
export const Grid = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);
export const Code = (p: P) => (
  <svg {...base(p)}>
    <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 4l-4 16" />
  </svg>
);
export const Bolt = (p: P) => (
  <svg {...base(p)}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
  </svg>
);
export const Clock = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
export const Shield = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
export const Linkedin = (p: P) => (
  <svg {...base(p)} fill="currentColor" stroke="none">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2 3.77-2 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3 0-3-1.85-3s-2.13 1.45-2.13 2.9V21H9z" />
  </svg>
);

export const ServiceIcon = ({ name, ...p }: { name: string } & P) => {
  switch (name) {
    case "quote":
      return <Quote {...p} />;
    case "repeat":
      return <Repeat {...p} />;
    case "phone":
      return <Phone {...p} />;
    case "grid":
      return <Grid {...p} />;
    case "code":
      return <Code {...p} />;
    default:
      return <Bolt {...p} />;
  }
};
