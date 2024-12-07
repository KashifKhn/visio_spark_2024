import { Dashboard } from "@/components/Dashboard";
import React from "react";

const page = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">ISP OMS Real-time Analytics</h1>
      <Dashboard />
    </div>
  );
};

export default page;
