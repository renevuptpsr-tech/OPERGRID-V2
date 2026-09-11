import "server-only";

import {
  createClient,
} from "@/lib/supabase/server";


export type GangguanExportQuery = {
  search:
    string;

  status:
    "ALL" |
    "ONGOING" |
    "RECOVERED";

  ultg:
    string;

  gi:
    string;
};


type HierarchyRecord = {
  penyulang_id:
    string;

  penyulang_name:
    string | null;

  penyulang_short_name:
    string | null;

  gi_flc:
    string | null;

  gi_name:
    string | null;

  ultg_flc:
    string | null;

  ultg_name:
    string | null;
};


type ExportEventRecord = {
  event_id:
    string;

  penyulang_id:
    string;

  event_date:
    string;

  event_time:
    string;

  pmt_status_code:
    string;

  record_status:
    string;

  cause_code:
    string | null;

  phase_r:
    boolean | null;

  phase_s:
    boolean | null;

  phase_t:
    boolean | null;

  phase_n:
    boolean | null;

  outage_duration_min:
    number |
    string |
    null;

  event_description:
    string | null;

  operator_name:
    string | null;
};


export type GangguanExportRow = {
  eventId:
    string;

  date:
    string;

  time:
    string;

  ultg:
    string;

  gi:
    string;

  penyulang:
    string;

  pmtStatus:
    string;

  phase:
    string;

  cause:
    string;

  description:
    string;

  durationMinutes:
    string;

  status:
    string;

  operator:
    string;
};


function phaseLabel(
  row:
    ExportEventRecord,
) {
  const phases = [
    row.phase_r
      ? "R"
      : null,

    row.phase_s
      ? "S"
      : null,

    row.phase_t
      ? "T"
      : null,

    row.phase_n
      ? "N"
      : null,
  ].filter(Boolean);

  return phases.length >
    0
      ? phases.join("")
      : "-";
}


export async function getGangguanExportRows(
  query:
    GangguanExportQuery,
): Promise<GangguanExportRow[]> {
  const supabase =
    await createClient();

  const {
    data:
      hierarchyData,
    error:
      hierarchyError,
  } =
    await supabase
      .from(
        "vw_penyulang_hierarchy",
      )
      .select(
        `
          penyulang_id,
          penyulang_name,
          penyulang_short_name,
          gi_flc,
          gi_name,
          ultg_flc,
          ultg_name
        `,
      )
      .eq(
        "penyulang_is_active",
        true,
      );

  if (
    hierarchyError
  ) {
    throw new Error(
      hierarchyError.message,
    );
  }

  const hierarchyRows =
    (
      hierarchyData ??
      []
    ) as HierarchyRecord[];

  const hierarchyMap =
    new Map<
      string,
      HierarchyRecord
    >();

  for (
    const row of
    hierarchyRows
  ) {
    if (
      !hierarchyMap.has(
        row.penyulang_id,
      )
    ) {
      hierarchyMap.set(
        row.penyulang_id,
        row,
      );
    }
  }

  let candidateRows =
    hierarchyRows;

  if (
    query.ultg
  ) {
    candidateRows =
      candidateRows.filter(
        (row) =>
          row.ultg_flc ===
          query.ultg,
      );
  }

  if (
    query.gi
  ) {
    candidateRows =
      candidateRows.filter(
        (row) =>
          row.gi_flc ===
          query.gi,
      );
  }

  if (
    query.search
  ) {
    const search =
      query.search
        .trim()
        .toLowerCase();

    candidateRows =
      candidateRows.filter(
        (row) =>
          [
            row.penyulang_name,
            row.penyulang_short_name,
            row.gi_name,
            row.ultg_name,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(
              search,
            ),
      );
  }

  const candidateIds =
    Array.from(
      new Set(
        candidateRows.map(
          (row) =>
            row.penyulang_id,
        ),
      ),
    );

  if (
    (
      query.search ||
      query.ultg ||
      query.gi
    ) &&
    candidateIds.length ===
      0
  ) {
    return [];
  }

  let eventQuery =
    supabase
      .from(
        "trx_kejadian_penyulang",
      )
      .select(
        `
          event_id,
          penyulang_id,
          event_date,
          event_time,
          pmt_status_code,
          record_status,
          cause_code,
          phase_r,
          phase_s,
          phase_t,
          phase_n,
          outage_duration_min,
          event_description,
          operator_name
        `,
      )
      .eq(
        "event_type_code",
        "GANGGUAN",
      )
      .eq(
        "is_deleted",
        false,
      );

  if (
    query.status !==
    "ALL"
  ) {
    eventQuery =
      eventQuery.eq(
        "record_status",
        query.status,
      );
  }

  if (
    query.search ||
    query.ultg ||
    query.gi
  ) {
    eventQuery =
      eventQuery.in(
        "penyulang_id",
        candidateIds,
      );
  }

  const {
    data,
    error,
  } =
    await eventQuery
      .order(
        "event_date",
        {
          ascending:
            false,
        },
      )
      .order(
        "event_time",
        {
          ascending:
            false,
        },
      )
      .limit(
        5000,
      );

  if (
    error
  ) {
    throw new Error(
      error.message,
    );
  }

  return (
    (
      data ??
      []
    ) as ExportEventRecord[]
  ).map(
    (row) => {
      const hierarchy =
        hierarchyMap.get(
          row.penyulang_id,
        );

      return {
        eventId:
          row.event_id,

        date:
          row.event_date,

        time:
          row.event_time,

        ultg:
          hierarchy
            ?.ultg_name ??
          "-",

        gi:
          hierarchy
            ?.gi_name ??
          "-",

        penyulang:
          hierarchy
            ?.penyulang_short_name ??
          hierarchy
            ?.penyulang_name ??
          row.penyulang_id,

        pmtStatus:
          row.pmt_status_code,

        phase:
          phaseLabel(
            row,
          ),

        cause:
          row.cause_code ??
          "-",

        description:
          row.event_description ??
          "-",

        durationMinutes:
          row.outage_duration_min ===
          null
            ? ""
            : String(
                row.outage_duration_min,
              ),

        status:
          row.record_status,

        operator:
          row.operator_name ??
          "-",
      };
    },
  );
}