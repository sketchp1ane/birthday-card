import React, { useEffect, useRef, useState } from "react";
import { celebrant, milestones, theme, affirmations, floatingNotes } from "./config/profile.js";
import { useCountdown } from "./hooks/useCountdown.js";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion.js";
import { fireConfetti } from "./utils/confetti.js";
import { Gate } from "./components/Gate.jsx";
import { AuroraBackdrop } from "./components/AuroraBackdrop.jsx";
import { SparkleField } from "./components/SparkleField.jsx";
import { HeroCard } from "./components/HeroCard.jsx";
import { LetterSection } from "./components/LetterSection.jsx";
import { CountdownSection } from "./components/CountdownSection.jsx";
import { AffirmationsSection } from "./components/AffirmationsSection.jsx";
import { FloatingNotes } from "./components/FloatingNotes.jsx";
import { JourneyRail } from "./components/JourneyRail.jsx";
import { TopNav } from "./components/TopNav.jsx";
import { Footer } from "./components/Footer.jsx";

export default function App() {
  const reducedMotion = usePrefersReducedMotion();
  const exam = useCountdown(milestones.examDateISO);
  const todayISO = new Date().toISOString().slice(0, 10);
  const isBirthday = todayISO === milestones.birthdayISO;
  const [showLetter, setShowLetter] = useState(false);

  useEffect(() => {
    if (!isBirthday || reducedMotion) {
      return;
    }
    const timeout = window.setTimeout(() => fireConfetti({ count: 90 }), 280);
    return () => window.clearTimeout(timeout);
  }, [isBirthday, reducedMotion]);

  const [unlocked, setUnlocked] = useState(false);
  const unlockBurstFired = useRef(false);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!unlocked) {
      return;
    }
    const timeout = window.setTimeout(() => setMounted(true), 50);
    return () => window.clearTimeout(timeout);
  }, [unlocked]);

  function resetGate() {
    setUnlocked(false);
    setMounted(false);
  }

  if (!unlocked) {
    return (
      <Gate
        secret={milestones.gateSecret}
        revealText={celebrant.name}
        onUnlock={() => {
          setUnlocked(true);
          if (!unlockBurstFired.current && !reducedMotion) {
            unlockBurstFired.current = true;
            const notBirthdayToday = new Date().toISOString().slice(0, 10) !== milestones.birthdayISO;
            if (notBirthdayToday) {
              window.setTimeout(() => fireConfetti({ count: 120, duration: 1600 }), 120);
            }
          }
        }}
      />
    );
  }

  return (
    <div className={`transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
      <main className="relative min-h-[100dvh] overflow-hidden bg-[radial-gradient(60%_60%_at_50%_0%,#ffffff_20%,#eef2ff_60%,#e5e7eb_100%)] text-slate-900">
        <AuroraBackdrop accent={theme.palette.accent} glow={theme.palette.glow} reducedMotion={reducedMotion} />
        <SparkleField reducedMotion={reducedMotion} />
        <FloatingNotes notes={floatingNotes} accent={theme.palette.accent} reducedMotion={reducedMotion} />
        <JourneyRail />

        <TopNav onResetGate={resetGate} />

        <section className="mx-auto max-w-3xl px-6">
          <section id="hero">
            <HeroCard
              celebrant={celebrant}
              theme={theme}
              isBirthday={isBirthday}
              onToggleLetter={() => setShowLetter(value => !value)}
              showLetter={showLetter}
            />
          </section>

          <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />

          <LetterSection
            letter={celebrant.letter}
            show={showLetter}
            theme={theme}
            recipientName={celebrant.name}
          />

          <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />

          <CountdownSection
            exam={exam}
            examDate={milestones.examDateISO}
            reducedMotion={reducedMotion}
          />
        </section>

        <div className="mx-auto mt-12 max-w-5xl px-6">
          <AffirmationsSection affirmations={affirmations} accent={theme.palette.accent} />
        </div>

        <Footer name={celebrant.name} />
      </main>
    </div>
  );
}
