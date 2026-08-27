import { CodeReveal } from "@/components/CodeReveal";

const CODE_SNIPPET = `// 데미지 계산: 방어력을 로그 스케일로 감쇠시켜
// 고레벨 구간에서도 방어력 투자가 계속 의미 있게 만든다.
float UCombatComponent::CalculateDamage(float BaseDamage, float TargetArmor)
{
    const float Mitigation = TargetArmor / (TargetArmor + ArmorConstant);
    const float FinalDamage = BaseDamage * (1.0f - Mitigation);

    OnDamageCalculated.Broadcast(FinalDamage);
    return FMath::Max(FinalDamage, MinimumDamage);
}`;

export function MainProject() {
  return (
    <section
      id="project"
      aria-labelledby="main-project-heading"
      className="mx-auto w-full max-w-[var(--container-max)] px-6 py-28 sm:px-10"
    >
      <h2 id="main-project-heading" className="font-mono text-xs font-normal uppercase tracking-[0.1em] text-ink-2">
        01 · [팀 프로젝트명] · team · unreal engine
      </h2>

      <div className="mt-8">
        <div className="aspect-video w-full border-t border-rule">
          <div className="flex h-full items-center justify-center font-mono text-xs text-ink-2">
            플레이 영상 / GIF 자리
          </div>
        </div>
        <p className="mt-2 font-mono text-xs text-ink-2">플레이 영상 — [프로젝트명], 전투 시퀀스</p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[3fr_2fr]">
        <div className="flex flex-col gap-8">
          <div>
            <h3 className="font-mono text-sm text-ink">구현한 시스템</h3>
            <ul className="mt-3 flex max-w-[var(--measure)] flex-col gap-3 text-ink-2">
              <li className="leading-relaxed">
                <strong className="font-medium text-ink">AI 비헤이비어 트리 설계</strong> — [적 행동 패턴 요약]
              </li>
              <li className="leading-relaxed">
                <strong className="font-medium text-ink">전투 시스템 데미지 계산</strong> — 방어력을 로그 스케일로 감쇠시켜 밸런스 유지
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-sm text-ink">트러블슈팅</h3>
            <p className="mt-3 max-w-[var(--measure)] leading-relaxed text-ink-2">
              [겪었던 문제] → [원인 분석] → [해결 방법]. 최적화 전후 [지표]를 [수치]만큼 개선했습니다.
            </p>
          </div>
        </div>

        <div className="lg:sticky lg:top-20 lg:self-start">
          <p className="border-t border-rule pt-2 font-mono text-xs text-ink-2">combat.cpp</p>
          <div className="overflow-x-auto">
            <CodeReveal code={CODE_SNIPPET} />
          </div>
          <p className="border-t border-rule pt-2 text-sm leading-relaxed text-ink-2">
            방어력을 선형이 아닌{" "}
            <code className="font-mono text-accent-2">TargetArmor / (TargetArmor + k)</code> 형태로 감쇠시켜, 고레벨
            구간에서도 방어력 투자가 무의미해지지 않도록 했습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
