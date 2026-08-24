import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  incrementByAmount,
  decrement,
} from "./features/counterSlice";

const App = () => {
  const [value, setValue] = useState("");
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const handleIncrementByAmount = () => {
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      dispatch(incrementByAmount(numValue));
      setValue("");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.subtitle}>Redux Counter</h2>
        <h1 style={styles.counterDisplay}>{count}</h1>

        <div style={styles.buttonGroup}>
          <button
            style={styles.iconButton}
            onClick={() => dispatch(decrement())}
          >
            -
          </button>
          <button
            style={styles.iconButton}
            onClick={() => dispatch(increment())}
          >
            +
          </button>
        </div>

        <div style={styles.inputSection}>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter amount..."
            style={styles.input}
          />
          <button
            disabled={!value}
            onClick={handleIncrementByAmount}
            style={{
              ...styles.primaryButton,
              ...(!value ? styles.disabledButton : {}),
            }}
          >
            Add Amount
          </button>
        </div>
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "2.5rem",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
    textAlign: "center",
    width: "100%",
    maxWidth: "360px",
  },
  subtitle: {
    margin: 0,
    fontSize: "0.875rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: "#6b7280",
    fontWeight: "600",
  },
  counterDisplay: {
    fontSize: "4rem",
    margin: "1rem 0 1.5rem",
    color: "#111827",
    fontWeight: "700",
  },
  buttonGroup: {
    display: "flex",
    gap: "0.75rem",
    justifyContent: "center",
    marginBottom: "1.5rem",
  },
  iconButton: {
    flex: "1",
    padding: "0.75rem",
    fontSize: "1.5rem",
    fontWeight: "600",
    backgroundColor: "#e5e7eb",
    color: "#1f2937",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  inputSection: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  input: {
    padding: "0.75rem",
    fontSize: "1rem",
    border: "1.5px solid #d1d5db",
    borderRadius: "8px",
    outline: "none",
    textAlign: "center",
  },
  primaryButton: {
    padding: "0.75rem",
    fontSize: "1rem",
    fontWeight: "600",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  disabledButton: {
    backgroundColor: "#9ca3af",
    cursor: "not-allowed",
  },
};

export default App;
