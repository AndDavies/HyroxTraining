// app/gyms/page.tsx
export const metadata = {
    title: "Best Hyrox Gyms & Coaches",
    description: "Locate top Hyrox-friendly gyms, trainers, and coaches near you to start training.",
  };
  
  export default function GymsPage() {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>Hyrox Gyms & Coaches</h1>
        <p>Find the best places to train for Hyrox.</p>
        
        <ul>
          <li>Gym A – City, Contact Info</li>
          <li>Gym B – City, Contact Info</li>
          <li>Coach C – Specialty, Contact Info</li>
        </ul>
      </main>
    );
  }
  