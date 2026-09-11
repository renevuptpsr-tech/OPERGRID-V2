"use client";

import {
  CalendarDays,
  Filter,
  RotateCcw,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  Dialog,
} from "@/components/design-system/overlays";

import {
  Button,
} from "@/components/design-system/primitives/button";

import type {
  GangguanRelayOption,
  GangguanScopeNode,
} from "../services/gangguan-dashboard-service";

import styles from "./gangguan-dashboard.module.css";


type FilterValue = {
  fromDate: string;
  toDate: string;

  relayCodes:
    string[];

  upt: string;
  ultg: string;
  gi: string;
  bay: string;
  penyulang: string;
};


type Props = {
  value:
    FilterValue;

  relayOptions:
    GangguanRelayOption[];

  scopeNodes:
    GangguanScopeNode[];
};


function uniqueOptions(
  values:
    Array<{
      value: string;
      label: string;
    }>,
) {
  const map =
    new Map<
      string,
      string
    >();

  for (
    const item of
    values
  ) {
    if (
      item.value &&
      !map.has(
        item.value,
      )
    ) {
      map.set(
        item.value,
        item.label,
      );
    }
  }

  return Array.from(
    map.entries(),
  )
    .map(
      ([
        value,
        label,
      ]) => ({
        value,
        label,
      }),
    )
    .sort(
      (
        a,
        b,
      ) =>
        a.label.localeCompare(
          b.label,
          "id",
        ),
    );
}


