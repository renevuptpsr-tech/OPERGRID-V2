import {
  NextResponse,
} from "next/server";

import {
  createClient,
} from "@/lib/supabase/server";


function safeNext(
  value:
    | string
    | null
) {
  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//")
  ) {
    return "/dashboard";
  }

  return value;
}


export async function GET(
  request: Request
) {
  const url =
    new URL(
      request.url
    );

  const code =
    url.searchParams.get(
      "code"
    );

  const next =
    safeNext(
      url.searchParams.get(
        "next"
      )
    );


  if (!code) {

    const errorUrl =
      new URL(
        "/login",
        url.origin
      );

    errorUrl.searchParams.set(
      "error",
      "Authentication code tidak tersedia."
    );

    return NextResponse.redirect(
      errorUrl
    );
  }


  const supabase =
    await createClient();


  const {
    error,
  } =
    await supabase.auth
      .exchangeCodeForSession(
        code
      );


  if (error) {

    const errorUrl =
      new URL(
        "/login",
        url.origin
      );

    errorUrl.searchParams.set(
      "error",
      "Link authentication tidak valid atau sudah kedaluwarsa."
    );

    return NextResponse.redirect(
      errorUrl
    );
  }


  return NextResponse.redirect(
    new URL(
      next,
      url.origin
    )
  );
}