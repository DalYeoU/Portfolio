import { SideNav } from "@/components/sections/SideNav";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <a href="#home" className={styles.logo}>
        전종환
        <span className={styles.logoDot} aria-hidden="true" />
      </a>

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
          <div className={styles.tech}>
            <span className={styles.techLine} aria-hidden="true" />
            Unreal Engine 5 · C++
          </div>
        </div>

        <div className={styles.location}>
          거주지: 대한민국
          <br />
          <span className={styles.locationStatus}>
            채용 제안 환영
            <span className={styles.statusDot} aria-hidden="true" />
          </span>
        </div>
      </div>

      <SideNav />

      <div className={styles.actions}>
        <a className={styles.button} href="#work">
          <span>프로젝트 보기 ↗</span>
        </a>
      </div>

      <a className={styles.scroll} href="#work">
        Scroll
        <span className={styles.scrollLine} aria-hidden="true" />
      </a>
    </section>
  );
}
