import React, { useState, useEffect } from "react";
import { getMyInvoices } from "./LearnerInvoiceService";
const LearnerInvoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await getMyInvoices();
        setInvoices(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch invoices:", err);
        setError("Could not load your invoices. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  if (loading) {
    return <p className="text-center p-8">Loading your invoices...</p>;
  }

  if (error) {
    return <p className="text-center p-8 text-red-500">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Invoices</h1>
      <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="">
              <th className="p-4">Track</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length > 0 ? (
              invoices.map((invoice) => (
                <tr
                  key={invoice._id}
                  className="border-b border-b-gray-500 hover:bg-gray-50"
                >
                  <td className="p-4 font-medium">
                    {invoice.track?.name || "N/A"}
                  </td>
                  <td className="p-4">
                    ${invoice.amount?.toFixed(2) || "0.00"}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                        invoice.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">
                    {new Date(invoice.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-8 text-gray-500">
                  You have no invoices yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LearnerInvoice;
