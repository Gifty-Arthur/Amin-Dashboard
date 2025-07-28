import React, { useState, useEffect } from "react";
import { LuPencil } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";

import Title from "../../Titles/titles";
import Subt from "../../Titles/subt";
import AddTask from "../../Buttons/AddTask";
import SearchBar from "../../Buttons/Searchbar";
import { getAllInvoices } from "./InvoiceService";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const invoicesPerPage = 10;

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const data = await getAllInvoices();
        // ✅ ADD THIS LINE TO SEE THE EXACT DATA
        console.log("Full API Response:", JSON.stringify(data, null, 2));
        setInvoices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to display invoices:", error);
        setInvoices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  const filteredInvoices = invoices.filter((invoice) => {
    // ✅ CHANGED to invoice.learner
    if (
      invoice &&
      invoice.learner &&
      typeof invoice.learner.name === "string"
    ) {
      return invoice.learner.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    }
    return searchQuery === "";
  });

  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = filteredInvoices.slice(
    indexOfFirstInvoice,
    indexOfLastInvoice
  );
  const totalPages = Math.ceil(filteredInvoices.length / invoicesPerPage);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Title text="Manage Invoices" />
      <Subt text="Filter, sort, and access detailed invoices" />

      <div className="mt-6 flex items-center justify-between">
        <div className="w-full md:w-1/3">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Search by learner name..."
          />
        </div>
        <AddTask className="flex items-center justify-center gap-2">
          <FaPlus />
          Add Invoice
        </AddTask>
      </div>

      <div className="mt-8 bg-white p-4 rounded-xl shadow overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-500 p-8">Loading invoices...</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-4">LEARNER</th>
                <th className="p-4">EMAIL ADDRESS</th>
                <th className="p-4">DATE JOINED</th>
                <th className="p-4">AMOUNT</th>
                <th className="p-4">STATUS</th>
                <th className="p-4">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentInvoices.length > 0 ? (
                currentInvoices.map((invoice) => (
                  <tr key={invoice._id} className="hover:bg-gray-50 border-b">
                    {/* ✅ CHANGED to invoice.learner */}
                    <td className="p-4 font-medium">
                      {invoice.learner
                        ? `${invoice.learner.firstName} ${invoice.learner.lastName}`
                        : "N/A"}
                    </td>

                    <td className="p-4 text-gray-600">
                      {invoice.learner?.email || "N/A"}
                    </td>
                    <td className="p-4 text-gray-600">
                      {new Date(invoice.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-gray-600">
                      ${invoice.amount?.toFixed(2) || "0.00"}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          invoice.status === "Paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-4">
                        <button title="Edit Invoice">
                          <LuPencil className="text-blue-500 hover:text-blue-700" />
                        </button>
                        <button title="Delete Invoice">
                          <RiDeleteBin6Line className="text-red-500 hover:text-red-700" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-8 text-gray-500">
                    No invoices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center gap-2">
          {/* ... Pagination Controls ... */}
        </div>
      )}
    </div>
  );
};

export default Invoices;
