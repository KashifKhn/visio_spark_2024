"use client";

import { useState } from "react";
import { useRealTimeData } from "../hooks/useRealTimeData";
import { MetricChart } from "./MetricChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ISPData } from "../utils/generateFakeData";
import { NetworkPerformanceChecker } from "./NetworkPerformanceChecker";

function generateReport(data: ISPData[]): string {
  const latestData = data[data.length - 1];
  const averages = data.reduce((acc, curr) => {
    Object.keys(curr).forEach((key) => {
      if (typeof curr[key] === "number" && key !== "timestamp") {
        acc[key] = (acc[key] || 0) + curr[key];
      }
    });
    return acc;
  }, {} as Partial<ISPData>);

  Object.keys(averages).forEach((key) => {
    averages[key] = averages[key]! / data.length;
  });

  return `
ISP Network Performance Report
Generated on: ${new Date().toLocaleString()}

Current Metrics:
- Bandwidth: ${latestData.bandwidth.toFixed(2)} Mbps
- Latency: ${latestData.latency.toFixed(2)} ms
- Packet Loss: ${latestData.packetLoss.toFixed(2)}%
- Active Users: ${latestData.activeUsers}
- Server Load: ${latestData.serverLoad.toFixed(2)}%
- Network Utilization: ${latestData.networkUtilization.toFixed(2)}%
- Downtime: ${latestData.downtime.toFixed(2)} minutes
- Throughput: ${latestData.throughput.toFixed(2)} Mbps

Averages (last ${data.length} data points):
- Bandwidth: ${averages.bandwidth?.toFixed(2)} Mbps
- Latency: ${averages.latency?.toFixed(2)} ms
- Packet Loss: ${averages.packetLoss?.toFixed(2)}%
- Active Users: ${Math.round(averages.activeUsers || 0)}
- Server Load: ${averages.serverLoad?.toFixed(2)}%
- Network Utilization: ${averages.networkUtilization?.toFixed(2)}%
- Downtime: ${averages.downtime?.toFixed(2)} minutes
- Throughput: ${averages.throughput?.toFixed(2)} Mbps
  `;
}

export function Dashboard() {
  const { currentData, historicalData } = useRealTimeData(100);
  const [report, setReport] = useState<string>("");

  const handleGenerateReport = () => {
    const generatedReport = generateReport(historicalData);
    setReport(generatedReport);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricChart
          data={historicalData.map((d) => ({
            timestamp: d.timestamp,
            value: d.bandwidth,
          }))}
          title="Bandwidth"
          description="Network bandwidth over time"
          color="hsl(var(--chart-1))"
          dataKey="value"
          yAxisFormatter={(value) => `${value.toFixed(0)} Mbps`}
        />
        <MetricChart
          data={historicalData.map((d) => ({
            timestamp: d.timestamp,
            value: d.latency,
          }))}
          title="Latency"
          description="Network latency over time"
          color="hsl(var(--chart-2))"
          dataKey="value"
          yAxisFormatter={(value) => `${value.toFixed(0)} ms`}
        />
        <MetricChart
          data={historicalData.map((d) => ({
            timestamp: d.timestamp,
            value: d.packetLoss,
          }))}
          title="Packet Loss"
          description="Packet loss percentage over time"
          color="hsl(var(--chart-3))"
          dataKey="value"
          yAxisFormatter={(value) => `${value.toFixed(2)}%`}
        />
        <MetricChart
          data={historicalData.map((d) => ({
            timestamp: d.timestamp,
            value: d.activeUsers,
          }))}
          title="Active Users"
          description="Number of active users over time"
          color="hsl(var(--chart-4))"
          dataKey="value"
          yAxisFormatter={(value) => value.toFixed(0)}
        />
        <MetricChart
          data={historicalData.map((d) => ({
            timestamp: d.timestamp,
            value: d.serverLoad,
          }))}
          title="Server Load"
          description="Server load percentage over time"
          color="hsl(var(--chart-5))"
          dataKey="value"
          yAxisFormatter={(value) => `${value.toFixed(2)}%`}
        />
        <MetricChart
          data={historicalData.map((d) => ({
            timestamp: d.timestamp,
            value: d.networkUtilization,
          }))}
          title="Network Utilization"
          description="Network utilization percentage over time"
          color="hsl(var(--chart-6))"
          dataKey="value"
          yAxisFormatter={(value) => `${value.toFixed(2)}%`}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <NetworkPerformanceChecker currentData={currentData} />
        <Card>
          <CardHeader>
            <CardTitle>Report Generation</CardTitle>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={handleGenerateReport}>Generate Report</Button>
              </DialogTrigger>
              <DialogContent className="max-w-[800px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>ISP Network Performance Report</DialogTitle>
                  <DialogDescription>
                    Generated on: {new Date().toLocaleString()}
                  </DialogDescription>
                </DialogHeader>
                <pre className="mt-4 p-4 bg-gray-100 rounded-md overflow-x-auto">
                  {report}
                </pre>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
