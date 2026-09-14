# Sukhitha's Portfolio

A macOS-style portfolio: menu bar, dock and draggable windows. Built with Next.js, Tailwind CSS and Motion.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Edit the content

Everything shown on the site lives in `src/data/profile.ts`: bio, skills, experience, education, certifications, projects and links.

- **Photo:** add `public/me.jpg`, then set `photo: "/me.jpg"`.
- **Resume:** add a public version of your CV (no phone number, address or referees) to `public/`, then set `resumeUrl`.
- **Project screenshots:** cards currently use gradient placeholders.

## Structure

| Path | What it is |
|---|---|
| `src/components/Desktop.tsx` | Window manager: open, focus, minimize, close |
| `src/components/Window.tsx` | Draggable macOS window with traffic lights |
| `src/components/Dock.tsx` | Dock with hover magnification |
| `src/components/MenuBar.tsx` | Top bar and clock |
| `src/components/Wallpaper.tsx` | Purple wave wallpaper |
| `src/components/apps/` | Window contents (About, Experience, Education, Projects, Terminal, Resume, Contact) |
