import React, { useState, useEffect } from "react";
import { LuPencil } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import Title from "../../Titles/titles";
import Subt from "../../Titles/subt";
import AddTask from "../../Buttons/AddTask";
import SearchBar from "../../SearchBar";
import { getAllInvoices, updateInvoice, deleteInvoice } from "./InvoiceService";
import { getAllLearners } from "../Learners/LearnersService";
import AddNewInvoice from "./AddNewInvoice";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const invoicesPerPage = 10;

  // State for modals
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // 2. ADD STATE for the modal

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const data = await getAllInvoices();
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

  // Modal handlers
  const handleUpdateClick = (invoice) => {
    setSelectedInvoice(invoice);
    setShowUpdateModal(true);
  };

  const handleDeleteClick = (invoice) => {
    setSelectedInvoice(invoice);
    setShowDeleteModal(true);
  };

  // Improved invoice update handler with better debugging
  const handleInvoiceUpdated = (updatedInvoice) => {
    console.log("Updating invoice in parent component:", updatedInvoice); // Debug log

    setInvoices((prevInvoices) => {
      const newInvoices = prevInvoices.map((inv) => {
        if (inv._id === updatedInvoice._id) {
          const updated = {
            ...inv, // Keep original data including populated learner
            ...updatedInvoice, // Apply updates
            // Ensure critical fields are preserved/updated correctly
            _id: inv._id,
            createdAt: inv.createdAt, // Preserve original creation date
            updatedAt: updatedInvoice.updatedAt || new Date().toISOString(),
          };
          console.log("Updated invoice in state:", updated); // Debug log
          return updated;
        }
        return inv;
      });
      console.log("New invoices array:", newInvoices); // Debug log
      return newInvoices;
    });
    setShowUpdateModal(false);
  };

  // 3. ADD HANDLERS for the new modal
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const handleInvoiceAdded = (newInvoice) => {
    setInvoices((prevInvoices) => [newInvoice, ...prevInvoices]);
    closeAddModal();
  };

  // Alternative method: Refetch invoices after update for guaranteed consistency
  const handleInvoiceUpdatedWithRefetch = async (updatedInvoice) => {
    try {
      // Update the local state first for immediate feedback
      setInvoices((prevInvoices) =>
        prevInvoices.map((inv) =>
          inv._id === updatedInvoice._id ? updatedInvoice : inv
        )
      );

      // Then refetch all invoices to ensure data consistency
      const data = await getAllInvoices();
      setInvoices(Array.isArray(data) ? data : []);

      setShowUpdateModal(false);
    } catch (error) {
      console.error("Failed to refresh invoices after update:", error);
      // Still close the modal even if refetch fails
      setShowUpdateModal(false);
    }
  };

  const handleInvoiceDeleted = (deletedInvoiceId) => {
    setInvoices(invoices.filter((inv) => inv._id !== deletedInvoiceId));
    setShowDeleteModal(false);
  };

  // Filtering and Pagination
  const filteredInvoices = invoices.filter((invoice) =>
    (invoice.learner
      ? `${invoice.learner.firstName} ${invoice.learner.lastName}`
      : ""
    )
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

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
        <AddTask
          onClick={openAddModal}
          className="flex items-center justify-center gap-2"
        >
          <FaPlus />
          Add Invoice
        </AddTask>
      </div>
      <div className="mt-8 bg-white p-4 rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-b-gray-200">
              <th className="p-4 text-[#7F7E83] font-Figtree font-light text-[14px]">
                LEARNER
              </th>
              <th className="p-4 text-[#7F7E83] font-Figtree font-light text-[14px]">
                EMAIL ADDRESS
              </th>
              <th className="p-4 text-[#7F7E83] font-Figtree font-light text-[14px]">
                DUE DATE
              </th>
              <th className="p-4 text-[#7F7E83] font-Figtree font-light text-[14px]">
                AMOUNT
              </th>
              <th className="p-4 text-[#7F7E83] font-Figtree font-light text-[14px]">
                STATUS
              </th>
              <th className="p-4 text-[#7F7E83] font-Figtree font-light text-[14px]">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : currentInvoices.length > 0 ? (
              currentInvoices.map((invoice) => (
                <tr key={invoice._id} className="hover:bg-gray-50">
                  <td className="p-4 text-tert font-semibold text-[16px]">
                    {invoice.learner
                      ? `${invoice.learner.firstName} ${invoice.learner.lastName}`
                      : "N/A"}
                  </td>
                  <td className="p-4 text-[#2E2C48] text-[16px] font-light font-figtree">
                    {invoice.learner?.email || "N/A"}
                  </td>
                  <td className="p-4 text-[#2E2C48] text-[16px] font-light font-figtree">
                    {invoice.dueDate
                      ? new Date(invoice.dueDate).toLocaleDateString()
                      : new Date(invoice.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-[#2E2C48] text-[16px] font-light font-figtree">
                    ${invoice.amount?.toFixed(2) || "0.00"}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                        invoice.status === "paid"
                          ? "bg-[#e6f9f0] text-[#51a481]"
                          : "bg-[#ecf0f4] text-[#394559]"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleUpdateClick(invoice)}
                        title="Edit Invoice"
                      >
                        <LuPencil className="text-blue-500 hover:text-blue-700" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(invoice)}
                        title="Delete Invoice"
                      >
                        <RiDeleteBin6Line className="text-red-500 hover:text-red-700" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center gap-2">
          {/* Pagination Controls */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                page === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      <AddNewInvoice
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onInvoiceAdded={handleInvoiceAdded}
      />
      {showUpdateModal && (
        <UpdateInvoiceModal
          invoice={selectedInvoice}
          onClose={() => setShowUpdateModal(false)}
          onInvoiceUpdated={handleInvoiceUpdated}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmationModal
          invoice={selectedInvoice}
          onClose={() => setShowDeleteModal(false)}
          onInvoiceDeleted={handleInvoiceDeleted}
        />
      )}
    </div>
  );
};

// --- MODAL COMPONENTS ---

const UpdateInvoiceModal = ({ invoice, onClose, onInvoiceUpdated }) => {
  const [allLearners, setAllLearners] = useState([]);
  const [formData, setFormData] = useState({
    amount: invoice.amount || 0,
    status: invoice.status || "pending",
    learner: invoice.learner?._id || "",
    dueDate: invoice.dueDate
      ? new Date(invoice.dueDate).toISOString().split("T")[0]
      : "",
    paymentDetails: invoice.paymentDetails || "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLearners = async () => {
      try {
        const learnersData = await getAllLearners();
        setAllLearners(learnersData);
      } catch (error) {
        console.error("Failed to fetch learners:", error);
      }
    };
    fetchLearners();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setError("");

    try {
      const { amount, status, learner, dueDate, paymentDetails } = formData;

      // Create payload with proper data formatting
      const payload = {
        amount: Number(amount),
        status: status.trim(), // Ensure no whitespace issues
        learner,
        paymentDetails: paymentDetails.trim(),
      };

      // Only include dueDate if it's provided
      if (dueDate) {
        payload.dueDate = dueDate;
      }

      console.log("Sending payload:", payload); // Debug log

      // Update the invoice via API
      const responseData = await updateInvoice(invoice._id, payload);
      console.log("API response:", responseData); // Debug log

      // Find the selected learner from allLearners to ensure we have full learner data
      const selectedLearner = allLearners.find(
        (l) => l._id === payload.learner
      );

      // Create the updated invoice object with proper learner population
      const updatedInvoice = {
        ...invoice, // Keep original invoice data
        amount: payload.amount,
        status: payload.status,
        learner: selectedLearner || invoice.learner,
        dueDate: payload.dueDate || invoice.dueDate,
        paymentDetails: payload.paymentDetails,
        _id: invoice._id, // Ensure ID is preserved
        updatedAt: new Date().toISOString(), // Update timestamp
      };

      // If the API response includes additional fields, merge them but preserve our data
      if (responseData && responseData.invoice) {
        Object.assign(updatedInvoice, responseData.invoice, {
          // Override with our local data to ensure consistency
          amount: payload.amount,
          status: payload.status,
          learner: selectedLearner || invoice.learner,
          dueDate: payload.dueDate || invoice.dueDate,
          paymentDetails: payload.paymentDetails,
        });
      }

      console.log("Final updated invoice object:", updatedInvoice); // Debug log
      onInvoiceUpdated(updatedInvoice);
    } catch (err) {
      const errorMessage =
        err.response?.data?.errors?.[0]?.message ||
        err.response?.data?.message ||
        "Failed to update invoice.";
      setError(errorMessage);
      console.error("Update error:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Update Invoice</h2>
          <button onClick={onClose} className="hover:bg-gray-100 p-1 rounded">
            <IoClose size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Select Learner</label>
            <select
              name="learner"
              value={formData.learner}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white focus:border-blue-500 focus:outline-none"
              required
            >
              <option value="" disabled>
                -- Select a Learner --
              </option>
              {allLearners.map((learner) => (
                <option key={learner._id} value={learner._id}>
                  {learner.firstName} {learner.lastName} ({learner.email})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Amount ($)</label>
            <input
              type="number"
              step="0.01"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:border-blue-500 focus:outline-none"
              required
              min="0"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Payment Details</label>
            <input
              type="text"
              name="paymentDetails"
              value={formData.paymentDetails}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:border-blue-500 focus:outline-none"
              placeholder="e.g., Bank Transfer, Momo"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white focus:border-blue-500 focus:outline-none"
              required
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="submit"
              disabled={isUpdating}
              className="px-4 py-2 bg-primary md:w-[383px] w-full hover:bg-blue-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isUpdating ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DeleteConfirmationModal = ({ invoice, onClose, onInvoiceDeleted }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setIsDeleting(true);
    setError("");
    try {
      await deleteInvoice(invoice._id);
      onInvoiceDeleted(invoice._id);
    } catch (err) {
      setError("Failed to delete invoice.");
      console.error("Delete error:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Confirm Deletion</h2>
          <button onClick={onClose} className="hover:bg-gray-100 p-1 rounded">
            <IoClose size={20} />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 mb-2">
            Are you sure you want to delete this invoice?
          </p>
          <div className="bg-gray-50 p-3 rounded border">
            <p className="text-sm text-gray-600">
              <strong>Learner:</strong>{" "}
              {invoice.learner
                ? `${invoice.learner.firstName} ${invoice.learner.lastName}`
                : "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Amount:</strong> ${invoice.amount?.toFixed(2) || "0.00"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Status:</strong> {invoice.status}
            </p>
          </div>
          <p className="text-sm text-red-600 mt-2">
            This action cannot be undone.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm mb-4">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
