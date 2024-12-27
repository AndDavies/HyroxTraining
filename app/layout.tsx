// app/layout.tsx
import { ReactNode } from "react";
import './globals.css';
import Header from "./components/Header";
import Footer from "./components/Footer";

// Global SEO defaults
export const metadata = {
  title: "Hyrox Training Hub – Gyms, Events, & 50+ Workouts",
  description: "Find the perfect Hyrox training plan for your fitness level. Compare 50+ curated workouts.",
  keywords: ["hyrox", "hyrox gyms", "hyrox events", "hyrox training", "fitness"]
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        {/* Our global header */}
        <Header />

        {/* Main content */}
        <div className="flex-1">{children}</div>

        {/* Our global footer */}
        <Footer />
      </body>
    </html>
  );
}
