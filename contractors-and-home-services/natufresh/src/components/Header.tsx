import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { LogoImage } from "./WorkImage";
import { LanguageToggle } from "./LanguageToggle";
import { SITE } from "../lib/site";
import { useLocale } from "../i18n/LocaleProvider";

function PhoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.5.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.4.57 3.5a1 1 0 0 1-.25 1l-2.22 2.3Z" />
    </svg>
  );
}

export function Header() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  const nav = [
    { to: "/", label: t("nav.home"), end: true },
    { to: "/services", label: t("nav.services"), end: false },
    { to: "/about", label: t("nav.about"), end: false },
    { to: "/contact", label: t("nav.contact"), end: false },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold transition-colors ${
      isActive ? "text-deep-blue" : "text-navy/70 hover:text-navy"
    }`;

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navLinks = (
    <nav aria-label="Main">
      <ul className="flex items-center gap-5 xl:gap-7">
        {nav.map((item) => (
          <li key={item.to}>
            <NavLink to={item.to} className={linkClass} end={item.end}>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );

  const desktopActions = (
    <>
      <LanguageToggle />
      <a
        href={`tel:+1${SITE.phoneTel}`}
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-navy/15 bg-white px-4 text-sm font-semibold text-navy transition hover:border-deep-blue/40 hover:bg-soft-blue/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-blue"
      >
        <PhoneIcon />
        {t("nav.callNow")}
      </a>
      <Link
        to="/contact"
        className="inline-flex h-10 items-center justify-center rounded-lg bg-eco-green px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-deep-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-blue"
      >
        {t("nav.requestQuote")}
      </Link>
    </>
  );

  const mobileControls = (
    <div className="flex items-center gap-2 lg:hidden">
      <LanguageToggle />
      <a
        href={`tel:+1${SITE.phoneTel}`}
        aria-label={t("nav.callNow")}
        className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-eco-green text-white shadow-sm transition hover:bg-deep-blue"
      >
        <PhoneIcon className="h-5 w-5" />
      </a>
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-navy/10 bg-white text-navy shadow-sm"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
      >
        {open ? (
          <svg
            className="h-5 w-5 text-navy"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <svg
            className="h-5 w-5 text-navy"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </div>
  );

  return (
    <header
      className={`sticky top-0 z-[100] border-b transition-shadow duration-200 ${
        solid
          ? "border-navy/8 bg-white/95 shadow-header backdrop-blur-md"
          : "border-navy/5 bg-white/90 backdrop-blur-sm"
      }`}
    >
      {/* Mobile: standard bar (logo left, controls right) — same on every page */}
      <div className="mx-auto flex min-h-[4.75rem] max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:hidden">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-blue"
          onClick={() => setOpen(false)}
        >
          <LogoImage variant="header" />
        </Link>
        {mobileControls}
      </div>

      {/* Desktop: big centered logo with nav row below — same on every page */}
      <div className="mx-auto hidden max-w-6xl flex-col items-center gap-4 px-4 py-4 sm:px-6 lg:flex">
        <Link
          to="/"
          className="flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-blue"
          onClick={() => setOpen(false)}
        >
          <LogoImage variant="headerHome" />
        </Link>
        <div className="flex items-center gap-6 xl:gap-8">
          {navLinks}
          {desktopActions}
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`fixed left-0 right-0 top-[4.75rem] z-[99] flex h-[calc(100dvh-4.75rem)] flex-col bg-warm-white transition lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav
          className="flex h-full min-h-0 flex-col overflow-y-auto border-t border-navy/8 bg-white px-4 py-6"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-lg font-semibold text-navy hover:bg-light-gray"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-3 border-t border-navy/8 pt-6">
            <a
              href={`tel:+1${SITE.phoneTel}`}
              onClick={() => setOpen(false)}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-navy/15 bg-white text-base font-semibold text-navy hover:bg-soft-blue/50"
            >
              <PhoneIcon className="h-5 w-5" />
              {t("nav.callNow")}
            </a>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="flex h-12 w-full items-center justify-center rounded-lg bg-eco-green text-base font-semibold text-white hover:bg-deep-blue"
            >
              {t("nav.requestQuote")}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
