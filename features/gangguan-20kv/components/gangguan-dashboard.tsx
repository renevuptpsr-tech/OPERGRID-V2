"use client";

import {
  Activity,
  ArrowUpRight,
  CircleDot,
  Plus,
  RadioTower,
  TriangleAlert,
  Zap,
} from "lucide-react";

import type {
  GangguanDashboardData,
  GangguanDashboardQuery,
} from "../services/gangguan-dashboard-service";

import {
  GangguanGlobalFilter,
} from "./gangguan-global-filter";

import {
  GangguanHistoryToolbar,
} from "./gangguan-history-toolbar";

import {
  GangguanHistoryPagination,
} from "./gangguan-history-pagination";

import styles from "./gangguan-dashboard.module.css";


type Props = {
  data:
    GangguanDashboardData;

  query:
    GangguanDashboardQuery;
};


function formatDate(
  value:
    string,
) {
  const [
    year,
    month,
    day,
  ] =
    value.split("-");

  return `${day}/${month}/${year}`;
}


function formatTime(
  value:
    string,
) {
  return value.slice(
    0,
    5,
  );
}


function formatDuration(
  minutes:
    number | null,
) {
  if (
    minutes === null
  ) {
    return "-";
  }

  if (
    minutes <
    60
  ) {
    return `${Math.round(
      minutes,
    )} min`;
  }

  const hours =
    Math.floor(
      minutes /
      60,
    );

  const rest =
    Math.round(
      minutes %
      60,
    );

  return rest >
    0
      ? `${hours}h ${rest}m`
      : `${hours}h`;
}


function RelayBadges({
  names,
}: {
  names:
    string[];
}) {
  if (
    names.length ===
    0
  ) {
    return (
      <span className={styles.cellMeta}>
        -
      </span>
    );
  }

  return (
    <div className={styles.relayBadges}>
      {names.map(
        (
          name,
        ) => (
          <span
            key={
              name
            }
            className={styles.relayBadge}
          >
            {name}
          </span>
        ),
      )}
    </div>
  );
}


