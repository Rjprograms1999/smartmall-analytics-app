import React, { useState } from "react";
import axios from "axios";

const WalkInLogForm = ({ user }) => {
  const [count, setCount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/walkinlogs", { store: user.store, estimatedCustomerCount: count }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      setCount("");
      alert("Walk-in log added");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Add Walk-In Log</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Estimated Customer Count</label>
          <input type="number" value={count} onChange={(e) => setCount(e.target.value)} className="w-full p-2 border rounded-md" required />
        </div>
        <button type="submit" className="btn">
          Add Log
        </button>
      </form>
    </div>
  );
};

export default WalkInLogForm;
