import React from "react";

interface GuessInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGuess: () => void;
  disabled?: boolean;
}

const GuessInput: React.FC<GuessInputProps> = ({ value, onChange, onGuess, disabled }) => (
  <form
    className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto py-8"
    onSubmit={e => {
      e.preventDefault();
      if (!disabled) onGuess();
    }}
  >
    <label className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">숫자를 입력하세요</label>
    <div className="flex gap-2 w-full justify-center">
      <input
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={4}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-40 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-2xl text-center tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:ring-cyan-700 transition-all"
        placeholder="숫자"
        autoFocus
      />
      <button
        type="submit"
        disabled={disabled || value.length === 0}
        className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-400 dark:from-cyan-700 dark:to-blue-700 text-white font-bold shadow hover:scale-105 active:scale-95 transition-all disabled:opacity-60"
      >제출</button>
    </div>
  </form>
);

export default GuessInput; 