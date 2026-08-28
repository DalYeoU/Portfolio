"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { CodeBlock, type DiffRow } from "@/components/CodeBlock";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { useReveal } from "@/hooks/useReveal";

const BOMB_CODE = [
  "void ASpartaArcadeBomb::Explode()",
  "{",
  "    // 이미 폭발 중이면 즉시 리턴하여 무한 루프 방지",
  "    if (bIsExploded) return;",
  "    bIsExploded = true;",
  "    // 유폭 연쇄 호출 시 타이머 중복 트리거 방지를 위해 선제 소멸 처리",
  "    GetWorld()->GetTimerManager().ClearTimer(ExplosionTimerHandle);",
  "",
  "    FVector StartLoc = GetActorLocation();",
  "    ApplyCenterDamage(StartLoc);",
  "",
  "    // 십자 4방향으로 폭풍 화염 투사",
  "    PerformExplosionDirection(FVector(1.f, 0.f, 0.f));",
  "    PerformExplosionDirection(FVector(-1.f, 0.f, 0.f));",
  "    PerformExplosionDirection(FVector(0.f, 1.f, 0.f));",
  "    PerformExplosionDirection(FVector(0.f, -1.f, 0.f));",
  "",
  "    Destroy();",
  "}",
  "",
  "bool ASpartaArcadeBomb::HandleExplosionHit(AActor* HitActor)",
  "{",
  "    // 다른 폭탄 발견 시 즉각 유폭(Chain Explosion) 유발",
  "    if (ASpartaArcadeBomb* OtherBomb = Cast<ASpartaArcadeBomb>(HitActor))",
  "    {",
  "        OtherBomb->Explode();",
  "        return false;",
  "    }",
  "    // 상자 파괴, 캐릭터 피격 처리는 생략",
  "    return true;",
  "}",
];

