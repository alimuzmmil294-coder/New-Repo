import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addRecord, updateRecord } from "../features/RecordSlice";

export default function RecordModel({ isOpen, onClose, currentRecord }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  // Handle Input Changes
  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Populate or Clear Form Data when Modal opens or currentRecord changes
  useEffect(() => {
    if (currentRecord) {
      setFormData({
        name: currentRecord.name || "",
        email: currentRecord.email || "",
        phone: currentRecord.phone || "",
        role: currentRecord.role || "",
      });
    } else {
      setFormData({ name: "", email: "", phone: "", role: "" });
    }
  }, [currentRecord, isOpen]);

  // 1. Move early exit to the component body so modal doesn't display when closed
  if (!isOpen) return null;

  // Handle Form Submission
  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    // 2. Fixed .trim() function call
    if (!formData.name.trim() || !formData.email.trim()) {
      return alert("Name and Email are Required!");
    }

    if (currentRecord) {
      // 3. Fixed: extract currentRecord.id instead of passing the entire object
      dispatch(updateRecord({ id: currentRecord.id, data: formData }));
    } else {
      dispatch(addRecord(formData));
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex justify-center items-center p-4 font-sans z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden border border-gray-100">
        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-800">
            {currentRecord ? "Edit Record" : "Register New Record"}
          </h2>
          {/* 4. Added onClick handler to close button */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-semibold text-lg leading-none cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Modal Body / Form Inputs */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              onChange={handleFormData}
              value={formData.name}
              name="name"
              type="text"
              placeholder="Enter full name"
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              onChange={handleFormData}
              value={formData.email}
              name="email"
              type="email"
              placeholder="Enter email address"
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Phone
            </label>
            <input
              onChange={handleFormData}
              value={formData.phone}
              name="phone"
              type="text"
              placeholder="Enter phone number"
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Position
            </label>
            <input
              onChange={handleFormData}
              value={formData.role}
              name="role"
              type="text"
              placeholder="Enter Role"
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
            />
          </div>

          {/* Modal Footer / Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 text-gray-600 text-xs rounded-md hover:bg-gray-50 transition font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md transition font-medium cursor-pointer"
            >
              {currentRecord ? "Update" : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
