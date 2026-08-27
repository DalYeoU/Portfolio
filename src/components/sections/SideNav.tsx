"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SideNav.module.css";

const LINKS = [
  { href: "#home", id: "home", label: "Home" },
  { href: "#work", id: "work", label: "Work" },
  { href: "#info", id: "info", label: "About" },
];

export function SideNav() {
  const [activeId, setActiveId] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const intersecting = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const sections = LINKS.map((link) => document.getElementById(link.id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    const recompute = () => {
      const lastIntersecting = LINKS.filter((link) => intersecting.current[link.id]).at(-1);
      if (lastIntersecting) setActiveId(lastIntersecting.id);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          intersecting.current[entry.target.id] = entry.isIntersecting;
        });
        recompute();
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));

    const sentinel = document.getElementById("page-end");
    let endObserver: IntersectionObserver | undefined;
    if (sentinel) {
      endObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveId(LINKS.at(-1)!.id);
        else recompute();
      });
      endObserver.observe(sentinel);
    }

    return () => {
      observer.disconnect();
      endObserver?.disconnect();
    };
  }, []);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(entry.intersectionRatio < 0.6),
      { threshold: [0, 0.6, 1] },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={scrolled ? `${styles.nav} ${styles.navScrolled}` : styles.nav}
      aria-label="주요 내비게이션"
    >
      {LINKS.map((link) => (
        <a
          key={link.id}
          href={link.href}
          aria-current={activeId === link.id ? "location" : undefined}
          className={activeId === link.id ? `${styles.link} ${styles.linkActive}` : styles.link}
        >
          <span className={styles.label}>{link.label}</span>
        </a>
      ))}
    </nav>
  );
}
