// All portfolio content lives here. Edit this file to update the site.

export const profile = {
  name: "Sukhitha Saparamadu",
  shortName: "Sukhitha",
  title: "Full-Stack Web & Mobile Developer · Designer",
  location: "Gampaha, Sri Lanka",
  bio: "Computer Science undergrad passionate about full-stack web and mobile development and design. I thrive at the intersection of creativity and innovation — building projects that push technical boundaries and bring ideas to life visually and interactively.",
  currently: "Trainee Software Engineer at VizuaMatix",
  email: "saparamadusukhitha@gmail.com",
  github: "https://github.com/SukhithaPr",
  linkedin: "https://www.linkedin.com/in/sukhithapr/",
  // Put a photo in /public (e.g. /public/me.jpg) and set this to "/me.jpg".
  photo: null as string | null,
  // Put a PUBLIC version of your CV (no phone, address or referees) in /public
  // and set this to e.g. "/Sukhitha-Saparamadu-CV.pdf".
  resumeUrl: null as string | null,
};

export type Skill = { name: string; strong?: boolean };

export const skills: { group: string; items: Skill[] }[] = [
  {
    group: "Frontend",
    items: [
      { name: "React", strong: true },
      { name: "Next.js", strong: true },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "Tailwind CSS" },
      { name: "Vue" },
      { name: "Bootstrap" },
      { name: "HTML/CSS" },
    ],
  },
  {
    group: "Mobile",
    items: [
      { name: "Flutter/Dart", strong: true },
      { name: "Kotlin" },
      { name: "Jetpack Compose" },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "Java", strong: true },
      { name: "Spring Boot", strong: true },
      { name: "Node.js" },
      { name: "FastAPI" },
      { name: "Vert.x" },
    ],
  },
  {
    group: "APIs & Architecture",
    items: [
      { name: "REST", strong: true },
      { name: "WebSockets", strong: true },
      { name: "Microservices", strong: true },
      { name: "Client–Server" },
      { name: "Event-driven" },
    ],
  },
  {
    group: "Databases",
    items: [
      { name: "PostgreSQL", strong: true },
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "Firestore" },
    ],
  },
  {
    group: "Auth & Security",
    items: [
      { name: "JWT", strong: true },
      { name: "Spring Security", strong: true },
      { name: "OAuth 2.0" },
      { name: "Firebase Auth" },
      { name: "Clerk" },
      { name: "Auth0" },
    ],
  },
  {
    group: "DevOps & Tools",
    items: [
      { name: "Docker", strong: true },
      { name: "Linux", strong: true },
      { name: "Git", strong: true },
      { name: "Nginx" },
      { name: "Postman" },
      { name: "IntelliJ IDEA" },
      { name: "Android Studio" },
    ],
  },
  {
    group: "Design",
    items: [
      { name: "Figma", strong: true },
      { name: "Photoshop", strong: true },
      { name: "Illustrator", strong: true },
      { name: "Premiere Pro", strong: true },
      { name: "After Effects" },
      { name: "Blender" },
    ],
  },
];

export const softSkills = [
  "Communication",
  "Problem Solving",
  "Adaptability",
  "Teamwork & Collaboration",
  "Time Management",
  "Creative Thinking",
];

export type Job = {
  role: string;
  org: string;
  dates: string;
  current?: boolean;
  bullets: string[];
};

export const experience: Job[] = [
  {
    role: "Trainee Software Engineer",
    org: "VizuaMatix",
    dates: "Apr 2026 – Present",
    current: true,
    bullets: [
      "Build features across Flutter mobile apps and Spring Boot microservices for child-safety and network products",
      "Work with PostgreSQL, REST APIs and WebSockets in a production codebase",
    ],
  },
  {
    role: "Software Engineer Intern",
    org: "VizuaMatix",
    dates: "Apr 2025 – Apr 2026",
    bullets: [
      "Contributed to the vxSafenet and vxSafeHome platforms across frontend, backend and mobile",
      "Worked with Vue, Vert.x, Spring Boot and Flutter across the stack",
    ],
  },
  {
    role: "Director of Communications",
    org: "Peter House, IIT",
    dates: "Jan 2025 – Aug 2025",
    bullets: [
      "Led house communications and announcements for events and competitions",
      "Coordinated designers and content for social media",
    ],
  },
  {
    role: "Member",
    org: "IEEE Student Branch of IIT",
    dates: "Sep 2023 – Present",
    current: true,
    bullets: [
      "Competed in IEEEXtreme 17.0, CodeRally 5.0, IX '24 (led team Zeta-Div) and CodeSprint 8.0",
    ],
  },
  {
    role: "Graphic Designer",
    org: "DesignWorx",
    dates: "Apr 2024 – Sep 2024",
    bullets: [
      "Designed brand and social media visuals for clients including AnalytIQ and Isuru Enterprises",
    ],
  },
  {
    role: "PR Director",
    org: "LEO Club of IIT",
    dates: "Sep 2023 – Sep 2024",
    bullets: ["Handled public relations and promotional content for club projects"],
  },
  {
    role: "Video Editor",
    org: "Digikattadi",
    dates: "Apr 2023 – Dec 2023",
    bullets: ["Edited promotional and social media videos"],
  },
  {
    role: "Freelance Designer & Video Editor",
    org: "Freelance",
    dates: "Jan 2020 – Present",
    current: true,
    bullets: ["Branding, social media graphics and video editing for local businesses"],
  },
];

