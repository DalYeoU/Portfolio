"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CodeBlock, type DiffRow } from "@/components/CodeBlock";

const COMBAT_CODE = [
  "float UCombatComponent::CalculateDamage(",
  "    float BaseDamage, float TargetArmor)",
  "{",
  "    const float Mitigation =",
  "        TargetArmor / (TargetArmor + ArmorConstant);",
  "    const float FinalDamage = BaseDamage * (1.0f - Mitigation);",
  "",
  "    OnDamageCalculated.Broadcast(FinalDamage);",
  "    return FMath::Max(FinalDamage, MinimumDamage);",
  "}",
];

const COMBAT_DIFF: DiffRow[] = [
  { old: 1, cur: 1, type: "ctx", pieces: [{ text: "float UCombatComponent::CalculateDamage(" }] },
  { old: 2, cur: 2, type: "ctx", pieces: [{ text: "    float BaseDamage, float TargetArmor)" }] },
  { old: 3, cur: 3, type: "ctx", pieces: [{ text: "{" }] },
  { old: 4, cur: null, type: "del", pieces: [{ text: "    const float FinalDamage = BaseDamage " }, { text: "-", change: "del" }, { text: " TargetArmor;" }] },
  { old: null, cur: 4, type: "add", pieces: [{ text: "    const float Mitigation =" }] },
  { old: null, cur: 5, type: "add", pieces: [{ text: "        TargetArmor / (TargetArmor + ArmorConstant);" }] },
  { old: null, cur: 6, type: "add", pieces: [{ text: "    const float FinalDamage = BaseDamage " }, { text: "* (1.0f - Mitigation)", change: "add" }, { text: ";" }] },
  { old: null, cur: 7, type: "add", pieces: [{ text: "" }] },
  { old: null, cur: 8, type: "add", pieces: [{ text: "    OnDamageCalculated.Broadcast(FinalDamage);" }] },
  { old: 5, cur: 9, type: "ctx", pieces: [{ text: "    return FMath::Max(FinalDamage, MinimumDamage);" }] },
  { old: 6, cur: 10, type: "ctx", pieces: [{ text: "}" }] },
];

const TEAM_PROJECTS = [
  {
    title: "[팀 프로젝트명]",
    gallery: ["unreal-combat-corridor", "unreal-combat-hud", "unreal-combat-enemy"],
    systems: [
      { label: "AI 비헤이비어 트리 설계.", desc: "[적 행동 패턴 요약]" },
      { label: "전투 시스템 데미지 계산.", desc: "방어력을 반비례형 체감 곡선으로 감쇠시켜 밸런스 유지" },
    ],
    troubleshooting: "[겪었던 문제] → [원인 분석] → [해결 방법]. 최적화 전후 [지표]를 [수치]만큼 개선했습니다.",
    codeFile: "CombatComponent.cpp",
    code: COMBAT_CODE,
    diff: COMBAT_DIFF,
    note: (
      <>
        방어력을 선형으로 빼는 대신 <code className="font-mono text-accent-2">TargetArmor / (TargetArmor + k)</code>{" "}
        형태의 체감 곡선으로 감쇠시켜, 고레벨 구간에서도 방어력 투자가 무의미해지지 않도록 했습니다. 위 Diff 탭에서
        실제 변경 내용을 확인할 수 있습니다.
      </>
    ),
  },
  {
    title: "[팀 프로젝트명 2]",
    gallery: ["unreal-project-two-a", "unreal-project-two-b", "unreal-project-two-c"],
    systems: [{ label: "[구현한 시스템 1].", desc: "[요약]" }],
    troubleshooting: "[겪었던 문제] → [원인 분석] → [해결 방법].",
    codeFile: "[파일명].cpp",
    code: ["// [핵심 코드 스니펫을 여기에 넣습니다]"],
    note: <>[이 프로젝트에서 담당한 부분에 대한 설명]</>,
  },
  {
    title: "[팀 프로젝트명 3]",
    gallery: ["unreal-project-three-a", "unreal-project-three-b", "unreal-project-three-c"],
    systems: [{ label: "[구현한 시스템 1].", desc: "[요약]" }],
    troubleshooting: "[겪었던 문제] → [원인 분석] → [해결 방법].",
    codeFile: "[파일명].cpp",
    code: ["// [핵심 코드 스니펫을 여기에 넣습니다]"],
    note: <>[이 프로젝트에서 담당한 부분에 대한 설명]</>,
  },
];

