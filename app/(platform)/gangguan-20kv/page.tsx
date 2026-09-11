import {
  GangguanDashboard,
} from "@/features/gangguan-20kv/components/gangguan-dashboard";

import {
  getGangguanDashboardData,
  type GangguanDashboardQuery,
} from "@/features/gangguan-20kv/services/gangguan-dashboard-service";


type PageProps = {
  searchParams:
    Promise<{
      page?: string;
      pageSize?: string;

      from?: string;
      to?: string;

      relay?: string;

      upt?: string;
      ultg?: string;
      gi?: string;
      bay?: string;
      penyulang?: string;

      search?: string;
      status?: string;
    }>;
};


function positiveInteger(
  value:
    string |
    undefined,
  fallback:
    number,
) {
  const parsed =
    Number(value);

  return Number.isInteger(
    parsed,
  ) &&
    parsed >
      0
    ? parsed
    : fallback;
}


function defaultDateRange() {
  const parts =
    new Intl.DateTimeFormat(
      "en-CA",
      {
        timeZone:
          "Asia/Jakarta",

        year:
          "numeric",

        month:
          "2-digit",

        day:
          "2-digit",
      },
    ).formatToParts(
      new Date(),
    );

  const get =
    (
      type:
        string,
    ) =>
      parts.find(
        (part) =>
          part.type ===
          type,
      )?.value ??
      "";

  const year =
    get(
      "year",
    );

  const month =
    get(
      "month",
    );

  const day =
    get(
      "day",
    );

  return {
    fromDate:
      `${year}-${month}-01`,

    toDate:
      `${year}-${month}-${day}`,
  };
}


export default async function Gangguan20KvPage({
  searchParams,
}: PageProps) {
  const params =
    await searchParams;

  const defaults =
    defaultDateRange();

  const requestedPageSize =
    positiveInteger(
      params.pageSize,
      20,
    );

  const status =
    params.status ===
      "ONGOING" ||
    params.status ===
      "RECOVERED"
      ? params.status
      : "ALL";

  const query:
    GangguanDashboardQuery = {
      page:
        positiveInteger(
          params.page,
          1,
        ),

      pageSize:
        [
          20,
          50,
          100,
        ].includes(
          requestedPageSize,
        )
          ? requestedPageSize
          : 20,

      fromDate:
        params.from ??
        defaults.fromDate,

      toDate:
        params.to ??
        defaults.toDate,

      relayCodes:
        (
          params.relay ??
          ""
        )
          .split(",")
          .map(
            (value) =>
              value.trim(),
          )
          .filter(Boolean),

      upt:
        params.upt ??
        "",

      ultg:
        params.ultg ??
        "",

      gi:
        params.gi ??
        "",

      bay:
        params.bay ??
        "",

      penyulang:
        params.penyulang ??
        "",

      search:
        params.search ??
        "",

      status,
    };

  const data =
    await getGangguanDashboardData(
      query,
    );

  return (
    <GangguanDashboard
      data={data}
      query={query}
    />
  );
}