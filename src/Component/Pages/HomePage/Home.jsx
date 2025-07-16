import React from "react";
import Sidebar from "./Sidebar";
import SummaryCards from "./SummaryCards";

const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-10 bg-gray-100">
        <h1 className="text-2xl font-bold">Welcome Admin 👋</h1>
        <p className="text-sm text-gray-500">
          Track activity, trends, and popular destinations in real time
        </p>
        <SummaryCards />
        {/* <Tracks />
        <div className="grid grid-cols-2 gap-4 mt-10">
          <RevenueChart />
          <LatestInvoices />
        </div> */}
      </main>
    </div>
  );
};

export default Home;
