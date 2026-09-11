import "server-only";

import {
  createClient,
} from "@/lib/supabase/server";


export type GangguanRelayOption = {
  code: string;
  label: string;
};


export type GangguanScopeNode = {
  uptFlc: string;
  uptName: string;

  ultgFlc: string;
  ultgName: string;

  giFlc: string;
  giName: string;

  bayFlc: string;
  bayName: string;

  penyulangId: string;
  penyulangName: string;
};


export type GangguanDashboardIncident = {
  eventId: string;

  penyulangId: string;
  penyulangName: string;

  bayName: string;
  giName: string;
  ultgName: string;

  eventDate: string;
  eventTime: string;

  pmtStatus: string;
  recordStatus: string;

  annunciatorCode:
    string | null;

  causeName:
    string | null;

  phaseLabel: string;

  relayNames:
    string[];

  outageDurationMin:
    number | null;

  description:
    string | null;

  operatorName:
    string | null;
};


export type GangguanDashboardQuery = {
  page: number;
  pageSize: number;

  fromDate: string;
  toDate: string;

  relayCodes:
    string[];

  upt:
    string;

  ultg:
    string;

  gi:
    string;

  bay:
    string;

  penyulang:
    string;

  search:
    string;

  status:
    "ALL" |
    "ONGOING" |
    "RECOVERED";
};


export type GangguanDashboardData = {
  summary: {
    totalGangguan: number;
    activeGangguan: number;
    tripOgf: number;
    tripSistemLainnya: number;
  };

  activeIncidents:
    GangguanDashboardIncident[];

  history: {
    items:
      GangguanDashboardIncident[];

    total:
      number;

    page:
      number;

    pageSize:
      number;

    totalPages:
      number;
  };

  relayOptions:
    GangguanRelayOption[];

  scopeNodes:
    GangguanScopeNode[];
};


type DetailRow = {
  event_id: string;

  ultg_flc:
    string | null;

  ultg_name:
    string | null;

  gi_flc:
    string | null;

  gi_name:
    string | null;

  bay_flc:
    string | null;

  bay_name:
    string | null;

  penyulang_id:
    string;

  penyulang_name:
    string | null;

  penyulang_short_name:
    string | null;

  pmt_status_code:
    string;

  cause_name:
    string | null;

  event_date:
    string;

  event_time:
    string;

  phase_r:
    boolean | null;

  phase_s:
    boolean | null;

  phase_t:
    boolean | null;

  phase_n:
    boolean | null;

  annunciator_code:
    string | null;

  outage_duration_min:
    number |
    string |
    null;

  event_description:
    string | null;

  record_status:
    string;

  indikasi_names:
    string[] |
    null;

  indikasi_codes:
    string[] |
    null;

  operator_name:
    string | null;
};


type HierarchyRow = {
  ultg_flc:
    string;

  ultg_name:
    string | null;

  gi_flc:
    string;

  gi_name:
    string | null;

  bay_flc:
    string;

  bay_name:
    string | null;

  penyulang_id:
    string;

  penyulang_name:
    string | null;

  penyulang_short_name:
    string | null;
};


type FunctlocParent = {
  functloc_id:
    string;

  sup_functloc_id:
    string | null;
};


type UptRow = {
  functloc_id:
    string;

  location_name:
    string | null;
};


const DETAIL_COLUMNS = `
  event_id,
  ultg_flc,
  ultg_name,
  gi_flc,
  gi_name,
  bay_flc,
  bay_name,
  penyulang_id,
  penyulang_name,
  penyulang_short_name,
  pmt_status_code,
  cause_name,
  event_date,
  event_time,
  phase_r,
  phase_s,
  phase_t,
  phase_n,
  annunciator_code,
  outage_duration_min,
  event_description,
  record_status,
  indikasi_names,
  indikasi_codes,
  operator_name
`;


