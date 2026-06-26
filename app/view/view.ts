import { createClient } from "@/utils/supabase/client";

export async function getEventById(id: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}