// 실제 커밋(5371685)의 Explode() 변경 사항 그대로 재구성한 diff
const BOMB_DIFF: DiffRow[] = [
  { old: 1, cur: 1, type: "ctx", pieces: [{ text: "void ASpartaArcadeBomb::Explode()" }] },
  { old: 2, cur: 2, type: "ctx", pieces: [{ text: "{" }] },
  { old: null, cur: 3, type: "add", pieces: [{ text: "    // 이미 폭발 중이면 즉시 리턴하여 무한 루프 방지" }] },
  { old: null, cur: 4, type: "add", pieces: [{ text: "    if (bIsExploded) return;" }] },
  { old: null, cur: 5, type: "add", pieces: [{ text: "    bIsExploded = true;" }] },
  { old: 3, cur: 6, type: "ctx", pieces: [{ text: "    // 유폭 연쇄 호출 시 타이머 중복 트리거 방지를 위해 선제 소멸 처리" }] },
  { old: 4, cur: 7, type: "ctx", pieces: [{ text: "    GetWorld()->GetTimerManager().ClearTimer(ExplosionTimerHandle);" }] },
  { old: 5, cur: 8, type: "ctx", pieces: [{ text: "" }] },
  { old: 6, cur: 9, type: "ctx", pieces: [{ text: "    FVector StartLoc = GetActorLocation();" }] },
  { old: 7, cur: 10, type: "ctx", pieces: [{ text: "" }] },
  { old: 8, cur: 11, type: "ctx", pieces: [{ text: "    // 폭발 중심부 비주얼 파티클 재생" }] },
  { old: 9, cur: 12, type: "ctx", pieces: [{ text: "    if (ExplosionVFX)" }] },
  { old: 10, cur: 13, type: "ctx", pieces: [{ text: "    {" }] },
  { old: 11, cur: 14, type: "ctx", pieces: [{ text: "        UNiagaraFunctionLibrary::SpawnSystemAtLocation(this, ExplosionVFX, StartLoc);" }] },
  { old: 12, cur: 15, type: "ctx", pieces: [{ text: "    }" }] },
  { old: 13, cur: 16, type: "ctx", pieces: [{ text: "" }] },
  { old: 14, cur: null, type: "del", pieces: [{ text: "    // 폭탄 자체의 반경 내에 있는 중심점 데미지 스윕 판정 (인라인)" }] },
  { old: 15, cur: null, type: "del", pieces: [{ text: "    TArray<FHitResult> OutHits;" }] },
  { old: 16, cur: null, type: "del", pieces: [{ text: "    // ... 스윕 및 데미지 적용 로직 20여 줄 ..." }] },
  { old: null, cur: 17, type: "add", pieces: [{ text: "    ApplyCenterDamage(StartLoc);" }] },
  { old: 17, cur: 18, type: "ctx", pieces: [{ text: "" }] },
  { old: 18, cur: 19, type: "ctx", pieces: [{ text: "    // 십자 4방향으로 폭풍 화염 투사" }] },
  { old: 19, cur: 20, type: "ctx", pieces: [{ text: "    PerformExplosionDirection(FVector(1.f, 0.f, 0.f));  // 북" }] },
  { old: 20, cur: 21, type: "ctx", pieces: [{ text: "    PerformExplosionDirection(FVector(-1.f, 0.f, 0.f)); // 남" }] },
  { old: 21, cur: 22, type: "ctx", pieces: [{ text: "    PerformExplosionDirection(FVector(0.f, 1.f, 0.f));  // 동" }] },
  { old: 22, cur: 23, type: "ctx", pieces: [{ text: "    PerformExplosionDirection(FVector(0.f, -1.f, 0.f)); // 서" }] },
  { old: 23, cur: 24, type: "ctx", pieces: [{ text: "" }] },
  { old: 24, cur: 25, type: "ctx", pieces: [{ text: "    // 소유자 캐릭터의 액티브 폭탄 슬롯 반환" }] },
  { old: 25, cur: 26, type: "ctx", pieces: [{ text: "    if (InstigatorCharacter)" }] },
  { old: 26, cur: 27, type: "ctx", pieces: [{ text: "    {" }] },
  { old: 27, cur: 28, type: "ctx", pieces: [{ text: "        InstigatorCharacter->OnBombExploded();" }] },
  { old: 28, cur: 29, type: "ctx", pieces: [{ text: "    }" }] },
  { old: 29, cur: 30, type: "ctx", pieces: [{ text: "" }] },
  { old: 30, cur: 31, type: "ctx", pieces: [{ text: "    Destroy();" }] },
  { old: 31, cur: 32, type: "ctx", pieces: [{ text: "}" }] },
];

const STUN_CODE = [
  "void ASpartaArcadeCharacter::HandleOnStun()",
  "{",
  "    GetCharacterMovement()->DisableMovement();",
  "",
  "    // 기절 진입 시 재생 중인 몽타주(폭탄 설치/차기 등)를 강제 정지하여 상태 기계 핑퐁 방지",
  "    if (UAnimInstance* AnimInstance = GetMesh()->GetAnimInstance())",
  "    {",
  "        AnimInstance->Montage_Stop(0.2f);",
  "    }",
  "",
  '    UE_LOG(LogTemp, Warning, TEXT("%s 기절 상태 진입!"), *GetName());',
  "}",
];

