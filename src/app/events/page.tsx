import type { Metadata } from "next";
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
      <div className="bg-cfn-navy py-16">
        <div className="section-container">
          <p className="text-cfn-gold text-sm font-bold uppercase tracking-widest mb-3">Connect</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Events &amp; Networking
          </h1>
          <p className="text-white/70 text-lg max-w-xl">
            Connect with like-minded students across Canada. From live modelling workshops to candid career conversations.
          </p>
        </div>
      </div>

      <div className="section-container py-16 space-y-16">
        {/* Upcoming Events */}
        <section>
          <h2 className="text-3xl font-black text-cfn-navy dark:text-white mb-8">
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
                    className="bg-white dark:bg-white/5 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
                  >
                    <div className="bg-cfn-navy p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="bg-cfn-gold/20 text-cfn-gold text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full flex items-center gap-1">
                              <Icon className="w-3 h-3" />
                              {event.format}
                            </span>
                            {event.status === "registration-open" && (
                              <span className="bg-emerald-400/20 text-emerald-400 text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
                                Registration Open
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-white">{event.title}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-cfn-muted dark:text-cfn-dark-muted text-sm leading-relaxed mb-4">
                        {event.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-cfn-muted dark:text-cfn-dark-muted mb-6">
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
                              <span className="font-semibold text-cfn-navy dark:text-white">{s.name}</span>
                              <span className="text-cfn-muted dark:text-cfn-dark-muted"> · {s.role}</span>
                            </p>
                          ))}
                        </div>
                      )}
                      {event.lumaUrl && event.lumaUrl !== "#" && (
                        <a
                          href={event.lumaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-cfn-gold text-cfn-navy font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-cfn-gold-light transition-colors"
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
            <h2 className="text-3xl font-black text-cfn-navy dark:text-white mb-8">
              Past Events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map((event) => {
                const Icon = formatIcons[event.format] ?? Video;
                return (
                  <div
                    key={event.id}
                    className="bg-white dark:bg-white/5 rounded-2xl p-5 shadow-card"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-cfn-navy-100 dark:bg-white/10 text-cfn-navy dark:text-white text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Icon className="w-3 h-3" />
                        {event.format}
                      </span>
                    </div>
                    <h3 className="font-bold text-cfn-navy dark:text-white mb-2 line-clamp-2">{event.title}</h3>
                    <p className="text-xs text-cfn-muted dark:text-cfn-dark-muted mb-4">
                      {formatDate(event.date)}
                    </p>
                    {event.recordingUrl && event.recordingUrl !== "#" && (
                      <a
                        href={event.recordingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-cfn-gold font-semibold text-sm hover:text-cfn-gold-light transition-colors"
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
          <Mail className="w-10 h-10 text-cfn-gold mx-auto mb-4" />
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Partner with CFN
          </h3>
          <p className="text-white/70 text-lg max-w-lg mx-auto mb-8">
            Are you a finance professional, alumni, or organization who wants to reach hundreds of Canadian students? We&apos;d love to hear from you.
          </p>
          <a
            href="mailto:thecanadianfinancialnetwork@gmail.com"
            className="inline-flex items-center gap-2 bg-cfn-gold text-cfn-navy font-semibold px-7 py-3 rounded-lg hover:bg-cfn-gold-light transition-colors"
          >
            <Mail className="w-4 h-4" />
            Get in Touch
          </a>
        </section>
      </div>
    </div>
  );
}