export const education = [
  {
    school: "University of Westminster",
    via: "Informatics Institute of Technology (IIT)",
    degree: "BSc (Hons) Computer Science",
    dates: "Sep 2023 – Sep 2027 (expected)",
  },
  {
    school: "Ananda College, Colombo 10",
    via: null,
    degree: "G.C.E. Advanced Level & Ordinary Level",
    dates: "2009 – 2023",
  },
];

export const certifications = [
  { name: "IEEEXtreme 17.0", detail: "24-hour global coding competition" },
  { name: "CodeRally 5.0", detail: "24-hour hackathon · IEEE of IIT" },
  { name: "IX '24 Designathon", detail: "UI/UX design competition · IEEE of IIT" },
  { name: "CodeSprint 8.0 Ideathon", detail: "IEEE of IIT" },
  { name: "Micro Maze", detail: "IEEE RAS Chapter of IIT" },
  { name: "Full-Stack Engineering for Entrepreneurship", detail: "STEMLink" },
  { name: "UWU Death Race", detail: "Battle bot competition · Uva Wellassa University" },
  { name: "Electro Combat", detail: "Battle bot competition · University of Sri Jayewardenepura" },
];

export type Project = {
  name: string;
  description: string;
  stack: string[];
  links: { label: string; href: string }[];
  nda?: boolean;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "vxSafenet",
    description:
      "Child-safety network platform at VizuaMatix. Recognised by NIRDC with its highest level of recognition.",
    stack: [],
    links: [],
    nda: true,
    featured: true,
  },
  {
    name: "vxSafeHome",
    description: "Child-safety platform for homes at VizuaMatix.",
    stack: [],
    links: [],
    nda: true,
    featured: true,
  },
  {
    name: "PledgeIt",
    description: "A platform that makes volunteering more engaging through gamification.",
    stack: ["React", "Tailwind", "FastAPI", "MongoDB", "Figma"],
    links: [
      { label: "Live", href: "https://pledgeit-marketing.vercel.app/" },
      { label: "GitHub", href: "https://github.com/SukhithaPr/PledgeIt" },
    ],
    featured: true,
  },
  {
    name: "MovieApp",
    description: "Search movies, view details and save them to your own list.",
    stack: ["Kotlin", "Jetpack Compose", "OMDB API", "Room"],
    links: [{ label: "GitHub", href: "https://github.com/SukhithaPr/MovieApp" }],
    featured: true,
  },
  {
    name: "Real-Time Ticketing Simulator",
    description: "Event ticket selling system built on the producer–consumer pattern.",
    stack: ["Java", "React", "Node.js"],
    links: [
      { label: "GUI", href: "https://github.com/SukhithaPr/Real-Time-Event-Ticketing-System---GUI" },
      { label: "CLI", href: "https://github.com/SukhithaPr/Real-Time-Event-Ticketing-System---CLI" },
    ],
    featured: true,
  },
  {
    name: "LankaEstate",
    description: "A website where users can search and buy properties.",
    stack: ["React", "Bootstrap 5"],
    links: [
      { label: "Live", href: "https://lanka-estate.vercel.app/" },
      { label: "GitHub", href: "https://github.com/SukhithaPr/LankaEstate" },
    ],
    featured: true,
  },
  {
    name: "Flight Seat Management",
    description: "Buy, cancel and check available plane seats.",
    stack: ["Java"],
    links: [{ label: "GitHub", href: "https://github.com/SukhithaPr/Plane-Management" }],
  },
  {
    name: "Dice Game",
    description: "Android dice game.",
    stack: ["Kotlin", "Jetpack Compose"],
    links: [{ label: "GitHub", href: "https://github.com/SukhithaPr/Dice-Game" }],
  },
  {
    name: "BookStore API",
    description: "RESTful API using JAX-RS.",
    stack: ["Java", "JAX-RS"],
    links: [{ label: "GitHub", href: "https://github.com/SukhithaPr/BookStore" }],
  },
  {
    name: "Beneath the Waves",
    description: "Web development coursework.",
    stack: ["HTML", "CSS"],
    links: [
      { label: "Live", href: "https://beneath-the-waves.vercel.app" },
      { label: "GitHub", href: "https://github.com/SukhithaPr/Beneath-the-waves" },
    ],
  },
  {
    name: "Exam Grade & Graph",
    description: "Python coursework.",
    stack: ["Python"],
    links: [{ label: "GitHub", href: "https://github.com/SukhithaPr/Exam-Grade-and-Graph" }],
  },
];
