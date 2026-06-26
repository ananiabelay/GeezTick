import { createClient } from "@/utils/supabase/client";

export async function getEvents() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("events")
    .select("*");

  if (error) {
    throw error;
  }

  return data ?? [];
}