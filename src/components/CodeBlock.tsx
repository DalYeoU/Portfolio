"use client";

import { useState, type ReactNode } from "react";
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
    if (idx > last) nodes.push(<span key={k++}>{text.slice(last, idx)}</span>);
    let color: string;
    let weight: number | undefined;
    if (/^["'`]/.test(t) || /^\d/.test(t)) color = "var(--color-syntax-string)";
    else if (KEYWORDS.has(t)) color = "var(--color-accent-2)";
    else {
      color = "var(--color-ink)";
      weight = 500;
    }
    nodes.push(
      <span key={k++} style={{ color, fontWeight: weight }}>
        {t}
      </span>,
    );
    last = idx + t.length;
  }
  if (last < text.length) nodes.push(<span key={k++}>{text.slice(last)}</span>);
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
                background: `color-mix(in srgb, var(--color-diff-${add ? "add" : "del"}) 18%, transparent)`,
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
  const isDiff = Boolean(diff) && mode === "diff";

  const added = diff?.filter((r) => r.type === "add").length ?? 0;
  const removed = diff?.filter((r) => r.type === "del").length ?? 0;

  return (
    <div className="w-full overflow-hidden rounded-md border border-rule bg-paper-2">
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
            <span className="inline-flex rounded-full border border-rule p-0.5 font-mono text-[10px]">
              {(["code", "diff"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  aria-pressed={mode === m}
                  className={`cursor-pointer rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    mode === m ? "bg-ink text-paper" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {m}
                </button>
              ))}
            </span>
          )}
        </span>
      </div>

      <div className="overflow-x-auto py-3 font-mono text-[12.5px] leading-[1.65] text-ink-2">
        {isDiff && diff ? (
          <div className="relative min-w-max">
            {diff.map((r, i) => {
              const add = r.type === "add";
              const del = r.type === "del";
              const num = del ? r.old : r.cur;
              return (
                <div
                  key={i}
                  className="relative grid grid-cols-[24px_minmax(0,1fr)] items-start"
                  style={{
                    background: add
                      ? "color-mix(in srgb, var(--color-diff-add) 8%, transparent)"
                      : del
                        ? "color-mix(in srgb, var(--color-diff-del) 8%, transparent)"
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
          <div className="relative min-w-max">
            {code.map((line, i) => (
              <div key={i} className="grid grid-cols-[24px_minmax(0,1fr)] items-start">
                <span className="select-none text-center text-[11px] text-dim [font-variant-numeric:tabular-nums]">
                  {i + 1}
                </span>
                <code className="whitespace-pre pr-4 pl-2">{highlight(line)}</code>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
