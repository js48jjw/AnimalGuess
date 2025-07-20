import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { animal, usedHints = [] } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    const model = 'gemini-2.0-flash-lite';
    if (!apiKey) return NextResponse.json({ error: 'Gemini API 키가 없습니다.' }, { status: 500 });

    const prompt = `다음 동물에 대해 한국어로 한 가지 힌트만 간결하게 제공해줘.

**중요한 규칙:**
1. 힌트는 반드시 한 문장으로만 작성해
2. 동물명(정답)은 절대 언급하지 마 - 이것은 가장 중요한 규칙
3. 동물의 특징, 습성, 외모, 서식지 등을 간접적으로 설명해
4. 이전 힌트에 대한 평가, 대화, 설명, 인사말, 부연설명 없이 오직 힌트만 출력해
5. "이 동물은", "이 생물은" "나는" 같은 표현도 사용하지 마
6. 정답을 암시하는 직접적인 단어나 표현을 피해

동물: ${animal}
이미 사용한 힌트: ${usedHints.join(', ')}`;

    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });
    if (!geminiRes.ok) {
      return NextResponse.json({ error: 'Gemini API 호출 실패' }, { status: 500 });
    }
    const data = await geminiRes.json();
    let hint = data?.candidates?.[0]?.content?.parts?.[0]?.text || '힌트 생성 실패';
    
    // 정답이 포함되었는지 검사
    const normalizedHint = hint.toLowerCase().replace(/\s+/g, '');
    const normalizedAnimal = animal.toLowerCase().replace(/\s+/g, '');
    
    if (normalizedHint.includes(normalizedAnimal)) {
      // 정답이 포함된 경우 안전한 힌트로 대체
      const safeHints = [
        "이 동물은 특별한 특징을 가지고 있어요",
        "자연에서 볼 수 있는 동물이에요",
        "사람들이 잘 알고 있는 동물이에요",
        "동물원에서도 볼 수 있어요",
        "특별한 능력을 가진 동물이에요"
      ];
      hint = safeHints[Math.floor(Math.random() * safeHints.length)];
    }
    
    return NextResponse.json({ hint });
  } catch {
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
} 