// 실제 커밋(fd5df8e)의 HandleOnStun() 변경 사항 그대로 재구성한 diff
const STUN_DIFF: DiffRow[] = [
  { old: 1, cur: 1, type: "ctx", pieces: [{ text: "void ASpartaArcadeCharacter::HandleOnStun()" }] },
  { old: 2, cur: 2, type: "ctx", pieces: [{ text: "{" }] },
  { old: 3, cur: 3, type: "ctx", pieces: [{ text: "    GetCharacterMovement()->DisableMovement();" }] },
  { old: null, cur: 4, type: "add", pieces: [{ text: "" }] },
  { old: null, cur: 5, type: "add", pieces: [{ text: "    // 기절 진입 시 재생 중인 몽타주(폭탄 설치/차기 등)를 강제 정지하여 상태 기계 핑퐁 방지" }] },
  { old: null, cur: 6, type: "add", pieces: [{ text: "    if (UAnimInstance* AnimInstance = GetMesh()->GetAnimInstance())" }] },
  { old: null, cur: 7, type: "add", pieces: [{ text: "    {" }] },
  { old: null, cur: 8, type: "add", pieces: [{ text: "        AnimInstance->Montage_Stop(0.2f);" }] },
  { old: null, cur: 9, type: "add", pieces: [{ text: "    }" }] },
  { old: null, cur: 10, type: "add", pieces: [{ text: "" }] },
  { old: 4, cur: 11, type: "ctx", pieces: [{ text: '    UE_LOG(LogTemp, Warning, TEXT("%s 기절 상태 진입!"), *GetName());' }] },
  { old: 5, cur: 12, type: "ctx", pieces: [{ text: "}" }] },
];

const REVIVE_CODE = [
  "void ASpartaArcadeCharacter::HandleOnRevived()",
  "{",
  "    // 이미 돌고 있던 사망 소멸 타이머를 확실하게 해제합니다.",
  "    if (GetWorld())",
  "    {",
  "        GetWorld()->GetTimerManager().ClearTimer(DestroyTimerHandle);",
  "    }",
  "",
  "    // 꺼져있던 캡슐 콜리전과 이동 상태를 복구합니다.",
  "    if (GetCapsuleComponent())",
  "    {",
  "        GetCapsuleComponent()->SetCollisionEnabled(ECollisionEnabled::QueryAndPhysics);",
  "        GetCapsuleComponent()->SetCollisionResponseToChannel(ECC_Visibility, ECR_Block);",
  "    }",
  "    if (GetCharacterMovement())",
  "    {",
  "        GetCharacterMovement()->SetMovementMode(MOVE_Walking);",
  "    }",
  "",
  '    UE_LOG(LogTemp, Log, TEXT("%s 부활/구출 완료!"), *GetName());',
  "}",
];

// 실제 커밋(fd5df8e)의 HandleOnRevived() 변경 사항 그대로 재구성한 diff
const REVIVE_DIFF: DiffRow[] = [
  { old: 1, cur: 1, type: "ctx", pieces: [{ text: "void ASpartaArcadeCharacter::HandleOnRevived()" }] },
  { old: 2, cur: 2, type: "ctx", pieces: [{ text: "{" }] },
  { old: 3, cur: null, type: "del", pieces: [{ text: "    GetCharacterMovement()->SetMovementMode(MOVE_Walking);" }] },
  { old: null, cur: 3, type: "add", pieces: [{ text: "    // 이미 돌고 있던 사망 소멸 타이머를 확실하게 해제합니다." }] },
  { old: null, cur: 4, type: "add", pieces: [{ text: "    if (GetWorld())" }] },
  { old: null, cur: 5, type: "add", pieces: [{ text: "    {" }] },
  { old: null, cur: 6, type: "add", pieces: [{ text: "        GetWorld()->GetTimerManager().ClearTimer(DestroyTimerHandle);" }] },
  { old: null, cur: 7, type: "add", pieces: [{ text: "    }" }] },
  { old: null, cur: 8, type: "add", pieces: [{ text: "" }] },
  { old: null, cur: 9, type: "add", pieces: [{ text: "    // 꺼져있던 캡슐 콜리전과 이동 상태를 복구합니다." }] },
  { old: null, cur: 10, type: "add", pieces: [{ text: "    if (GetCapsuleComponent())" }] },
  { old: null, cur: 11, type: "add", pieces: [{ text: "    {" }] },
  { old: null, cur: 12, type: "add", pieces: [{ text: "        GetCapsuleComponent()->SetCollisionEnabled(ECollisionEnabled::QueryAndPhysics);" }] },
  { old: null, cur: 13, type: "add", pieces: [{ text: "        GetCapsuleComponent()->SetCollisionResponseToChannel(ECC_Visibility, ECR_Block);" }] },
  { old: null, cur: 14, type: "add", pieces: [{ text: "    }" }] },
  { old: null, cur: 15, type: "add", pieces: [{ text: "    if (GetCharacterMovement())" }] },
  { old: null, cur: 16, type: "add", pieces: [{ text: "    {" }] },
  { old: null, cur: 17, type: "add", pieces: [{ text: "        GetCharacterMovement()->SetMovementMode(MOVE_Walking);" }] },
  { old: null, cur: 18, type: "add", pieces: [{ text: "    }" }] },
  { old: 4, cur: 19, type: "ctx", pieces: [{ text: '    UE_LOG(LogTemp, Log, TEXT("%s 부활/구출 완료!"), *GetName());' }] },
  { old: 5, cur: 20, type: "ctx", pieces: [{ text: "}" }] },
];

