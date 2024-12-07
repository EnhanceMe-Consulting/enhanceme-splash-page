import "./globals.css";
import { Prata, Poppins } from "next/font/google";

const prata = Prata({ subsets: ["latin"], weight: "400" });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "600", "700"] });

export const metadata = {
  title: "EnhanceMe - Launching Soon",
  description: "EnhanceMe is a platform that helps you build better relationships. Subscribe to get notified when we launch.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Add Clash Grotesk via Google Fonts */}
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




