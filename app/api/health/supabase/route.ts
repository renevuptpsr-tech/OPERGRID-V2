import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("v_dropdown_bay")
      .select("*")
      .limit(1);

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          service: "supabase",
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      ok: true,
      service: "supabase",
      message: "Supabase connected.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        service: "supabase",
        message:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}