export function GangguanGlobalFilter({
  value,
  relayOptions,
  scopeNodes,
}: Props) {
  const router =
    useRouter();

  const searchParams =
    useSearchParams();

  const [
    open,
    setOpen,
  ] =
    useState(
      false,
    );

  const [
    draft,
    setDraft,
  ] =
    useState<FilterValue>(
      value,
    );


  const uptOptions =
    useMemo(
      () =>
        uniqueOptions(
          scopeNodes.map(
            (node) => ({
              value:
                node.uptFlc,

              label:
                node.uptName,
            }),
          ),
        ),
      [
        scopeNodes,
      ],
    );


  const ultgOptions =
    useMemo(
      () =>
        uniqueOptions(
          scopeNodes
            .filter(
              (node) =>
                !draft.upt ||
                node.uptFlc ===
                  draft.upt,
            )
            .map(
              (node) => ({
                value:
                  node.ultgFlc,

                label:
                  node.ultgName,
              }),
            ),
        ),
      [
        scopeNodes,
        draft.upt,
      ],
    );


  const giOptions =
    useMemo(
      () =>
        uniqueOptions(
          scopeNodes
            .filter(
              (node) =>
                (
                  !draft.upt ||
                  node.uptFlc ===
                    draft.upt
                ) &&
                (
                  !draft.ultg ||
                  node.ultgFlc ===
                    draft.ultg
                ),
            )
            .map(
              (node) => ({
                value:
                  node.giFlc,

                label:
                  node.giName,
              }),
            ),
        ),
      [
        scopeNodes,
        draft.upt,
        draft.ultg,
      ],
    );


  const bayOptions =
    useMemo(
      () =>
        uniqueOptions(
          scopeNodes
            .filter(
              (node) =>
                (
                  !draft.upt ||
                  node.uptFlc ===
                    draft.upt
                ) &&
                (
                  !draft.ultg ||
                  node.ultgFlc ===
                    draft.ultg
                ) &&
                (
                  !draft.gi ||
                  node.giFlc ===
                    draft.gi
                ),
            )
            .map(
              (node) => ({
                value:
                  node.bayFlc,

                label:
                  node.bayName,
              }),
            ),
        ),
      [
        scopeNodes,
        draft.upt,
        draft.ultg,
        draft.gi,
      ],
    );


  const penyulangOptions =
    useMemo(
      () =>
        uniqueOptions(
          scopeNodes
            .filter(
              (node) =>
                (
                  !draft.upt ||
                  node.uptFlc ===
                    draft.upt
                ) &&
                (
                  !draft.ultg ||
                  node.ultgFlc ===
                    draft.ultg
                ) &&
                (
                  !draft.gi ||
                  node.giFlc ===
                    draft.gi
                ) &&
                (
                  !draft.bay ||
                  node.bayFlc ===
                    draft.bay
                ),
            )
            .map(
              (node) => ({
                value:
                  node.penyulangId,

                label:
                  node.penyulangName,
              }),
            ),
        ),
      [
        scopeNodes,
        draft.upt,
        draft.ultg,
        draft.gi,
        draft.bay,
      ],
    );


  const activeCount =
    value.relayCodes.length +
    [
      value.upt,
      value.ultg,
      value.gi,
      value.bay,
      value.penyulang,
    ].filter(
      Boolean,
    ).length;


  const scopeLabel =
    useMemo(
      () => {
        const selected =
          scopeNodes.find(
            (node) =>
              (
                !value.penyulang ||
                node.penyulangId ===
                  value.penyulang
              ) &&
              (
                !value.bay ||
                node.bayFlc ===
                  value.bay
              ) &&
              (
                !value.gi ||
                node.giFlc ===
                  value.gi
              ) &&
              (
                !value.ultg ||
                node.ultgFlc ===
                  value.ultg
              ) &&
              (
                !value.upt ||
                node.uptFlc ===
                  value.upt
              ),
          );

        if (
          value.penyulang
        ) {
          return (
            selected
              ?.penyulangName ??
            "Penyulang"
          );
        }

        if (
          value.bay
        ) {
          return (
            selected
              ?.bayName ??
            "BAY"
          );
        }

        if (
          value.gi
        ) {
          return (
            selected
              ?.giName ??
            "GI"
          );
        }

        if (
          value.ultg
        ) {
          return (
            selected
              ?.ultgName ??
            "ULTG"
          );
        }

        if (
          value.upt
        ) {
          return (
            selected
              ?.uptName ??
            "UPT"
          );
        }

        return "Semua Scope";
      },
      [
        scopeNodes,
        value,
      ],
    );


  function apply() {
    const params =
      new URLSearchParams(
        searchParams.toString(),
      );

    params.set(
      "page",
      "1",
    );

    params.set(
      "from",
      draft.fromDate,
    );

    params.set(
      "to",
      draft.toDate,
    );

    if (
      draft.relayCodes.length >
      0
    ) {
      params.set(
        "relay",
        draft.relayCodes.join(
          ",",
        ),
      );
    } else {
      params.delete(
        "relay",
      );
    }

    const fields = [
      [
        "upt",
        draft.upt,
      ],
      [
        "ultg",
        draft.ultg,
      ],
      [
        "gi",
        draft.gi,
      ],
      [
        "bay",
        draft.bay,
      ],
      [
        "penyulang",
        draft.penyulang,
      ],
    ] as const;

    for (
      const [
        key,
        fieldValue,
      ] of fields
    ) {
      if (
        fieldValue
      ) {
        params.set(
          key,
          fieldValue,
        );
      } else {
        params.delete(
          key,
        );
      }
    }

    setOpen(
      false,
    );

    router.push(
      `/gangguan-20kv?${params.toString()}`,
    );
  }


  function resetAdvanced() {
    setDraft({
      ...value,

      relayCodes:
        [],

      upt:
        "",

      ultg:
        "",

      gi:
        "",

      bay:
        "",

      penyulang:
        "",
    });
  }


  return (
    <section className={styles.globalFilterBar}>
      <div className={styles.globalFilterContext}>
        <div className={styles.globalFilterItem}>
          <CalendarDays
            size={15}
          />

          <div>
            <span>
              Periode
            </span>

            <strong>
              {value.fromDate}
              {" — "}
              {value.toDate}
            </strong>
          </div>
        </div>

        <div className={styles.globalFilterDivider} />

        <div className={styles.globalFilterItem}>
          <Filter
            size={15}
          />

          <div>
            <span>
              Relay
            </span>

            <strong>
              {value.relayCodes.length >
              0
                ? `${value.relayCodes.length} dipilih`
                : "Semua Relay"}
            </strong>
          </div>
        </div>

        <div className={styles.globalFilterDivider} />

        <div className={styles.globalFilterItem}>
          <div>
            <span>
              Scope
            </span>

            <strong>
              {scopeLabel}
            </strong>
          </div>
        </div>
      </div>

      <Dialog
        open={
          open
        }
        onOpenChange={
          setOpen
        }
        size="lg"
        title="Filter Gangguan 20 kV"
        description="Filter ini berlaku ke seluruh dashboard: KPI, gangguan aktif, riwayat, dan export."
        trigger={
          <button
            type="button"
            className={styles.globalFilterButton}
            onClick={() => {
              setDraft(
                value,
              );
            }}
          >
            <Filter
              size={15}
            />

            Filter

            {activeCount >
            0 ? (
              <span className={styles.filterCount}>
                {
                  activeCount
                }
              </span>
            ) : null}
          </button>
        }
        footer={
          <div className={styles.filterModalFooter}>
            <Button
              variant="ghost"
              size="sm"
              leftIcon={
                <RotateCcw
                  size={14}
                />
              }
              onClick={
                resetAdvanced
              }
            >
              Reset Relay & Scope
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={
                apply
              }
            >
              Apply Filters
            </Button>
          </div>
        }
      >
        <div className={styles.globalFilterForm}>
          <div className={styles.globalFilterFormSection}>
            Periode Gangguan
          </div>

          <div className={styles.dateRangeGrid}>
            <div className={styles.filterModalField}>
              <label htmlFor="gangguan-from">
                Dari Tanggal
              </label>

              <input
                id="gangguan-from"
                type="date"
                value={
                  draft.fromDate
                }
                onChange={(
                  event,
                ) =>
                  setDraft(
                    (
                      current,
                    ) => ({
                      ...current,

                      fromDate:
                        event.target.value,
                    }),
                  )
                }
              />
            </div>

            <div className={styles.filterModalField}>
              <label htmlFor="gangguan-to">
                Sampai Tanggal
              </label>

              <input
                id="gangguan-to"
                type="date"
                value={
                  draft.toDate
                }
                onChange={(
                  event,
                ) =>
                  setDraft(
                    (
                      current,
                    ) => ({
                      ...current,

                      toDate:
                        event.target.value,
                    }),
                  )
                }
              />
            </div>
          </div>

          <div className={styles.globalFilterFormSection}>
            Relay yang Bekerja
          </div>

          <div className={styles.relayGrid}>
            {relayOptions.map(
              (
                relay,
              ) => {
                const checked =
                  draft.relayCodes.includes(
                    relay.code,
                  );

                return (
                  <label
                    key={
                      relay.code
                    }
                    className={styles.relayOption}
                    data-active={
                      checked ||
                      undefined
                    }
                  >
                    <input
                      type="checkbox"
                      checked={
                        checked
                      }
                      onChange={() => {
                        setDraft(
                          (
                            current,
                          ) => ({
                            ...current,

                            relayCodes:
                              checked
                                ? current.relayCodes.filter(
                                    (
                                      code,
                                    ) =>
                                      code !==
                                      relay.code,
                                  )
                                : [
                                    ...current.relayCodes,
                                    relay.code,
                                  ],
                          }),
                        );
                      }}
                    />

                    <span>
                      {
                        relay.label
                      }
                    </span>
                  </label>
                );
              },
            )}
          </div>

          <div className={styles.globalFilterFormSection}>
            Operational Scope
          </div>

          <div className={styles.scopeGrid}>
            <ScopeSelect
              label="UPT"
              value={
                draft.upt
              }
              options={
                uptOptions
              }
              onChange={(
                selected,
              ) =>
                setDraft(
                  (
                    current,
                  ) => ({
                    ...current,
                    upt:
                      selected,
                    ultg:
                      "",
                    gi:
                      "",
                    bay:
                      "",
                    penyulang:
                      "",
                  }),
                )
              }
            />

            <ScopeSelect
              label="ULTG"
              value={
                draft.ultg
              }
              options={
                ultgOptions
              }
              disabled={
                !draft.upt &&
                uptOptions.length >
                  1
              }
              onChange={(
                selected,
              ) =>
                setDraft(
                  (
                    current,
                  ) => ({
                    ...current,
                    ultg:
                      selected,
                    gi:
                      "",
                    bay:
                      "",
                    penyulang:
                      "",
                  }),
                )
              }
            />

            <ScopeSelect
              label="GI"
              value={
                draft.gi
              }
              options={
                giOptions
              }
              disabled={
                !draft.ultg
              }
              onChange={(
                selected,
              ) =>
                setDraft(
                  (
                    current,
                  ) => ({
                    ...current,
                    gi:
                      selected,
                    bay:
                      "",
                    penyulang:
                      "",
                  }),
                )
              }
            />

            <ScopeSelect
              label="BAY"
              value={
                draft.bay
              }
              options={
                bayOptions
              }
              disabled={
                !draft.gi
              }
              onChange={(
                selected,
              ) =>
                setDraft(
                  (
                    current,
                  ) => ({
                    ...current,
                    bay:
                      selected,
                    penyulang:
                      "",
                  }),
                )
              }
            />

            <ScopeSelect
              label="Penyulang"
              value={
                draft.penyulang
              }
              options={
                penyulangOptions
              }
              disabled={
                !draft.bay
              }
              onChange={(
                selected,
              ) =>
                setDraft(
                  (
                    current,
                  ) => ({
                    ...current,
                    penyulang:
                      selected,
                  }),
                )
              }
            />
          </div>
        </div>
      </Dialog>
    </section>
  );
}


function ScopeSelect({
  label,
  value,
  options,
  disabled = false,
  onChange,
}: {
  label:
    string;

  value:
    string;

  options:
    Array<{
      value: string;
      label: string;
    }>;

  disabled?:
    boolean;

  onChange:
    (
      value:
        string,
    ) => void;
}) {
  return (
    <div className={styles.filterModalField}>
      <label>
        {label}
      </label>

      <select
        value={
          value
        }
        disabled={
          disabled
        }
        onChange={(
          event,
        ) =>
          onChange(
            event.target.value,
          )
        }
      >
        <option value="">
          Semua {label}
        </option>

        {options.map(
          (
            option,
          ) => (
            <option
              key={
                option.value
              }
              value={
                option.value
              }
            >
              {
                option.label
              }
            </option>
          ),
        )}
      </select>
    </div>
  );
}