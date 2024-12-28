// app/page.tsx
import { Metadata } from "next"; 
import { createClient } from "@supabase/supabase-js";
import TrainingDirectoryClient from "./components/GymsTrainingClient";
import TrainingPlansClient from "./components/training-plans-client";

export const metadata: Metadata = {
  title: "Find Your Perfect Hyrox Training Plan | Hyrox Directory",
  description:
    "Explore top-rated Hyrox training plans, discover local gyms, and get the best from the world of Hyrox fitness.",
};

export default async function HomePage() {
  // Create a server-side Supabase client using environment vars.
  // Use your service role key or your anon key (if RLS policies allow).
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; 
  // Or process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY if read is publicly allowed
  const supabase = createClient(supabaseUrl, supabaseKey);

   // fetch top training plans or all
   const { data: plans, error: plansError } = await supabase
  .from("training_plans")
  .select("id,slug,title,main_image_url,description,price_text")
  .order("title");

    if (!plans || plansError) {
      return <div>Failed to load plans</div>;
    }

  // 1) Fetch all gyms from the DB
  //    We assume columns: id, name, address, image_url, city, country
  const { data: gyms, error: gymsError } = await supabase
    .from("gyms")
    .select("id, name, address, image_url, city, country")
    .order("name");

  if (gymsError) {
    console.error("Gyms fetch error:", gymsError);
  }

  // 2) Build unique city and country lists in memory
  //    This avoids any .distinct() usage which isn't in the current JS client.
  const uniqueCities = new Set<string>();
  const uniqueCountries = new Set<string>();

  gyms?.forEach((gym) => {
    if (gym.city) {
      uniqueCities.add(gym.city);
    }
    if (gym.country) {
      uniqueCountries.add(gym.country);
    }
  });

  // Sort them for consistent display
  const cityOptions = Array.from(uniqueCities).sort();
  const countryOptions = Array.from(uniqueCountries).sort();

  // 3) Pass the data to a client component for filtering
  return (
    <main className="min-h-screen font-sans text-sm">
      {/* 1) Hero Section */}
      <section className="relative w-full bg-black text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 tracking-tight">
            Find Your Perfect Hyrox Training Plan in Minutes
          </h1>
          <p className="max-w-xl mx-auto mb-6 text-lg md:text-xl font-medium">
            We’ve reviewed 40+ Hyrox workout programs so you don’t have to. Save
            hours of research and choose the right plan for you.
          </p>

          {/* Mailing List Form */}
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3">
            <input
              type="email"
              placeholder="you@example.com"
              className="px-4 py-2 w-64 sm:w-auto rounded-full text-black focus:outline-none"
            />
            <button className="px-6 py-2 rounded-full bg-orange-600 hover:bg-orange-500 transition text-white font-semibold">
              Subscribe →
            </button>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a
              href="#gyms"
              className="px-5 py-2 rounded-full bg-yellow-300 text-black font-semibold hover:bg-yellow-200 transition"
            >
              Gyms
            </a>
            <a
              href="#training-programs"
              className="px-5 py-2 rounded-full bg-yellow-300 text-black font-semibold hover:bg-yellow-200 transition"
            >
              Training Programs
            </a>
            <a
              href="#events"
              className="px-5 py-2 rounded-full bg-yellow-300 text-black font-semibold hover:bg-yellow-200 transition"
            >
              Events
            </a>
            <a
              href="#blog"
              className="px-5 py-2 rounded-full bg-yellow-300 text-black font-semibold hover:bg-yellow-200 transition"
            >
              Blog
            </a>
          </div>
        </div>
      </section>

      {/* 2) Browse Training Plans */}
      <TrainingPlansClient
        allPlans={plans ?? []}
      />

      {/* 3) Explore Training Centres (SSR data -> client comp) */}
      <TrainingDirectoryClient
        allGyms={gyms ?? []}
        cityOptions={cityOptions}
        countryOptions={countryOptions}
      /> 
    </main>
  );
}
