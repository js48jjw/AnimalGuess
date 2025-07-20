import React, { useRef, useEffect } from "react";

interface GameResultProps {
  onRestart: () => void;
  answerAnimal: string;
}

const Confetti: React.FC = () => (
  <div className="fixed top-0 left-0 w-screen h-screen z-50 overflow-hidden pointer-events-none">
    {[...Array(60)].map((_, i) => {
      const size = 10 + Math.random() * 18; // 10~28px
      const rotate = Math.random() * 360;
      const duration = 10 + Math.random(); // 10~11s
      const delay = Math.random() * 2.5; // 0~2.5s
      const left = Math.random() * 100;
      const color = `hsl(${Math.random() * 360}, 80%, 60%)`;
      const opacity = 0.7 + Math.random() * 0.3;
      const xOffset = (Math.random() - 0.5) * 160; // -80px ~ +80px 좌우로 퍼짐
      return (
        <div
          key={i}
          className="confetti"
          style={{
            left: `${left}%`,
            width: `${size}px`,
            height: `${size * 1.5}px`,
            backgroundColor: color,
            opacity,
            transform: `rotate(${rotate}deg)` ,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            '--xOffset': `${xOffset}px`,
          } as React.CSSProperties}
        />
      );
    })}
    <style jsx>{`
      .confetti {
        position: absolute;
        top: -30px;
        border-radius: 4px;
        animation: confetti-fall 10s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        will-change: transform, opacity;
      }
      @keyframes confetti-fall {
        0% {
          opacity: 1;
          transform: translateY(0) translateX(0) scale(1) rotate(0deg);
        }
        60% {
          opacity: 1;
          /* 중간에 xOffset의 80%만큼 이동 */
          transform: translateY(60vh) translateX(calc(var(--xOffset, 0) * 0.8)) scale(1) rotate(180deg);
        }
        100% {
          top: 120vh;
          opacity: 0.2;
          /* 최종적으로 xOffset만큼 이동 */
          transform: translateY(120vh) translateX(var(--xOffset, 0)) scale(0.7) rotate(360deg);
        }
      }
    `}</style>
  </div>
);

const GameResult: React.FC<GameResultProps> = ({ onRestart, answerAnimal }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    buttonRef.current?.focus();
    const audio = new Audio("/sound/Clap BGM.mp3");
    audio.volume = 0.8;
    let isUnmounted = false;
    audio.play().catch(() => {});
    return () => {
      isUnmounted = true;
      setTimeout(() => {
        if (!isUnmounted) return;
        audio.pause();
        audio.currentTime = 0;
      }, 150);
    };
  }, []);

  return (
    <form
      className="relative flex flex-col items-center justify-center min-h-[30vh] gap-2 mt-2"
      onSubmit={e => {
        e.preventDefault();
        onRestart();
      }}
    >
      <Confetti />
      <div className="text-3xl sm:text-5xl font-extrabold text-yellow-500 dark:text-yellow-300 drop-shadow-lg animate-bounce mb-2">
        🎉 축하합니다! 🎉
      </div>
      <div className="text-2xl sm:text-3xl text-black dark:text-white mb-2 font-extrabold">정답: <span className='text-black dark:text-white'>&quot;{answerAnimal}&quot;</span></div>
      <button
        type="submit"
        ref={buttonRef}
        className="px-10 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-700 dark:to-pink-700 text-white text-xl sm:text-2xl font-bold shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-800 mt-0"
      >
        다시 하기
      </button>
    </form>
  );
};

export default GameResult; 