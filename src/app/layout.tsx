import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SNAPCODE 2026 | Frontend Design Challenge Using Vibe Coding",
  description: "Join SNAPCODE 2026, an AI-powered frontend design challenge organized by the AI & Machine Learning Club. Build, design, and deploy a website in 100 minutes using modern AI development tools.",
  openGraph: {
    title: "SNAPCODE 2026 | Frontend Design Challenge Using Vibe Coding",
    description: "Join SNAPCODE 2026, an AI-powered frontend design challenge organized by the AI & Machine Learning Club. Build, design, and deploy a website in 100 minutes using modern AI development tools.",
    url: "https://snapcode.aimlcluboct.in",
    siteName: "SNAPCODE 2026",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "SNAPCODE 2026 Event Details",
      },
    ],
    locale: "en-IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SNAPCODE 2026 | Frontend Design Challenge Using Vibe Coding",
    description: "Join SNAPCODE 2026, an AI-powered frontend design challenge organized by the AI & Machine Learning Club. Build, design, and deploy a website in 100 minutes using modern AI development tools.",
    images: ["/assets/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
        {children}
      </body>
    </html>
  );
}
