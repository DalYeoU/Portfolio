"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { SideNav } from "@/components/sections/SideNav";
import styles from "./Hero.module.css";

export function Hero() {
  const gameplayRef = useRef<HTMLDivElement>(null);
  const programmerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const mx = e.clientX / window.innerWidth - 0.5;
        const my = e.clientY / window.innerHeight - 0.5;
        gameplayRef.current?.style.setProperty("transform", `translate(${mx * 14}px, ${my * 10}px)`);
        programmerRef.current?.style.setProperty("transform", `translate(${mx * 28}px, ${my * 20}px)`);
        introRef.current?.style.setProperty("transform", `translate(${mx * 4}px, ${my * 3}px)`);
        locationRef.current?.style.setProperty("transform", `translate(${mx * 4}px, ${my * 3}px)`);
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.logo}>전종환</div>

      <div className={styles.stage}>
        <div ref={gameplayRef} className={styles.gameplayWrap}>
          <h1 className={styles.gameplayTitle}>GAME CLIENT</h1>
        </div>
        <div ref={programmerRef} className={styles.programmerWrap} aria-hidden="true">
          <div className={styles.programmerTitle}>PROGRAMMER</div>
        </div>

        <div ref={introRef} className={styles.introWrap}>
          <div className={styles.intro}>
            <p>
              좋아하는 게임을 플레이하는 사람에서,
              <br />
              좋아하는 <strong>경험을 만드는 사람</strong>으로.
            </p>
            <div className={styles.tech}>Unreal Engine 5 · C++</div>
          </div>
        </div>

        <div ref={locationRef} className={styles.location}>새로운 기회에 열려 있습니다.</div>
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
