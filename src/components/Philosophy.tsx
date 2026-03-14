import { motion } from "framer-motion";

const Philosophy = () => {
  const principles = [
    "Reliability over complexity",
    "Observability and monitoring",
    "Scalable architecture",
    "Efficient communication protocols",
    "Performance optimization",
  ];

  return (
    <section className="py-32 px-6 border-t border-border">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4">
            Philosophy
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
            How I engineer
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            I focus on building reliable systems that combine software, hardware, and data.
            My engineering approach emphasizes:
          </p>
          <ul className="space-y-4">
            {principles.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 text-foreground"
              >
                <span className="w-6 h-px bg-primary shrink-0" />
                <span className="text-sm">{p}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Philosophy;