// 실제 커밋(19b4b36, "드론, 조준모드 완료")의 EnterDroneMode() / ExitDroneMode() 구현 그대로
const DRONE_CODE = [
  "// 드론 모드 진입",
  "void APlayerTank::EnterDroneMode(APlayerController* PC)",
  "{",
  "    if (!PC) return;",
  "",
  "    // 기존 탱크의 시야 각도를 안전하게 백업",
  "    SavedTankRotation = PC->GetControlRotation();",
  "",
  "    FVector SpawnLocation = GetActorLocation() + FVector(0.0f, 0.0f, 150.0f);",
  "    FRotator SpawnRotation = SavedTankRotation;",
  "    SpawnRotation.Pitch = -45.0f;",
  "",
  "    FActorSpawnParameters SpawnParams;",
  "    SpawnParams.Owner = this;",
  "    SpawnParams.Instigator = GetInstigator();",
  "",
  "    SpawnedDrone = GetWorld()->SpawnActor<ADrone>(DroneClass, SpawnLocation, SpawnRotation, SpawnParams);",
  "",
  "    if (SpawnedDrone)",
  "    {",
  "        SpawnedDrone->SetCreatorTank(this);",
  "        PC->Possess(SpawnedDrone);",
  "    }",
  "}",
  "",
  "// 탱크 모드 복귀",
  "void APlayerTank::ExitDroneMode(APlayerController* PC)",
  "{",
  "    if (!PC) return;",
  "",
  "    if (SpawnedDrone)",
  "    {",
  "        SpawnedDrone->Destroy();",
  "        SpawnedDrone = nullptr;",
  "    }",
  "",
  "    PC->Possess(this);",
  "    PC->SetControlRotation(SavedTankRotation);",
  "}",
];

const RPG_CODE = [
  "void Player::TakeDamage(int _damage, int attackerDex)",
  "{",
  "    // 명중률 계산: 무기 명중률 + (공격자 DEX - 방어자 DEX) × 2",
  "    int finalHitRate = 80 + (attackerDex - dex) * 2;",
  "    if (finalHitRate < 5) finalHitRate = 5;",
  "    else if (finalHitRate > 95) finalHitRate = 95;",
  "",
  "    int roll = std::rand() % 100;",
  "",
  "    if (roll < finalHitRate)",
  "    {",
  "        // 명중 시 방어력 계산 적용",
  "        // 최종 데미지 = (공격력 × 무기배율) × (1.0 - (방어력 × 0.03))",
  "        int damageAfterDef = static_cast<int>(std::round(_damage * (1.0 - (def * 0.03))));",
  "",
  "        hp -= damageAfterDef;",
  '        Render::GetInstance().AddLog(std::to_string(damageAfterDef) + "의 데미지를 입었습니다!", CLR_RED);',
  "    }",
  "    else",
  "    {",
  '        Render::GetInstance().AddLog("공격을 회피했습니다!", CLR_WHITE);',
  "    }",
  "}",
  "",
  "void Player::UpdateDash()",
  "{",
  "    int dexBonus = std::min(dex, 10);",
  "",
  "    if (dashGauge < maxDashGauge)",
  "    {",
  "        dashGauge += 10 + (dexBonus * 2);",
  "",
  "        if (dashGauge > maxDashGauge) dashGauge = maxDashGauge;",
  "    }",
  "}",
];

