import type { ReactNode } from "react";
import About from "./About";
import Experience from "./Experience";
import Education from "./Education";
import Projects from "./Projects";
import Browser, { type BrowserRequest } from "./Browser";
import Terminal from "./Terminal";
import Resume from "./Resume";
import Contact from "./Contact";
import type { AppId } from "./types";

export type AppContext = {
  openApp: (id: AppId) => void;
  openUrl: (url: string) => void;
  browserRequest: BrowserRequest;
};

export type AppDef = {
  id: AppId;
  title: string;
  size: { w: number; h: number };
  render: (ctx: AppContext) => ReactNode;
};

export const APPS: AppDef[] = [
  { id: "about", title: "About Me", size: { w: 780, h: 540 }, render: () => <About /> },
  { id: "experience", title: "Experience", size: { w: 680, h: 580 }, render: () => <Experience /> },
  { id: "education", title: "Education", size: { w: 660, h: 560 }, render: () => <Education /> },
  { id: "projects", title: "Projects", size: { w: 920, h: 620 }, render: (c) => <Projects openUrl={c.openUrl} /> },
  {
    id: "browser",
    title: "Browser",
    size: { w: 1040, h: 680 },
    render: (c) => <Browser request={c.browserRequest} />,
  },
  {
    id: "terminal",
    title: "Terminal — zsh",
    size: { w: 700, h: 440 },
    render: (c) => <Terminal openApp={c.openApp} openUrl={c.openUrl} />,
  },
  { id: "resume", title: "Resume", size: { w: 640, h: 620 }, render: (c) => <Resume openApp={c.openApp} /> },
  { id: "contact", title: "Contact", size: { w: 520, h: 470 }, render: (c) => <Contact openUrl={c.openUrl} /> },
];

export const APP_BY_ID = Object.fromEntries(APPS.map((a) => [a.id, a])) as Record<AppId, AppDef>;
