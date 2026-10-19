import { useState, useCallback } from "react";
import { IMAGES } from "../lib/site";

type WorkImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  rounded?: "lg" | "xl" | "2xl" | "3xl";
  aspect?: "video" | "portrait" | "wide" | "square";
  /** First hero / LCP image */
  priority?: boolean;
};

const aspectClass = {
  video: "aspect-video",
  portrait: "aspect-[3/4] max-h-[min(70vh,520px)]",
  wide: "aspect-[21/9] max-h-80",
  square: "aspect-square",
} as const;

/**
 * Renders a proof-style photo: object-fit cover, no stretch, with a restrained fallback
 * if the file is not yet in /public/images.
 */
export function WorkImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  rounded = "2xl",
  aspect = "video",
  priority = false,
}: WorkImageProps) {
  const [failed, setFailed] = useState(false);
  const round = rounded === "3xl" ? "rounded-3xl" : "rounded-2xl";

  if (failed) {
    return (
      <div
        className={`${round} border border-navy/10 bg-gradient-to-br from-soft-blue via-light-gray to-soft-green ${aspectClass[aspect]} flex items-center justify-center p-6 text-center shadow-card ${className}`}
        role="img"
        aria-label={alt}
      >
        <p className="text-sm font-medium leading-relaxed text-navy/70">
          Add your photo: <code className="text-xs text-deep-blue">{src}</code>
        </p>
      </div>
    );
  }

  return (
    <div
      className={`${round} ${aspectClass[aspect]} w-full max-h-[min(78vh,640px)] overflow-hidden border border-navy/8 bg-light-gray shadow-card ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover object-center ${imgClassName}`}
      />
    </div>
  );
}

const LOGO_URLS = [IMAGES.logo, IMAGES.logoFallback] as const;

function LogoTextFallback({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline gap-0 font-serif text-xl font-bold tracking-tight sm:text-2xl ${className}`}
    >
      <span className="text-eco-green">Natu</span>
      <span className="text-deep-blue">Fresh</span>
    </span>
  );
}

const shellClass = {
  /** Fixed height row + max width: wide mark + icon scales reliably */
  header:
    "inline-flex max-w-[min(24rem,92vw)] shrink-0 items-center sm:max-w-[min(28rem,92vw)]",
  headerHome:
    "inline-flex max-w-[min(32rem,92vw)] shrink-0 items-center justify-center",
  footer: "inline-flex max-w-[min(20rem,90vw)] shrink-0 items-center",
  about: "inline-flex w-full max-w-2xl shrink-0 items-center justify-center p-1",
} as const;

const imgClass = {
  header:
    "block h-[2.475rem] w-auto max-w-full object-contain object-left sm:h-11 sm:max-h-[3.025rem] md:h-[3.3rem] md:max-h-[3.85rem]",
  headerHome:
    "block h-16 w-auto max-w-full object-contain sm:h-20 md:h-24",
  footer:
    "block h-16 w-auto max-w-full object-contain object-left sm:h-20 sm:max-h-24",
  about: "block h-auto w-full max-h-64 object-contain",
} as const;

type LogoVariant = keyof typeof shellClass;

/**
 * Tries PNG, then SVG, then text. Sizing uses a non-collapsing inline-flex shell
 * so the image always gets a real box (avoids 0×0 in flex headers).
 */
export function LogoImage({
  className = "",
  variant = "header",
  alt = "NatuFresh",
  loading = "eager",
}: {
  className?: string;
  variant?: LogoVariant;
  alt?: string;
  loading?: "eager" | "lazy";
}) {
  const [urlIndex, setUrlIndex] = useState(0);
  const onError = useCallback(() => {
    setUrlIndex((i) => i + 1);
  }, []);

  if (urlIndex >= LOGO_URLS.length) {
    return (
      <LogoTextFallback
        className={(shellClass[variant] + " " + className).trim()}
      />
    );
  }

  return (
    <span
      className={`${shellClass[variant]} bg-transparent [background:transparent] ${className}`.trim()}
    >
      <img
        src={LOGO_URLS[urlIndex]}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={variant === "header" ? "high" : "auto"}
        onError={onError}
        className={`${imgClass[variant]} bg-transparent [background:transparent] [box-shadow:none]`}
        width={400}
        height={90}
      />
    </span>
  );
}
