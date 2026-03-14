import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/config/links";

const Contact = () => {
  return (
    <section className="py-32 px-6 border-t border-border">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4">
            Contact
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12">
            Let's connect
          </h2>

          <div className="flex items-center justify-center gap-8">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-sm"
            >
              <Github className="h-5 w-5" />
              GitHub
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-sm"
            >
              <Linkedin className="h-5 w-5" />
              LinkedIn
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-sm"
            >
              <Mail className="h-5 w-5" />
              Email
            </a>
          </div>

          <p className="mt-16 font-mono text-xs text-text-dim">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
