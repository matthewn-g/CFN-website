"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const SLIDES = [
  { src: "/images/hero/ubc.jpg",       alt: "University of British Columbia" },
  { src: "/images/hero/queens.jpeg",   alt: "Queen's University" },
  { src: "/images/hero/toronto.jpeg",  alt: "University of Toronto" },
];

// Alternate Ken Burns direction per slide for a natural flyover feel
const KB_VARIANTS = [
  "animate-kb-1",  // zoom in + pan left
  "animate-kb-2",  // zoom in + pan right
  "animate-kb-3",  // zoom in + pan up-right
];

const INTERVAL_MS = 7000;

export default function HeroSlideshow() {
  const [cur, setCur]         = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCur((c) => (c + 1) % SLIDES.length);
      setAnimKey((k) => k + 1);
    }, INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  const prev = (cur - 1 + SLIDES.length) % SLIDES.length;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* ── Base layer: previous slide sits below so there's no black flash ── */}
      <div className="absolute inset-0">
        <Image
          src={SLIDES[prev].src}
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* ── Active layer: fades in over previous, applies Ken Burns zoom ── */}
      <div key={animKey} className="absolute inset-0 animate-hero-fade">
        <div className={`absolute inset-0 ${KB_VARIANTS[animKey % 3]}`}>
          <Image
            src={SLIDES[cur].src}
            alt={SLIDES[cur].alt}
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>

      {/* ── Dark overlay — ensures text stays readable over any photo ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/70" />
    </div>
  );
}
