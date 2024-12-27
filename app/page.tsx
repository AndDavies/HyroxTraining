// app/page.tsx
export const metadata = {
  title: "Hyrox Training Hub – Start Your Journey",
  description: "Explore gyms, events, and training guides to level up your Hyrox performance.",
};

export default function HomePage() {
  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Hyrox Training Hub</h1>
      <p>
        Everything you need for Hyrox success: find local gyms, upcoming events, 
        and training plans tailored to you.
      </p>
      <nav style={{ marginTop: "1.5rem" }}>
        <a href="/gyms" style={{ marginRight: "1rem" }}>Gyms</a>
        <a href="/events" style={{ marginRight: "1rem" }}>Events</a>
        <a href="/training">Training Plans</a>
      </nav>
    </main>
  );
}
