import React, { useState, useEffect } from "react";
import { getAllInvoices } from "../Invoices/InvoiceService";

// Import your local images to use as fallbacks
import l1 from "../../../assets/Images/home/l1.png";
import l2 from "../../../assets/Images/home/l2.png";
import l3 from "../../../assets/Images/home/l3.png";
import l4 from "../../../assets/Images/home/l4.png";

const fallbackImages = [l1, l2, l3, l4];

const LatestInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestInvoices = async () => {
      try {
        const data = await getAllInvoices();
        setInvoices(Array.isArray(data) ? data.slice(0, 4) : []);
      } catch (error) {
        console.error("Failed to fetch latest invoices:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestInvoices();
  }, []);

  return (
    <div className="h-[478px] bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 border-b border-gray-200 pb-2 text-gray-800">
        Latest Invoices
      </h3>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <ul className="space-y-4">
          {invoices.map((invoice, index) => {
            const fullName = invoice.learner
              ? `${invoice.learner.firstName} ${invoice.learner.lastName}`
              : "N/A";

            const displayImage =
              invoice.learner?.image ||
              fallbackImages[index % fallbackImages.length];

            return (
              <li
                key={invoice._id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={displayImage}
                    alt={fullName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-gray-800 font-medium">{fullName}</span>
                </div>
                <span className="text-gray-700 font-semibold">
                  ${invoice.amount?.toFixed(2) || "0.00"}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LatestInvoices;
