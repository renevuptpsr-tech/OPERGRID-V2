import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  getGangguanExportRows,
} from "@/features/gangguan-20kv/services/gangguan-export-service";


function csvCell(
  value:
    string,
) {
  return `"${value.replace(
    /"/g,
    `""`,
  )}"`;
}


export async function GET(
  request:
    NextRequest,
) {
  const params =
    request.nextUrl
      .searchParams;

  const statusValue =
    params.get(
      "status",
    );

  const status =
    statusValue ===
      "ONGOING" ||
    statusValue ===
      "RECOVERED"
      ? statusValue
      : "ALL";

  const rows =
    await getGangguanExportRows({
      search:
        params.get(
          "search",
        ) ?? "",

      status,

      ultg:
        params.get(
          "ultg",
        ) ?? "",

      gi:
        params.get(
          "gi",
        ) ?? "",
    });

  const header = [
    "Tanggal",
    "Jam",
    "ULTG",
    "Gardu Induk",
    "Penyulang",
    "Status PMT",
    "Phasa",
    "Penyebab",
    "Indikasi / Keterangan",
    "Durasi Padam (menit)",
    "Status Record",
    "Operator",
  ];

  const body =
    rows.map(
      (row) =>
        [
          row.date,
          row.time,
          row.ultg,
          row.gi,
          row.penyulang,
          row.pmtStatus,
          row.phase,
          row.cause,
          row.description,
          row.durationMinutes,
          row.status,
          row.operator,
        ]
          .map(
            csvCell,
          )
          .join(","),
    );

  const csv =
    "\uFEFF" +
    [
      header
        .map(
          csvCell,
        )
        .join(","),

      ...body,
    ].join(
      "\r\n",
    );

  const date =
    new Date()
      .toISOString()
      .slice(
        0,
        10,
      );

  return new NextResponse(
    csv,
    {
      status:
        200,

      headers: {
        "Content-Type":
          "text/csv; charset=utf-8",

        "Content-Disposition":
          `attachment; filename="opergrid-gangguan-20kv-${date}.csv"`,

        "Cache-Control":
          "no-store",
      },
    },
  );
}