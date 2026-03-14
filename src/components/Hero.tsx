import { motion } from "framer-motion";
import { Github, Linkedin, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      
      {/* Glow orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-pulse-glow" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="font-mono text-sm tracking-[0.3em] uppercase text-primary mb-6">
            Systems Engineer
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-8 text-foreground leading-[1.1]">
            Sina Bagherzadeh
            <br />
            <span className="text-muted-foreground font-light">Khiavi</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
            I design distributed systems that connect
            <br className="hidden sm:block" />
            software, hardware, and data pipelines.
          </p>
          <p className="font-mono text-xs tracking-wider text-text-dim mb-12">
            Backend Architect • Embedded Systems • Distributed Infrastructure
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button variant="hero" size="lg" asChild>
            <a href="#engineering">Explore Engineering</a>
          </Button>
          <Button variant="hero-outline" size="lg" asChild>
            <a href="https://github.com/sinnerfilozofiya" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
          <Button variant="hero-outline" size="lg" asChild>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <ArrowDown className="h-5 w-5 text-muted-foreground animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
