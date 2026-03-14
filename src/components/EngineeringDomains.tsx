import { motion } from "framer-motion";

interface DomainCardProps {
  title: string;
  description: string;
  capabilities: string[];
  technologies: string[];
  index: number;
}

const DomainCard = ({ title, description, capabilities, technologies, index }: DomainCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-card border border-border rounded-lg p-8 card-hover group"
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="w-2 h-2 rounded-full bg-primary mt-3 shrink-0 group-hover:shadow-[0_0_8px_hsl(var(--primary)/0.6)] transition-shadow" />
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
      </div>

      <div className="ml-6 mb-6">
        <p className="font-mono text-xs tracking-wider uppercase text-text-dim mb-3">Capabilities</p>
        <ul className="space-y-1.5">
          {capabilities.map((cap) => (
            <li key={cap} className="text-sm text-secondary-foreground flex items-center gap-2">
              <span className="text-primary text-xs">▹</span>
              {cap}
            </li>
          ))}
        </ul>
      </div>

      <div className="ml-6">
        <p className="font-mono text-xs tracking-wider uppercase text-text-dim mb-3">Technologies</p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs px-2.5 py-1 rounded bg-secondary text-secondary-foreground border border-border"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const domains = [
  {
    title: "Distributed Systems Engineering",
    description: "Designing reliable distributed communication systems between services and devices.",
    capabilities: [
      "Asynchronous system design",
      "Event-driven architectures",
      "Node communication protocols",
      "Reliability and packet recovery",
      "Mesh network coordination",
    ],
    technologies: ["Python", "Go", "Redis", "Message Queues", "REST APIs"],
  },
  {
    title: "Backend Platform Engineering",
    description: "Designing backend platforms capable of supporting large-scale applications and services.",
    capabilities: [
      "API architecture design",
      "Microservices architecture",
      "High-performance service design",
      "Scalable backend systems",
    ],
    technologies: ["Python", "Go", "Docker", "NGINX", "PostgreSQL"],
  },
  {
    title: "Embedded Systems Development",
    description: "Building hardware-driven data acquisition systems and integrating them with software platforms.",
    capabilities: [
      "Microcontroller programming",
      "Sensor integration",
      "ADC data acquisition",
      "BLE communication protocols",
      "Wireless device communication",
    ],
    technologies: ["ESP32", "Teensy", "C/C++", "BLE", "ESP-NOW", "ADS1256"],
  },
  {
    title: "Infrastructure & DevOps",
    description: "Building reliable deployment environments and CI/CD systems for production platforms.",
    capabilities: [
      "Container orchestration",
      "CI/CD pipelines",
      "Service deployment architecture",
      "Infrastructure automation",
    ],
    technologies: ["Docker", "Kubernetes", "NGINX", "GitHub Actions", "Jenkins", "AWS"],
  },
  {
    title: "Data Engineering & Analytics",
    description: "Processing and analyzing large time-series datasets from financial markets and sensor systems.",
    capabilities: [
      "Time-series data processing",
      "Performance analytics algorithms",
      "Data visualization pipelines",
      "Large dataset rendering",
    ],
    technologies: ["Python", "Data Pipelines", "Time-series Analysis", "Visualization Systems"],
  },
];

const EngineeringDomains = () => {
  return (
    <section id="engineering" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4">
            Engineering Domains
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            What I engineer
          </h2>
        </motion.div>

        <div className="grid gap-6">
          {domains.map((domain, i) => (
            <DomainCard key={domain.title} {...domain} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngineeringDomains;
