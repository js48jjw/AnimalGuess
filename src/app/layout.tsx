import "./globals.css";
import React from "react";

<<<<<<< HEAD
const AdTopBanner = () => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 1000,
    pointerEvents: 'none',
    padding: 'env(safe-area-inset-top, 8px) 0 0 0',
  }}>
    <div style={{ pointerEvents: 'auto', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <ins className="kakao_ad_area"
        style={{ display: 'block', maxWidth: 300, width: '90vw', minWidth: 200, margin: '0 auto' }}
        data-ad-unit="DAN-22FZ32pop4ueOWVA"
        data-ad-width="300"
        data-ad-height="250"
      ></ins>
    </div>
    <script type="text/javascript" src="//t1.daumcdn.net/kas/static/ba.min.js" async></script>
  </div>
);

const AdBottomBanner = () => (
  <div style={{
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 1000,
    pointerEvents: 'none',
    padding: '0 0 env(safe-area-inset-bottom, 8px) 0',
  }}>
    <div style={{ pointerEvents: 'auto', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <ins className="kakao_ad_area"
        style={{ display: 'block', maxWidth: 300, width: '90vw', minWidth: 200, margin: '0 auto' }}
        data-ad-unit="DAN-enqOhbO6d7Z1BmZl"
        data-ad-width="300"
        data-ad-height="250"
      ></ins>
    </div>
    <script type="text/javascript" src="//t1.daumcdn.net/kas/static/ba.min.js" async></script>
  </div>
);
=======
// AdBottomBanner 컴포넌트 전체 삭제
>>>>>>> e7db7ea (ggg)

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        <title>숫자를 맞춰줘!</title>
      </head>
      <body>
<<<<<<< HEAD
        <AdTopBanner />
        {children}
        <AdBottomBanner />
=======
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
          right: 0,
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
>>>>>>> e7db7ea (ggg)
      </body>
    </html>
  );
}
