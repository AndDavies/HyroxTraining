// app/api/gyms/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";

/**
 * GET /api/gyms
 * Returns a list of gyms from the database.
 * Adjust the select() fields to match your table schema.
 */
export async function GET() {
  // In production, you might want to handle errors or limit results, etc.
  const { data, error } = await supabase
    .from("gyms")
    .select("id, name, city, state, country, image_url");

  if (error) {
    // Return an error response
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ gyms: data }, { status: 200 });
}
