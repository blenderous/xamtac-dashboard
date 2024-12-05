import { dealyRequest } from "./common";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartData {
  name: string;
  value: number;
}

const fetchLineChartData = () => {
  let data: ChartData[];
  let promise = fetch("http://localhost:3000/line-chart-data")
    // artificially adding delay to the fetched data
    .then(dealyRequest(1000))
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

const lineChartResource = fetchLineChartData();

export const LineChartComponent = () => {
  const lineChartData = lineChartResource.read();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: "Revenue",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--color-value)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
