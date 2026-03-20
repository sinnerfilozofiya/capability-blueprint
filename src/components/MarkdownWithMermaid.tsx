import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import mermaid from "mermaid";

let mermaidInitialized = false;
function initMermaid() {
  if (mermaidInitialized) return;
  mermaidInitialized = true;
  mermaid.initialize({
    startOnLoad: false,
    theme: "dark",
    securityLevel: "loose",
  });
}

/** Renders a Mermaid diagram from code. */
function MermaidDiagram({ code }: { code: string }) {
  initMermaid();
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ref.current || !code.trim()) return;
    const id = `mermaid-${Math.random().toString(36).slice(2, 11)}`;
    mermaid
      .render(id, code.trim())
      .then(({ svg }) => {
        if (ref.current) ref.current.innerHTML = svg;
      })
      .catch((err) => setError(String(err)));
  }, [code]);

  if (error) {
    return (
      <pre className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-destructive overflow-x-auto">
        {error}
      </pre>
    );
  }
  return (
    <div
      ref={ref}
      className="my-6 flex justify-center [&>svg]:max-w-full [&>svg]:h-auto"
      aria-label="Diagram"
    />
  );
}

/** Renders markdown string with Mermaid code blocks rendered as diagrams. */
export default function MarkdownWithMermaid({ content }: { content: string }) {
  return (
    <div className="prose prose-invert prose-sm max-w-none prose-headings:font-semibold prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-ul:text-muted-foreground prose-li:marker:text-primary prose-strong:text-foreground prose-code:rounded prose-code:bg-muted/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none prose-pre:bg-muted/30 prose-pre:border prose-pre:border-border">
      <ReactMarkdown
        components={{
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className ?? "");
            const code = String(children).replace(/\n$/, "");
            if (match?.[1] === "mermaid") {
              return <MermaidDiagram code={code} />;
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
