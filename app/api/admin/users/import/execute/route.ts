import {
  NextResponse,
} from "next/server";

import {
  executeUserImport,
} from "@/services/admin-user-import-execute-service";


export const runtime =
  "nodejs";


const MAX_FILE_SIZE =
  10 *
  1024 *
  1024;


export async function POST(
  request:
    Request
) {
  try {
    const formData =
      await request.formData();

    const file =
      formData.get(
        "file"
      );

    if (
      !(file instanceof File)
    ) {
      return NextResponse.json(
        {
          error:
            "File Excel belum dipilih.",
        },
        {
          status:
            400,
        }
      );
    }

    if (
      file.size >
      MAX_FILE_SIZE
    ) {
      return NextResponse.json(
        {
          error:
            "Ukuran file maksimal 10 MB.",
        },
        {
          status:
            400,
        }
      );
    }

    if (
      !file.name
        .toLowerCase()
        .endsWith(".xlsx")
    ) {
      return NextResponse.json(
        {
          error:
            "Gunakan file template OPERGRID berformat .xlsx.",
        },
        {
          status:
            400,
        }
      );
    }

    const arrayBuffer =
      await file.arrayBuffer();

    const result =
      await executeUserImport(
        file.name,
        new Uint8Array(
          arrayBuffer
        )
      );

    return NextResponse.json(
      result,
      {
        status:
          200,
      }
    );

  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Bulk Import User gagal dijalankan.";

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
