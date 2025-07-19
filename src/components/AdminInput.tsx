import React from "react";

interface AdminInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSetNumber: () => void;
  onRandom: () => void;
  disabled?: boolean;
}

const AdminInput: React.FC<AdminInputProps> = ({ value, onChange, onSetNumber, onRandom, disabled }) => (
  <form
    className="flex flex-col items-center gap-6 w-full max-w-xs mx-auto py-8"
    onSubmit={e => {
      e.preventDefault();
      if (!disabled && value.length > 0) onSetNumber();
    }}
  >
    <label className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">관리자 동물 입력</label>
    <div className="flex gap-2 w-full justify-center">
      <input
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-64 px-4 py-2 rounded-lg border border-purple-300 dark:border-purple-600 bg-white dark:bg-gray-800 text-2xl text-center tracking-widest font-mono password-dot focus:outline-none focus:ring-2 focus:ring-violet-400 dark:focus:ring-violet-700 transition-all"
        placeholder="비공개 입력"
        autoFocus
      />
      <button
        type="button"
        onClick={onRandom}
        disabled={disabled}
        className="px-3 py-2 rounded-lg bg-gradient-to-r from-purple-400 to-violet-400 dark:from-purple-700 dark:to-violet-700 text-white font-bold shadow hover:scale-105 active:scale-95 transition-all disabled:opacity-60"
      >랜덤</button>
    </div>
    <button
      type="submit"
      disabled={disabled || value.length === 0}
      className="w-full py-3 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 dark:from-purple-800 dark:to-violet-800 text-white text-lg font-bold shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-60"
    >확인</button>
    <p className="text-base text-gray-500 dark:text-gray-400 mt-2">관리자만 입력하세요. (예: 사자, 코끼리 등)</p>
  </form>
);

export default AdminInput; 