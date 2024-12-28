"use client";

import React, { useState, useEffect, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";

interface Gym {
  id: string;
  name: string;
  address?: string;
  city?: string;
  country?: string;
  image_url?: string;
}

interface Props {
  allGyms: Gym[];
  cityOptions: string[];
  countryOptions: string[];
}

export default function TrainingDirectoryClient({
  allGyms,
  cityOptions,
  countryOptions,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [filteredGyms, setFilteredGyms] = useState<Gym[]>(allGyms);

  useEffect(() => {
    let result = allGyms;

    if (selectedCity) {
      result = result.filter((gym) => gym.city === selectedCity);
    }
    if (selectedCountry) {
      result = result.filter((gym) => gym.country === selectedCountry);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((gym) => gym.name.toLowerCase().includes(q));
    }

    setFilteredGyms(result);
  }, [searchQuery, selectedCity, selectedCountry, allGyms]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCity(null);
    setSelectedCountry(null);
  };

  return (
    <section className="py-14 px-5" id="gyms">
      <h2 className="text-3xl font-semibold mb-4 text-center">
        Explore Training Centres
      </h2>
      <p className="max-w-xl mx-auto mb-8 text-center">
        Browse our curated list of top Hyrox-friendly centres worldwide.
        Filter by city or country, or search by name.
      </p>

      <div className="flex items-center justify-between max-w-2xl mx-auto mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search among ${allGyms.length} items`}
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
        />

        <div className="flex space-x-4">
          <div className="relative inline-block text-left">
            <Menu>
              <Menu.Button className="border border-gray-300 rounded-full px-4 py-2 flex items-center space-x-2 hover:bg-gray-100 transition">
                <span>Filter</span>
                <span className="text-gray-500">▾</span>
              </Menu.Button>

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
                  <p className="mb-2 font-semibold text-sm">City</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cityOptions.map((city) => (
                      <Menu.Item key={city}>
                        {({ active }) => (
                          <button
                            onClick={() =>
                              setSelectedCity((prev) => (prev === city ? null : city))
                            }
                            className={`px-3 py-1 rounded-full text-sm ${
                              selectedCity === city
                                ? "bg-orange-500 text-white"
                                : active
                                ? "bg-gray-100 text-black"
                                : "bg-gray-50 text-black"
                            }`}
                          >
                            {city}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>

                  <p className="mb-2 font-semibold text-sm">Country</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {countryOptions.map((country) => (
                      <Menu.Item key={country}>
                        {({ active }) => (
                          <button
                            onClick={() =>
                              setSelectedCountry((prev) =>
                                prev === country ? null : country
                              )
                            }
                            className={`px-3 py-1 rounded-full text-sm ${
                              selectedCountry === country
                                ? "bg-orange-500 text-white"
                                : active
                                ? "bg-gray-100 text-black"
                                : "bg-gray-50 text-black"
                            }`}
                          >
                            {country}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          <button 
            onClick={handleResetFilters}
            className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {filteredGyms.length === 0 ? (
        <div className="text-center mt-8">No gyms match your criteria.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredGyms.map((gym) => (
            <div
              key={gym.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
            >
              <div className="w-full h-48 bg-gray-300">
                {gym.image_url && (

                  <Image
                    src={gym.image_url}
                    alt={gym.name}
                    width={800}
                    height={600}
                    className="h-6 w-auto object-contain"
                  />
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-1">{gym.name}</h3>
                {gym.address && (
                  <p className="text-gray-600 mb-2">{gym.address}</p>
                )}
                {(gym.city || gym.country) && (
                  <p className="text-sm text-gray-500">
                    {[gym.city, gym.country].filter(Boolean).join(", ")}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}