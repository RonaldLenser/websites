"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function StickyCta() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;
  return (
    <div className="sticky-cta">
      <Link href="/contact" className="btn btn-primary w-full shadow-xl">
        Book 30 minutes with a founder
      </Link>
    </div>
  );
}
