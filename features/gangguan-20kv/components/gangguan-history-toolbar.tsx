"use client";

import {
  Download,
  Search,
} from "lucide-react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  useState,
} from "react";

import styles from "./gangguan-dashboard.module.css";


type Props = {
  initialSearch:
    string;

  initialStatus:
    string;

  exportHref:
    string;
};


const STATUS_OPTIONS = [
  {
    value:
      "ALL",

    label:
      "All",
  },
  {
    value:
      "ONGOING",

    label:
      "Active",
  },
  {
    value:
      "RECOVERED",

    label:
      "Recovered",
  },
] as const;


export function GangguanHistoryToolbar({
  initialSearch,
  initialStatus,
  exportHref,
}: Props) {
  const router =
    useRouter();

  const searchParams =
    useSearchParams();

  const [
    search,
    setSearch,
  ] =
    useState(
      initialSearch,
    );


  function navigate(
    params:
      URLSearchParams,
  ) {
    const query =
      params.toString();

    router.push(
      query
        ? `/gangguan-20kv?${query}`
        : "/gangguan-20kv",
    );
  }


  function applySearch() {
    const params =
      new URLSearchParams(
        searchParams.toString(),
      );

    params.set(
      "page",
      "1",
    );

    const value =
      search.trim();

    if (
      value
    ) {
      params.set(
        "search",
        value,
      );
    } else {
      params.delete(
        "search",
      );
    }

    navigate(
      params,
    );
  }


  function applyStatus(
    status:
      string,
  ) {
    const params =
      new URLSearchParams(
        searchParams.toString(),
      );

    params.set(
      "page",
      "1",
    );

    if (
      status ===
      "ALL"
    ) {
      params.delete(
        "status",
      );
    } else {
      params.set(
        "status",
        status,
      );
    }

    navigate(
      params,
    );
  }


  return (
    <div className={styles.historyToolbar}>
      <div className={styles.historyToolbarPrimary}>
        <label className={styles.searchBox}>
          <Search
            size={15}
          />

          <input
            value={
              search
            }
            onChange={(
              event,
            ) =>
              setSearch(
                event.target.value,
              )
            }
            onKeyDown={(
              event,
            ) => {
              if (
                event.key ===
                "Enter"
              ) {
                applySearch();
              }
            }}
            placeholder="Cari penyulang, relay, GI..."
          />
        </label>

        <div className={styles.statusToggle}>
          {STATUS_OPTIONS.map(
            (
              option,
            ) => (
              <button
                key={
                  option.value
                }
                type="button"
                data-active={
                  (
                    initialStatus ||
                    "ALL"
                  ) ===
                  option.value ||
                  undefined
                }
                onClick={() =>
                  applyStatus(
                    option.value,
                  )
                }
              >
                {
                  option.label
                }
              </button>
            ),
          )}
        </div>
      </div>

      <a
        href={
          exportHref
        }
        className={styles.exportButton}
      >
        <Download
          size={15}
        />

        Export
      </a>
    </div>
  );
}