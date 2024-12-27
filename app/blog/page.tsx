// app/blog/page.tsx
export const metadata = {
    title: "Hyrox Blog & Articles",
    description: "Learn about Hyrox training tips, event recaps, gear recommendations, and more.",
  };
  
  export default function BlogPage() {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>Hyrox Blog</h1>
        <ul>
          <li><a href="#">What is Hyrox and Why You Should Care</a></li>
          <li><a href="#">Top 5 Exercises for Hyrox Beginners</a></li>
          <li><a href="#">How to Prep for Your First Hyrox Event</a></li>
        </ul>
      </main>
    );
  }
  