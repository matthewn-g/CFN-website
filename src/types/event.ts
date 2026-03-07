export type EventFormat = "webinar" | "workshop" | "panel" | "networking";
export type EventStatus = "upcoming" | "past" | "registration-open";

export interface EventSpeaker {
  name:   string;
  role:   string;
  photo?: string;
}

export interface CFNEvent {
  id:               string;
  title:            string;
  description:      string;
  date:             string;
  duration:         number;
  format:           EventFormat;
  status:           EventStatus;
  speakers:         EventSpeaker[];
  registrationUrl?: string;
  recordingUrl?:    string;
  coverImage:       string;
  tags:             string[];
  lumaUrl?:         string;
}
