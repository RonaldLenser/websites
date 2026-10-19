"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "./icons";
import { asset } from "@/lib/data";

const NAV = [
  { href: "/services", label: "What we build" },
  { href: "/industries/lab-supply", label: "Who it is for" },
  { href: "/work", label: "Results" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "Team" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 bg-white/85 backdrop-blur-md ${
        scrolled ? "border-b border-gray-200" : "border-b border-transparent"
      }`}
    >
      <div className="container flex h-[72px] items-center justify-between gap-6">
        <Link href="/" className="flex items-center" aria-label="Helix Research Technologies home">
          <Image src={asset("/brand/helix-horizontal.svg")} alt="Helix Research Technologies" width={148} height={58} priority className="h-8 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-[0.92rem] font-medium text-gray-600" aria-label="Primary">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`hover:text-navy transition-colors ${pathname.startsWith(n.href) ? "text-navy" : ""}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/contact" className="btn btn-primary btn-sm">
            Book 30 minutes
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden btn btn-ghost btn-sm"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X width={16} height={16} /> : "Menu"}
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="lg:hidden border-t border-gray-200 bg-white">
          <nav className="container py-4 flex flex-col gap-1" aria-label="Mobile">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="py-3 text-lg font-medium text-navy border-b border-gray-200">
                {n.label}
              </Link>
            ))}
            <Link href="/contact" className="btn btn-primary mt-4">
              Book 30 minutes
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
