# Project data specification for portfolio

This document defines the **exact data structure and content guidelines** for adding a project to the portfolio. Use it when:

- Adding a new **Selected Project** (card on the homepage)
- Filling in data so that when a user **clicks a project** they see the correct **project detail page**

Give this file (or its instructions) to an AI agent inside a project repository so it can output the right data to paste into this portfolio’s config.

---

## 1. Where the data is used

| Place | What the user sees | Data used |
|-------|--------------------|-----------|
| **Homepage – Selected Projects** | Grid of project cards. Each card shows: image, title, short summary, tech tags, links to repo and live demo. | All fields below; card shows `title`, `summary`, `image`, `technologies` (first 4), `repoUrl`, `liveUrl`. |
| **Project detail page** (after clicking a card) | Full project page: title, summary, cover image, “About” description, technologies list, highlights list, Source / Live Demo buttons. | Same single project object; detail page uses `title`, `summary`, `description`, `image`, `technologies`, `highlights`, `repoUrl`, `liveUrl`. |

One project entry in config drives **both** the card and the detail page. Fill every field correctly for both views.

---

## 2. Data structure (TypeScript)

Every project must be a single object matching this shape. Add it to the `projects` array in **`src/config/links.ts`**.

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

## 3. Field-by-field rules

### Used on the **Selected Project card** (homepage)

| Field | Required | Format / rules | Example |
|-------|----------|----------------|---------|
| **slug** | Yes | URL-safe id: lowercase, hyphens, no spaces. Used in `/projects/<slug>`. | `"my-app"`, `"distributed-pipeline"` |
| **title** | Yes | Short project name. Shown as the card heading. | `"Firmware OTA Platform"` |
| **summary** | Yes | One or two sentences. Shown under the title on the card (and at top of detail page). Keep it scannable. | `"Over-the-air update system for embedded devices with rollback support."` |
| **image** | Yes | Path or URL to the **cover/thumbnail** image. Use same image for card and detail page. Prefer `/public` path (e.g. `/projects/my-app.png`) or full URL. | `"/projects/ota-cover.png"` or `"https://…"` |
| **technologies** | Yes | Array of tech names (languages, frameworks, tools). Card shows first 4; detail page shows all. | `["Rust", "C", "MQTT", "AWS IoT"]` |
| **repoUrl** | Yes | Full URL to the source code (e.g. GitHub). Usually `https://github.com/<username>/<repo>`. | `"https://github.com/you/repo-name"` |
| **liveUrl** | No | Full URL to live demo or deployed app. Omit if there is no live version. | `"https://my-app.example.com"` |

### Used on the **project detail page** (when the card is clicked)

| Field | Required | Format / rules | Example |
|-------|----------|----------------|---------|
| **description** | Yes | Full “About” text: 1–3 paragraphs. Shown in the main content area. Can use `\n` for line breaks. | Multi-line string describing what the project does, why it exists, and main outcomes. |
| **highlights** | Yes | Array of short bullet points (achievements, metrics, features). Shown in the sidebar. | `["Delta updates reduce bandwidth by 80%", "Cryptographic signature verification"]` |

Same **slug**, **title**, **summary**, **image**, **technologies**, **repoUrl**, **liveUrl** are used on the detail page as on the card; **description** and **highlights** are only used on the detail page but must still be provided for every project.

---

## 4. Content guidelines

- **Image**: One clear cover/thumbnail. Same asset for card and detail. Recommended: 16:9 or 4:3, good resolution (e.g. 1200×675).
- **Technologies**: 3–8 items. Use common names (e.g. "React", "PostgreSQL"). Order by importance or layer (e.g. backend first, then frontend, then infra).
- **Summary**: One or two sentences; no jargon overload. Answer “What is this and what does it do?”
- **Description**: Clear, readable “About” section. Explain problem, solution, and impact. Line breaks with `\n` are supported.
- **Highlights**: 3–6 bullets. Prefer concrete outcomes (numbers, metrics) and clear features.
- **repoUrl**: Use the real repository URL (includes username and repo name).
- **liveUrl**: Only if there is a deployed demo or production URL.

---

## 5. Example: one full project object

Use this as the template for AI-generated or hand-filled entries.

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

## 6. Instructions for AI agents

When you are an AI agent working inside a **project repository** (not this portfolio repo):

1. Read this document to learn the required shape and meaning of each field.
2. Using the project’s README, docs, and codebase, extract or infer:
   - **slug**: From project name (e.g. repo name → `my-cool-app`).
   - **title**: Display name of the project.
   - **summary**: One or two sentences (e.g. from README tagline or first paragraph).
   - **description**: 1–3 paragraphs for the “About” section (from README, docs).
   - **image**: If the repo has a screenshot or banner, suggest path or URL; otherwise suggest a placeholder path like `/projects/<slug>.png` and note that the user must add the asset.
   - **repoUrl**: Full GitHub (or other) URL for this repo (e.g. `https://github.com/owner/repo`).
   - **liveUrl**: Deployed URL if any; otherwise omit.
   - **technologies**: List of languages, frameworks, and tools used (from README, package files, or code).
   - **highlights**: 3–6 bullet points (features, metrics, outcomes).
3. Output **one** project object in the exact structure above, ready to be pasted into the `projects` array in **`src/config/links.ts`** of the **portfolio** repository. Use valid TypeScript/JSON (double quotes, trailing commas allowed in TS). Do not include the `Project` type definition in the output—only the object.

---

## 7. Where to paste the data

- **File**: `src/config/links.ts`
- **Array**: `projects`
- Add the new object inside `export const projects: Project[] = [ ... ]`, keeping the same structure as existing entries.