export function MainProject() {
  const [index, setIndex] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const project = TEAM_PROJECTS[index];

  useEffect(() => {
    setGalleryIndex(0);
    trackRef.current?.scrollTo({ left: 0 });
  }, [index]);

  const goToSlide = (i: number) => {
    const count = project.gallery.length;
    const next = (i + count) % count;
    setGalleryIndex(next);
    const track = trackRef.current;
    const slide = track?.children[next] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const handleTrackScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const dist = Math.abs(el.offsetLeft + el.clientWidth / 2 - center);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setGalleryIndex(closest);
  };

  return (
    <section
      id="project"
      aria-labelledby="main-project-heading"
      className="mx-auto w-full max-w-[var(--container-max)] px-6 py-20 sm:px-10"
    >
      <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-rule pb-4">
        {TEAM_PROJECTS.map((p, i) => (
          <button
            key={p.title}
            type="button"
            onClick={() => setIndex(i)}
            aria-current={i === index ? "true" : undefined}
            className={`relative cursor-pointer pb-3 font-mono text-xs uppercase tracking-[0.08em] transition-colors after:absolute after:-bottom-[1px] after:left-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              i === index
                ? "text-ink after:w-full"
                : "text-ink-2 after:w-0 hover:text-ink hover:after:w-full hover:after:bg-rule"
            }`}
          >
            {String(i + 1).padStart(2, "0")} · {p.title}
          </button>
        ))}
      </div>

      <h2 id="main-project-heading" className="sr-only">
        {project.title}
      </h2>

      <div key={index} className="animate-content-enter">
      <div className="relative mt-6">
        <div
          ref={trackRef}
          onScroll={handleTrackScroll}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-[5%] pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {project.gallery.map((seed, i) => (
            <div
              key={seed}
              className={`aspect-video w-[90%] flex-none snap-center overflow-hidden rounded-md border bg-paper-2 transition-opacity duration-300 ${
                i === galleryIndex ? "border-rule opacity-100" : "border-rule opacity-30"
              }`}
            >
              <img
                src={`https://picsum.photos/seed/${seed}/1280/720`}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goToSlide(galleryIndex - 1)}
          aria-label="이전 이미지"
          className="absolute left-[calc(5%+12px)] top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-dim bg-paper/70 text-ink-2 backdrop-blur transition-colors hover:border-ink hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => goToSlide(galleryIndex + 1)}
          aria-label="다음 이미지"
          className="absolute right-[calc(5%+12px)] top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-dim bg-paper/70 text-ink-2 backdrop-blur transition-colors hover:border-ink hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </button>

        <div className="mt-2 flex justify-center gap-1.5">
          {project.gallery.map((seed, i) => (
            <button
              key={seed}
              type="button"
              onClick={() => goToSlide(i)}
              aria-label={`${i + 1}번째 이미지로 이동`}
              aria-current={i === galleryIndex ? "true" : undefined}
              className="cursor-pointer p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span
                className={`block h-1.5 rounded-full transition-all ${
                  i === galleryIndex ? "w-4 bg-accent" : "w-1.5 bg-dim"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[3fr_2fr]">
        <div className="flex flex-col gap-8">
          <div>
            <h3 className="font-mono text-sm text-ink">구현한 시스템</h3>
            <ul className="mt-3 flex max-w-[var(--measure)] flex-col gap-3 text-ink-2">
              {project.systems.map((s) => (
                <li key={s.label} className="leading-relaxed">
                  <strong className="font-medium text-ink">{s.label}</strong> {s.desc}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-sm text-ink">트러블슈팅</h3>
            <p className="mt-3 max-w-[var(--measure)] leading-relaxed text-ink-2">{project.troubleshooting}</p>
          </div>
        </div>

        <div className="lg:sticky lg:top-20 lg:self-start">
          <CodeBlock file={project.codeFile} code={project.code} diff={project.diff} />
          <p className="mt-4 text-sm leading-relaxed text-ink-2">{project.note}</p>
        </div>
      </div>
      </div>
    </section>
  );
}
