"use client";

import { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";
import styles from "./Info.module.css";

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.79-.25.79-.55 0-.27-.01-1.15-.02-2.09-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.96.1-.75.4-1.25.73-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.8 1.18 1.83 1.18 3.09 0 4.43-2.69 5.4-5.26 5.69.42.36.78 1.08.78 2.18 0 1.57-.02 2.84-.02 3.23 0 .3.22.66.8.55A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

const SKILLS = {
  languages: ["C++", "C#", "Blueprint"],
  tools: ["Unreal Engine", "Git", "Visual Studio"],
  interests: ["Gameplay Systems", "AI", "Tools"],
};

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

export function Info() {
  const about = useReveal();
  const skills = useReveal();
  const contact = useReveal();

  return (
    <section id="info" className={styles.info}>
      <article
        ref={about.ref}
        id="about"
        className={`${styles.panel} ${about.visible ? styles.panelVisible : ""}`}
      >
        <h2>About Me</h2>
        <p className={styles.aboutLarge}>
          문제를 게임플레이 규칙으로 옮기는 걸 좋아하는{" "}
          <strong>클라이언트 개발자입니다. C++와 언리얼엔진으로 읽기 쉬운 시스템을 만듭니다.</strong>
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
              <span key={s} className={styles.skillChip}>{s}</span>
            ))}
          </div>
        </div>
        <div className={styles.skillGroup}>
          <div className={styles.skillLabel}>Engine / Tools</div>
          <div className={styles.skillList}>
            {SKILLS.tools.map((s) => (
              <span key={s} className={styles.skillChip}>{s}</span>
            ))}
          </div>
        </div>
        <div className={styles.skillGroup}>
          <div className={styles.skillLabel}>Interests</div>
          <div className={styles.skillList}>
            {SKILLS.interests.map((s) => (
              <span key={s} className={styles.skillChip}>{s}</span>
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
          새로운 기회에 열려 있습니다. 편하게 연락 주세요.
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
