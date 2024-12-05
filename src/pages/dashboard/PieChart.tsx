import { dealyRequest } from "./common";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, Cell, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface PieChartData {
  name: string;
  value: number;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const fetchChartData = () => {
  let data: PieChartData[];
  let promise = fetch("http://localhost:3000/pie-chart-data")
    // artificially adding delay to the fetched data
    .then(dealyRequest(1500))
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

export const PieChartComponent = () => {
  const chartData = chartResource.read();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Segments</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: "Value",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="var(--color-value)"
                label
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
