import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Github, Maximize2 } from "lucide-react";
import { projects } from "@/config/links";
import { Button } from "@/components/ui/button";
import MarkdownWithMermaid from "@/components/MarkdownWithMermaid";
import jumpTestDetailMd from "@/content/jump-test-algorithms-detail.md?raw";
import forceplateDetailMd from "@/content/forceplate-hardware-detail.md?raw";

/** Escape string for safe use inside an HTML attribute (e.g. data-json). */
function escapeHtmlAttr(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Build iframe srcdoc for embedded HTML + JSON. Embed HTML can read data via getElementById('project-embed-data').dataset.json (JSON.parse). */
function buildEmbedSrcdoc(embedHtml: string, embedData: Record<string, unknown> | undefined): string {
  const dataJson = escapeHtmlAttr(JSON.stringify(embedData ?? {}));
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head><body>
<div id="project-embed-data" data-json="${dataJson}"></div>
${embedHtml}
</body></html>`;
}

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

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
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-background">
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
            className="text-foreground"
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

      {/* Hero: video (if set) or cover image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto px-6 py-10"
      >
        <div className="rounded-lg overflow-hidden border border-border bg-secondary">
          {project.detailVideo ? (
            <video
              src={project.detailVideo}
              controls
              playsInline
              className="w-full aspect-video object-contain bg-black"
              poster={project.image}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="w-full object-cover"
            />
          )}
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-20 bg-background text-foreground">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Description: full markdown for jump-test-algorithms, otherwise short description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2 text-foreground"
          >
            {project.slug === "jump-test-algorithms" ? (
              <MarkdownWithMermaid content={jumpTestDetailMd} />
            ) : project.slug === "forceplate-hardware" ? (
              <MarkdownWithMermaid content={forceplateDetailMd} />
            ) : (
              <>
                <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4">
                  About
                </h2>
                <p className="text-secondary-foreground leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </>
            )}
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

            {/* Data collection hardware — jump test algorithms → force plate */}
            {project.slug === "jump-test-algorithms" && (
              <div>
                <h3 className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-3">
                  Data collection hardware
                </h3>
                <p className="text-sm text-secondary-foreground leading-relaxed mb-3">
                  The force data these algorithms expect is collected by a custom force plate system: dual-node Teensy + ESP32 hardware with high-rate ADC, wireless sync, and BLE streaming.
                </p>
                <Link
                  to="/projects/forceplate-hardware"
                  className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:underline"
                >
                  Force Plate Embedded System
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {/* Example usage / real use case — force plate → jump test algorithms */}
            {project.slug === "forceplate-hardware" && (
              <div>
                <h3 className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-3">
                  Example usage
                </h3>
                <p className="text-sm text-secondary-foreground leading-relaxed mb-3">
                  The force data from this system is designed to feed into analysis pipelines. A concrete use case is vertical jump testing: the same hardware streams the eight-channel force signal that the algorithms project uses to detect events, phases, and metrics (e.g. jump height, RFD, RSImod).
                </p>
                <Link
                  to="/projects/jump-test-algorithms"
                  className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:underline"
                >
                  Vertical Jump Test Algorithms
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </motion.div>
        </div>

        {/* Optional: embedded viewer (iframe URL) or HTML + JSON — full width, tall to avoid inner scroll */}
        {(project.embedViewerUrl || project.embedHtml) && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-none px-0 pb-20"
          >
            <div className="max-w-4xl mx-auto px-6 mb-4 flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-primary">
                Try it
              </h2>
              {project.embedViewerUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="font-mono text-xs tracking-wider border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/60"
                >
                  <a
                    href={project.embedViewerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <Maximize2 className="w-4 h-4" />
                    Open viewer in full screen
                  </a>
                </Button>
              )}
            </div>
            <div className="w-full rounded-none sm:rounded-lg overflow-hidden border-0 sm:border border-border bg-card">
              {project.embedViewerUrl ? (
                <iframe
                  title={`${project.title} — interactive viewer`}
                  src={project.embedViewerUrl}
                  className="w-full h-[100vh] min-h-[480px] border-0 block"
                  sandbox="allow-scripts allow-same-origin"
                />
              ) : (
                <iframe
                  title={`${project.title} — interactive demo`}
                  srcDoc={buildEmbedSrcdoc(project.embedHtml!, project.embedData)}
                  className="w-full min-h-[calc(100vh-8rem)] min-h-[1200px] border-0 block"
                  sandbox="allow-scripts allow-same-origin"
                />
              )}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
