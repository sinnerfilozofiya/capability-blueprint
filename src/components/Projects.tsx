import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/config/links";
import { useRef, useState, useEffect, useCallback } from "react";

const Projects = () => {
  if (projects.length === 0) return null;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);

    // Calculate active index based on scroll position
    const cardWidth = el.scrollWidth / projects.length;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(idx, projects.length - 1));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("[data-project-card]")?.clientWidth ?? 360;
    const gap = 24;
    el.scrollBy({
      left: direction === "left" ? -(cardWidth + gap) : cardWidth + gap,
      behavior: "smooth",
    });
  };

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4">
              Portfolio
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Selected Projects
            </h2>
          </div>

          {/* Navigation arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Fade edges */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          )}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          )}

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-6 px-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {projects.map((project, i) => (
              <motion.div
                key={project.slug}
                data-project-card
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="min-w-[320px] sm:min-w-[380px] max-w-[420px] snap-start shrink-0"
              >
                <Link
                  to={`/projects/${project.slug}`}
                  className="block bg-card border border-border rounded-lg overflow-hidden group h-full hover:border-primary/30 transition-colors duration-300"
                >
                  {/* Thumbnail */}
                  <div className="aspect-video w-full overflow-hidden bg-secondary relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                      {project.summary}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] px-2 py-0.5 rounded bg-secondary text-secondary-foreground border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="font-mono text-[10px] px-2 py-0.5 text-muted-foreground">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-3">
                      <span
                        className="text-muted-foreground hover:text-primary transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(project.repoUrl, "_blank");
                        }}
                      >
                        <Github className="w-4 h-4" />
                      </span>
                      {project.liveUrl && (
                        <span
                          className="text-muted-foreground hover:text-primary transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(project.liveUrl, "_blank");
                          }}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const el = scrollRef.current;
                if (!el) return;
                const card = el.querySelector("[data-project-card]");
                if (!card) return;
                el.scrollTo({
                  left: i * (card.clientWidth + 24),
                  behavior: "smooth",
                });
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
