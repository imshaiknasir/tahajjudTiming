import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Tahajjud Prayer Time Calculator",
  description: "Calculate the best time for Tahajjud prayer based on your location in India",
  keywords: ["tahajjud", "prayer", "islam", "night prayer", "qiyam", "salah", "india"],
  authors: [{ name: "Tahajjud Time Calculator" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <body className={`${poppins.className} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