function phaseLabel(
  row: DetailRow,
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


function numericValue(
  value:
    | number
    | string
    | null,
) {
  if (
    value === null ||
    value === ""
  ) {
    return null;
  }

  const parsed =
    Number(value);

  return Number.isFinite(
    parsed,
  )
    ? parsed
    : null;
}


function mapIncident(
  row:
    DetailRow,
): GangguanDashboardIncident {
  return {
    eventId:
      row.event_id,

    penyulangId:
      row.penyulang_id,

    penyulangName:
      row.penyulang_short_name ??
      row.penyulang_name ??
      "Penyulang",

    bayName:
      row.bay_name ??
      "BAY -",

    giName:
      row.gi_name ??
      "GI -",

    ultgName:
      row.ultg_name ??
      "ULTG -",

    eventDate:
      row.event_date,

    eventTime:
      row.event_time,

    pmtStatus:
      row.pmt_status_code,

    recordStatus:
      row.record_status,

    annunciatorCode:
      row.annunciator_code,

    causeName:
      row.cause_name,

    phaseLabel:
      phaseLabel(
        row,
      ),

    relayNames:
      row.indikasi_names ??
      [],

    outageDurationMin:
      numericValue(
        row.outage_duration_min,
      ),

    description:
      row.event_description,

    operatorName:
      row.operator_name,
  };
}


async function getRelayOptions() {
  const supabase =
    await createClient();

  const {
    data,
    error,
  } =
    await supabase
      .from(
        "ref_gangguan_indikasi",
      )
      .select(
        `
          indikasi_code,
          description,
          sequence_no
        `,
      )
      .eq(
        "is_active",
        true,
      )
      .order(
        "sequence_no",
        {
          ascending:
            true,
        },
      );

  if (
    error
  ) {
    throw new Error(
      error.message,
    );
  }

  return (
    data ??
    []
  ).map(
    (row) => ({
      code:
        row.indikasi_code,

      label:
        row.description,
    }),
  );
}


async function getScopeNodes():
Promise<GangguanScopeNode[]> {
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
          ultg_flc,
          ultg_name,
          gi_flc,
          gi_name,
          bay_flc,
          bay_name,
          penyulang_id,
          penyulang_name,
          penyulang_short_name
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
    ) as HierarchyRow[];

  const ultgIds =
    Array.from(
      new Set(
        hierarchyRows.map(
          (row) =>
            row.ultg_flc,
        ),
      ),
    );

  const {
    data:
      ultgParentsData,
    error:
      ultgParentsError,
  } =
    await supabase
      .from(
        "mst_functloc",
      )
      .select(
        `
          functloc_id,
          sup_functloc_id
        `,
      )
      .in(
        "functloc_id",
        ultgIds,
      );

  if (
    ultgParentsError
  ) {
    throw new Error(
      ultgParentsError.message,
    );
  }

  const ultgParents =
    (
      ultgParentsData ??
      []
    ) as FunctlocParent[];

  const uptIds =
    Array.from(
      new Set(
        ultgParents
          .map(
            (row) =>
              row.sup_functloc_id,
          )
          .filter(
            (
              value,
            ): value is string =>
              Boolean(
                value,
              ),
          ),
      ),
    );

  const uptMap =
    new Map<
      string,
      string
    >();

  if (
    uptIds.length >
    0
  ) {
    const {
      data:
        uptData,
      error:
        uptError,
    } =
      await supabase
        .from(
          "mst_functloc",
        )
        .select(
          `
            functloc_id,
            location_name
          `,
        )
        .in(
          "functloc_id",
          uptIds,
        );

    if (
      uptError
    ) {
      throw new Error(
        uptError.message,
      );
    }

    for (
      const row of
        (
          uptData ??
          []
        ) as UptRow[]
    ) {
      uptMap.set(
        row.functloc_id,
        row.location_name ??
          row.functloc_id,
      );
    }
  }

  const ultgParentMap =
    new Map<
      string,
      string
    >();

  for (
    const row of
    ultgParents
  ) {
    if (
      row.sup_functloc_id
    ) {
      ultgParentMap.set(
        row.functloc_id,
        row.sup_functloc_id,
      );
    }
  }

  const seen =
    new Set<string>();

  const result:
    GangguanScopeNode[] =
    [];

  for (
    const row of
    hierarchyRows
  ) {
    const uptFlc =
      ultgParentMap.get(
        row.ultg_flc,
      ) ??
      "";

    const key =
      [
        uptFlc,
        row.ultg_flc,
        row.gi_flc,
        row.bay_flc,
        row.penyulang_id,
      ].join("|");

    if (
      seen.has(
        key,
      )
    ) {
      continue;
    }

    seen.add(
      key,
    );

    result.push({
      uptFlc,

      uptName:
        uptMap.get(
          uptFlc,
        ) ??
        "UPT",

      ultgFlc:
        row.ultg_flc,

      ultgName:
        row.ultg_name ??
        row.ultg_flc,

      giFlc:
        row.gi_flc,

      giName:
        row.gi_name ??
        row.gi_flc,

      bayFlc:
        row.bay_flc,

      bayName:
        row.bay_name ??
        row.bay_flc,

      penyulangId:
        row.penyulang_id,

      penyulangName:
        row.penyulang_short_name ??
        row.penyulang_name ??
        row.penyulang_id,
    });
  }

  return result;
}


function scopePenyulangIds(
  nodes:
    GangguanScopeNode[],
  query:
    GangguanDashboardQuery,
) {
  return Array.from(
    new Set(
      nodes
        .filter(
          (node) => {
            if (
              query.upt &&
              node.uptFlc !==
                query.upt
            ) {
              return false;
            }

            if (
              query.ultg &&
              node.ultgFlc !==
                query.ultg
            ) {
              return false;
            }

            if (
              query.gi &&
              node.giFlc !==
                query.gi
            ) {
              return false;
            }

            if (
              query.bay &&
              node.bayFlc !==
                query.bay
            ) {
              return false;
            }

            if (
              query.penyulang &&
              node.penyulangId !==
                query.penyulang
            ) {
              return false;
            }

            return true;
          },
        )
        .map(
          (node) =>
            node.penyulangId,
        ),
    ),
  );
}


