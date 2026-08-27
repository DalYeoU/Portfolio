import { ArrowUpRight, ChevronDown } from "lucide-react";
import { SideNav } from "@/components/sections/SideNav";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.logo}>전종환</div>

      <div className={styles.stage}>
        <h1 className={styles.gameplayTitle}>GAMEPLAY</h1>
        <div className={styles.programmerTitle} aria-hidden="true">
          PROGRAMMER
        </div>

        <div className={styles.intro}>
          <p>
            게임플레이 시스템과 <strong>AI 로직을 설계하고 구현</strong>하며
            플레이어가 체감하는 규칙을 코드로 옮깁니다.
          </p>
          <div className={styles.tech}>Unreal Engine 5 · C++</div>
        </div>

        <div className={styles.location}>채용 제안 환영</div>
      </div>

      <SideNav />

      <div className={styles.actions}>
        <a className={styles.button} href="#work">
          <span className="inline-flex items-center gap-1.5">
            프로젝트 보기
            <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
          </span>
        </a>
        {/* 이력서 링크 비공개 처리. 준비되면 주석 해제.
        <a
          className={styles.resume}
          href="링크"
          target="_blank"
          rel="noopener noreferrer"
        >
          이력서
          <ArrowUpRight size={12} strokeWidth={2} aria-hidden="true" />
        </a>
        */}
      </div>

      <a className={styles.scroll} href="#work">
        Scroll
        <ChevronDown size={14} strokeWidth={1.8} aria-hidden="true" />
      </a>
    </section>
  );
}
