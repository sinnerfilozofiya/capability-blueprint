# Project data specification for portfolio

This document defines the **exact data structure and content guidelines** for adding a project to the portfolio.

Use it when:

- adding a new **Selected Project** card on the homepage
- filling project data so clicking a card opens the correct **project detail page**

---

## 1) Where the data is used

| Place | What users see | Data used |
|---|---|---|
| Homepage – Selected Projects | Card image, title, short summary, tech tags, repo/live links | `title`, `summary`, `image`, first 4 of `technologies`, `repoUrl`, `liveUrl` |
| Project detail page | Full page with title, summary, cover, About text, technologies, highlights, links | `title`, `summary`, `description`, `image`, `technologies`, `highlights`, `repoUrl`, `liveUrl` |

One project object drives both views, so fill every field carefully.

---

## 2) Required shape (TypeScript)

Add entries to `projects` in `src/config/links.ts`:

```ts
interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  repoUrl: string;
  liveUrl?: string;
  technologies: string[];
  highlights: string[];
}
```

---

## 3) Field rules

### Card-facing fields (homepage)

| Field | Required | Rules | Example |
|---|---|---|---|
| `slug` | Yes | URL-safe, lowercase, hyphenated, no spaces | `"my-app"` |
| `title` | Yes | Short project name | `"Firmware OTA Platform"` |
| `summary` | Yes | 1–2 sentences, scannable | `"Over-the-air update system for embedded devices with rollback support."` |
| `image` | Yes | Cover/thumbnail path or URL (`/projects/...` preferred) | `"/projects/ota-cover.png"` |
| `technologies` | Yes | 3–8 tech names; card shows first 4 | `["Rust", "C", "MQTT", "AWS IoT"]` |
| `repoUrl` | Yes | Full repository URL | `"https://github.com/you/repo-name"` |
| `liveUrl` | No | Full deployed/demo URL; omit if unavailable | `"https://my-app.example.com"` |

### Detail-page-specific fields

| Field | Required | Rules | Example |
|---|---|---|---|
| `description` | Yes | 1–3 paragraphs, clear problem/solution/impact text; `\n` line breaks supported | Multi-line string |
| `highlights` | Yes | 3–6 concise bullet points | `["Delta updates reduce bandwidth by 80%"]` |

---

## 4) Content guidelines

- **Image**: one clear cover image, same asset for card and detail view (16:9 or 4:3 preferred)
- **Technologies**: common names, ordered by importance/layer
- **Summary**: answer “what is this and what does it do?”
- **Description**: readable About section with context, implementation, impact
- **Highlights**: prioritize concrete outcomes and clearly visible capabilities
- **repoUrl**: use canonical repository URL
- **liveUrl**: include only if deploy/demo exists

---

## 5) Example object template

```ts
{
  slug: "firmware-ota",
  title: "Firmware OTA Platform",
  summary: "Over-the-air update system for embedded devices with rollback support.",
  description:
    "A secure firmware delivery platform enabling remote updates for thousands of edge devices with delta patching, integrity verification, and automatic rollback on failure.\n\nIt supports multiple device families and provides a dashboard for release management and analytics.",
  image: "/projects/firmware-ota-cover.png",
  repoUrl: "https://github.com/your-username/firmware-ota",
  liveUrl: "https://ota-demo.example.com",
  technologies: ["Rust", "C", "MQTT", "AWS IoT", "FreeRTOS"],
  highlights: [
    "Delta updates reduce bandwidth by 80%",
    "Cryptographic signature verification",
    "Zero-downtime rollback mechanism",
  ],
}
```

---

## 6) AI-agent instructions (inside a project repo)

When generating portfolio data from a project repository:

1. Extract/infer all fields from README, docs, and code.
2. Build exactly one object with the schema above.
3. Return only the object (no type definitions, no extra prose).
4. Keep valid TypeScript/JSON style with double quotes.
5. If no image exists, suggest `/projects/<slug>.png` and note asset must be added.

---

## 7) Paste location in portfolio repo

- **File**: `src/config/links.ts`
- **Array**: `projects`
- Add object under: `export const projects: Project[] = [ ... ]`

