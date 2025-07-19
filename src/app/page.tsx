'use client';

import React, { useState, useEffect, useRef } from "react";
import TitleHeader from "../components/TitleHeader";
import StartScreen from "../components/StartScreen";
import AdminInput from "../components/AdminInput";
import GuessInput from "../components/GuessInput";
import GameResult from "../components/GameResult";
import { fetchGeminiHint } from "../lib/utils";

// step: 'ready' | 'admin' | 'play' | 'result'
export default function HomePage() {
  const [step, setStep] = useState<'ready' | 'admin' | 'play' | 'result'>('ready');
  const [adminValue, setAdminValue] = useState(""); // 관리자 동물명
  const [adminInputError, setAdminInputError] = useState("");
  const [targetAnimal, setTargetAnimal] = useState<string | null>(null); // 정답 동물명
  const [guessValue, setGuessValue] = useState(""); // 사용자 입력 동물명
  const [hintCount, setHintCount] = useState(0); // 힌트 사용 횟수
  const [showWrongPopup, setShowWrongPopup] = useState(false); // 오답 팝업
  const [showCorrectPopup, setShowCorrectPopup] = useState(false); // 정답 팝업
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wrongAudioRef = useRef<HTMLAudioElement | null>(null);
  const [usedHints, setUsedHints] = useState<string[]>([]); // 사용한 힌트 목록
  const [hintLoading, setHintLoading] = useState(false); // 힌트 로딩 상태
  const [hintLimitError, setHintLimitError] = useState("");

  // 준비화면 → 관리자 동물 입력
  const handleStart = () => {
    setStep("admin");
    setAdminValue("");
    setTargetAnimal(null);
    setGuessValue("");
    setHintCount(0);
    setUsedHints([]);
  };

  // 관리자 동물명 입력 완료
  const handleSetAnimal = () => {
    if (adminValue.trim().length > 0) {
      setTargetAnimal(adminValue.trim());
      setStep("play");
      setGuessValue("");
      setHintCount(0);
      setUsedHints([]);
    }
  };

  // 사용자 입력 제출
  const handleGuess = () => {
    if (!targetAnimal) return;
    if (guessValue.trim().length === 0) return;
    setHintCount(c => c + 1);
    if (guessValue.trim() === targetAnimal) {
      setShowCorrectPopup(true);
      setTimeout(() => setShowCorrectPopup(false), 3000);
      setStep("result");
    } else {
      setShowWrongPopup(true);
      if (wrongAudioRef.current) {
        wrongAudioRef.current.currentTime = 0;
        wrongAudioRef.current.play();
      }
      setTimeout(() => setShowWrongPopup(false), 3000);
    }
    setGuessValue("");
  };

  // 다시하기
  const handleRestart = () => {
    setStep("admin");
    setAdminValue("");
    setTargetAnimal(null);
    setGuessValue("");
    setHintCount(0);
    setUsedHints([]);
  };

  // 힌트 요청
  const handleHint = async () => {
    if (hintCount >= 6) {
      setHintLimitError("힌트는 6개가 최대입니다.");
      setTimeout(() => setHintLimitError(""), 2000);
      return;
    }
    if (hintLoading) return;
    setHintLoading(true);
    try {
      if (!targetAnimal) throw new Error('정답 동물이 설정되지 않음');
      const newHint = await fetchGeminiHint(targetAnimal, usedHints);
      setUsedHints(prev => [...prev, newHint]);
      setHintCount(c => c + 1);
    } catch {
      setUsedHints(prev => [...prev, '힌트 생성 실패']);
    } finally {
      setHintLoading(false);
    }
  };

  // 랜덤 동물명 리스트
  const animalList = [
    "사자", "호랑이", "코끼리", "기린", "고래", "토끼", "여우", "늑대", "곰", "다람쥐",
    "판다", "하마", "코뿔소", "치타", "캥거루", "고릴라", "수달", "악어", "펭귄", "부엉이"
  ];
  // 랜덤 동물명 입력
  const handleRandomAnimal = () => {
    const random = animalList[Math.floor(Math.random() * animalList.length)];
    setAdminValue(random);
  };

  // 정답 효과음 재생 (결과화면 진입 시)
  useEffect(() => {
    if (step === "result" && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }, [step]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-violet-100 to-pink-50 dark:from-purple-900 dark:via-violet-800 dark:to-purple-900 transition-colors duration-500">
      <TitleHeader />
      <main className="flex flex-col items-center justify-center px-2 py-8">
        {step === "ready" && <StartScreen onStart={handleStart} />}
        {step === "admin" && (
          <>
            <AdminInput
              value={adminValue}
              onChange={e => setAdminValue(e.target.value)}
              onSetNumber={() => {
                if (!adminValue.trim() || !/[가-힣]/.test(adminValue)) {
                  setAdminInputError("한글로 입력하세요");
                  setTimeout(() => setAdminInputError("") , 2000);
                  return;
                }
                handleSetAnimal();
              }}
              onRandom={handleRandomAnimal}
              disabled={false}
            />
            {adminInputError && (
              <div className="mt-2 text-red-500 text-base font-semibold animate-fade-in">{adminInputError}</div>
            )}
          </>
        )}
        {step === "play" && (
          <>
            <GuessInput
              value={guessValue}
              onChange={e => setGuessValue(e.target.value)}
              onGuess={handleGuess}
              onHint={handleHint}
              hintDisabled={hintLoading}
              disabled={false}
              hintLoading={hintLoading}
            />
            {/* hintLimitError 팝업은 아래에서 렌더링 */}
          </>
        )}
        {step === "result" && (
          <GameResult onRestart={handleRestart} answerAnimal={targetAnimal || ''} />
        )}
        {usedHints.length > 0 && (
          <div className="my-0 w-[98vw] sm:w-[800px] flex flex-col gap-2">
            {usedHints.map((h, i) => (
              <div key={i} className="text-lg sm:text-xl text-yellow-600 dark:text-yellow-300 bg-yellow-50 dark:bg-gray-900 rounded px-3 py-2 shadow animate-fade-in whitespace-nowrap overflow-x-auto">
                힌트 {i + 1}. {h}
              </div>
            ))}
          </div>
        )}
        {hintLimitError && (
          <div className="fixed top-1/3 left-1/2 -translate-x-1/2 bg-pink-500 text-white px-8 py-4 rounded-xl shadow-lg text-3xl font-bold z-50 animate-fade-in">
            {hintLimitError}
          </div>
        )}
        {/* 힌트 제한 팝업 코드 제거됨 */}
        {showWrongPopup && (
          <div className="fixed top-1/3 left-1/2 -translate-x-1/2 bg-red-500 text-white px-8 py-4 rounded-xl shadow-lg text-3xl font-bold z-50 animate-fade-in">
            ❌ 오답입니다!
          </div>
        )}
        {showCorrectPopup && (
          <div className="fixed top-1/3 left-1/2 -translate-x-1/2 bg-green-500 text-white px-8 py-4 rounded-xl shadow-lg text-3xl font-bold z-50 animate-fade-in">
            ⭕ 정답입니다!
          </div>
        )}
        <audio ref={audioRef} src="/sound/Clap BGM.mp3" preload="auto" />
        <audio ref={wrongAudioRef} src="/sound/x BGM.mp3" preload="auto" />
      </main>
    </div>
  );
}
