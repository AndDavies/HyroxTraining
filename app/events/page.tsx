// app/events/page.tsx
export const metadata = {
    title: "Upcoming Hyrox Events",
    description: "Stay updated with the latest Hyrox competition schedule and event locations worldwide.",
  };
  
  export default function EventsPage() {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>Hyrox Events</h1>
        <p>Check out the schedule for upcoming competitions:</p>
  
        <ul>
          <li>Hyrox City Marathon, 2024 – Jan 10, CityX</li>
          <li>Hyrox Nationals, 2024 – Mar 2, CityY</li>
          <li>Hyrox World Championship – May 15, CityZ</li>
        </ul>
      </main>
    );
  }
  