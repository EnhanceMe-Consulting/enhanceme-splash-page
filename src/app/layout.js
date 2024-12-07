import "./globals.css";

export const metadata = {
  title: "EnhanceMe - Launching Soon",
  description: "EnhanceMe is a platform that helps you build better relationships. Subscribe to get notified when we launch.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Prata&family=Poppins:wght@300;400;600;700&family=Clash+Grotesk:wght@200;400;600;800&display=swap" rel="stylesheet" />
        <link rel="icon" href="/assets/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}


