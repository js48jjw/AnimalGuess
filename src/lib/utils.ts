import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Gemini API를 사용해 동물 힌트를 받아오는 함수 (API Route로 요청)
export async function fetchGeminiHint(animal: string, usedHints: string[] = []) {
  const res = await fetch('/api/gemini-hint', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ animal, usedHints }),
  });
  if (!res.ok) throw new Error('힌트 생성 실패');
  const data = await res.json();
  return data.hint || '힌트 생성 실패';
}
