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
  email: "sinaxhiavi@gmail.com",
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
  /** Path or URL to a cover/thumbnail image (card + fallback on detail page) */
  image: string;
  /** Link to the source code repository */
  repoUrl: string;
  /** Optional live demo URL */
  liveUrl?: string;
  /** Technologies used */
  technologies: string[];
  /** Key highlights / features (bullet points on detail page) */
  highlights: string[];
  /** Optional: video shown on the project detail page instead of the cover image */
  detailVideo?: string;
  /** Optional: HTML string to embed in an iframe so visitors can interact with it */
  embedHtml?: string;
  /** Optional: JSON data passed into the embedded HTML (e.g. via window.__PROJECT_EMBED_DATA__ or #project-embed-data) */
  embedData?: Record<string, unknown>;
  /** Optional: iframe src for a full-page viewer (e.g. viewer.html?viz_url=.../data.json). Shown in "Try it" when set. */
  embedViewerUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "jump-test-algorithms",
    title: "Vertical Jump Test Algorithms",
    summary: "Algorithms for counter-movement jump (CMJ), squat jump (SJ), and drop jump (DJ) analysis from force plate data.",
    description:
      "This project implements detection of events and phases, and computes metrics, for vertical jump tests using vertical ground reaction force (GRF) time series from a force plate. The scope covers counter-movement jump (CMJ): input is total (and optionally left/right) force in newtons with known sample count and trial duration; output includes event sample indices, phase boundaries, and derived metrics (jump height, power, RFD, phase impulses, etc.).\n\nBodyweight and mass are inferred from a weighing window (first 1 s). Detected points include take-off, landing, movement onset, minimum force, eccentric end (peak eccentric velocity), and velocity zero (bottom of dip). Phases derived are unweighting, braking, propulsion (concentric), flight, and landing. Metrics include jump height (impulse–momentum and flight-time methods), peak power, rate of force development (RFD), phase impulses and durations, RSImod, countermovement depth, and optional left/right asymmetry. Optional low-pass filtering can be applied before detection and kinematics.",
    image: "/projects/jump-test-algorithms/cover.png",
    repoUrl: "https://github.com/sinnerfilozofiya/jumptest-analysis",
    technologies: ["Python", "Signal processing", "Biomechanics", "SciPy", "NumPy"],
    highlights: [
      "Event detection: take-off, landing, movement onset, min force, eccentric end, velocity zero",
      "Phase boundaries: unweighting, braking, propulsion, flight, landing",
      "Jump height (impulse–momentum and flight-time), peak power, RFD",
      "Phase impulses and durations; RSImod; optional left/right asymmetry",
      "Optional low-pass filter for noise reduction; trial validity checks",
    ],
    detailVideo: "/projects/jump-test-algorithms/cmj-project-video.mp4",
    embedViewerUrl: "/projects/jump-test-algorithms/viewr-html/viewer.html?viz_url=/projects/jump-test-algorithms/viewr-html/data.json",
  },
  {
    slug: "forceplate-hardware",
    title: "Force Plate Embedded System",
    summary:
      "Distributed force plate system with Teensy 4.1 and ESP32: high-resolution load-cell acquisition, wireless node coordination, and BLE client access.",
    description:
      "I designed and built a distributed force plate system around Teensy 4.1 and ESP32 MCUs, combining high-resolution load-cell acquisition with wireless node coordination and BLE client access. Each plate uses a custom ADS1256 acquisition stack for four channels of calibrated force data, while the ESP32 layer handles SPI transport, ESP-NOW wireless communication, battery telemetry, command routing, and BLE streaming. The final system exposes a synchronized eight-channel data stream to a client application while preserving deterministic sampling at the sensor layer.",
    image: "/projects/forceplate-hardware/force-plate-cover.png",
    repoUrl: "https://github.com/sinnerfilozofiya/forceplate-mcu-codes",
    technologies: [
      "C/C++",
      "Teensy 4.1",
      "ESP32",
      "ADS1256",
      "SPI",
      "ESP-NOW",
      "BLE",
      "FreeRTOS",
      "Embedded",
    ],
    highlights: [
      "Dual-node wireless system: Teensy 4.1 acquisition + ESP32 transport and BLE",
      "144-byte fixed frame, CRC16, sync bytes; 1 kHz/channel, 8-channel merged stream",
      "BLE data + command characteristics; JSON API, battery telemetry, device info",
      "Multi-MCU roles: ads_1256_custom_library, esp32_spi_slave, esp32_rx_radio, esp32_ble_slave",
      "BQ25792 power management, DMA-backed SPI slave, command routing local/remote",
    ],
  },
];
