import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { animal, usedHints = [] } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    const model = 'gemini-2.0-flash-lite';
    if (!apiKey) return NextResponse.json({ error: 'Gemini API 키가 없습니다.' }, { status: 500 });

    const prompt = `다음 동물에 대해 한국어로 한 가지 힌트만 간결하게 제공해줘.\n- 힌트는 반드시 한 문장으로만 작성해.\n- 이전 힌트에 대한 평가, 대화, 설명, 인사말, 부연설명 없이 오직 힌트만 출력해.\n- 동물명(정답)은 절대 포함하지 마.\n동물: ${animal}\n이미 사용한 힌트: ${usedHints.join(', ')}`;

    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });
    if (!geminiRes.ok) {
      return NextResponse.json({ error: 'Gemini API 호출 실패' }, { status: 500 });
    }
    const data = await geminiRes.json();
    const hint = data?.candidates?.[0]?.content?.parts?.[0]?.text || '힌트 생성 실패';
    return NextResponse.json({ hint });
  } catch {
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
} 