export async function getGangguanDashboardData(
  query:
    GangguanDashboardQuery,
): Promise<GangguanDashboardData> {
  const supabase =
    await createClient();

  const [
    relayOptions,
    scopeNodes,
  ] =
    await Promise.all([
      getRelayOptions(),
      getScopeNodes(),
    ]);

  const hasScopeFilter =
    Boolean(
      query.upt ||
      query.ultg ||
      query.gi ||
      query.bay ||
      query.penyulang,
    );

  const scopedPenyulangIds =
    scopePenyulangIds(
      scopeNodes,
      query,
    );

  if (
    hasScopeFilter &&
    scopedPenyulangIds.length ===
      0
  ) {
    return {
      summary: {
        totalGangguan:
          0,

        activeGangguan:
          0,

        tripOgf:
          0,

        tripSistemLainnya:
          0,
      },

      activeIncidents:
        [],

      history: {
        items:
          [],

        total:
          0,

        page:
          1,

        pageSize:
          query.pageSize,

        totalPages:
          1,
      },

      relayOptions,
      scopeNodes,
    };
  }

  let baseQuery =
    supabase
      .from(
        "vw_kejadian_penyulang_detail",
      )
      .select(
        DETAIL_COLUMNS,
        {
          count:
            "exact",
        },
      )
      .eq(
        "event_type_code",
        "GANGGUAN",
      )
      .gte(
        "event_date",
        query.fromDate,
      )
      .lte(
        "event_date",
        query.toDate,
      );

  if (
    hasScopeFilter
  ) {
    baseQuery =
      baseQuery.in(
        "penyulang_id",
        scopedPenyulangIds,
      );
  }

  if (
    query.relayCodes.length >
    0
  ) {
    baseQuery =
      baseQuery.overlaps(
        "indikasi_codes",
        query.relayCodes,
      );
  }

  const {
    data:
      allData,
    error:
      allError,
    count:
      totalCount,
  } =
    await baseQuery;

  if (
    allError
  ) {
    throw new Error(
      allError.message,
    );
  }

  const allRows =
    (
      allData ??
      []
    ) as DetailRow[];

  const totalGangguan =
    totalCount ??
    allRows.length;

  const activeRows =
    allRows.filter(
      (row) =>
        row.record_status ===
        "ONGOING",
    );

  const tripRows =
    allRows.filter(
      (row) =>
        row.pmt_status_code ===
        "TRIP",
    );

  const tripOgf =
    tripRows.filter(
      (row) =>
        row.annunciator_code ===
        "OUTGOING_TRIP",
    ).length;

  const tripSistemLainnya =
    tripRows.length -
    tripOgf;

  let historyRows =
    allRows;

  if (
    query.status !==
    "ALL"
  ) {
    historyRows =
      historyRows.filter(
        (row) =>
          row.record_status ===
          query.status,
      );
  }

  if (
    query.search.trim()
  ) {
    const search =
      query.search
        .trim()
        .toLowerCase();

    historyRows =
      historyRows.filter(
        (row) =>
          [
            row.penyulang_name,
            row.penyulang_short_name,
            row.bay_name,
            row.gi_name,
            row.ultg_name,
            row.event_description,
            row.cause_name,
            row.operator_name,
            ...(row.indikasi_names ??
              []),
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(
              search,
            ),
      );
  }

  historyRows =
    historyRows.sort(
      (
        a,
        b,
      ) => {
        const aKey =
          `${a.event_date} ${a.event_time}`;

        const bKey =
          `${b.event_date} ${b.event_time}`;

        return bKey.localeCompare(
          aKey,
        );
      },
    );

  const totalHistory =
    historyRows.length;

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        totalHistory /
        query.pageSize,
      ),
    );

  const safePage =
    Math.min(
      query.page,
      totalPages,
    );

  const from =
    (
      safePage -
      1
    ) *
    query.pageSize;

  const paginated =
    historyRows.slice(
      from,
      from +
        query.pageSize,
    );

  return {
    summary: {
      totalGangguan,

      activeGangguan:
        activeRows.length,

      tripOgf,

      tripSistemLainnya,
    },

    activeIncidents:
      activeRows.map(
        mapIncident,
      ),

    history: {
      items:
        paginated.map(
          mapIncident,
        ),

      total:
        totalHistory,

      page:
        safePage,

      pageSize:
        query.pageSize,

      totalPages,
    },

    relayOptions,
    scopeNodes,
  };
}