"use client";

import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface MetricChartProps {
  data: { timestamp: number; value: number }[];
  title: string;
  description: string;
  color: string;
  dataKey: string;
  yAxisFormatter?: (value: number) => string;
}

export function MetricChart({
  data,
  title,
  description,
  color,
  dataKey,
  yAxisFormatter,
}: MetricChartProps) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            [dataKey]: {
              label: title,
              color: color,
            },
          }}
          className="h-[200px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="timestamp"
                tickFormatter={(unixTime) =>
                  new Date(unixTime).toLocaleTimeString()
                }
                interval="preserveStartEnd"
              />
              <YAxis tickFormatter={yAxisFormatter} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
