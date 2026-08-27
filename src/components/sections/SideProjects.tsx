import { CodeBlock } from "@/components/CodeBlock";

const PROJECTS = [
  {
    status: "in-progress",
    title: "[개인 프로젝트명]",
    summary: "기획부터 구현까지 혼자 진행 중인 [장르] 게임입니다. 현재 [현재 진행 상황]까지 완료했고, [다음 목표]가 다음 목표입니다.",
  },
  {
    status: "done",
    title: "[완료된 프로젝트명]",
    summary: "[한 줄 요약]. [기간] 동안 [핵심 기능]을 직접 설계하고 구현했습니다.",
  },
];

const ALGORITHM_CODE = [
  "void FCustomPriorityQueue::Push(const FPathNode& Node)",
  "{",
  "    Heap.HeapPush(Node, PredicateLess);",
  "}",
];

export function SideProjects() {
  return (
    <section id="side" aria-labelledby="side-projects-heading" className="mx-auto w-full max-w-[var(--container-max)] px-6 py-14 sm:px-10">
      <h2 id="side-projects-heading" className="font-display text-2xl font-semibold">
        개인 프로젝트
      </h2>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {PROJECTS.map((project) => (
          <article key={project.title} className="rounded-md border border-rule bg-paper-2 p-6">
            <span className="font-mono text-xs text-accent">status: {project.status}</span>
            <h3 className="mt-1 font-display text-lg font-semibold">{project.title}</h3>
            <p className="mt-2 leading-relaxed text-ink-2">{project.summary}</p>
          </article>
        ))}

        <article className="rounded-md border border-rule bg-paper-2 p-6 sm:col-span-2">
          <span className="font-mono text-xs text-accent">자료구조 · 알고리즘</span>
          <h3 className="mt-1 font-display text-lg font-semibold">직접 구현한 우선순위 큐</h3>
          <p className="mt-2 max-w-[var(--measure)] leading-relaxed text-ink-2">
            언리얼 프로젝트 내 캐싱 로직에서 표준 컨테이너 대신 사용했습니다. 이유: [필요했던 이유].
          </p>
          <div className="mt-4">
            <CodeBlock file="PriorityQueue.cpp" code={ALGORITHM_CODE} />
          </div>
        </article>
      </div>
    </section>
  );
}
