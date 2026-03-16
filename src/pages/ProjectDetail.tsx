import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { projects } from "@/config/links";
import { Button } from "@/components/ui/button";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Project not found</h1>
          <Link to="/" className="text-primary hover:underline font-mono text-sm">
            ← Back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-sm mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              {project.title}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
              {project.summary}
            </p>

            {/* Action buttons */}
            <div className="flex items-center gap-3 mt-6">
              <Button variant="hero" size="sm" asChild>
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                  Source Code
                </a>
              </Button>
              {project.liveUrl && (
                <Button variant="hero-outline" size="sm" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Cover image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto px-6 py-10"
      >
        <div className="rounded-lg overflow-hidden border border-border bg-secondary">
          <img
            src={project.image}
            alt={project.title}
            className="w-full object-cover"
          />
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2"
          >
            <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4">
              About
            </h2>
            <p className="text-secondary-foreground leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Technologies */}
            <div>
              <h3 className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-3">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-2.5 py-1 rounded bg-secondary text-secondary-foreground border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Highlights */}
            {project.highlights.length > 0 && (
              <div>
                <h3 className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-3">
                  Highlights
                </h3>
                <ul className="space-y-2">
                  {project.highlights.map((h) => (
                    <li
                      key={h}
                      className="text-sm text-secondary-foreground flex items-start gap-2"
                    >
                      <span className="text-primary text-xs mt-1">▹</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
