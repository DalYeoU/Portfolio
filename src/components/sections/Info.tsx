"use client";

import { Mail } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { GithubIcon } from "@/components/icons/GithubIcon";
import styles from "./Info.module.css";

const SKILLS = {
  languages: [
    { label: "C++", tip: "SpartaArcade, One Two Shoot!, Spark 등 모든 프로젝트의 핵심 언어" },
    { label: "C#", tip: "개인 프로젝트에서 학습 중" },
    { label: "Blueprint", tip: "Spark의 퍼즐 조립, UI, 레벨 스크립트 등에 사용" },
  ],
  tools: [
    { label: "Unreal Engine", tip: "SpartaArcade, One Two Shoot!, Spark의 개발 엔진" },
    { label: "Git", tip: "모든 팀/개인 프로젝트의 버전 관리" },
    { label: "Visual Studio", tip: "C++ 프로젝트 전반의 개발 환경" },
  ],
  interests: [
    { label: "Gameplay Systems", tip: "전투·능력치 등 게임 규칙을 설계하고 구현하는 것" },
    { label: "AI Agents", tip: "LLM 기반 에이전트, 자동화 워크플로우" },
    { label: "Tools", tip: "개발 효율을 높이는 에디터 툴·파이프라인 제작" },
  ],
};

export function Info() {
  const about = useReveal<HTMLElement>();
  const skills = useReveal<HTMLElement>();
  const contact = useReveal<HTMLElement>();

  return (
    <section id="info" className={styles.info}>
      <article
        ref={about.ref}
        id="about"
        className={`${styles.panel} ${about.visible ? styles.panelVisible : ""}`}
      >
        <h2>About Me</h2>
        <p className={styles.aboutLarge}>
          C++와 Unreal Engine으로 게임 시스템을 설계합니다.{" "}
          <strong>간결하고 모듈화된 구조를 지향하며, 표면적인 해결보다 근본 원인을 이해하는 것을 우선합니다.</strong>
        </p>
      </article>

      <article
        ref={skills.ref}
        id="skills"
        className={`${styles.panel} ${styles.delay1} ${skills.visible ? styles.panelVisible : ""}`}
      >
        <h2>Skills</h2>
        <div className={styles.skillGroup}>
          <div className={styles.skillLabel}>Languages</div>
          <div className={styles.skillList}>
            {SKILLS.languages.map((s) => (
              <span key={s.label} className={styles.skillChip} data-tip={s.tip} tabIndex={0}>{s.label}</span>
            ))}
          </div>
        </div>
        <div className={styles.skillGroup}>
          <div className={styles.skillLabel}>Engine / Tools</div>
          <div className={styles.skillList}>
            {SKILLS.tools.map((s) => (
              <span key={s.label} className={styles.skillChip} data-tip={s.tip} tabIndex={0}>{s.label}</span>
            ))}
          </div>
        </div>
        <div className={styles.skillGroup}>
          <div className={styles.skillLabel}>Interests</div>
          <div className={styles.skillList}>
            {SKILLS.interests.map((s) => (
              <span key={s.label} className={styles.skillChip} data-tip={s.tip} tabIndex={0}>{s.label}</span>
            ))}
          </div>
        </div>
      </article>

      <article
        ref={contact.ref}
        id="contact"
        className={`${styles.panel} ${styles.delay2} ${contact.visible ? styles.panelVisible : ""}`}
      >
        <h2>Let&apos;s Connect</h2>
        <p className={styles.contactCopy}>
          좋은 기회가 있다면 언제든 연락 부탁드립니다.
        </p>
        <div className={styles.contactList}>
          <a href="mailto:muusdog@gmail.com" className="inline-flex items-center gap-2">
            <Mail size={15} strokeWidth={1.8} aria-hidden="true" />
            muusdog@gmail.com
          </a>
          <a href="https://github.com/DalYeoU" className="inline-flex items-center gap-2">
            <GithubIcon />
            github.com/DalYeoU
          </a>
        </div>
      </article>
    </section>
  );
}
