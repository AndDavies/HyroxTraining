// app/training/page.tsx
export const metadata = {
    title: "Hyrox Training Plans & Guides",
    description: "Get started with beginner to advanced Hyrox training plans. Improve endurance, strength, and race times.",
  };
  
  export default function TrainingPage() {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>Hyrox Training Plans</h1>
        <p>
          Whether you&apos;re new to Hyrox or aiming to improve your race time, 
          these quick plans will get you moving.
        </p>
  
        <section>
          <h2>Beginner Plan (4 weeks)</h2>
          <p>Short overview, bullet points, etc.</p>
  
          <h2>Intermediate Plan (8 weeks)</h2>
          <p>Focus on endurance, technique, etc.</p>
  
          <h2>Advanced Plan (12 weeks)</h2>
          <p>High-intensity, specific pacing drills, etc.</p>
        </section>
      </main>
    );
  }
  