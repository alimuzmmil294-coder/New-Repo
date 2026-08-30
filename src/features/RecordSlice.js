import { createSlice } from "@reduxjs/toolkit";

// Static Data
const demoRecords = [
  {
    id: 1,
    name: "Ahmad Hassan",
    role: "Frontend Developer",
    email: "ahmad.hassan@example.com",
  },
  {
    id: 2,
    name: "Zainab Khan",
    role: "Backend Developer",
    email: "zainab.khan@example.com",
  },
  {
    id: 3,
    name: "Bilal Shah",
    role: "UI/UX Designer",
    email: "bilal.shah@example.com",
  },
  {
    id: 4,
    name: "Sara Ahmed",
    role: "Project Manager",
    email: "sara.ahmed@example.com",
  },
  {
    id: 5,
    name: "Hamza Malik",
    role: "DevOps Engineer",
    email: "hamza.malik@example.com",
  },
];

// Function to calcute next id
const CalculateNextId = (records) => {
  if (!records || records.length === 0) return 1;
  return Math.max(...records.map((r) => r.id));
};

// Function for getting data from LocalStorage...
const GetDataFromLocalStorage = () => {
  try {
    const savedRecord = localStorage.getItem("EmployeesRecords");
    return savedRecord ? JSON.parse(savedRecord) : demoRecords;
  } catch (error) {
    console.error("Error! something went wrong...");
  }
};

const recordSlice = createSlice({
  name: "EmployeeRecord",
  initialState: {
    items: GetDataFromLocalStorage(),
    searchTerms: "",
    nextId: CalculateNextId(GetDataFromLocalStorage()),
  },
  reducers: {
    // Add the new records
    addRecord: (state, action) => {
      const newRecord = { id: state.nextId, ...action.payload };

      state.items.push(newRecord);

      localStorage.setItem("EmployeesRecords: ", JSON.stringify(state.items));
      state.nextId = CalculateNextId(state.items);
    },

    // Update Records
    updateRecord: (state, action) => {
      const { id, data } = action.payload;

      const index = state.items.findIndex((r) => r.id === id);
      if (index !== -1) {
      }
      state.items[index] = { ...state.items[index], ...data };
      localStorage.setItem("employeeRecords", JSON.stringify(state.items));
    },

    // Delete Records
    deleteRecord: (state, action) => {
      state.items = state.items.filter((r) => r.id !== action.payload);
      localStorage.setItem("employeeRecords", JSON.stringify(state.items));
    },

    //  Search Records
    setSearchTerm: (state, action) => {
      state.searchTerms = action.payload;
    },

    // Reset Records
    resetRecords: (state, action) => {
      state.items = demoRecords;
      state.nextId = CalculateNextId(demoRecords);
      localStorage.setItem("employeeRecords", JSON.stringify(demoRecords));
    },
  },
});

const { addRecord } = recordSlice.actions;

export default recordSlice.reducer;
