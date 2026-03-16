import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const metrics = [
  { value: "5+", label: "Engineering Domains" },
  { value: "10+", label: "Technologies" },
  { value: "∞", label: "Lines of Code" },
  { value: "24/7", label: "Uptime Mindset" },
];

const scrollWords = [
  "distributed systems",
  "embedded firmware",
  "backend platforms",
  "data pipelines",
  "container orchestration",
  "real-time protocols",
  "sensor integration",
  "microservices",
  "event-driven architecture",
  "infrastructure automation",
];

const ScrollBridge = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const marqueeX2 = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Scroll-driven marquee lines */}
      <motion.div style={{ opacity }} className="space-y-4 mb-20">
        <motion.div
          style={{ x: marqueeX }}
          className="flex gap-4 whitespace-nowrap"
        >
          {[...scrollWords, ...scrollWords].map((word, i) => (
            <span
              key={i}
              className="font-mono text-xs tracking-[0.2em] uppercase text-border px-4 py-2 border border-border/50 rounded-full shrink-0"
            >
              {word}
            </span>
          ))}
        </motion.div>
        <motion.div
          style={{ x: marqueeX2 }}
          className="flex gap-4 whitespace-nowrap"
        >
          {[...scrollWords.slice().reverse(), ...scrollWords.slice().reverse()].map((word, i) => (
            <span
              key={i}
              className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground/20 px-4 py-2 shrink-0"
            >
              {word}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Metrics */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl sm:text-4xl font-bold text-foreground mb-2 font-mono">
                {m.value}
              </p>
              <p className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground">
                {m.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subtle divider line */}
      <motion.div
        style={{ opacity }}
        className="mt-20 mx-auto max-w-xs h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />
    </section>
  );
};

export default ScrollBridge;
