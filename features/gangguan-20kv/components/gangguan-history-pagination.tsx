"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import styles from "./gangguan-dashboard.module.css";


type Props = {
  page:
    number;

  pageSize:
    number;

  total:
    number;

  totalPages:
    number;
};


export function GangguanHistoryPagination({
  page,
  pageSize,
  total,
  totalPages,
}: Props) {
  const router =
    useRouter();

  const searchParams =
    useSearchParams();

  const from =
    total === 0
      ? 0
      : (
          page -
          1
        ) *
          pageSize +
        1;

  const to =
    Math.min(
      page *
        pageSize,
      total,
    );


  function navigate(
    targetPage:
      number,
  ) {
    const params =
      new URLSearchParams(
        searchParams
          .toString(),
      );

    params.set(
      "page",
      String(
        targetPage,
      ),
    );

    router.push(
      `/gangguan-20kv?${params.toString()}`,
    );
  }


  function changePageSize(
    value:
      string,
  ) {
    const params =
      new URLSearchParams(
        searchParams
          .toString(),
      );

    params.set(
      "page",
      "1",
    );

    params.set(
      "pageSize",
      value,
    );

    router.push(
      `/gangguan-20kv?${params.toString()}`,
    );
  }


  return (
    <footer className={styles.pagination}>
      <div className={styles.paginationResult}>
        Showing{" "}
        <strong>
          {from}
          {"–"}
          {to}
        </strong>
        {" of "}
        <strong>
          {total}
        </strong>
        {" incidents"}
      </div>

      <div className={styles.paginationControls}>
        <label className={styles.rowsControl}>
          <span>
            Rows
          </span>

          <select
            value={
              String(
                pageSize,
              )
            }
            onChange={(
              event,
            ) =>
              changePageSize(
                event
                  .target
                  .value,
              )
            }
          >
            <option value="20">
              20
            </option>

            <option value="50">
              50
            </option>

            <option value="100">
              100
            </option>
          </select>
        </label>

        <button
          type="button"
          className={styles.pageButton}
          disabled={
            page <=
            1
          }
          onClick={() =>
            navigate(
              page -
                1,
            )
          }
        >
          <ChevronLeft
            size={14}
          />

          Previous
        </button>

        <span className={styles.pageIndicator}>
          Page{" "}
          <strong>
            {page}
          </strong>
          {" of "}
          <strong>
            {totalPages}
          </strong>
        </span>

        <button
          type="button"
          className={styles.pageButton}
          disabled={
            page >=
            totalPages
          }
          onClick={() =>
            navigate(
              page +
                1,
            )
          }
        >
          Next

          <ChevronRight
            size={14}
          />
        </button>
      </div>
    </footer>
  );
}