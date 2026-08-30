import React from "react";
import RecordModel from "./RecordModel";

export default function EmployeeManagementUI() {
  return (
    <div className="min-h-screen font-mono bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto space-y-4">
        {/* Header Section */}
        <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">
            Employee Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage employee records with Redux Toolkit
          </p>
        </div>


        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-3/4">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 text-sm">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search by name, email or position"
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>
          <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md text-sm transition flex items-center justify-center gap-1">
            <span className="text-base leading-none">+</span> Add New Record
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">NAME</th>
                <th className="py-3 px-4">EMAIL</th>
                <th className="py-3 px-4">PHONE</th>
                <th className="py-3 px-4">POSITION</th>
                <th className="py-3 px-4">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-xs text-gray-700">
              {/* Static Row 1 */}
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4">1</td>
                <td className="py-3 px-4 font-medium">John Doe</td>
                <td className="py-3 px-4">john@gmail.com</td>
                <td className="py-3 px-4">65656565</td>
                <td className="py-3 px-4">Full Stack Developer</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs flex items-center gap-1">
                      ✎ Edit
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs flex items-center gap-1">
                      🗑 Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="p-3 text-xs text-gray-500 bg-gray-50 border-t border-gray-200">
            Showing Sorted Records of All Records
          </div>
        </div>
      </div>
      {/* <RecordModel/> */}
    </div>
  );
}
