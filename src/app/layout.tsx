import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const jetendard = localFont({
  variable: "--font-jetendard",
  src: [
    { path: "./fonts/jetendard/Jetendard-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/jetendard/Jetendard-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/jetendard/Jetendard-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/jetendard/Jetendard-Bold.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "전종환 · 게임 클라이언트 개발자",
  description: "C++ / Unreal Engine 기반 게임플레이 시스템 개발자 포트폴리오",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${spaceGrotesk.variable} ${jetendard.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink font-body">
        {children}
      </body>
    </html>
  );
}
