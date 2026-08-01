import React, { useState, useEffect } from "react";
import api from "../api";
import StoreList from "./StoreList";
import TrendChart from "./TrendChart";
import WalkInLogForm from "./WalkInLogForm";

const StoreManagerDashboard = ({ user }) => {
  const [stores, setStores] = useState([]);
  const [newLog, setNewLog] = useState({ estimatedCustomerCount: "" });

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await api.get("/api/stores");
      setStores(res.data.filter((s) => s.manager === user.id)); // Filter for assigned store
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddLog = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/walkinlogs", { store: user.store, ...newLog });
      setNewLog({ estimatedCustomerCount: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="text-3xl font-bold mb-6">Store Manager Dashboard</h1>
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Add Walk-In Log</h2>
        <form onSubmit={handleAddLog}>
          <input type="number" placeholder="Customer Count" value={newLog.estimatedCustomerCount} onChange={(e) => setNewLog({ estimatedCustomerCount: e.target.value })} required />
          <button type="submit" className="btn">
            Add Log
          </button>
        </form>
      </div>
      <StoreList stores={stores} />
      <TrendChart user={user} />
    </div>
  );
};

export default StoreManagerDashboard;
