import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "employee_records"; // Single source of truth for key name

// Static Data
const demoRecords = [
  {
    id: 1,
    name: "Ahmad Hassan",
    role: "Frontend Developer",
    email: "ahmad.hassan@example.com",
    phone: "+92 300 1234567",
  },
  {
    id: 2,
    name: "Zainab Khan",
    role: "Backend Developer",
    email: "zainab.khan@example.com",
    phone: "+92 312 9876543",
  },
  {
    id: 3,
    name: "Bilal Shah",
    role: "UI/UX Designer",
    email: "bilal.shah@example.com",
    phone: "+92 333 4567890",
  },
  {
    id: 4,
    name: "Sara Ahmed",
    role: "Project Manager",
    email: "sara.ahmed@example.com",
    phone: "+92 321 6543210",
  },
  {
    id: 5,
    name: "Hamza Malik",
    role: "DevOps Engineer",
    email: "hamza.malik@example.com",
    phone: "+92 345 7890123",
  },
];

// Calculate next ID
const CalculateNextId = (records) => {
  if (!records || records.length === 0) return 1;
  return Math.max(...records.map((r) => r.id)) + 1;
};

// Safe LocalStorage Retrieval
const GetDataFromLocalStorage = () => {
  try {
    const savedRecord = localStorage.getItem(STORAGE_KEY);
    return savedRecord ? JSON.parse(savedRecord) : demoRecords;
  } catch (error) {
    console.error("Error reading localStorage:", error);
    return demoRecords;
  }
};

// Safe LocalStorage Save
const SaveToLocalStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

const recordSlice = createSlice({
  name: "employeeRecord",
  initialState: {
    items: GetDataFromLocalStorage(),
    searchTerms: "",
    nextId: CalculateNextId(GetDataFromLocalStorage()),
  },
  reducers: {
    // Add record
    addRecord: (state, action) => {
      const newRecord = { id: state.nextId, ...action.payload };
      state.items.push(newRecord);
      state.nextId = CalculateNextId(state.items);
      SaveToLocalStorage(state.items);
    },

    // Update record
    updateRecord: (state, action) => {
      const { id, data } = action.payload;
      const index = state.items.findIndex((r) => r.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...data };
        SaveToLocalStorage(state.items);
      }
    },

    // Delete record (Handles both ID directly or Object with ID)
    deleteRecord: (state, action) => {
      const idToDelete =
        typeof action.payload === "object" ? action.payload.id : action.payload;
      state.items = state.items.filter((r) => r.id !== idToDelete);
      SaveToLocalStorage(state.items);
    },

    // Search term
    setSearchTerm: (state, action) => {
      state.searchTerms = action.payload;
    },

    // Reset records
    resetRecords: (state) => {
      state.items = demoRecords;
      state.nextId = CalculateNextId(demoRecords);
      SaveToLocalStorage(demoRecords);
    },
  },
});

export const {
  addRecord,
  updateRecord,
  setSearchTerm,
  resetRecords,
  deleteRecord,
} = recordSlice.actions;

// Note: Change 'state.records' to match your store configuration key
// e.g., if store has { records: recordSlice }, keep state.records
export const selectAllRecords = (state) => state.records?.items || [];
export const selectSearchTerm = (state) => state.records?.searchTerms || "";

export const selectFilteredRecords = (state) => {
  const items = state.records?.items || [];
  const term = (state.records?.searchTerms || "").toLowerCase();

  if (!term) return items;

  return items.filter(
    (r) =>
      r.name?.toLowerCase().includes(term) ||
      r.email?.toLowerCase().includes(term) ||
      r.role?.toLowerCase().includes(term),
  );
};

export default recordSlice.reducer;
