import React, { useState, useEffect } from "react";
import {
  FaEye,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaVenusMars,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import Title from "../../Titles/titles";
import Subt from "../../Titles/subt";
import SearchBar from "../../../Component/Buttons/SearchBar/SearchBar";
import { getAllLearners } from "./LearnersService";
import { getAllInvoices } from "../Invoices/InvoiceService";
import { getEnrollmentsByLearnerId } from "../../../LearnerDesktop/CheckOut/enrollmentService";
const Learners = () => {
  const [learners, setLearners] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const learnersPerPage = 10;

  // State for the details modal
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedLearner, setSelectedLearner] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const learnersData = await getAllLearners();
        const invoicesData = await getAllInvoices();
        setLearners(Array.isArray(learnersData) ? learnersData : []);
        setInvoices(Array.isArray(invoicesData) ? invoicesData : []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const getLearnerTotalAmount = (learnerId) => {
    return invoices
      .filter(
        (invoice) =>
          invoice.learner?._id === learnerId &&
          invoice.status.toLowerCase() === "paid"
      )
      .reduce((total, invoice) => total + invoice.amount, 0);
  };

  const handleViewDetails = (learner) => {
    setSelectedLearner(learner);
    setShowDetailsModal(true);
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
        <div className="w-full md:w-1/2">
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
              <tr className="border-b">
                <th className="p-4">LEARNER</th>
                <th className="p-4">COURSES</th>
                <th className="p-4">DATE JOINED</th>
                <th className="p-4">AMOUNT</th>
                <th className="p-4">GENDER</th>
                <th className="p-4">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentLearners.map((learner) => {
                const fullName = `${learner.firstName} ${learner.lastName}`;
                const initials = `${learner.firstName?.[0] || ""}${
                  learner.lastName?.[0] || ""
                }`.toUpperCase();
                const totalAmount = getLearnerTotalAmount(learner._id);
                return (
                  <tr key={learner._id} className="hover:bg-gray-50">
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
                        <p className="text-sm text-gray-500">{learner.email}</p>
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
                        onClick={() => handleViewDetails(learner)}
                        title="View Details"
                      >
                        <FaEye className="text-gray-500 hover:text-gray-700" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center gap-2">
          {/* Pagination Controls */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
      {showDetailsModal && (
        <LearnerDetailsModal
          learner={selectedLearner}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
};

// --- MODAL COMPONENT ---

const LearnerDetailsModal = ({ learner, onClose }) => {
  const [enrollments, setEnrollments] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(true);

  useEffect(() => {
    if (!learner) return;
    const fetchDetails = async () => {
      try {
        setLoadingDetails(true);
        const invoicesData = await getAllInvoices();
        const enrollmentsData = await getEnrollmentsByLearnerId(learner._id);

        setInvoices(
          invoicesData.filter((inv) => inv.learner?._id === learner._id)
        );
        setEnrollments(Array.isArray(enrollmentsData) ? enrollmentsData : []);
      } catch (error) {
        console.error("Failed to fetch modal details:", error);
      } finally {
        setLoadingDetails(false);
      }
    };
    fetchDetails();
  }, [learner]);

  if (!learner) return null;

  const totalAmountPaid = invoices
    .filter((inv) => inv.status.toLowerCase() === "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const fullName = `${learner.firstName} ${learner.lastName}`;
  const initials = `${learner.firstName?.[0] || ""}${
    learner.lastName?.[0] || ""
  }`.toUpperCase();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold">Learner Details</h1>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <IoClose size={28} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 flex flex-col items-center text-center">
            {learner.image ? (
              <img
                src={learner.image}
                alt={fullName}
                className="w-32 h-32 rounded-full object-cover mb-4 ring-4 ring-blue-100"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-4xl mb-4">
                {initials}
              </div>
            )}
            <h2 className="text-xl font-bold">{fullName}</h2>
            <p className="text-gray-500 text-sm">{learner.email}</p>
            <div className="mt-6 text-left space-y-3 w-full">
              <div className="flex items-center">
                <FaPhone className="mr-3 text-gray-400" />
                <span>{learner.contact || "N/A"}</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-3 text-gray-400" />
                <span>{learner.location || "N/A"}</span>
              </div>
              <div className="flex items-center">
                <FaVenusMars className="mr-3 text-gray-400" />
                <span>{learner.gender || "N/A"}</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <div>
              <h3 className="text-lg font-bold border-b pb-2 mb-4">Bio</h3>
              <p className="text-gray-700">
                {learner.description || "No bio provided."}
              </p>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-bold border-b pb-2 mb-4">
                Program Enrolled
              </h3>
              {loadingDetails ? (
                <p>Loading enrollments...</p>
              ) : enrollments.length > 0 ? (
                <ul className="space-y-2">
                  {enrollments.map((enrollment) => (
                    <li
                      key={enrollment._id}
                      className="p-3 bg-gray-50 rounded-md font-medium"
                    >
                      {enrollment.track?.name || "Track name not available"}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Not enrolled in any programs.</p>
              )}
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-bold border-b pb-2 mb-4">
                Financials
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold">
                  Total Amount Paid:{" "}
                  <span className="text-green-600">
                    ${totalAmountPaid.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learners;
