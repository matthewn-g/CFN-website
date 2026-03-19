import type { Metadata } from "next";
import Image from "next/image";
import { Calendar, Clock, Users, Video, ExternalLink, Mail } from "lucide-react";
import { getAllEvents } from "@/lib/notion";
import { formatDate } from "@/lib/utils";
import ContentEmptyState from "@/components/ui/ContentEmptyState";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Events & Networking",
  description:
    "Connect with finance students across Canada. Join CFN webinars, live modelling workshops, and networking events.",
};

const formatIcons: Record<string, React.ElementType> = {
  webinar:    Video,
  workshop:   Users,
  panel:      Users,
  networking: Users,
};

export default async function EventsPage() {
  const events = await getAllEvents();
  const upcoming = events.filter((e) => e.status === "upcoming" || e.status === "registration-open");
  const past     = events.filter((e) => e.status === "past");

  return (
    <div className="pt-16">
      {/* Hero */}
      <div className="relative overflow-hidden bg-cfn-navy py-16">
        <div className="absolute inset-0 animate-kb-1">
          <Image
            src="/images/events/handshake.webp"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-cfn-navy/75" />
        <div className="section-container relative z-10">
          <p className="text-cfn-blue-text text-sm font-bold uppercase tracking-widest mb-3">Connect</p>
          <h1 className="text-4xl sm:text-5xl font-black text-cfn-cream mb-4">
            Events &amp; Networking
          </h1>
          <p className="text-cfn-cream/70 text-lg max-w-xl">
            Connect with like-minded students across Canada. From live modelling workshops to candid career conversations.
          </p>
        </div>
      </div>

      <div className="section-container py-16 space-y-16">
        {/* Upcoming Events */}
        <section>
          <h2 className="text-3xl font-black text-cfn-navy mb-8">
            Upcoming Events
          </h2>
          {upcoming.length === 0 ? (
            <ContentEmptyState
              title="No upcoming events yet"
              description="Follow us on Instagram @thecanadianfinancialnetwork to be the first to know when events are announced."
              cta={{ label: "Follow on Instagram", href: "https://instagram.com/thecanadianfinancialnetwork" }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcoming.map((event) => {
                const Icon = formatIcons[event.format] ?? Video;
                return (
                  <div
                    key={event.id}
                    className="bg-cfn-cream rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
                  >
                    <div className="bg-cfn-navy p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="bg-cfn-cream/15 text-cfn-cream text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full flex items-center gap-1">
                              <Icon className="w-3 h-3" />
                              {event.format}
                            </span>
                            {event.status === "registration-open" && (
                              <span className="bg-emerald-400/20 text-emerald-400 text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
                                Registration Open
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-cfn-cream">{event.title}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-cfn-muted text-sm leading-relaxed mb-4">
                        {event.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-cfn-muted mb-6">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {formatDate(event.date)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {event.duration} min
                        </span>
                      </div>
                      {event.speakers.length > 0 && (
                        <div className="mb-4">
                          {event.speakers.map((s) => (
                            <p key={s.name} className="text-sm">
                              <span className="font-semibold text-cfn-navy">{s.name}</span>
                              <span className="text-cfn-muted"> · {s.role}</span>
                            </p>
                          ))}
                        </div>
                      )}
                      {event.lumaUrl && event.lumaUrl !== "#" && (
                        <a
                          href={event.lumaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-cfn-cream text-cfn-navy font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-cfn-cream-dark transition-colors"
                        >
                          Register on Luma
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Past Events */}
        {past.length > 0 && (
          <section>
            <h2 className="text-3xl font-black text-cfn-navy mb-8">
              Past Events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map((event) => {
                const Icon = formatIcons[event.format] ?? Video;
                return (
                  <div
                    key={event.id}
                    className="bg-cfn-cream rounded-2xl p-5 shadow-card"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-cfn-navy-100 text-cfn-navy text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Icon className="w-3 h-3" />
                        {event.format}
                      </span>
                    </div>
                    <h3 className="font-bold text-cfn-navy mb-2 line-clamp-2">{event.title}</h3>
                    <p className="text-xs text-cfn-muted mb-4">
                      {formatDate(event.date)}
                    </p>
                    {event.recordingUrl && event.recordingUrl !== "#" && (
                      <a
                        href={event.recordingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-cfn-blue-text font-semibold text-sm hover:text-cfn-cream transition-colors"
                      >
                        Watch Recording
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Partner CTA */}
        <section className="bg-cfn-navy rounded-2xl p-8 sm:p-12 text-center">
          <Mail className="w-10 h-10 text-cfn-blue-text mx-auto mb-4" />
          <h3 className="text-2xl sm:text-3xl font-black text-cfn-cream mb-3">
            Partner with CFN
          </h3>
          <p className="text-cfn-cream/70 text-lg max-w-lg mx-auto mb-8">
            Are you a finance professional, alumni, or organization who wants to reach hundreds of Canadian students? We&apos;d love to hear from you.
          </p>
          <a
            href="mailto:thecanadianfinancialnetwork@gmail.com"
            className="inline-flex items-center gap-2 bg-cfn-cream text-cfn-navy font-semibold px-7 py-3 rounded-lg hover:bg-cfn-cream-dark transition-colors"
          >
            <Mail className="w-4 h-4" />
            Get in Touch
          </a>
        </section>
      </div>
    </div>
  );
}
