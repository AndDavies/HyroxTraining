"use client";

import React, { useState, useEffect, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

interface Plan {
  id: string;
  slug: string;
  title: string;
  main_image_url?: string;
  description?: string;
  price_text?: string;      // e.g. "$25/month"
  fitness_level?: string;   // e.g. "Beginner", "Intermediate"
  days_per_week?: string;   // e.g. "3", "Individual" or "2-3" etc.
  // ... any other fields
}

// For cost filtering, define ranges we want to show
const costRanges = [
  { label: "Under $20", min: 0, max: 20 },
  { label: "$20 - $50", min: 20, max: 50 },
  { label: "$50 - $75", min: 50, max: 75 },
  { label: "$100+", min: 100, max: Infinity },
];

// Just an example set of fitness levels
const fitnessLevels = [
  "Beginner",
  "Intermediate",
  "Rx",
  "Scaled",
  "Very Active",
];

// Example days per week options
const daysPerWeekOptions = ["2-3", "3-5", "5-7", "Individual"];

// Attempt to parse numeric cost from price_text, default to 0
function parseCostNumber(priceText?: string): number {
  if (!priceText) return 0;
  // Find first integer in string, e.g. "$20" => 20, "£250/month" => 250
  const match = priceText.match(/\d+/);
  if (!match) return 0;
  return parseInt(match[0], 10);
}

interface TrainingPlansClientProps {
  allPlans: Plan[];
}

export default function TrainingPlansClient({ allPlans }: TrainingPlansClientProps) {
  // The user’s typed search
  const [searchQuery, setSearchQuery] = useState("");

  // The user’s selected filters
  const [selectedFitness, setSelectedFitness] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<string | null>(null);
  // We'll store the range label user picked, e.g. "Under $20"
  const [selectedCostRange, setSelectedCostRange] = useState<string | null>(null);

  const [filteredPlans, setFilteredPlans] = useState<Plan[]>(allPlans);

  useEffect(() => {
    let result = allPlans;

    // 1) Filter by fitness level
    if (selectedFitness) {
      result = result.filter((p) => p.fitness_level === selectedFitness);
    }

    // 2) Filter by days per week
    if (selectedDays) {
      result = result.filter((p) => p.days_per_week === selectedDays);
    }

    // 3) Filter by cost
    if (selectedCostRange) {
      // find the cost range object
      const range = costRanges.find((r) => r.label === selectedCostRange);
      if (range) {
        const { min, max } = range;
        // parse the plan's numeric cost
        result = result.filter((p) => {
          const costNum = parseCostNumber(p.price_text);
          return costNum >= min && costNum < max;
        });
      }
    }

    // 4) Search by plan title
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q));
    }

    setFilteredPlans(result);
  }, [searchQuery, selectedFitness, selectedDays, selectedCostRange, allPlans]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedFitness(null);
    setSelectedDays(null);
    setSelectedCostRange(null);
  };

  return (
    <section className="py-14 px-5 text-center bg-gray-100" id="training-programs">
      <h2 className="text-3xl font-semibold mb-3">Browse Training Plans</h2>
      <p className="max-w-xl mx-auto mb-8">
        Check out top-rated Hyrox training plans from beginner to advanced levels.
      </p>

      {/* Top Row: Search + Filter Menu */}
      <div className="flex items-center justify-between max-w-2xl mx-auto mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search among ${allPlans.length} items`}
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
        />

        {/* Right side: Filter dropdown, reset button */}
        <div className="flex space-x-4 ml-4">
          {/* HEADLESS UI Menu for Filter */}
          <FilterMenu
            selectedFitness={selectedFitness}
            setSelectedFitness={setSelectedFitness}
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
            selectedCostRange={selectedCostRange}
            setSelectedCostRange={setSelectedCostRange}
          />

          {/* Reset Button */}
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      {filteredPlans.length === 0 ? (
        <div className="text-center mt-8">No training plans match your criteria.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
              style={{ width: "18rem" }} // approximate "w-72"
            >
              {/* Plan Image */}
              <div className="w-full h-48 bg-gray-300">
                {plan.main_image_url ? (
                  <img
                    src={plan.main_image_url}
                    alt={plan.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/600x400?text=Plan"
                    alt="Placeholder"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Plan Info */}
              <div className="p-4 text-left">
                <h3 className="text-lg font-bold mb-2">{plan.title}</h3>
                {plan.price_text && (
                  <p className="text-sm text-gray-600 mb-2">{plan.price_text}</p>
                )}
                {plan.description && (
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                    {plan.description.slice(0, 80)}...
                  </p>
                )}

                <a
                  href={`/plans/${plan.slug}`}
                  className="text-orange-500 hover:underline"
                >
                  View Plan
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/** 
 * A small sub-component that uses Headless UI <Menu> 
 * to display fitness, days per week, cost range 
 */
function FilterMenu({
  selectedFitness,
  setSelectedFitness,
  selectedDays,
  setSelectedDays,
  selectedCostRange,
  setSelectedCostRange,
}: {
  selectedFitness: string | null;
  setSelectedFitness: React.Dispatch<React.SetStateAction<string | null>>;
  selectedDays: string | null;
  setSelectedDays: React.Dispatch<React.SetStateAction<string | null>>;
  selectedCostRange: string | null;
  setSelectedCostRange: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="border border-gray-300 rounded-full px-4 py-2 flex items-center space-x-2 hover:bg-gray-100 transition">
          <span>Filter</span>
          <span className="text-gray-500">▾</span>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items 
          className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-md p-3 origin-top-right focus:outline-none"
        >
          {/* Fitness Level */}
          <p className="mb-2 font-semibold text-sm">Fitness Level</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {fitnessLevels.map((level) => (
              <Menu.Item key={level}>
                {({ active }) => (
                  <button
                    onClick={() =>
                      setSelectedFitness((prev) => (prev === level ? null : level))
                    }
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedFitness === level
                        ? "bg-orange-500 text-white"
                        : active
                        ? "bg-gray-100 text-black"
                        : "bg-gray-50 text-black"
                    }`}
                  >
                    {level}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>

          {/* Days per Week */}
          <p className="mb-2 font-semibold text-sm">Days/Week</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {daysPerWeekOptions.map((days) => (
              <Menu.Item key={days}>
                {({ active }) => (
                  <button
                    onClick={() =>
                      setSelectedDays((prev) => (prev === days ? null : days))
                    }
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedDays === days
                        ? "bg-orange-500 text-white"
                        : active
                        ? "bg-gray-100 text-black"
                        : "bg-gray-50 text-black"
                    }`}
                  >
                    {days}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>

          {/* Cost Range */}
          <p className="mb-2 font-semibold text-sm">Cost Range</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {costRanges.map((range) => (
              <Menu.Item key={range.label}>
                {({ active }) => (
                  <button
                    onClick={() =>
                      setSelectedCostRange((prev) =>
                        prev === range.label ? null : range.label
                      )
                    }
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedCostRange === range.label
                        ? "bg-orange-500 text-white"
                        : active
                        ? "bg-gray-100 text-black"
                        : "bg-gray-50 text-black"
                    }`}
                  >
                    {range.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