// 실제 커밋(5873860, "fix: add Math Round")의 TakeDamage() 변경 사항 그대로 재구성한 diff
const RPG_DIFF: DiffRow[] = [
  { old: 1, cur: 1, type: "ctx", pieces: [{ text: "    // 명중 시 방어력 계산 적용" }] },
  { old: 2, cur: 2, type: "ctx", pieces: [{ text: "    // 최종 데미지 = (공격력 × 무기배율) × (1.0 - (방어력 × 0.03))" }] },
  { old: 3, cur: null, type: "del", pieces: [{ text: "    int damageAfterDef = static_cast<int>(_damage * (1.0 - (def * 0.03)));" }] },
  { old: null, cur: 3, type: "add", pieces: [{ text: "    int damageAfterDef = static_cast<int>(" }, { text: "std::round(", change: "add" }, { text: "_damage * (1.0 - (def * 0.03))" }, { text: ")", change: "add" }, { text: ");" }] },
  { old: 4, cur: 4, type: "ctx", pieces: [{ text: "" }] },
  { old: 5, cur: 5, type: "ctx", pieces: [{ text: "    hp -= damageAfterDef;" }] },
];

const TEAM_PROJECTS = [
  {
    title: "SpartaArcade",
    repo: "https://github.com/NBcampUnrealTrack/8th-Team1-CH4-Project",
    gallery: [
      { seed: "unreal-combat-corridor", src: "/images/spartaarcade-cover.png" as string | undefined, isAI: true },
      { seed: "unreal-combat-hud", src: "/images/spartaarcade-gameplay-1.png" as string | undefined, isAI: false },
    ],
    issues: [
      {
        system: {
          label: "폭탄 생성 & 물리.",
          desc: "서버 권위로 BombActor를 타일 중앙에 스냅 스폰하고, 차기 시 축 스냅 롤링과 연쇄 유폭 처리를 구현했습니다.",
        },
        problem:
          "폭발 반경에 다른 폭탄이 걸리면 그 폭탄도 즉시 유폭시켜 연쇄 폭발을 구현했는데, 이 재귀 호출 때문에 이미 터진 폭탄의 Explode()가 다시 호출되며 스택 오버플로우로 크래시가 났습니다. bIsExploded 플래그를 두고 Explode() 진입부에서 조기 반환하도록 가드를 추가해 해결했습니다.",
        codeFile: "SpartaArcadeBomb.cpp",
        code: BOMB_CODE,
        diff: BOMB_DIFF,
        note: (
          <>
            폭탄이 다른 폭탄을 감지하면 <code className="font-mono text-accent-2">Explode()</code>를 재귀 호출해
            연쇄 폭발을 만드는데, 이미 터진 폭탄이 중복 호출되지 않도록{" "}
            <code className="font-mono text-accent-2">bIsExploded</code> 플래그로 진입을 막았습니다.
          </>
        ),
      },
      {
        system: {
          label: "캐릭터 조작 & 애니메이션 연동.",
          desc: "PlayerController + Pawn으로 그리드 이동과 폭탄 설치/차기 입력을 구현하고, 기절·사망·부활 상태를 AnimBP 상태머신에 연동했습니다.",
        },
        problem:
          "기절 상태에 들어가면 직전에 재생 중이던 몽타주(폭탄 설치/차기)가 겹쳐 재생되면서, 애니메이션 상태 기계가 Idle과 Stun 사이를 반복 전이하는 핑퐁 버그가 있었습니다. HandleOnStun() 진입 즉시 Montage_Stop(0.2f)으로 몽타주를 강제 정지시켜 해결했습니다.",
        codeFile: "SpartaArcadeCharacter.cpp",
        code: STUN_CODE,
        diff: STUN_DIFF,
        note: (
          <>
            몽타주 슬롯을 점유한 채로 기절 애니메이션이 겹쳐 재생되던 문제를,{" "}
            <code className="font-mono text-accent-2">Montage_Stop(0.2f)</code>로 즉시 정리해 해결했습니다.
          </>
        ),
      },
      {
        system: {
          label: "캐릭터 조작 & 애니메이션 연동.",
          desc: "PlayerController + Pawn으로 그리드 이동과 폭탄 설치/차기 입력을 구현하고, 기절·사망·부활 상태를 AnimBP 상태머신에 연동했습니다.",
        },
        problem:
          "부활/구조 처리 시 사망 판정에서 걸어뒀던 소멸 타이머(DestroyTimerHandle)를 해제하지 않아서, 부활한 캐릭터가 잠시 후 그대로 사라져버리는 버그가 있었습니다. HandleOnRevived()에서 타이머를 해제하고, 꺼져 있던 캡슐 콜리전과 무브먼트 모드도 함께 복구하도록 수정했습니다.",
        codeFile: "SpartaArcadeCharacter.cpp",
        code: REVIVE_CODE,
        diff: REVIVE_DIFF,
        note: (
          <>
            <code className="font-mono text-accent-2">DestroyTimerHandle</code>을 해제하지 않으면 부활 직후에도
            예약된 소멸이 그대로 실행됐습니다. 타이머 해제와 콜리전 복구를 함께 처리했습니다.
          </>
        ),
      },
    ],
  },
  {
    title: "One, Two… Shoot!",
    repo: "https://github.com/NBcampUnrealTrack/8th-Team12-CH3-Project",
    gallery: [
      { seed: "unreal-project-two-a", src: "/images/onetwoshoot-gameplay-1.png" as string | undefined, isAI: false },
      { seed: "unreal-project-two-b", src: "/images/onetwoshoot-gameplay-2.png" as string | undefined, isAI: false },
    ],
    issues: [
      {
        system: {
          label: "탱크 ↔ 드론 뷰 전환.",
          desc: "Space로 별도 Drone Pawn을 스폰해 PlayerController가 빙의하도록 전환하고, FloatingPawnMovement로 자유 비행하는 1인칭 정찰 시점을 구현했습니다.",
        },
        problem:
          "Pawn을 교체(Possess)하는 방식으로 드론 뷰를 구현하다 보니, 드론으로 빙의했다가 탱크로 복귀하면 이전에 보던 방향이 아니라 기본 회전값으로 시야가 초기화되는 문제가 있었습니다. 드론 진입 직전 탱크의 컨트롤 회전을 저장해뒀다가, 복귀 시 그대로 되돌려 시야가 끊기지 않도록 했습니다.",
        codeFile: "PlayerTank.cpp",
        code: DRONE_CODE,
        diff: undefined as DiffRow[] | undefined,
        note: (
          <>
            드론으로 <code className="font-mono text-accent-2">Possess</code>했다가 되돌아올 때 컨트롤 회전이
            초기화되지 않도록, <code className="font-mono text-accent-2">SavedTankRotation</code>에 저장해뒀다가{" "}
            <code className="font-mono text-accent-2">SetControlRotation</code>으로 복원했습니다.
          </>
        ),
      },
    ],
  },
  {
    title: "Text Console RPG",
    repo: "https://github.com/GoldBoll/NBC_Console_TeamProject",
    gallery: [
      { seed: "console-rpg-a", src: "/images/consolerpg-gameplay-1.png" as string | undefined, isAI: false },
      { seed: "console-rpg-b", src: "/images/consolerpg-gameplay-2.png" as string | undefined, isAI: false },
      { seed: "console-rpg-c", src: "/images/consolerpg-gameplay-3.png" as string | undefined, isAI: false },
    ],
    issues: [
      {
        system: {
          label: "전투 밸런스 설계 & 구현.",
          desc: "방어력 감쇠 공식과 DEX 기반 명중률 공식을 직접 설계하고, 대쉬 게이지·회피 판정을 포함한 전투 시스템을 구현했습니다.",
        },
        problem:
          "방어력 적용 후 데미지를 static_cast<int>로 그대로 잘라내다 보니, 소수점이 항상 버림 처리되어 의도한 것보다 데미지가 낮게 들어가는 문제가 있었습니다. std::round()로 반올림한 뒤 정수로 변환하도록 수정해 해결했습니다.",
        codeFile: "Player.cpp",
        code: RPG_CODE,
        diff: RPG_DIFF,
        note: (
          <>
            <code className="font-mono text-accent-2">static_cast&lt;int&gt;</code>은 소수점을 버림 처리하기
            때문에, 방어력 감쇠 공식처럼 소수 결과가 나오는 계산은{" "}
            <code className="font-mono text-accent-2">std::round()</code>로 반올림한 뒤 잘라야 의도한 수치가
            나옵니다.
          </>
        ),
      },
    ],
  },
];

