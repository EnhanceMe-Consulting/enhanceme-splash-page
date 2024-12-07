import "./globals.css";
import { Prata, Poppins } from "next/font/google";

const prata = Prata({ subsets: ["latin"], weight: "400" });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "600", "700"] });

export const metadata = {
  title: "EnhanceMe - Building Meaningful Relationships",
  description: "EnhanceMe is your digital hub for personal development, self-awareness, and building meaningful relationships. Subscribe now and stay in the loop.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="EnhanceMe is your digital hub for personal development, self-awareness, and building meaningful relationships. Subscribe now and stay in the loop." />
        <meta name="keywords" content="personal development, self-awareness, meaningful relationships, digital hub, EnhanceMe, relationship building, growth, self-improvement" />
        <meta name="author" content="EnhanceMe Team" />

        {/* Open Graph (OG) meta tags */}
        <meta property="og:title" content="EnhanceMe - Building Meaningful Relationships" />
        <meta property="og:description" content="A digital hub where personal development meets the art of meaningful connections. Join us to enhance your potential in building relationships." />
        <meta property="og:image" content="/assets/OG.png" />
        <meta property="og:url" content="https://enhanceme.io/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EnhanceMe - Building Meaningful Relationships" />
        <meta name="twitter:description" content="Join the EnhanceMe movement, a digital hub focused on self-awareness, personal development, and meaningful relationships." />
        <meta name="twitter:image" content="/assets/OG.png" />

        <link rel="icon" href="/assets/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Clash+Grotesk:wght@200;400;600;800&display=swap"
          rel="stylesheet"
        />
        <title>EnhanceMe - Building Meaningful Relationships</title>
      </head>
      <body className={`${prata.className} ${poppins.className}`}>
        {children}
      </body>
    </html>
  );
}
