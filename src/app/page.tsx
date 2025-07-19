'use client';

import React, { useState } from "react";
import TitleHeader from "../components/TitleHeader";
import StartScreen from "../components/StartScreen";
import AdminInput from "../components/AdminInput";
import GuessInput from "../components/GuessInput";
import HintDisplay from "../components/HintDisplay";
import GameResult from "../components/GameResult";
import { generateRandomNumber, compareNumbers } from "../lib/gameLogic";
import { HintType } from "../types";

// step: 'ready' | 'admin' | 'play' | 'result'
export default function HomePage() {
  const [step, setStep] = useState<'ready' | 'admin' | 'play' | 'result'>('ready');
  const [adminValue, setAdminValue] = useState("");
  const [targetNumber, setTargetNumber] = useState<number | null>(null);
  const [guessValue, setGuessValue] = useState("");
  const [hint, setHint] = useState<HintType>(null);
  const [tryCount, setTryCount] = useState(0);
  const [lastGuess, setLastGuess] = useState("");

  // 준비화면 → 관리자 입력
  const handleStart = () => {
    setStep("admin");
    setAdminValue("");
    setTargetNumber(null);
    setGuessValue("");
    setHint(null);
    setTryCount(0);
    setLastGuess("");
  };

  // 관리자 숫자 입력 완료
  const handleSetNumber = () => {
    const num = parseInt(adminValue, 10);
    if (!isNaN(num) && num >= 1 && num <= 9999) {
      setTargetNumber(num);
      setStep("play");
      setGuessValue("");
      setHint(null);
      setTryCount(0);
      setLastGuess("");
    }
  };

  // 랜덤 숫자
  const handleRandom = () => {
    const num = generateRandomNumber();
    setAdminValue(num.toString());
  };

  // 사용자 입력 제출
  const handleGuess = () => {
    if (!targetNumber) return;
    const num = parseInt(guessValue, 10);
    if (isNaN(num) || num < 1 || num > 9999) return;
    setTryCount((c) => c + 1);
    setLastGuess(guessValue);
    const result = compareNumbers(targetNumber, num);
    setHint(result);
    if (result === "CORRECT") {
      setStep("result");
    }
    setGuessValue("");
  };

  // 다시하기
  const handleRestart = () => {
    setStep("admin");
    setAdminValue("");
    setTargetNumber(null);
    setGuessValue("");
    setHint(null);
    setTryCount(0);
    setLastGuess("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-cyan-100 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <TitleHeader />
      <main className="flex flex-col items-center justify-center px-2 py-8">
        {step === "ready" && <StartScreen onStart={handleStart} />}
        {step === "admin" && (
          <AdminInput
            value={adminValue}
            onChange={e => setAdminValue(e.target.value.replace(/[^0-9]/g, ""))}
            onSetNumber={handleSetNumber}
            onRandom={handleRandom}
            disabled={false}
          />
        )}
        {step === "play" && (
          <>
            <GuessInput
              value={guessValue}
              onChange={e => setGuessValue(e.target.value.replace(/[^0-9]/g, ""))}
              onGuess={handleGuess}
              disabled={false}
            />
            <HintDisplay hint={hint} lastGuess={lastGuess} />
          </>
        )}
        {step === "result" && (
          <GameResult tryCount={tryCount} onRestart={handleRestart} />
        )}
      </main>
    </div>
  );
}
