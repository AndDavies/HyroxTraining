// app/layout.tsx
import { ReactNode } from "react";

// Global SEO defaults
export const metadata = {
  title: "Hyrox Training Hub – Gyms, Events, & Plans",
  description: "Discover Hyrox gyms, events, training guides, and more. Kickstart your Hyrox journey today!",
  keywords: ["hyrox", "hyrox gyms", "hyrox events", "hyrox training", "fitness"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
