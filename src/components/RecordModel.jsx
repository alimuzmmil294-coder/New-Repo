import React from "react";

export default function RecordModel() {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex justify-center items-center p-4 font-sans">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden border border-gray-100">
        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-800">
            Register New Record
          </h2>
          <button className="text-gray-400 hover:text-gray-600 font-semibold text-lg leading-none">
            ×
          </button>
        </div>

        {/* Modal Body / Form Inputs */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
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
              type="email"
              placeholder="Enter email address"
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter phone number"
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Position <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter position"
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
            />
          </div>

          {/* Modal Footer / Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button className="px-4 py-2 border border-gray-200 text-gray-600 text-xs rounded-md hover:bg-gray-50 transition font-medium">
              Cancel
            </button>
            <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md transition font-medium">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
