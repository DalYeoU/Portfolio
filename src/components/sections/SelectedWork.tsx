"use client";

import { useState } from "react";
import { ArrowUp, ArrowDown, ArrowUpRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import styles from "./SelectedWork.module.css";

const WORKS = [
  {
    title: "SpartaArcade",
    category: "팀 프로젝트",
    stack: "언리얼엔진 5 · C++",
    summary:
      "봄버맨 스타일 멀티플레이어 서바이벌 게임. 캐릭터 조작·애니메이션과 폭탄 생성·물리(설치, 차기, 연쇄 폭발)를 설계하고 구현했습니다.",
    href: "#project",
    seed: "unreal-combat-corridor",
    image: "/images/spartaarcade-cover.png" as string | undefined,
    imageIsAI: true,
  },
  {
    title: "Spark",
    category: "개인 프로젝트",
    stack: "진행 중",
    summary: "움직여야 스파크가 튀어 어둠 속 공간이 잠시 보이는 3D 퍼즐 플랫포머. 기획부터 구현까지 혼자 진행 중입니다.",
    href: "#side",
    seed: "unreal-solo-prototype",
    image: "/images/spark-concept.png",
    imageIsAI: true,
  },
];

export function SelectedWork() {
  const [index, setIndex] = useState(0);
  const work = WORKS[index];
  const count = WORKS.length;
  const reveal = useReveal<HTMLElement>();

  return (
    <section ref={reveal.ref} className={`${styles.work} reveal ${reveal.visible ? "reveal-visible" : ""}`}>
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
              프로젝트 보기
              <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>

          <div className={styles.visual}>
            <img
              src={work.image ?? `https://picsum.photos/seed/${work.seed}/960/540`}
              alt=""
              className={styles.visualImg}
              loading="lazy"
            />
            {work.imageIsAI && <span className={styles.aiBadge}>AI 생성 이미지</span>}
          </div>
        </article>

        <div className={styles.controls}>
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + count) % count)}
            aria-label="이전 프로젝트"
          >
            <ArrowUp size={16} strokeWidth={2} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % count)}
            aria-label="다음 프로젝트"
          >
            <ArrowDown size={16} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={styles.allProjects}>
        <span aria-hidden="true" />
        <a href="#project" className="inline-flex items-center gap-1.5">
          프로젝트 전체 보기
          <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
        </a>
        <span aria-hidden="true" />
      </div>
    </section>
  );
}
