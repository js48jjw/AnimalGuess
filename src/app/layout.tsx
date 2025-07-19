import "./globals.css";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        <title>숫자를 맞춰줘!</title>
      </head>
      <body>
        {/* 좌측 고정 광고 */}
        <div style={{
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
          width: 160,
          display: 'flex',
          alignItems: 'flex-start',
          zIndex: 1000,
          pointerEvents: 'auto',
        }}>
          <ins className="kakao_ad_area"
            style={{ display: 'block', width: 160, height: 600 }}
            data-ad-unit="DAN-22FZ32pop4ueOWVA"
            data-ad-width="160"
            data-ad-height="600"
          ></ins>
          <script type="text/javascript" src="//t1.daumcdn.net/kas/static/ba.min.js" async></script>
        </div>
        {/* 우측 고정 광고 */}
        <div style={{
          position: 'fixed',
          right: 16,
          top: 0,
          height: '100vh',
          width: 160,
          display: 'flex',
          alignItems: 'flex-start',
          zIndex: 1000,
          pointerEvents: 'auto',
        }}>
          <ins className="kakao_ad_area"
            style={{ display: 'block', width: 160, height: 600 }}
            data-ad-unit="DAN-enqOhbO6d7Z1BmZl"
            data-ad-width="160"
            data-ad-height="600"
          ></ins>
          <script type="text/javascript" src="//t1.daumcdn.net/kas/static/ba.min.js" async></script>
        </div>
        {/* 메인 컨텐츠 */}
        {children}
      </body>
    </html>
  );
}
