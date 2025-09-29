"use client";
import "./globals.css";
import React, { useEffect, useState } from "react";
import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 초기 로드 시 한 번 실행

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        <title>동물을 맞춰라!</title>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        {!isMobile && (
          <>
            {/* 좌측 고정 광고 */}
            <div style={{
              position: 'fixed',
              left: 10,
              top: 30,
              height: '100vh',
              width: 160,
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: 'column',
              zIndex: 1000,
              pointerEvents: 'auto',
            }}>
              <ins className="kakao_ad_area"
                style={{ display: 'block', width: 160, height: 600 }}
                data-ad-unit="DAN-dw0XaXYLeei0bqYK"
                data-ad-width="160"
                data-ad-height="600"
              ></ins>
              <Script src="//t1.daumcdn.net/kas/static/ba.min.js" strategy="afterInteractive" />
              {/* 좌측 프로모션 배너 */}
              <a
                href="https://ui7gwmf8ww.sens.kr"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', width: 160, marginTop: 12 }}
              >
                <img
                  src="/magabogam.png"
                  alt="좌측 프로모션 배너"
                  style={{ width: 160, height: 'auto' }}
                />
              </a>
            </div>
            {/* 우측 고정 광고 */}
            <div style={{
              position: 'fixed',
              right: 16,
              top: 30,
              height: '100vh',
              width: 160,
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: 'column',
              zIndex: 1000,
              pointerEvents: 'auto',
            }}>
              <ins className="kakao_ad_area"
                style={{ display: 'block', width: 160, height: 600 }}
                data-ad-unit="DAN-kTq9g9C4bXqSwbOb"
                data-ad-width="160"
                data-ad-height="600"
              ></ins>
              <Script src="//t1.daumcdn.net/kas/static/ba.min.js" strategy="afterInteractive" />
              {/* 우측 프로모션 배너 */}
              <a
                href="https://ui7gwmf8ww.sens.kr"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', width: 160, marginTop: 12 }}
              >
                <img
                  src="/magabogam.png"
                  alt="우측 프로모션 배너"
                  style={{ width: 160, height: 'auto' }}
                />
              </a>
            </div>
          </>
        )}
        {/* 메인 컨텐츠 */}
        {children}
      </body>
    </html>
  );
}