'use client';

import React, { useState, useEffect, useRef } from "react";
import TitleHeader from "../components/TitleHeader";
import StartScreen from "../components/StartScreen";
import AdminInput from "../components/AdminInput";
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
  const wrongPopupTimerRef = useRef<NodeJS.Timeout | null>(null); // 오답 팝업 타이머
  const correctPopupTimerRef = useRef<NodeJS.Timeout | null>(null); // 정답 팝업 타이머
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
    if (guessValue.trim() === targetAnimal) {
      // 기존 타이머가 있다면 취소
      if (correctPopupTimerRef.current) {
        clearTimeout(correctPopupTimerRef.current);
      }
      setShowCorrectPopup(true);
      correctPopupTimerRef.current = setTimeout(() => setShowCorrectPopup(false), 3000);
      setStep("result");
    } else {
      // 기존 타이머가 있다면 취소
      if (wrongPopupTimerRef.current) {
        clearTimeout(wrongPopupTimerRef.current);
      }
      setShowWrongPopup(true);
      if (wrongAudioRef.current) {
        wrongAudioRef.current.currentTime = 0;
        wrongAudioRef.current.play();
      }
      wrongPopupTimerRef.current = setTimeout(() => setShowWrongPopup(false), 3000);
    }
    setGuessValue("");
  };

  // 정답공개
  const handleRevealAnswer = () => {
    if (!targetAnimal) return;
    setStep("result");
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
      // 힌트 생성 실패 시에는 카운트를 증가시키지 않음
    } finally {
      setHintLoading(false);
    }
  };

  // 랜덤 동물명 리스트
  const animalList = [
    // 포유류 - 반려동물
    "고양이", "강아지", "햄스터", "기니피그", "토끼", "친칠라", "고슴도치", "알파카",
    // 포유류 - 농장동물
    "소", "돼지", "양", "염소", "말", "당나귀", "닭", "오리", "거위", "칠면조",
    // 포유류 - 야생동물
    "사자", "호랑이", "코끼리", "기린", "고래", "여우", "늑대", "곰", "다람쥐", "판다",
    "하마", "코뿔소", "치타", "캥거루", "고릴라", "수달", "코알라", "오랑우탄", "침팬지", "원숭이",
    "너구리", "스컹크", "오소리", "족제비", "담비", "비버", "카피바라", "바다사자", "물개", "돌고래",
    // 조류 - 반려조류
    "앵무새",
    // 조류 - 야생조류
    "독수리", "매", "참새", "제비", "공작", "타조", "펭귄", "부엉이", "올빼미", "갈매기",
    "까마귀", "까치",    
    // 파충류 - 반려파충류
    "도마뱀", "이구아나", "카멜레온", "코모도드래곤",
    // 파충류 - 야생파충류
    "뱀", "방울뱀", "아나콘다", "보아", "악어", "거북이", "자라", "바다거북",
    // 양서류
    "개구리", "두꺼비", "도롱뇽", 
    // 어류 - 관상어
    "금붕어", "잉어", "송사리", "구피",
    // 어류 - 해양어류
    "상어", "고래상어", "백상아리", "범상어", "블루상어", 
    // 무척추동물 - 해양생물
    "문어", "오징어", "낙지", "쭈꾸미", "게", "새우", "랍스터", "가재",
    // 곤충류
    "나비", "나방", "벌", "말벌", "개미", "풍뎅이", "잠자리", "매미", "귀뚜라미", "메뚜기",
    "바퀴벌레", "무당벌레", "사마귀", "딱정벌레", "하늘소", "호랑나비", "거미", "파리"
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

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (wrongPopupTimerRef.current) {
        clearTimeout(wrongPopupTimerRef.current);
      }
      if (correctPopupTimerRef.current) {
        clearTimeout(correctPopupTimerRef.current);
      }
    };
  }, []);

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
                // 목록에 있거나 동물로 보이는 단어라면 진행
                const inputValue = adminValue.trim();
                if (!animalList.includes(inputValue)) {
                  // 간단한 동물 여부 검증 (동물 관련 키워드 포함 여부)
                  const animalKeywords = ['동물', '짐승', '생물', '포유류', '조류', '파충류', '양서류', '어류', '곤충'];
                  const isLikelyAnimal = animalKeywords.some(keyword => 
                    inputValue.includes(keyword) || 
                    inputValue.length >= 2 && inputValue.length <= 10 // 적절한 길이
                  );
                  
                  if (!isLikelyAnimal) {
                    setAdminInputError("동물을 입력해 주세요");
                    setTimeout(() => setAdminInputError("") , 2000);
                    return;
                  }
                }
                handleSetAnimal();
              }}
              onRandom={handleRandomAnimal}
              disabled={false}
            />
            {adminInputError && (
              <div className="mt-2 text-red-500 text-2xl sm:text-3xl font-bold animate-fade-in">{adminInputError}</div>
            )}
          </>
        )}
        {step === "play" && (
          <>
            <div className="mb-4 text-2xl font-bold text-center">동물을 찾아주세요</div>
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={handleHint}
                disabled={hintLoading}
                className="flex-1 py-4 rounded-lg bg-gradient-to-r from-violet-400 to-pink-400 dark:from-violet-700 dark:to-pink-700 text-white text-xl font-bold shadow hover:scale-105 active:scale-95 transition-all disabled:opacity-60"
                style={{ minWidth: 180, maxWidth: 320, width: '100%' }}
              >{hintLoading ? '힌트 생성 중...' : '힌트'}</button>
              <button
                type="button"
                onClick={handleRevealAnswer}
                className="px-4 py-4 rounded-lg bg-gradient-to-r from-orange-400 to-red-400 dark:from-orange-700 dark:to-red-700 text-white text-sm font-bold shadow hover:scale-105 active:scale-95 transition-all disabled:opacity-60 ml-2"
              >정답공개</button>
            </div>
            {usedHints.length > 0 && (
              <div className="my-0 w-[98vw] sm:w-[800px] flex flex-col gap-2">
                {usedHints.map((h, i) => (
                  <div key={i} className="text-lg sm:text-xl text-yellow-600 dark:text-yellow-300 bg-yellow-50 dark:bg-gray-900 rounded px-3 py-2 shadow animate-fade-in whitespace-nowrap w-fit min-w-full">
                    힌트 {i + 1}. {h}
                  </div>
                ))}
              </div>
            )}
            <form
              className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto py-8"
              onSubmit={e => {
                e.preventDefault();
                handleGuess();
              }}
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={guessValue}
                  onChange={e => setGuessValue(e.target.value)}
                  className="w-56 px-4 py-2 rounded-lg border border-purple-300 dark:border-purple-600 bg-white dark:bg-gray-800 text-2xl text-center tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-violet-400 dark:focus:ring-violet-700 transition-all"
                  placeholder="동물명"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={guessValue.length === 0}
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-400 to-violet-400 dark:from-purple-700 dark:to-violet-700 text-black font-bold shadow hover:scale-105 active:scale-95 transition-all disabled:opacity-60"
                >제출</button>
              </div>
            </form>
          </>
        )}
        {step === "result" && (
          <>
            <GameResult onRestart={handleRestart} answerAnimal={targetAnimal || ''} />
            {usedHints.length > 0 && (
              <div className="mt-8 flex flex-col gap-2 items-center">
                {usedHints.map((h, i) => (
                  <div
                    key={i}
                    className="text-lg sm:text-xl text-yellow-600 dark:text-yellow-300 bg-yellow-50 dark:bg-gray-900 rounded px-3 py-2 shadow animate-fade-in w-fit min-w-full max-w-[800px] whitespace-nowrap mx-auto text-left"
                  >
                    힌트 {i + 1}. {h}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        {hintLimitError && (
          <div className="fixed top-1/3 left-1/2 -translate-x-1/2 bg-pink-500 text-white px-8 py-4 rounded-xl shadow-lg text-3xl font-bold z-50 animate-fade-in">
            {hintLimitError}
          </div>
        )}
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
