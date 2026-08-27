"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Info.module.css";

const SKILLS = {
  languages: ["C++", "C#", "Blueprint"],
  tools: ["Unreal Engine", "Git", "Visual Studio", "Perforce"],
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
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
        <div className={styles.skillGroup}>
          <div className={styles.skillLabel}>Engine / Tools</div>
          <div className={styles.skillList}>
            {SKILLS.tools.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
        <div className={styles.skillGroup}>
          <div className={styles.skillLabel}>Interests</div>
          <div className={styles.skillList}>
            {SKILLS.interests.map((s) => (
              <span key={s}>{s}</span>
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
          <a href="mailto:muusdog@gmail.com">muusdog@gmail.com</a>
          <a href="https://github.com/DalYeoU">github.com/DalYeoU</a>
          <span>대한민국</span>
        </div>
      </article>
    </section>
  );
}
