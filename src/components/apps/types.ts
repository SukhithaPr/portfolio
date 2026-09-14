export const APP_IDS = [
  "about",
  "experience",
  "education",
  "projects",
  "browser",
  "terminal",
  "resume",
  "contact",
] as const;

export type AppId = (typeof APP_IDS)[number];
