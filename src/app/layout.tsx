import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";
// import AnimatedBackground from "./components/AnimatedBackground";
// import ClientOnly from "./components/ClientOnly";

// ✅ Import Google font
import { Plus_Jakarta_Sans } from "next/font/google";

// ✅ Configure font
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // jo weights tumhe chahiye
  variable: "--font-jakarta", // CSS variable banayenge
});

export const metadata: Metadata = {
  title: "techgaur",
  description:
    "Acciobyte offers expert web and mobile app development, creative graphic design, and professional penetration testing services. Build secure, stunning, and high-performing digital solutions with our skilled team.",
  keywords:
    "web development services,mobile app development,graphic design agency,penetration testing company,Next.js developers,TypeScript development,UI/UX design,cybersecurity services,Acciobyte,tailored software solutions",
  authors: [{ name: "Acciobyte" }],
  robots: "index, follow",
  openGraph: {
    title: "Acciobyte – Web, App, Design & Pen Testing Experts",
    description:
      "Build stunning websites and apps, get custom graphics, and ensure cybersecurity with Acciobyte's full-service digital solutions.",
    url: "https://www.acciobyte.com",
    siteName: "Acciobyte",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Acciobyte – Web, App, Design & Pen Testing Experts",
    description:
      "Build stunning websites and apps, get custom graphics, and ensure cybersecurity with Acciobyte's full-service digital solutions.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ✅ Add font variable on <html>
    <html lang="en" className={jakarta.variable}>
      <body className="relative font-sans antialiased text-white bg-black">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
