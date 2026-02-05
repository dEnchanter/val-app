"use client";

import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const messages = [
    "Hey Beautiful...",
    "We've made so many memories...",
    "You make me smile every single day...",
    "So I have a question...",
  ];

  const [step, setStep] = useState(0);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const [finalScreen, setFinalScreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hearts = [
    { left: "6%", size: 12, duration: 12, delay: 0 },
    { left: "16%", size: 18, duration: 15, delay: 2 },
    { left: "28%", size: 10, duration: 11, delay: 4 },
    { left: "40%", size: 14, duration: 14, delay: 1 },
    { left: "52%", size: 20, duration: 16, delay: 3 },
    { left: "64%", size: 12, duration: 13, delay: 6 },
    { left: "76%", size: 16, duration: 15, delay: 5 },
    { left: "88%", size: 11, duration: 12, delay: 7 },
    { left: "10%", size: 16, duration: 17, delay: 8 },
    { left: "34%", size: 13, duration: 13, delay: 9 },
    { left: "58%", size: 18, duration: 16, delay: 10 },
    { left: "82%", size: 12, duration: 12, delay: 11 },
  ];

  const confettiPieces = useMemo(() => {
    if (!mounted || !finalScreen) return [];
    return Array.from({ length: 140 }).map((_, index) => {
      const left = Math.random() * 100;
      const delay = Math.random() * 1.2;
      const rotate = Math.random() * 360;
      const size = 6 + Math.random() * 10;
      const duration = 1.8 + Math.random() * 1.4;
      const drift = Math.random() * 40 - 20;
      const shapes = ["round", "ribbon", "heart"];
      const colors = [
        "#ff5a8a",
        "#ff8fb3",
        "#ffd1e3",
        "#f02f78",
        "#f7a8c7",
        "#ff6aa2",
      ];
      return {
        id: index,
        left: `${left}%`,
        delay: `${delay}s`,
        rotate: `${rotate}deg`,
        size: `${size}px`,
        duration: `${duration}s`,
        drift: `${drift}px`,
        shape: shapes[index % shapes.length],
        color: colors[index % colors.length],
      };
    });
  }, [mounted, finalScreen]);

  const handleNext = () => {
    if (step < messages.length) {
      setStep((prev) => prev + 1);
    }
  };

  const handleNoMove = () => {
    const x = Math.round(Math.random() * 140 - 70);
    const y = Math.round(Math.random() * 60 - 20);
    setNoOffset({ x, y });
  };

  const handleYes = () => {
    setFinalScreen(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-10">
      <div className="absolute inset-0 -z-10">
        <div className="sparkle" />
        {hearts.map((heart, index) => (
          <span
            key={index}
            className="float-heart"
            style={{
              left: heart.left,
              width: heart.size,
              height: heart.size,
              animationDuration: `${heart.duration}s`,
              animationDelay: `${heart.delay}s`,
              opacity: 0.4 + (index % 4) * 0.12,
            }}
          />
        ))}
      </div>

      <main className="mx-auto flex min-h-[100svh] w-full max-w-[420px] flex-col items-center justify-center gap-8 text-center">
        {!finalScreen && step < messages.length && (
          <div
            key={`step-${step}`}
            className="card-shell card-swap relative w-[88vw] max-w-[360px] rounded-[28px] px-6 py-10"
          >
            <div className="text-fade mx-auto text-[28px] font-semibold text-[#d33576]">
              {messages[step]}
            </div>
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={handleNext}
                className="btn-primary btn-pulse tap-optimize rounded-full px-10 py-3 text-sm font-semibold text-white"
              >
                Click Me
              </button>
            </div>
          </div>
        )}

        {!finalScreen && step >= messages.length && (
          <div
            key="question"
            className="card-swap flex w-[88vw] max-w-[360px] flex-col items-center gap-5 rounded-[30px] bg-white/80 px-6 py-8 shadow-[0_18px_35px_rgba(227,84,140,0.2)] backdrop-blur"
          >
            <div className="text-4xl text-[#f2387f]">❤</div>
            <h2 className="text-fade font-[var(--font-dancing)] text-[30px] font-semibold text-[#cf2f70]">
              Will you be my Valentine?
            </h2>
            <p className="text-fade text-sm text-[#7a2a53]">
              (I promise to buy you chocolate 🍫)
            </p>
            <div className="relative mt-2 flex h-16 w-full items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleYes}
                className="btn-yes tap-optimize rounded-full px-8 py-3 text-sm font-semibold"
              >
                YES!
              </button>
              <button
                type="button"
                onPointerEnter={handleNoMove}
                onPointerDown={handleNoMove}
                onClick={handleNoMove}
                className="btn-ghost tap-optimize rounded-full px-7 py-3 text-sm font-semibold transition-transform"
                style={{
                  transform: `translate(${noOffset.x}px, ${noOffset.y}px)`,
                }}
              >
                No
              </button>
            </div>
          </div>
        )}

        {finalScreen && (
          <div className="card-shell card-swap relative w-[88vw] max-w-[360px] rounded-[30px] px-6 py-10 text-center">
            <div className="text-3xl">🥰 🎉</div>
            <h2 className="text-fade mt-3 font-[var(--font-dancing)] text-[34px] font-semibold text-[#d12f73]">
              She said YES!
            </h2>
            <p className="text-fade mt-3 text-sm text-[#7a2a53]">
              You just made me the happiest person in the world. I love you! ❤️
            </p>
          </div>
        )}
      </main>

      {finalScreen && (
        <div className="confetti">
          {confettiPieces.map((piece) => (
            <span
              key={piece.id}
              className={`confetti-piece ${piece.shape}`}
              style={{
                left: piece.left,
                backgroundColor: piece.color,
                width: piece.size,
                height: piece.size,
                transform: `translateX(${piece.drift}) rotate(${piece.rotate})`,
                animationDelay: piece.delay,
                animationDuration: piece.duration,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
