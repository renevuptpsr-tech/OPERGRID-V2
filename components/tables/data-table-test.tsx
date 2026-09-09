"use client";

import {
  createSortedRowModel,
  rowSortingFeature,
  sortFns,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

type SampleRow = {
  id: number;
  gi: string;
  penyulang: string;
  status: string;
};

const data: SampleRow[] = [
  {
    id: 1,
    gi: "GI Sidikalang",
    penyulang: "Penyulang A",
    status: "Normal",
  },
  {
    id: 2,
    gi: "GI Tele",
    penyulang: "Penyulang B",
    status: "Gangguan",
  },
  {
    id: 3,
    gi: "GI Tarutung",
    penyulang: "Penyulang C",
    status: "Manuver",
  },
];

const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns,
});

const columns: Array<ColumnDef<typeof features, SampleRow>> = [
  {
    accessorKey: "id",
    header: "No",
  },
  {
    accessorKey: "gi",
    header: "Gardu Induk",
  },
  {
    accessorKey: "penyulang",
    header: "Penyulang",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

export function DataTableTest() {
  const table = useTable({
    key: "opergrid-table-test",
    features,
    columns,
    data,
  });

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left font-semibold text-slate-700"
                  >
                    {header.isPlaceholder ? null : (
                      <Button
                        type="button"
                        variant="ghost"
                        className="h-auto justify-start p-0 font-semibold"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <table.FlexRender header={header} />

                        {header.column.getIsSorted() === "asc" && " Ã¢â€ â€˜"}
                        {header.column.getIsSorted() === "desc" && " Ã¢â€ â€œ"}
                      </Button>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
              >
                {row.getAllCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3 text-slate-700"
                  >
                    <table.FlexRender cell={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
