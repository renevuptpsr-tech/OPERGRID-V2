import { createClient } from "@/lib/supabase/server";

export async function getFunctlocSample() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("mst_functloc")
    .select(
      "functloc_id, location_name, short_name, nlevel, unit_code, voltage_code"
    )
    .order("location_name", { ascending: true })
    .limit(5);

  return {
    data: data ?? [],
    error: error?.message ?? null,
  };
}