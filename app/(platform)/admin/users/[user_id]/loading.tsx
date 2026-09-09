export default function UserDetailLoading() {
  return (
    <div className="space-y-4">

      <div className="h-5 w-[120px] animate-pulse rounded-[7px] bg-[var(--og-surface-soft)]" />


      <div
        className="rounded-[14px] border p-5"
        style={{
          background:
            "var(--og-surface-raised)",

          borderColor:
            "var(--og-border)",
        }}
      >
        <div className="flex items-center gap-4">

          <div className="h-14 w-14 shrink-0 animate-pulse rounded-[15px] bg-[var(--og-surface-soft)]" />

          <div className="flex-1">
            <div className="h-5 w-[190px] animate-pulse rounded-[7px] bg-[var(--og-surface-soft)]" />

            <div className="mt-3 h-3 w-[340px] max-w-full animate-pulse rounded-[6px] bg-[var(--og-surface-soft)]" />
          </div>

        </div>
      </div>


      <div
        className="overflow-hidden rounded-[14px] border"
        style={{
          background:
            "var(--og-surface-raised)",

          borderColor:
            "var(--og-border)",
        }}
      >

        <div className="flex h-[54px] items-center gap-3 border-b px-5"
          style={{
            borderColor:
              "var(--og-border-soft)",
          }}
        >
          <div className="h-8 w-[90px] animate-pulse rounded-[8px] bg-[var(--og-surface-soft)]" />
          <div className="h-8 w-[125px] animate-pulse rounded-[8px] bg-[var(--og-surface-soft)]" />
          <div className="h-8 w-[115px] animate-pulse rounded-[8px] bg-[var(--og-surface-soft)]" />
        </div>


        <div className="space-y-5 p-6">

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="h-10 animate-pulse rounded-[10px] bg-[var(--og-surface-soft)]" />
            <div className="h-10 animate-pulse rounded-[10px] bg-[var(--og-surface-soft)]" />
            <div className="h-10 animate-pulse rounded-[10px] bg-[var(--og-surface-soft)]" />
            <div className="h-10 animate-pulse rounded-[10px] bg-[var(--og-surface-soft)]" />
          </div>

        </div>

      </div>

    </div>
  );
}