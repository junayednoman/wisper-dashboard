import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Providers from "@/provider";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-urbanist",
  weight: ["400", "500", "600", "700"], // Common weights for versatility
});

export const metadata: Metadata = {
  title: {
    default: "Wisper Dashboard",
    template: "%s | Wisper",
  },
  description: "Wisper Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={urbanist.variable}>
      <body className="font-urbanist antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
