import React from "react";

interface GuessInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGuess: () => void;
  onHint: () => void;
  onRevealAnswer: () => void;
  hintDisabled?: boolean;
  disabled?: boolean;
  hintLoading?: boolean;
}

const GuessInput: React.FC<GuessInputProps> = ({ value, onChange, onGuess, onHint, onRevealAnswer, hintDisabled, disabled, hintLoading }) => (
  <form
    className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto py-8"
    onSubmit={e => {
      e.preventDefault();
      if (!disabled) onGuess();
    }}
  >
    <label className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">동물을 찾아주세요</label>
    <div className="flex gap-2 w-full justify-end">
      <button
        type="button"
        onClick={onHint}
        disabled={hintDisabled || disabled}
        className="flex-1 py-4 rounded-lg bg-gradient-to-r from-violet-400 to-pink-400 dark:from-violet-700 dark:to-pink-700 text-white text-xl font-bold shadow hover:scale-105 active:scale-95 transition-all disabled:opacity-60"
        style={{ maxWidth: 240 }}
      >{hintLoading ? '힌트 생성 중...' : '힌트'}</button>
      <button
        type="button"
        onClick={onRevealAnswer}
        disabled={disabled}
        className="px-4 py-4 rounded-lg bg-gradient-to-r from-orange-400 to-red-400 dark:from-orange-700 dark:to-red-700 text-white text-sm font-bold shadow hover:scale-105 active:scale-95 transition-all disabled:opacity-60 ml-2"
      >정답공개</button>
    </div>
    <div className="absolute bottom-0 left-0 w-full flex justify-center z-10 pb-8">
      <div className="flex gap-2 w-full max-w-xs sm:max-w-sm">
        <input
          type="text"
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full px-4 py-2 rounded-lg border border-purple-300 dark:border-purple-600 bg-white dark:bg-gray-800 text-xl sm:text-2xl text-center tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-violet-400 dark:focus:ring-violet-700 transition-all"
          placeholder="동물명"
          autoFocus
        />
        <button
          type="submit"
          disabled={disabled || value.length === 0}
          className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-400 to-violet-400 dark:from-purple-700 dark:to-violet-700 text-black font-bold shadow hover:scale-105 active:scale-95 transition-all disabled:opacity-60"
        >제출</button>
      </div>
    </div>
  </form>
);

export default GuessInput; 