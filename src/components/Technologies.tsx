import { motion } from "framer-motion";

const techGroups = [
  { label: "Languages", items: ["Python", "Go", "Java", "C/C++"] },
  { label: "Backend", items: ["REST APIs", "Microservices", "Async Systems"] },
  { label: "Embedded", items: ["ESP32", "Teensy", "BLE", "Sensor Systems"] },
  { label: "Infrastructure", items: ["Docker", "Kubernetes", "NGINX", "AWS"] },
];

const Technologies = () => {
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
            Technologies
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Tools of the trade
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {techGroups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="font-mono text-xs tracking-wider uppercase text-text-dim mb-4">
                {group.label}
              </h3>
              <div className="space-y-2">
                {group.items.map((item) => (
                  <div
                    key={item}
                    className="font-mono text-sm text-foreground px-3 py-2 bg-secondary rounded border border-border"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
