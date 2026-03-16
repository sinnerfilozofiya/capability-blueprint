// ============================================================
// SITE CONFIGURATION
// Update these values before running the application.
// ============================================================

export const siteConfig = {
  // Personal info
  name: "Sina Bagherzadeh Khiavi",
  title: "Systems Engineer",
  tagline: "Backend Architect • Embedded Systems • Distributed Infrastructure",
  description:
    "I design distributed systems that connect software, hardware, and data pipelines.",

  // Social links
  github: "https://github.com/sinnerfilozofiya",
  linkedin: "https://www.linkedin.com/in/sina-bagherzadeh-khiavi",
  email: "sina@example.com",
};

// ============================================================
// PROJECT CONFIGURATION
// Add your projects here. Each project will get a card on the
// homepage and its own detail page at /projects/<slug>.
// ============================================================

export interface Project {
  /** URL-friendly identifier (used in routing) */
  slug: string;
  /** Project title */
  title: string;
  /** One-line summary shown on the card */
  summary: string;
  /** Detailed description shown on the project page */
  description: string;
  /** Path or URL to a cover/thumbnail image */
  image: string;
  /** Link to the source code repository */
  repoUrl: string;
  /** Optional live demo URL */
  liveUrl?: string;
  /** Technologies used */
  technologies: string[];
  /** Key highlights / features (bullet points on detail page) */
  highlights: string[];
}

export const projects: Project[] = [
  // ---- EXAMPLE PROJECT (replace or remove) ----
  {
    slug: "example-project",
    title: "Example Project",
    summary: "A brief one-liner about what this project does.",
    description:
      "A longer description that explains the project in detail — its purpose, architecture, challenges solved, and outcomes.",
    image: "/placeholder.svg",
    repoUrl: "https://github.com/sinnerfilozofiya/example",
    technologies: ["Python", "Docker", "Redis"],
    highlights: [
      "Designed a scalable event pipeline",
      "Reduced latency by 40%",
      "Deployed on AWS with CI/CD",
    ],
  },
  // ---- ADD MORE PROJECTS BELOW ----
];
