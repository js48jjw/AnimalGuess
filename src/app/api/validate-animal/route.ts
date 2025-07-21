import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { animal } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    const model = 'gemini-1.5-flash-latest'; 

    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API 키가 없습니다.' }, { status: 500 });
    }

    if (!animal || typeof animal !== 'string' || animal.trim().length === 0) {
      return NextResponse.json({ error: '유효하지 않은 입력입니다.' }, { status: 400 });
    }

    const prompt = `다음 단어가 동물인지 아닌지 '예' 또는 '아니오'로만 대답해줘. 다른 설명은 절대 추가하지 마.

단어: "${animal}"`;

    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          maxOutputTokens: 2, // '예' 또는 '아니오'만 받기 위해 토큰 제한
        },
      }),
    });

    if (!geminiRes.ok) {
      console.error('Gemini API Error:', await geminiRes.text());
      return NextResponse.json({ error: 'Gemini API 호출 실패' }, { status: geminiRes.status });
    }

    const data = await geminiRes.json();
    const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text.trim() || '아니오';
    
    const isAnimal = responseText.includes('예');

    return NextResponse.json({ isAnimal });
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
} 