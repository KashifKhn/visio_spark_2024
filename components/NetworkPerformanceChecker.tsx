"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle } from "lucide-react";
import { ISPData } from "../utils/generateFakeData";

interface NetworkIssue {
  metric: string;
  value: number;
  threshold: number;
  status: "ok" | "warning" | "critical";
}

interface NetworkPerformanceCheckerProps {
  currentData: ISPData;
}

export function NetworkPerformanceChecker({
  currentData,
}: NetworkPerformanceCheckerProps) {
  const [issues, setIssues] = useState<NetworkIssue[]>([]);

  const checkPerformance = () => {
    const newIssues: NetworkIssue[] = [
      {
        metric: "Bandwidth",
        value: currentData.bandwidth,
        threshold: 500,
        status: currentData.bandwidth < 500 ? "warning" : "ok",
      },
      {
        metric: "Latency",
        value: currentData.latency,
        threshold: 50,
        status: currentData.latency > 50 ? "critical" : "ok",
      },
      {
        metric: "Packet Loss",
        value: currentData.packetLoss,
        threshold: 2,
        status: currentData.packetLoss > 2 ? "warning" : "ok",
      },
      {
        metric: "Server Load",
        value: currentData.serverLoad,
        threshold: 80,
        status: currentData.serverLoad > 80 ? "critical" : "ok",
      },
      {
        metric: "Network Utilization",
        value: currentData.networkUtilization,
        threshold: 90,
        status: currentData.networkUtilization > 90 ? "warning" : "ok",
      },
    ];
    setIssues(newIssues);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Performance Checker</CardTitle>
        <CardDescription>Check for potential network issues</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={checkPerformance}>Run Performance Check</Button>
        {issues.length > 0 && (
          <div className="mt-4 space-y-2">
            {issues.map((issue, index) => (
              <div key={index} className="flex items-center space-x-2">
                {issue.status === "ok" ? (
                  <CheckCircle className="text-green-500" />
                ) : (
                  <AlertCircle
                    className={
                      issue.status === "warning"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }
                  />
                )}
                <span>
                  {issue.metric}: {issue.value.toFixed(2)} (Threshold:{" "}
                  {issue.threshold})
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