export function MainProject() {
  const [index, setIndex] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [issueIndex, setIssueIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const issueTrackRef = useRef<HTMLDivElement>(null);
  const reveal = useReveal<HTMLElement>();
  const project = TEAM_PROJECTS[index];

  useEffect(() => {
    setGalleryIndex(0);
    trackRef.current?.scrollTo({ left: 0 });
    setIssueIndex(0);
    issueTrackRef.current?.scrollTo({ left: 0 });
  }, [index]);

  const goToSlide = (i: number) => {
    const count = project.gallery.length;
    const next = (i + count) % count;
    setGalleryIndex(next);
    const track = trackRef.current;
    const slide = track?.children[next] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const handleTrackScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const dist = Math.abs(el.offsetLeft + el.clientWidth / 2 - center);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setGalleryIndex(closest);
  };

  const goToIssue = (i: number) => {
    const count = project.issues.length;
    const next = (i + count) % count;
    setIssueIndex(next);
    const track = issueTrackRef.current;
    const slide = track?.children[next] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const handleIssueTrackScroll = () => {
    const track = issueTrackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const dist = Math.abs(el.offsetLeft + el.clientWidth / 2 - center);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setIssueIndex(closest);
  };

  return (
    <section
      ref={reveal.ref}
      id="project"
      aria-labelledby="main-project-heading"
      className={`reveal mx-auto w-full max-w-[var(--container-max)] px-6 py-20 sm:px-10 ${reveal.visible ? "reveal-visible" : ""}`}
    >
      <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-rule pb-4">
        {TEAM_PROJECTS.map((p, i) => (
          <button
            key={p.title}
            type="button"
            onClick={() => setIndex(i)}
            aria-current={i === index ? "true" : undefined}
            className={`relative cursor-pointer pb-3 font-mono text-xs uppercase tracking-[0.08em] transition-colors after:absolute after:-bottom-[1px] after:left-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              i === index
                ? "text-ink after:w-full"
                : "text-ink-2 after:w-0 hover:text-ink hover:after:w-full hover:after:bg-rule"
            }`}
          >
            {String(i + 1).padStart(2, "0")} · {p.title}
          </button>
        ))}
      </div>

      <h2 id="main-project-heading" className="sr-only">
        {project.title}
      </h2>

      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-ink-2 transition-colors hover:text-ink"
        >
          <GithubIcon size={13} />
          레포지토리
          <ArrowUpRight size={12} strokeWidth={2} aria-hidden="true" />
        </a>
      )}

      <div key={index} className="animate-content-enter">
      <div className="relative mt-6">
        <div
          ref={trackRef}
          onScroll={handleTrackScroll}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-[5%] pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {project.gallery.map((slide, i) => (
            <div
              key={slide.seed}
              className={`relative aspect-video w-[90%] flex-none snap-center overflow-hidden rounded-md border bg-paper-2 transition-opacity duration-300 ${
                i === galleryIndex ? "border-rule opacity-100" : "border-rule opacity-30"
              }`}
            >
              <img
                src={slide.src ?? `https://picsum.photos/seed/${slide.seed}/1280/720`}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
              {slide.isAI && (
                <span className="absolute bottom-3 left-3 rounded-full border border-rule bg-paper/80 px-2.5 py-1 font-mono text-[10px] tracking-wide text-ink-2 backdrop-blur">
                  AI 생성 이미지
                </span>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goToSlide(galleryIndex - 1)}
          aria-label="이전 이미지"
          className="absolute left-[calc(5%+12px)] top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-dim bg-paper/70 text-ink-2 backdrop-blur transition-colors hover:border-ink hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => goToSlide(galleryIndex + 1)}
          aria-label="다음 이미지"
          className="absolute right-[calc(5%+12px)] top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-dim bg-paper/70 text-ink-2 backdrop-blur transition-colors hover:border-ink hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </button>

        <div className="mt-2 flex justify-center gap-1.5">
          {project.gallery.map((slide, i) => (
            <button
              key={slide.seed}
              type="button"
              onClick={() => goToSlide(i)}
              aria-label={`${i + 1}번째 이미지로 이동`}
              aria-current={i === galleryIndex ? "true" : undefined}
              className="cursor-pointer p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span
                className={`block h-1.5 rounded-full transition-all ${
                  i === galleryIndex ? "w-4 bg-accent" : "w-1.5 bg-dim"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10">
        {project.issues.length > 1 && (
          <div className="mb-3 flex items-center justify-end gap-3">
            <span className="font-mono text-xs text-ink-2 [font-variant-numeric:tabular-nums]">
              {String(issueIndex + 1).padStart(2, "0")} / {String(project.issues.length).padStart(2, "0")}
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => goToIssue(issueIndex - 1)}
                aria-label="이전 트러블슈팅"
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-dim text-ink-2 transition-colors hover:border-ink hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => goToIssue(issueIndex + 1)}
                aria-label="다음 트러블슈팅"
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-dim text-ink-2 transition-colors hover:border-ink hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        <div
          ref={issueTrackRef}
          onScroll={handleIssueTrackScroll}
          className="flex snap-x snap-mandatory gap-10 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {project.issues.map((issue, i) => (
            <div key={i} className="grid w-full min-w-0 flex-none snap-center gap-10 lg:grid-cols-[2fr_3fr]">
              <div className="flex min-w-0 flex-col gap-8">
                <div>
                  <h3 className="font-mono text-sm text-ink">구현한 시스템</h3>
                  <p className="mt-3 max-w-[var(--measure)] leading-relaxed text-ink-2">
                    <strong className="font-medium text-ink">{issue.system.label}</strong> {issue.system.desc}
                  </p>
                </div>
                <div>
                  <h3 className="font-mono text-sm text-ink">트러블슈팅</h3>
                  <p className="mt-3 max-w-[var(--measure)] leading-relaxed text-ink-2">{issue.problem}</p>
                </div>
              </div>
              <div className="w-full min-w-0 max-w-[600px] lg:ml-auto">
                <CodeBlock file={issue.codeFile} code={issue.code} diff={issue.diff} />
                <p className="mt-4 text-sm leading-relaxed text-ink-2">{issue.note}</p>
              </div>
            </div>
          ))}
        </div>

        {project.issues.length > 1 && (
          <div className="mt-4 flex justify-center gap-1.5">
            {project.issues.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToIssue(i)}
                aria-label={`${i + 1}번째 트러블슈팅으로 이동`}
                aria-current={i === issueIndex ? "true" : undefined}
                className="cursor-pointer p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all ${
                    i === issueIndex ? "w-4 bg-accent" : "w-1.5 bg-dim"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
      </div>
    </section>
  );
}
