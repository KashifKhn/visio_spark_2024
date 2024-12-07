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

interface PacketLossChartProps {
  data: { packetLoss: number }[];
}

export function PacketLossChart({ data }: PacketLossChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Packet Loss</CardTitle>
        <CardDescription>Real-time packet loss percentage</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            packetLoss: {
              label: "Packet Loss (%)",
              color: "hsl(var(--chart-3))",
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
                dataKey="packetLoss"
                stroke="var(--color-packetLoss)"
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
