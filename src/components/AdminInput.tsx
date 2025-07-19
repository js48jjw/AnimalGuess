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
    <label className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">관리자 숫자 입력</label>
    <div className="flex gap-2 w-full justify-center">
      <input
        type="password"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={4}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-40 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-2xl text-center tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:ring-cyan-700 transition-all"
        placeholder="●●●●"
        autoFocus
      />
      <button
        type="button"
        onClick={onRandom}
        disabled={disabled}
        className="px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-400 dark:from-cyan-700 dark:to-blue-700 text-white font-bold shadow hover:scale-105 active:scale-95 transition-all disabled:opacity-60"
      >랜덤생성</button>
    </div>
    <button
      type="submit"
      disabled={disabled || value.length === 0}
      className="w-full py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-800 dark:to-cyan-800 text-white text-lg font-bold shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-60"
    >확인</button>
    <p className="text-base text-gray-500 dark:text-gray-400 mt-2">관리자만 입력하세요. (숫자 1~9999)</p>
  </form>
);

export default AdminInput; 