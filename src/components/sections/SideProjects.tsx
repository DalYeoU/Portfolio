"use client";

import { ArrowUpRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { GithubIcon } from "@/components/icons/GithubIcon";

const PROJECT = {
  status: "in-progress",
  title: "Spark",
  slogan: "'Move to See. Remember to Survive.'",
  summary: "움직여야 스파크가 튀어 어둠 속 공간이 잠시 보이는 3D 퍼즐 플랫포머입니다. 기획부터 구현까지 혼자 진행 중입니다.",
  repo: "https://github.com/DalYeoU/Spark",
};

export function SideProjects() {
  const reveal = useReveal<HTMLElement>();

  return (
    <section
      ref={reveal.ref}
      id="side"
      aria-labelledby="side-projects-heading"
      className={`reveal mx-auto w-full max-w-[var(--container-max)] px-6 py-14 sm:px-10 ${reveal.visible ? "reveal-visible" : ""}`}
    >
      <h2 id="side-projects-heading" className="font-display text-2xl font-semibold">
        개인 프로젝트
      </h2>

      <div className="mt-8 flex flex-col gap-6">
        <article className="rounded-md border border-rule bg-paper-2 p-6">
          <span className="font-mono text-xs text-accent">status: {PROJECT.status}</span>
          <h3 className="mt-1 font-display text-lg font-semibold">{PROJECT.title}</h3>
          <p className="mt-2 leading-relaxed text-ink-2">
            {PROJECT.slogan}
            <br />
            {PROJECT.summary}
          </p>
          <a
            href={PROJECT.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-ink-2 transition-colors hover:text-ink"
          >
            <GithubIcon size={13} />
            레포지토리
            <ArrowUpRight size={12} strokeWidth={2} aria-hidden="true" />
          </a>
        </article>
      </div>
    </section>
  );
}
