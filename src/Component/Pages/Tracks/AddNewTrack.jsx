import React, { useState } from "react";
import { IoClose } from "react-icons/io5"; // Import a close icon

const AddNewTrack = ({ isOpen, onClose, onAddTrack }) => {
  const [trackName, setTrackName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [instructor, setInstructor] = useState("");
  const [picture, setPicture] = useState(null);
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTrack = {
      name: trackName,
      price: price,
      duration: duration,
      instructor: instructor,
      image: picture ? URL.createObjectURL(picture) : null, // Create a temporary URL for preview
      description: description,
      _id: Date.now().toString(), // Simple unique ID for demonstration
    };
    onAddTrack(newTrack);
    onClose();
    // Reset form fields
    setTrackName("");
    setPrice("");
    setDuration("");
    setInstructor("");
    setPicture(null);
    setDescription("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <IoClose size={24} />
        </button>
        <h2 className="text-[28px] font-bold font-figtree mb-6 text-tert text-center">
          Add New Track
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="trackName"
              className="block text-black text-sm font-medium mb-2"
            >
              Track name
            </label>
            <input
              type="text"
              id="trackName"
              className="shadow-lg appearance-auto  rounded w-full py-2 px-3 text-gray-700 leading-1.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={trackName}
              onChange={(e) => setTrackName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              className="shadow-lg appearance-auto  rounded w-full py-2 px-3 text-gray-700 leading-1.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="duration"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Duration
            </label>
            <input
              type="text"
              id="duration"
              className="shadow-lg appearance-auto  rounded w-full py-2 px-3 text-gray-700 leading-1.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="instructor"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Instructor
            </label>
            <input
              type="text"
              id="instructor"
              className="shadow-lg appearance-auto  rounded w-full py-2 px-3 text-gray-700 leading-1.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="picture"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Picture
            </label>
            <input
              type="file"
              id="picture"
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-1 file:text-sm "
              onChange={(e) => setPicture(e.target.files[0])}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="3"
              className="shadow-lg appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 w-full focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              Create track
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewTrack;
