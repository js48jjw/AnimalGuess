import React from "react";

interface HintDisplayProps {
  hint: "UP" | "DOWN" | "CORRECT" | null;
  lastGuess: string;
}

const hintText = {
  UP: "UP! 더 큰 숫자!",
  DOWN: "DOWN! 더 작은 숫자!",
  CORRECT: "정답! 축하합니다! 🎉",
};

const hintColor = {
  UP: "text-cyan-500 dark:text-cyan-300",
  DOWN: "text-pink-500 dark:text-pink-300",
  CORRECT: "text-yellow-500 dark:text-yellow-300 animate-bounce",
};

const HintDisplay: React.FC<HintDisplayProps> = ({ hint, lastGuess }) => {
  if (!hint) return null;
  return (
    <div className="flex flex-col items-center my-8 animate-fade-in">
      <div className={`text-4xl sm:text-6xl font-extrabold drop-shadow-md mb-2 ${hintColor[hint]}`}>{hintText[hint]}</div>
      <div className="text-lg text-gray-500 dark:text-gray-300">(입력값: {lastGuess})</div>
    </div>
  );
};

export default HintDisplay; 