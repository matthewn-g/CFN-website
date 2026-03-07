import type { CFNEvent } from "@/types/event";

export const events: CFNEvent[] = [
  {
    id:          "webinar-001",
    title:       "Breaking Into Investment Banking: What No One Tells You",
    description: "A candid conversation with former IB analysts on the realities of recruitment, the skills that actually matter, and how to stand out as a Canadian student.",
    date:        "2026-04-15T18:00:00-04:00",
    duration:    90,
    format:      "webinar",
    status:      "upcoming",
    speakers:    [
      { name: "Guest Speaker", role: "Former Analyst, Major Canadian Bank" },
    ],
    coverImage:  "/images/events/ib-webinar.jpg",
    tags:        ["Investment Banking", "Recruitment", "Career"],
    lumaUrl:     "#",
  },
  {
    id:          "webinar-002",
    title:       "DCF Deep Dive: Live Modelling Session",
    description: "Join us for a live walkthrough of a DCF model using a real Canadian company. Ask questions in real time as we build the model from scratch.",
    date:        "2026-03-20T17:00:00-05:00",
    duration:    120,
    format:      "workshop",
    status:      "past",
    speakers:    [
      { name: "CFN Research Team", role: "Canadian Financial Network" },
    ],
    coverImage:  "/images/events/dcf-workshop.jpg",
    tags:        ["DCF", "Modelling", "Valuation", "Workshop"],
    recordingUrl:"#",
  },
];
