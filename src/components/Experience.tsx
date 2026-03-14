import { motion } from "framer-motion";

const timeline = [
  { year: "2024", role: "Full Stack Engineer", company: "CAN&CAN Spor ve Sağlık Teknolojileri" },
  { year: "2023", role: "Software Engineer", company: "TRK Technology" },
];

const Experience = () => {
  return (
    <section className="py-32 px-6 border-t border-border">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4">
            Experience
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Where I've worked
          </h2>
        </motion.div>

        <div className="space-y-8">
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex items-start gap-6"
            >
              <span className="font-mono text-sm text-primary shrink-0 pt-0.5">{item.year}</span>
              <div className="border-l border-border pl-6">
                <p className="font-medium text-foreground">{item.role}</p>
                <p className="text-sm text-muted-foreground">{item.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
