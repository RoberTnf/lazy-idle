import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lazy Idle",
  description: "Idle game without manual work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <script data-goatcounter="https://robertodiaztnf.goatcounter.com/count"
        data-goatcounter-settings='{"allow_local": true}'
        async src="//gc.zgo.at/count.js"></script>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
