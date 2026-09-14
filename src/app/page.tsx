import Desktop from "@/components/Desktop";
import { certifications, education, experience, profile, projects, skills } from "@/data/profile";

export default function Home() {
  return (
    <main>
      {/* Plain-text version of the portfolio for search engines and screen readers. */}
      <div className="sr-only">
        <h2>About</h2>
        <p>{profile.bio}</p>
        <h2>Experience</h2>
        <ul>
          {experience.map((j) => (
            <li key={j.role + j.org}>
              {j.role} at {j.org} ({j.dates}). {j.bullets.join(" ")}
            </li>
          ))}
        </ul>
        <h2>Education</h2>
        <ul>
          {education.map((e) => (
            <li key={e.school}>
              {e.degree}, {e.school} ({e.dates})
            </li>
          ))}
        </ul>
        <h2>Projects</h2>
        <ul>
          {projects.map((p) => (
            <li key={p.name}>
              {p.name}: {p.description} {p.stack.join(", ")}
            </li>
          ))}
        </ul>
        <h2>Skills</h2>
        <p>{skills.flatMap((g) => g.items.map((s) => s.name)).join(", ")}</p>
        <h2>Certifications</h2>
        <p>{certifications.map((c) => c.name).join(", ")}</p>
        <h2>Contact</h2>
        <p>
          <a href={`mailto:${profile.email}`}>{profile.email}</a> · <a href={profile.github}>GitHub</a> ·{" "}
          <a href={profile.linkedin}>LinkedIn</a>
        </p>
      </div>
      <Desktop />
    </main>
  );
}
