// src/components/LatestInvoices.js
import React from "react";
import l1 from "../../../assets/Images/home/l1.png";
import l2 from "../../../assets/Images/home/l2.png";
import l3 from "../../../assets/Images/home/l3.png";
import l4 from "../../../assets/Images/home/l4.png";

const invoices = [
  { name: "James Anderson", amount: "$320", image: l1 },
  { name: "Michael Johnson", amount: "$210", image: l2 },
  { name: "David Brown", amount: "$315", image: l3 },
  { name: "Orlando Diggs", amount: "$250", image: l4 },
];

const LatestInvoices = () => {
  return (
    <div className="h-[478px] bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 border-b border-gray-200 pb-2 text-gray-800">
        Latest Invoice
      </h3>
      <ul className="space-y-4">
        {invoices.map((inv, idx) => (
          <li key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={inv.image}
                alt={inv.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-gray-800 font-medium">{inv.name}</span>
            </div>
            <span className="text-gray-700 font-semibold">{inv.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestInvoices;
