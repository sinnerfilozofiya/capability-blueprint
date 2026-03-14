import { motion } from "framer-motion";

const capabilityGroups = [
  {
    title: "System Design",
    items: [
      "Microservices architectures",
      "Distributed device networks",
      "Sensor data acquisition platforms",
      "Real-time analytics systems",
    ],
  },
  {
    title: "Communication Systems",
    items: [
      "BLE communication protocols",
      "ESP-NOW networking",
      "Service-to-service APIs",
      "Wireless node synchronization",
    ],
  },
  {
    title: "Performance Engineering",
    items: [
      "Low-latency data pipelines",
      "Large dataset rendering",
      "High-throughput service design",
      "Algorithm optimization",
    ],
  },
];

const Capabilities = () => {
  return (
    <section className="py-32 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4">
            Engineering Capabilities
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            What I can build
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {capabilityGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="space-y-4"
            >
              <h3 className="font-mono text-sm tracking-wider text-primary border-b border-border pb-3">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-text-dim mt-0.5">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
