# 안녕하세요, 전종환입니다.

게임플레이 시스템과 AI 로직을 C++ / 언리얼엔진으로 직접 설계하고 구현하는 클라이언트 개발자입니다. 플레이어가 체감하는 규칙을 코드로 옮기는 일에 관심이 많고, 읽기 쉬운 코드와 재현 가능한 디버깅을 우선순위에 둡니다.

이 저장소는 제 포트폴리오 웹사이트(Next.js)의 소스코드입니다.

**Live:** [portfolio.foxtail.kr](https://portfolio.foxtail.kr)

## 무엇을 할 수 있나요

- **게임플레이 시스템**: 폭탄 생성·물리(설치/차기/연쇄 폭발), 캐릭터 상태 머신(기절/사망/부활) 설계 및 구현
- **전투 밸런스**: 방어력 감쇠·명중률 공식 설계, 대쉬 게이지·회피 판정 구현
- **플레이어 조작**: PlayerController + Pawn 기반 이동/입력 처리, Possess 전환을 활용한 시점 전환(탱크 ↔ 드론)

## 프로젝트

| 프로젝트 | 설명 | 링크 |
| --- | --- | --- |
| SpartaArcade | 봄버맨 스타일 멀티플레이어 서바이벌. 폭탄 생성·물리와 캐릭터 조작/애니메이션 담당 | [repo](https://github.com/NBcampUnrealTrack/8th-Team1-CH4-Project) |
| One, Two… Shoot! | 탱크 대전 게임. 탱크 ↔ 드론 시점 전환 구현 | [repo](https://github.com/NBcampUnrealTrack/8th-Team12-CH3-Project) |
| Text Console RPG | 텍스트 기반 콘솔 RPG. 전투 밸런스(명중률/방어력 공식) 설계 | [repo](https://github.com/GoldBoll/NBC_Console_TeamProject) |
| Spark | '움직여야 보이는' 3D 퍼즐 플랫포머. 기획부터 구현까지 혼자 진행 중 | [repo](https://github.com/DalYeoU/Spark) |

## 연락처

- Email: [muusdog@gmail.com](mailto:muusdog@gmail.com)
- GitHub: [github.com/DalYeoU](https://github.com/DalYeoU)

---

## 이 저장소에 대해

Next.js(App Router) + TypeScript + Tailwind CSS v4로 만들었습니다 (`npm install && npm run dev`).

```
src/
  app/                   # 라우트, 전역 스타일, 폰트 설정
  components/sections/   # 히어로, 프로젝트, About/Skills/Contact 등 페이지 섹션
```

폰트: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)(헤드라인) · [Pretendard Variable](https://github.com/orioncactus/pretendard)(본문) · [Jetendard](https://github.com/kuskhan/jetendard)(라벨/코드). Jetendard는 SIL Open Font License 1.1을 따르며, 라이선스 원문은 `src/app/fonts/jetendard/LICENSE.txt`에 있습니다.
