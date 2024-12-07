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

interface BandwidthChartProps {
  data: { bandwidth: number }[];
}

export function BandwidthChart({ data }: BandwidthChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bandwidth Usage</CardTitle>
        <CardDescription>Real-time bandwidth consumption</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            bandwidth: {
              label: "Bandwidth (Mbps)",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="bandwidth"
                stroke="var(--color-bandwidth)"
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
