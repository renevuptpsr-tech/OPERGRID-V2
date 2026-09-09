import { BarChart3, Zap } from "lucide-react";

import { ChartTest } from "@/components/charts/chart-test";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto w-full max-w-5xl py-12">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
            <Zap size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              OPERGRID
            </h1>

            <p className="text-slate-500">
              Dashboard Chart Foundation
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 size={20} />

              <CardTitle>
                Aktivitas Operasional
              </CardTitle>
            </div>

            <CardDescription>
              Pengujian Recharts pada OPERGRID.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ChartTest />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}