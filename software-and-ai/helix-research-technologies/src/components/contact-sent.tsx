"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function Inner({ sent, notSent }: { sent: React.ReactNode; notSent: React.ReactNode }) {
  const sp = useSearchParams();
  return <>{sp.get("sent") === "1" ? sent : notSent}</>;
}

/** Renders `sent` when the URL has ?sent=1, otherwise `notSent`. Works in static export. */
export default function SentSwitch({ sent, notSent }: { sent: React.ReactNode; notSent: React.ReactNode }) {
  return (
    <Suspense fallback={notSent}>
      <Inner sent={sent} notSent={notSent} />
    </Suspense>
  );
}
