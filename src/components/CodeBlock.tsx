"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { FileCode2 } from "lucide-react";

/* Line-numbered code listing + unified diff, toggled with a Code/Diff switch. */

export type Piece = { text: string; change?: "add" | "del" };
export type DiffRow = { old: number | null; cur: number | null; type: "ctx" | "add" | "del"; pieces: Piece[] };

const HATCH =
  "repeating-linear-gradient(45deg, var(--color-diff-del) 0, var(--color-diff-del) 1.5px, transparent 1.5px, transparent 3px)";

const KEYWORDS = new Set([
  "const", "float", "return", "if", "else", "for", "while", "new", "struct", "class",
  "void", "static", "true", "false", "nullptr",
]);
const TOKEN =
  /("(?:\\.|[^"\\])*"|\b\d+(?:\.\d+)?[fFuUlL]?\b|\b(?:const|float|return|if|else|for|while|new|struct|class|void|static|true|false|nullptr)\b|[A-Za-z_][\w]*(?=\s*\())/g;

function highlight(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let k = 0;
  for (const m of text.matchAll(TOKEN)) {
    const idx = m.index ?? 0;
    const t = m[0];
    if (idx > last) nodes.push(<span key={k++} style={{ color: "var(--color-ink)" }}>{text.slice(last, idx)}</span>);
    let color: string;
    if (/^["'`]/.test(t) || /^\d/.test(t)) color = "var(--color-syntax-string)";
    else if (KEYWORDS.has(t)) color = "var(--color-accent-2)";
    else color = "var(--color-ink)";
    nodes.push(
      <span key={k++} style={{ color }}>
        {t}
      </span>,
    );
    last = idx + t.length;
  }
  if (last < text.length) nodes.push(<span key={k++} style={{ color: "var(--color-ink)" }}>{text.slice(last)}</span>);
  return nodes;
}

function Pieces({ pieces }: { pieces: Piece[] }) {
  return (
    <>
      {pieces.map((p, i) => {
        if (p.change) {
          const add = p.change === "add";
          return (
            <span
              key={i}
              className="rounded-[3px]"
              style={{
                background: `color-mix(in srgb, var(--color-diff-${add ? "add" : "del"}) 30%, transparent)`,
                padding: "0 2px",
                margin: "0 -1px",
              }}
            >
              {highlight(p.text)}
            </span>
          );
        }
        return <span key={i}>{highlight(p.text)}</span>;
      })}
    </>
  );
}

export function CodeBlock({
  file,
  code,
  diff,
}: {
  file: string;
  code: string[];
  diff?: DiffRow[];
}) {
  const [mode, setMode] = useState<"code" | "diff">("code");
  const [diffHovered, setDiffHovered] = useState(false);
  const isDiff = Boolean(diff) && mode === "diff";

  const added = diff?.filter((r) => r.type === "add").length ?? 0;
  const removed = diff?.filter((r) => r.type === "del").length ?? 0;

  const heightWrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  // points at whichever of diff-view/code-view is currently mounted; both use `w-max`
  // so their rendered width always shrink-wraps to their true content size
  const innerRef = useRef<HTMLDivElement>(null);

  const syncSize = () => {
    const wrap = heightWrapRef.current;
    const content = contentRef.current;
    const inner = innerRef.current;
    if (!wrap || !content || !inner) return;
    wrap.style.height = `${content.offsetHeight}px`;
    wrap.style.width = `${inner.offsetWidth}px`;
  };

  useLayoutEffect(syncSize, [mode]);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const observer = new ResizeObserver(syncSize);
    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-md border border-rule bg-paper-2">
      <div className="flex h-11 items-center gap-2 border-b border-rule px-4 text-xs">
        <span className="inline-flex min-w-0 items-center gap-[7px]">
          <FileCode2 size={14} strokeWidth={1.8} className="shrink-0 text-ink-2" aria-hidden="true" />
          <span className="truncate font-mono leading-none text-ink">{file}</span>
        </span>

        <span className="ml-auto inline-flex items-center gap-3">
          {isDiff && (
            <span className="inline-flex items-center gap-2 font-mono text-[11px] leading-none [font-variant-numeric:tabular-nums]">
              <span style={{ color: "var(--color-diff-add)" }}>+{added}</span>
              <span style={{ color: "var(--color-diff-del)" }}>-{removed}</span>
            </span>
          )}

          {diff && (
            <span className="relative inline-flex rounded-full border border-rule p-0.5 font-mono text-[10px]">
              <span
                className="absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-ink transition-transform duration-300"
                style={{
                  transform: mode === "diff" ? "translateX(100%)" : "translateX(0)",
                  transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
                aria-hidden="true"
              />
              {(["code", "diff"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  aria-pressed={mode === m}
                  className={`relative z-10 cursor-pointer rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    mode === m ? "text-paper" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {m}
                </button>
              ))}
            </span>
          )}
        </span>
      </div>

      <div ref={heightWrapRef} className="max-w-full overflow-hidden transition-[height,width] duration-300 ease-out">
        <div
          ref={contentRef}
          className="overflow-x-auto py-3 font-mono text-[12.5px] leading-[1.65] text-ink-2 [scrollbar-width:thin] [scrollbar-color:var(--color-dim)_transparent] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-dim"
        >
          {isDiff && diff ? (
            <div
              key="diff-view"
              ref={innerRef}
              className="relative w-max animate-content-enter"
              onMouseEnter={() => setDiffHovered(true)}
              onMouseLeave={() => setDiffHovered(false)}
            >
              {diff.map((r, i) => {
                const add = r.type === "add";
                const del = r.type === "del";
                const num = del ? r.old : r.cur;
                const emphasized = add ? diffHovered : del ? !diffHovered : true;
                return (
                  <div
                    key={i}
                    className="relative grid grid-cols-[24px_minmax(0,1fr)] items-start transition-opacity duration-300"
                    style={{
                      opacity: emphasized ? 1 : 0.45,
                      background: add
                        ? "color-mix(in srgb, var(--color-diff-add) 20%, transparent)"
                        : del
                          ? "color-mix(in srgb, var(--color-diff-del) 20%, transparent)"
                          : undefined,
                    }}
                  >
                    {(add || del) && (
                      <span
                        className="absolute inset-y-0 left-0 w-[3px]"
                        style={{ background: add ? "var(--color-diff-add)" : HATCH }}
                      />
                    )}
                    <span
                      className="select-none text-center text-[11px] [font-variant-numeric:tabular-nums]"
                      style={{ color: add ? "var(--color-diff-add)" : del ? "var(--color-diff-del)" : "var(--color-dim)" }}
                    >
                      {num ?? ""}
                    </span>
                    <code className="whitespace-pre pr-4 pl-2">
                      <Pieces pieces={r.pieces} />
                    </code>
                  </div>
                );
              })}
            </div>
          ) : (
            <div key="code-view" ref={innerRef} className="relative w-max animate-content-enter">
              {code.map((line, i) => (
                <div
                  key={i}
                  className="group/line grid grid-cols-[24px_minmax(0,1fr)] items-start transition-colors duration-150 hover:bg-ink/[0.04]"
                >
                  <span className="select-none text-center text-[11px] text-dim transition-colors duration-150 [font-variant-numeric:tabular-nums] group-hover/line:text-ink-2">
                    {i + 1}
                  </span>
                  <code className="whitespace-pre pr-4 pl-2">{highlight(line)}</code>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
