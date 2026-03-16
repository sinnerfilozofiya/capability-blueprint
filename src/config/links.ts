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
  {
    slug: "distributed-pipeline",
    title: "Distributed Data Pipeline",
    summary: "High-throughput event processing system handling millions of messages per second.",
    description:
      "A distributed data pipeline built to process and route sensor data from IoT devices across multiple regions with guaranteed delivery and minimal latency.",
    image: "/placeholder.svg",
    repoUrl: "https://github.com/sinnerfilozofiya/distributed-pipeline",
    technologies: ["Go", "Kafka", "PostgreSQL", "Docker", "Kubernetes"],
    highlights: [
      "Processes 2M+ events per second",
      "99.99% uptime SLA",
      "Auto-scaling based on queue depth",
    ],
  },
  {
    slug: "firmware-ota",
    title: "Firmware OTA Platform",
    summary: "Over-the-air update system for embedded devices with rollback support.",
    description:
      "A secure firmware delivery platform enabling remote updates for thousands of edge devices with delta patching, integrity verification, and automatic rollback on failure.",
    image: "/placeholder.svg",
    repoUrl: "https://github.com/sinnerfilozofiya/firmware-ota",
    liveUrl: "https://ota-demo.example.com",
    technologies: ["Rust", "C", "MQTT", "AWS IoT", "FreeRTOS"],
    highlights: [
      "Delta updates reduce bandwidth by 80%",
      "Cryptographic signature verification",
      "Zero-downtime rollback mechanism",
    ],
  },
  {
    slug: "infra-orchestrator",
    title: "Infrastructure Orchestrator",
    summary: "Automated provisioning and monitoring for hybrid cloud environments.",
    description:
      "A self-service platform that provisions, configures, and monitors infrastructure across on-premise and cloud environments with a unified control plane.",
    image: "/placeholder.svg",
    repoUrl: "https://github.com/sinnerfilozofiya/infra-orchestrator",
    technologies: ["Python", "Terraform", "Ansible", "Prometheus", "Grafana"],
    highlights: [
      "Unified dashboard for hybrid infrastructure",
      "Automated compliance scanning",
      "Reduced provisioning time from hours to minutes",
    ],
  },
  {
    slug: "realtime-comms",
    title: "Real-Time Comms Engine",
    summary: "Low-latency communication layer for industrial control systems.",
    description:
      "A custom protocol stack built for sub-millisecond communication between PLCs and supervisory systems in industrial automation environments.",
    image: "/placeholder.svg",
    repoUrl: "https://github.com/sinnerfilozofiya/realtime-comms",
    technologies: ["C++", "ZeroMQ", "Protocol Buffers", "Linux RT"],
    highlights: [
      "Sub-millisecond message delivery",
      "Deterministic scheduling on RT kernels",
      "Hot-standby failover support",
    ],
  },
  {
    slug: "sensor-mesh",
    title: "Sensor Mesh Network",
    summary: "Self-healing wireless sensor network for environmental monitoring.",
    description:
      "A mesh networking solution for deploying hundreds of low-power sensors across large areas with automatic topology discovery and self-healing capabilities.",
    image: "/placeholder.svg",
    repoUrl: "https://github.com/sinnerfilozofiya/sensor-mesh",
    technologies: ["C", "Zigbee", "RTOS", "Python", "InfluxDB"],
    highlights: [
      "Self-healing mesh with 99.9% reliability",
      "5-year battery life on sensor nodes",
      "Real-time anomaly detection pipeline",
    ],
  },
  // ---- ADD MORE PROJECTS BELOW ----
];
