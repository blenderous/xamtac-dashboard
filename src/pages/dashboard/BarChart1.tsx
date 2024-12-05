import { dealyRequest } from "./common";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface BarChartData {
  name: string;
  sales: number;
}

const fetchChartData = () => {
  let data: BarChartData[];
  let promise = fetch("http://localhost:3000/bar-chart-data-1")
    // artificially adding delay to the fetched data
    .then(dealyRequest(2000))
    .then((response: Response) => response.json())
    .then((json) => {
      data = json;
    });

  return {
    read() {
      if (!data) {
        throw promise;
      }
      return data;
    },
  };
};

const chartResource = fetchChartData();

export const BarChartComponent1 = () => {
  const chartData = chartResource.read();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales by Product</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            sales: {
              label: "Sales",
              color: "hsl(var(--chart-2))",
            },
            salesTarget: {
              label: "Sales Target",
              color: "hsl(var(--chart-2-additional))",
            },
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="salesTarget" fill="var(--color-sales)" />
              <Bar dataKey="sales" fill="var(--color-salesTarget)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
