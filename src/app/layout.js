import "./globals.css";
import { Prata, Poppins } from "next/font/google";

const prata = Prata({ subsets: ["latin"], weight: "400" });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "600", "700"] });

export const metadata = {
  title: "EnhanceMe | Personal Growth & Meaningful Relationships",
  description:
    "EnhanceMe is your digital hub for personal development, self-awareness, and building meaningful relationships. Subscribe to stay updated.",
  openGraph: {
    title: "EnhanceMe | Personal Growth & Meaningful Relationships",
    description:
      "Discover EnhanceMe, your digital hub for self-awareness and personal growth. Empower your ability to build meaningful connections.",
    url: "https://www.enhanceme.io",
    images: [
      {
        url: "/assets/OG.png",
        width: 1200,
        height: 630,
        alt: "EnhanceMe - Build Meaningful Relationships",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:image:width" content={metadata.openGraph.images[0].width} />
        <meta property="og:image:height" content={metadata.openGraph.images[0].height} />
        <meta property="og:image:alt" content={metadata.openGraph.images[0].alt} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/assets/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Clash+Grotesk:wght@200;400;600;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${prata.className} ${poppins.className}`}>
        {children}
      </body>
    </html>
  );
}
