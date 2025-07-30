import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

import Title from "../../Titles/titles";
import Subt from "../../Titles/subt";
import SearchBar from "../../Buttons/Searchbar";
import { getAllLearners } from "./LearnersService";
import { getAllInvoices } from "../Invoices/InvoiceService";

const Learners = () => {
  const [learners, setLearners] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const learnersPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        // Fetch both learners and invoices at the same time
        const learnersData = await getAllLearners();
        const invoicesData = await getAllInvoices();
        setLearners(Array.isArray(learnersData) ? learnersData : []);
        setInvoices(Array.isArray(invoicesData) ? invoicesData : []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLearners([]);
        setInvoices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  // Function to calculate the total 'Paid' amount for a specific learner
  const getLearnerTotalAmount = (learnerId) => {
    return invoices
      .filter(
        (invoice) =>
          invoice.learner?._id === learnerId &&
          invoice.status.toLowerCase() === "paid"
      )
      .reduce((total, invoice) => total + invoice.amount, 0);
  };

  const handleViewDetails = (learnerId) => {
    navigate(`/learners/${learnerId}`);
  };

  const filteredLearners = learners.filter((learner) => {
    const fullName = `${learner.firstName || ""} ${learner.lastName || ""}`;
    return fullName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const indexOfLastLearner = currentPage * learnersPerPage;
  const indexOfFirstLearner = indexOfLastLearner - learnersPerPage;
  const currentLearners = filteredLearners.slice(
    indexOfFirstLearner,
    indexOfLastLearner
  );
  const totalPages = Math.ceil(filteredLearners.length / learnersPerPage);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Title text="Manage Learners" />
      <Subt text="Filter, sort, and access detailed learner information" />

      <div className="mt-6 flex items-center justify-end">
        <div className="w-full md:w-1/3">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Search by learner name..."
          />
        </div>
      </div>

      <div className="mt-8 bg-white p-4 rounded-xl shadow overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-500 p-8">Loading learners...</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="">
                <th className="p-3 text-[#2E2C48] text-[16px] font-light font-figtree">
                  LEARNER
                </th>
                <th className="p-3 text-[#2E2C48] text-[16px] font-light font-figtre">
                  COURSES
                </th>
                <th className="p-4 text-[#2E2C48] text-[16px] font-light font-figtree">
                  DATE JOINED
                </th>
                <th className="p-4 text-[#2E2C48] text-[16px] font-light font-figtree">
                  AMOUNT
                </th>
                <th className="p-4 text-[#2E2C48] text-[16px] font-light font-figtree">
                  GENDER
                </th>
                <th className="p-4 text-[#2E2C48] text-[16px] font-light font-figtree">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {currentLearners.length > 0 ? (
                currentLearners.map((learner) => {
                  const fullName = `${learner.firstName} ${learner.lastName}`;
                  const initials = `${learner.firstName?.[0] || ""}${
                    learner.lastName?.[0] || ""
                  }`.toUpperCase();
                  const totalAmount = getLearnerTotalAmount(learner._id);

                  return (
                    <tr key={learner._id} className="hover:bg-gray-50 ">
                      <td className="p-4 flex items-center gap-4">
                        {learner.image ? (
                          <img
                            src={learner.image}
                            alt={fullName}
                            className="w-10 h-10 object-cover rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
                            {initials}
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{fullName}</p>
                          <p className="text-sm text-gray-500">
                            {learner.email}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">
                        {learner.enrollments?.length || 0}
                      </td>
                      <td className="p-4 text-gray-600">
                        {new Date(learner.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-gray-600 font-semibold">
                        ${totalAmount.toFixed(2)}
                      </td>
                      <td className="p-4 text-gray-600">
                        {learner.gender || "N/A"}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleViewDetails(learner._id)}
                          title="View Details"
                        >
                          <FaEye className="text-gray-500 hover:text-gray-700" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-8 text-gray-500">
                    No learners found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center gap-2">
          {/* Pagination Controls */}
        </div>
      )}
    </div>
  );
};

export default Learners;
