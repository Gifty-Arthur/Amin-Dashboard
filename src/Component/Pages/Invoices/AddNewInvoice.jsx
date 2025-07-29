import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { createInvoice } from "./InvoiceService";
import { getAllLearners } from "../Learners/LearnersService";

const AddNewInvoice = ({ isOpen, onClose, onInvoiceAdded }) => {
  // State for form fields
  const [formData, setFormData] = useState({
    learner: "",
    amount: "",
    dueDate: "",
    status: "pending",
    paymentDetails: "",
  });

  const [allLearners, setAllLearners] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Fetch all learners when the modal opens to populate the dropdown
  useEffect(() => {
    if (isOpen) {
      const fetchLearnersForDropdown = async () => {
        try {
          const learnersData = await getAllLearners();
          console.log("Learners API Response:", learnersData);

          setAllLearners(Array.isArray(learnersData) ? learnersData : []);
        } catch (err) {
          console.error("Failed to fetch learners for dropdown:", err);
          setError("Could not load learners list.");
        }
      };
      fetchLearnersForDropdown();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const payload = {
        learner: formData.learner,
        amount: Number(formData.amount),
        status: formData.status,
        dueDate: formData.dueDate,
        paymentDetails: formData.paymentDetails,
      };

      const newInvoiceData = await createInvoice(payload);
      onInvoiceAdded(newInvoiceData.invoice || newInvoiceData.data);

      // Reset form and close modal on success
      resetForm();
      onClose();
    } catch (err) {
      const errorMessage =
        err.response?.data?.errors?.[0]?.message || "Failed to create invoice.";
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      learner: "",
      amount: "",
      dueDate: "",
      status: "pending",
      paymentDetails: "",
    });
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Invoice</h2>
          <button onClick={handleClose}>
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
              className="w-full p-2 border rounded bg-white"
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
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Payment Details</label>
            <input
              type="text"
              name="paymentDetails"
              value={formData.paymentDetails}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="e.g., Bank Transfer, Momo"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white"
              required
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
          </div>
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-primary text-white  w-full rounded-md disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create Invoice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewInvoice;
