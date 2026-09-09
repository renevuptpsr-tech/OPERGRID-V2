import {
  NextResponse,
} from "next/server";

import {
  generateAdminUserExport,
} from "@/services/admin-user-export-service";


export const runtime =
  "nodejs";


export async function GET() {
  try {

    const file =
      await generateAdminUserExport();


    const date =
      new Date()
        .toISOString()
        .slice(
          0,
          10
        )
        .replaceAll(
          "-",
          ""
        );


    return new NextResponse(
      new Uint8Array(
        file
      ),
      {
        status:
          200,

        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

          "Content-Disposition":
            `attachment; filename="OPERGRID_User_Data_${date}.xlsx"`,

          "Cache-Control":
            "no-store, max-age=0",
        },
      }
    );

  } catch (error) {

    const message =
      error instanceof Error
        ? error.message
        : "Gagal membuat User Data Excel.";


    return NextResponse.json(
      {
        error:
          message,
      },
      {
        status:
          500,
      }
    );
  }
}