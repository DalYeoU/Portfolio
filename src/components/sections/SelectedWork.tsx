"use client";

import { useState } from "react";
import styles from "./SelectedWork.module.css";

const WORKS = [
  {
    title: "[팀 프로젝트명]",
    category: "팀 프로젝트",
    stack: "언리얼엔진 5 · C++",
    summary:
      "[장르] 게임. 전투 시스템과 AI 비헤이비어 트리를 클라이언트에서 직접 설계하고 구현했습니다.",
    href: "#project",
    seed: "unreal-combat-corridor",
  },
  {
    title: "[개인 프로젝트명]",
    category: "개인 프로젝트",
    stack: "진행 중",
    summary: "기획부터 구현까지 혼자 진행 중인 [장르] 게임입니다.",
    href: "#side",
    seed: "unreal-solo-prototype",
  },
  {
    title: "우선순위 큐 A* 길찾기",
    category: "자료구조 · 알고리즘",
    stack: "C++",
    summary:
      "STL priority_queue의 decrease-key 한계를 해결하기 위해 인덱스 추적형 바이너리 힙을 직접 구현했습니다.",
    href: "#side",
    seed: "pathfinding-grid",
  },
];

export function SelectedWork() {
  const [index, setIndex] = useState(0);
  const work = WORKS[index];
  const count = WORKS.length;

  return (
    <section id="work" className={styles.work}>
      <div className={styles.header}>
        <h2>Selected Work</h2>
        <span className={styles.count} aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
      </div>

      <div className={styles.slider}>
        <article key={index} className={styles.project}>
          <div className={styles.number}>{String(index + 1).padStart(2, "0")}</div>

          <div>
            <h3 className={styles.name}>{work.title}</h3>
            <div className={styles.type}>
              {work.category}
              <br />
              {work.stack}
            </div>
            <p className={styles.description}>{work.summary}</p>
            <a className={styles.link} href={work.href}>
              프로젝트 보기 <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className={styles.visual}>
            <img
              src={`https://picsum.photos/seed/${work.seed}/960/540`}
              alt=""
              className={styles.visualImg}
              loading="lazy"
            />
          </div>
        </article>

        <div className={styles.controls}>
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + count) % count)}
            aria-label="이전 프로젝트"
          >
            ↑
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % count)}
            aria-label="다음 프로젝트"
          >
            ↓
          </button>
        </div>
      </div>

      <div className={styles.allProjects}>
        <span aria-hidden="true" />
        <a href="#project">프로젝트 전체 보기 ↗</a>
        <span aria-hidden="true" />
      </div>
    </section>
  );
}
