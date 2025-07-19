// 랜덤 숫자 생성 (1~9999)
export function generateRandomNumber(): number {
  return Math.floor(Math.random() * 9999) + 1;
}

// 숫자 비교 (UP, DOWN, CORRECT 반환)
export function compareNumbers(target: number, guess: number): "UP" | "DOWN" | "CORRECT" {
  if (guess < target) return "UP";
  if (guess > target) return "DOWN";
  return "CORRECT";
} 