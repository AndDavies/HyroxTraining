// app/gyms/page.tsx
import { createClient } from "@supabase/supabase-js";
import { Metadata } from "next"; // if you want to define SEO metadata

export const metadata: Metadata = {
  title: "Explore Gyms – Hyrox Directory",
  description: "Browse the best Hyrox gyms, training centers, and more.",
};

export default async function GymsPage() {
  // Because this is a server component, you can safely use your
  // service role key or an anon key for read queries, *server-side*.
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!; // or anon if read is open
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Fetch data at build or request time
  const { data: gyms, error } = await supabase
    .from("gyms")
    .select("id,name,address_line,city,country,image_url")
    .order("name");

  if (!gyms || error) {
    return (
      <div className="py-10 px-5">
        <h1 className="text-2xl font-bold">No Gyms Found</h1>
        <p>{error?.message ?? "An unexpected error occurred."}</p>
      </div>
    );
  }

  return (
    <section className="py-10 px-5">
      <h1 className="text-3xl font-bold mb-6">All Hyrox Gyms</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {gyms.map((gym) => (
          <div key={gym.id} className="bg-white rounded-xl shadow p-4">
            {gym.image_url && (
              <img
                src={gym.image_url}
                alt={gym.name}
                className="w-full h-48 object-cover rounded"
              />
            )}
            <h2 className="text-lg font-semibold mt-3">{gym.name}</h2>
            <p className="text-sm text-gray-600">
              {gym.address_line}, {gym.city}, {gym.country}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
