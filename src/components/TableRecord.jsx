import React, { useState } from "react";
import RecordModel from "./RecordModel";
import {
  selectSearchTerm,
  selectAllRecords,
  setSearchTerm,
  deleteRecord,
  selectFilteredRecords,
} from "../features/RecordSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  HiSearch,
  HiPlus,
  HiPencilAlt,
  HiTrash,
  HiXCircle,
} from "react-icons/hi";

export default function EmployeeManagementUI() {
  const dispatch = useDispatch();

  const filteredRecords = useSelector(selectFilteredRecords);
  const allRecords = useSelector(selectAllRecords);
  const searchRecords = useSelector(selectSearchTerm);

  // Copy array before sorting to prevent mutating Redux state directly
  const storedRecords = [...filteredRecords].sort((a, b) => b.id - a.id);

  const [showModal, setShowModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const openCreateModal = () => {
    setCurrentRecord(null);
    setShowModal(true);
  };

  const openEditModal = (record) => {
    setCurrentRecord(record);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentRecord(null);
  };

  const handleDelete = (record) => {
    dispatch(deleteRecord(record.id));
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 text-slate-800 selection:bg-indigo-50 selection:text-indigo-600">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Employee Directory
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage team access, roles, and member details
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-medium px-4 py-2.5 rounded-xl text-sm shadow-sm hover:shadow transition-all duration-200"
          >
            <HiPlus className="w-4 h-4" />
            <span>Add Employee</span>
          </button>
        </div>

        {/* Controls Section */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="relative w-full">
            <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
            <input
              type="text"
              value={searchRecords}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              placeholder="Search by name, email, or role..."
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 placeholder:text-slate-400"
            />
            {searchRecords && (
              <button
                onClick={() => dispatch(setSearchTerm(""))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <HiXCircle className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Data Table Container */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-5">ID</th>
                  <th className="py-3.5 px-5">Employee</th>
                  <th className="py-3.5 px-5">Phone</th>
                  <th className="py-3.5 px-5">Role</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {storedRecords.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-12 text-center text-slate-400"
                    >
                      <p className="font-medium text-slate-600">
                        No records found
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Try tweaking your search term or add a new record.
                      </p>
                    </td>
                  </tr>
                ) : (
                  storedRecords.map((rec) => (
                    <tr
                      key={rec.id}
                      className="group hover:bg-slate-50/80 transition-colors duration-150"
                    >
                      <td className="py-3.5 px-5 text-xs font-mono text-slate-400">
                        #{rec.id}
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-xs flex items-center justify-center shrink-0 border border-indigo-100">
                            {rec.name?.charAt(0).toUpperCase() || "E"}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-slate-900 truncate">
                              {rec.name}
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                              {rec.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-5 text-slate-600 font-mono text-xs">
                        {rec.phone || "—"}
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 capitalize border border-slate-200/50">
                          {rec.role || "Employee"}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => openEditModal(rec)}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-150"
                            title="Edit"
                          >
                            <HiPencilAlt className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(rec)}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors duration-150"
                            title="Delete"
                          >
                            <HiTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-5 py-3.5 text-xs text-slate-500 bg-slate-50/50 border-t border-slate-200/80 flex items-center justify-between">
            <span>
              Showing{" "}
              <strong className="font-semibold text-slate-700">
                {storedRecords.length}
              </strong>{" "}
              of{" "}
              <strong className="font-semibold text-slate-700">
                {allRecords.length}
              </strong>{" "}
              total records
            </span>
          </div>
        </div>
      </div>

      {/* Modal Container */}
      <RecordModel
        isOpen={showModal}
        onClose={closeModal}
        currentRecord={currentRecord}
      />
    </div>
  );
}
