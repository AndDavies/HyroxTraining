// app/plans/[slug]/page.tsx

import { PageProps } from "@/.next/types/app/layout";
import { createClient } from "@supabase/supabase-js";
import { Metadata } from "next";
import Image from "next/image";

/** A row from your `training_plans` table. Adjust to match DB columns. */
interface Plan {
  id: string;
  title: string;
  category?: string;
  fitness_level?: string;
  daily_training_time?: string;
  sessions_per_day?: string;
  days_per_week?: string;
  hours_per_week?: string;
  price_text?: string;
  external_link?: string;
  main_image_url?: string;
  coaches?: string[];
  description?: string;
}

/**
 * 1) We define a custom type that extends or omits from PageProps
 *    so we can override `params` with our own { slug: string } shape.
 * 
 *    The key part is using Omit<PageProps, "params"> to remove the default
 *    param field, which Next's type might interpret as a Promise.
 */
type PlanPageProps = Omit<PageProps, "params"> & {
  // Our custom params
  params: {
    slug: string;
  };
};

function QuickHitterGrid({ plan }: { plan: Plan }) {
  const quickHitters = [
    { label: "Category", value: plan.category },
    { label: "Fitness Level", value: plan.fitness_level },
    { label: "Daily Training Time", value: plan.daily_training_time },
    { label: "Sessions Per Day", value: plan.sessions_per_day },
    { label: "Days Per Week", value: plan.days_per_week },
    { label: "Hours Per Week", value: plan.hours_per_week },
    { label: "Cost", value: plan.price_text },
  ];

  return (
    <section className="w-full py-10 px-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <h2 className="text-3xl font-bold text-center mb-8">
        Details for {plan.title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {quickHitters.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-gray-700 bg-gray-800/80 p-5 shadow-md hover:shadow-lg transition"
          >
            <p className="uppercase text-xs tracking-wide text-gray-400 mb-1">
              {item.label}
            </p>
            <p className="text-lg font-semibold">
              {item.value || "N/A"}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <a
          href={plan.external_link || "#"}
          className="inline-block px-6 py-3 bg-yellow-400 text-gray-900 font-medium rounded-full shadow hover:bg-yellow-200 hover:shadow-lg transition"
        >
          Check out the Training Plan
        </a>
      </div>
    </section>
  );
}

/**
 * 2) For generating metadata in Next.js,
 *    inline the param type as well if you want.
 */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: plan } = await supabase
    .from("training_plans")
    .select("title, description")
    .eq("slug", params.slug)
    .single();

  if (!plan) {
    return {
      title: "Plan not found",
      description: "This training plan does not exist or was removed.",
    };
  }

  return {
    title: plan.title,
    description: plan.description?.slice(0, 150) || "A Hyrox Training Plan",
  };
}

/**
 * 3) The SSR page function for /plans/[slug].
 *    Notice the signature uses our 'PlanPageProps'.
 */
export default async function PlanDetailPage({ params }: PlanPageProps) {
  const { slug } = params;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: plan, error } = await supabase
    .from("training_plans")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!plan || error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <h1 className="text-2xl">Plan not found</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto py-10 px-5">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">
            {plan.title} by {plan.coaches?.[0] || "Unknown Coach"}
          </h1>
          <p className="text-gray-700 mb-6">
            {plan.description || "No description provided for this training plan."}
          </p>
          <a
            href={plan.external_link || "#"}
            className="inline-block border border-gray-800 px-4 py-2 rounded hover:bg-gray-800 hover:text-white transition"
          >
            See Training Plan
          </a>
        </div>

        <div className="flex-1 md:max-w-sm">
          <Image
            src={
              plan.main_image_url ||
              "https://via.placeholder.com/600x400?text=Training+Plan+Placeholder"
            }
            width={800}
            height={600}
            alt={plan.title}
            className="w-full h-auto object-cover rounded shadow"
          />
        </div>
      </section>

      <QuickHitterGrid plan={plan} />
    </main>
  );
}