export function GangguanDashboard({
  data,
  query,
}: Props) {
  const exportParams =
    new URLSearchParams();

  exportParams.set(
    "from",
    query.fromDate,
  );

  exportParams.set(
    "to",
    query.toDate,
  );

  if (
    query.relayCodes.length >
    0
  ) {
    exportParams.set(
      "relay",
      query.relayCodes.join(
        ",",
      ),
    );
  }

  for (
    const [
      key,
      value,
    ] of [
      [
        "upt",
        query.upt,
      ],
      [
        "ultg",
        query.ultg,
      ],
      [
        "gi",
        query.gi,
      ],
      [
        "bay",
        query.bay,
      ],
      [
        "penyulang",
        query.penyulang,
      ],
      [
        "search",
        query.search,
      ],
    ]
  ) {
    if (
      value
    ) {
      exportParams.set(
        key,
        value,
      );
    }
  }

  if (
    query.status !==
    "ALL"
  ) {
    exportParams.set(
      "status",
      query.status,
    );
  }

  return (
    <div className={styles.page}>
      <GangguanGlobalFilter
        value={{
          fromDate:
            query.fromDate,

          toDate:
            query.toDate,

          relayCodes:
            query.relayCodes,

          upt:
            query.upt,

          ultg:
            query.ultg,

          gi:
            query.gi,

          bay:
            query.bay,

          penyulang:
            query.penyulang,
        }}
        relayOptions={
          data.relayOptions
        }
        scopeNodes={
          data.scopeNodes
        }
      />

      <section className={styles.commandBar}>
        <div>
          <span className={styles.eyebrow}>
            Distribution Operations
          </span>

          <h2 className={styles.commandTitle}>
            Operational Incident Monitor
          </h2>

          <p className={styles.commandDescription}>
            Monitoring gangguan penyulang 20 kV
            berdasarkan periode, relay, dan
            operational scope terpilih.
          </p>
        </div>

        <button
          type="button"
          className={styles.primaryButton}
          disabled
        >
          <Plus
            size={16}
          />

          Catat Gangguan
        </button>
      </section>

      <section className={styles.kpiGrid}>
        <article className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <span className={styles.kpiLabel}>
              Total Gangguan
            </span>

            <span
              className={styles.kpiIcon}
              data-tone="accent"
            >
              <Activity
                size={17}
              />
            </span>
          </div>

          <strong className={styles.kpiValue}>
            {
              data.summary
                .totalGangguan
            }
          </strong>

          <span className={styles.kpiHint}>
            Sesuai filter aktif
          </span>
        </article>

        <article className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <span className={styles.kpiLabel}>
              Gangguan Aktif
            </span>

            <span
              className={styles.kpiIcon}
              data-tone="danger"
            >
              <TriangleAlert
                size={17}
              />
            </span>
          </div>

          <strong className={styles.kpiValue}>
            {
              data.summary
                .activeGangguan
            }
          </strong>

          <span className={styles.kpiHint}>
            Belum selesai dipulihkan
          </span>
        </article>

        <article className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <span className={styles.kpiLabel}>
              Trip OGF
            </span>

            <span
              className={styles.kpiIcon}
              data-tone="accent"
            >
              <Zap
                size={17}
              />
            </span>
          </div>

          <strong className={styles.kpiValue}>
            {
              data.summary
                .tripOgf
            }
          </strong>

          <span className={styles.kpiHint}>
            Outgoing feeder trip
          </span>
        </article>

        <article className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <span className={styles.kpiLabel}>
              Trip Sistem / Lainnya
            </span>

            <span className={styles.kpiIcon}>
              <RadioTower
                size={17}
              />
            </span>
          </div>

          <strong className={styles.kpiValue}>
            {
              data.summary
                .tripSistemLainnya
            }
          </strong>

          <span className={styles.kpiHint}>
            Trip selain outgoing feeder
          </span>
        </article>
      </section>

      <section className={styles.section}>
        <header className={styles.sectionHeader}>
          <div>
            <div className={styles.sectionTitleRow}>
              <CircleDot
                size={17}
              />

              <h3 className={styles.sectionTitle}>
                Gangguan Aktif
              </h3>
            </div>

            <p className={styles.sectionDescription}>
              Gangguan aktif dalam periode dan
              scope yang dipilih.
            </p>
          </div>

          <span
            className={styles.countBadge}
            data-tone={
              data.summary
                .activeGangguan >
              0
                ? "danger"
                : "neutral"
            }
          >
            {
              data.summary
                .activeGangguan
            }{" "}
            Active
          </span>
        </header>

        {data.activeIncidents.length ===
        0 ? (
          <div className={styles.emptyState}>
            Tidak ada gangguan aktif pada filter ini.
          </div>
        ) : (
          <div className={styles.activeGrid}>
            {data.activeIncidents.map(
              (
                incident,
              ) => (
                <article
                  key={
                    incident.eventId
                  }
                  className={styles.incidentCard}
                >
                  <div className={styles.incidentAccent} />

                  <div className={styles.incidentBody}>
                    <div className={styles.incidentHeader}>
                      <div>
                        <span className={styles.location}>
                          {incident.ultgName}
                          {" · "}
                          {incident.giName}
                        </span>

                        <h4 className={styles.feederName}>
                          {
                            incident.penyulangName
                          }
                        </h4>
                      </div>

                      <span className={styles.liveBadge}>
                        ACTIVE
                      </span>
                    </div>

                    <div className={styles.incidentMeta}>
                      <span>
                        {
                          incident.pmtStatus
                        }
                      </span>

                      <span>
                        Phase{" "}
                        {
                          incident.phaseLabel
                        }
                      </span>

                      <span>
                        {formatDate(
                          incident.eventDate,
                        )}
                        {" · "}
                        {formatTime(
                          incident.eventTime,
                        )}
                      </span>
                    </div>

                    <RelayBadges
                      names={
                        incident.relayNames
                      }
                    />

                    <div className={styles.incidentFooter}>
                      <strong>
                        {incident.description ??
                          incident.causeName ??
                          "-"}
                      </strong>

                      <button
                        type="button"
                        className={styles.textAction}
                        disabled
                      >
                        Detail
                        <ArrowUpRight
                          size={14}
                        />
                      </button>
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>
        )}
      </section>

      <section className={styles.section}>
        <header className={styles.historyHeader}>
          <div>
            <h3 className={styles.sectionTitle}>
              Riwayat Gangguan
            </h3>

            <p className={styles.sectionDescription}>
              Data gangguan sesuai global filter aktif.
            </p>
          </div>
        </header>

        <div className={styles.historyToolbarWrap}>
          <GangguanHistoryToolbar
            initialSearch={
              query.search
            }
            initialStatus={
              query.status
            }
            exportHref={
              `/api/gangguan-20kv/export?${exportParams.toString()}`
            }
          />
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>
                  Waktu
                </th>

                <th>
                  Penyulang
                </th>

                <th>
                  Lokasi
                </th>

                <th>
                  Relay yang Bekerja
                </th>

                <th>
                  Indikasi
                </th>

                <th>
                  Durasi
                </th>

                <th>
                  Status
                </th>

                <th />
              </tr>
            </thead>

            <tbody>
              {data.history.items.length ===
              0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className={styles.tableEmpty}
                  >
                    Tidak ada data sesuai filter.
                  </td>
                </tr>
              ) : (
                data.history.items.map(
                  (
                    incident,
                  ) => (
                    <tr
                      key={
                        incident.eventId
                      }
                    >
                      <td>
                        <strong>
                          {formatDate(
                            incident.eventDate,
                          )}
                        </strong>

                        <span className={styles.cellMeta}>
                          {formatTime(
                            incident.eventTime,
                          )}
                        </span>
                      </td>

                      <td>
                        <strong>
                          {
                            incident.penyulangName
                          }
                        </strong>
                      </td>

                      <td>
                        {
                          incident.giName
                        }

                        <span className={styles.cellMeta}>
                          {
                            incident.ultgName
                          }
                        </span>
                      </td>

                      <td>
                        <RelayBadges
                          names={
                            incident.relayNames
                          }
                        />
                      </td>

                      <td>
                        {
                          incident.pmtStatus
                        }
                        {" · "}
                        Phase{" "}
                        {
                          incident.phaseLabel
                        }

                        <span className={styles.cellMeta}>
                          {incident.causeName ??
                            incident.description ??
                            "-"}
                        </span>
                      </td>

                      <td>
                        {formatDuration(
                          incident.outageDurationMin,
                        )}
                      </td>

                      <td>
                        <span
                          className={styles.statusBadge}
                          data-status={
                            incident.recordStatus
                          }
                        >
                          {incident.recordStatus ===
                          "RECOVERED"
                            ? "Recovered"
                            : "Active"}
                        </span>
                      </td>

                      <td className={styles.actionCell}>
                        <button
                          type="button"
                          className={styles.rowAction}
                          disabled
                        >
                          <ArrowUpRight
                            size={14}
                          />
                        </button>
                      </td>
                    </tr>
                  ),
                )
              )}
            </tbody>
          </table>
        </div>

        <GangguanHistoryPagination
          page={
            data.history.page
          }
          pageSize={
            data.history.pageSize
          }
          total={
            data.history.total
          }
          totalPages={
            data.history.totalPages
          }
        />
      </section>
    </div>
  );
}