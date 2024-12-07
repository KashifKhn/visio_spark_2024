import { useState, useEffect } from "react";
import { generateFakeData, ISPData } from "../utils/generateFakeData";

export function useRealTimeData(maxDataPoints: number = 100) {
  const [currentData, setCurrentData] = useState<ISPData>(generateFakeData());
  const [historicalData, setHistoricalData] = useState<ISPData[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateFakeData();
      setCurrentData(newData);
      setHistoricalData((prevData) => {
        const newHistoricalData = [...prevData, newData];
        return newHistoricalData.slice(-maxDataPoints);
      });
    }, 500);

    return () => clearInterval(interval);
  }, [maxDataPoints]);

  return { currentData, historicalData };
}
