export interface ISPData {
  timestamp: number;
  bandwidth: number;
  latency: number;
  packetLoss: number;
  activeUsers: number;
  serverLoad: number;
  networkUtilization: number;
  downtime: number;
  throughput: number;
}

let lastActiveUsers = 5000; // Starting point for active users

export function generateFakeData(): ISPData {
  // Change active users by a small amount (up to 1% change)
  const activeUsersChange = Math.floor(
    lastActiveUsers * (Math.random() * 0.02 - 0.01),
  );
  lastActiveUsers += activeUsersChange;
  lastActiveUsers = Math.max(0, Math.min(10000, lastActiveUsers)); // Keep between 0 and 10000

  return {
    timestamp: Date.now(),
    bandwidth: Math.random() * 1000,
    latency: Math.random() * 100,
    packetLoss: Math.random() * 5,
    activeUsers: Math.round(lastActiveUsers),
    serverLoad: Math.random() * 100,
    networkUtilization: Math.random() * 100,
    downtime: Math.random() * 60,
    throughput: Math.random() * 500,
  };
}
