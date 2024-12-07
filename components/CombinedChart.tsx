"use client";

import { useState } from "react";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ISPData } from "../utils/generateFakeData";

interface CombinedChartProps {
  data: ISPData[];
}

export function CombinedChart({ data }: CombinedChartProps) {
  const [metrics, setMetrics] = useState([
    "bandwidth",
    "latency",
    "packetLoss",
  ]);

  const colors = {
    bandwidth: "hsl(var(--chart-1))",
    latency: "hsl(var(--chart-2))",
    packetLoss: "hsl(var(--chart-3))",
    activeUsers: "hsl(var(--chart-4))",
    serverLoad: "hsl(var(--chart-5))",
    networkUtilization: "hsl(var(--chart-6))",
    downtime: "hsl(var(--chart-7))",
    throughput: "hsl(var(--chart-8))",
  };

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Historical Network Performance Metrics</CardTitle>
        <CardDescription>
          Real-time network performance data (last 100 data points)
        </CardDescription>
        <div className="flex space-x-2">
          {Object.keys(colors).map((metric) => (
            <Select
              key={metric}
              onValueChange={(value) =>
                setMetrics((prev) =>
                  value === "on"
                    ? [...prev, metric]
                    : prev.filter((m) => m !== metric),
                )
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={`Show ${metric}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="on">Show</SelectItem>
                <SelectItem value="off">Hide</SelectItem>
              </SelectContent>
            </Select>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={Object.fromEntries(
            metrics.map((metric) => [
              metric,
              { label: metric, color: colors[metric] },
            ]),
          )}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="timestamp"
                tickFormatter={(unixTime) =>
                  new Date(unixTime).toLocaleTimeString()
                }
              />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              {metrics.map((metric) => (
                <Line
                  key={metric}
                  type="monotone"
                  dataKey={metric}
                  stroke={colors[metric]}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
