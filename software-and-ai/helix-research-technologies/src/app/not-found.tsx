import Link from "next/link";
import PageHero from "@/components/page-hero";
import { Em } from "@/components/sections";

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title={
          <>
            That page <Em>does not exist.</Em>
          </>
        }
        lead="The link may be old. Everything we build is one click from the home page."
        cta={false}
      >
        <div className="mt-8 flex flex-wrap gap-2">
          <Link href="/" className="chip">Home</Link>
          <Link href="/services" className="chip">What we build</Link>
          <Link href="/pricing" className="chip">Pricing</Link>
          <Link href="/contact" className="chip">Book a call</Link>
        </div>
      </PageHero>
    </>
  );
}
