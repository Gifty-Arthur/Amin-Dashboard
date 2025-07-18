import React from "react";
import Sidebar from "./Sidebar";
import SummaryCards from "./SummaryCards";
import Tracks from "./Tracks";
import RevenueChart from "./RevenueChart";
import LatestInvoices from "./LatestInvoice";

const Home = () => {
  return (
    <div>
      <Sidebar />
      <main className=" p-10 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold">Welcome Admin 👋</h1>
        <p className="text-sm text-gray-500">
          Track activity, trends, and popular destinations in real time
        </p>
        <SummaryCards />
        <Tracks />
        <div className="grid grid-cols-2 gap-4 mt-10">
          <RevenueChart />
          <LatestInvoices />
        </div>
      </main>
    </div>
  );
};

export default Home;
