import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Suspense } from "react";
import { LineChartComponent } from "./dashboard/LineChart";
import { BarChartComponent1 } from "./dashboard/BarChart1";
import { PieChartComponent } from "./dashboard/PieChart";
import { BarChartComponent2 } from "./dashboard/BarChart2";
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingSkeleton } from "./dashboard/LoadingSkeleton";

interface KPIData {
  title: string;
  value: string;
  change: string;
}

const kpiData: KPIData[] = [
  { title: "Total Revenue", value: "$45,231.89", change: "+20.1%" },
  { title: "Subscriptions", value: "2,350", change: "+180.1%" },
  { title: "Sales", value: "12,234", change: "+19%" },
  { title: "Active Users", value: "573", change: "+201" },
];

function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((item) => (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground">
                {item.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Suspense fallback={<LoadingSkeleton />}>
          <LineChartComponent />
        </Suspense>
        <Suspense fallback={<LoadingSkeleton />}>
          <BarChartComponent1 />
        </Suspense>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Suspense fallback={<LoadingSkeleton />}>
          <PieChartComponent />
        </Suspense>
        <Suspense fallback={<LoadingSkeleton />}>
          <BarChartComponent2 />
        </Suspense>
      </div>
    </div>
  );
}

export default Dashboard;
