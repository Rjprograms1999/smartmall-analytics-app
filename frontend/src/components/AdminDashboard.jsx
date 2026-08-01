import React, { useState, useEffect } from "react";
import api from "../api";
import StoreList from "./StoreList";
import TrendChart from "./TrendChart";
import WalkInLogForm from "./WalkInLogForm";

const AdminDashboard = ({ user }) => {
  const [stores, setStores] = useState([]);
  const [newStore, setNewStore] = useState({ name: "", category: "", floor: "", manager: "" });
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "storeManager", store: "" });
  const [newLog, setNewLog] = useState({ store: "", estimatedCustomerCount: "" });
  const [newTrend, setNewTrend] = useState({ category: "", trendScore: "" });

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await api.get("/api/stores");
      setStores(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateStore = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/stores", newStore);
      setNewStore({ name: "", category: "", floor: "", manager: "" });
      fetchStores();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/register", newUser);
      setNewUser({ name: "", email: "", password: "", role: "storeManager", store: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddLog = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/walkinlogs", newLog);
      setNewLog({ store: "", estimatedCustomerCount: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTrend = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/telcotrends", newTrend);
      setNewTrend({ category: "", trendScore: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Create Store</h2>
        <form onSubmit={handleCreateStore}>
          <input placeholder="Name" value={newStore.name} onChange={(e) => setNewStore({ ...newStore, name: e.target.value })} required />
          <input placeholder="Category" value={newStore.category} onChange={(e) => setNewStore({ ...newStore, category: e.target.value })} required />
          <input type="number" placeholder="Floor" value={newStore.floor} onChange={(e) => setNewStore({ ...newStore, floor: e.target.value })} required />
          <input placeholder="Manager ID" value={newStore.manager} onChange={(e) => setNewStore({ ...newStore, manager: e.target.value })} required />
          <button type="submit" className="btn">
            Create Store
          </button>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Register User</h2>
        <form onSubmit={handleRegisterUser}>
          <input placeholder="Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} required />
          <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} required />
          <input type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} required />
          <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
            <option value="storeManager">Store Manager</option>
            <option value="admin">Admin</option>
          </select>
          <input placeholder="Store ID" value={newUser.store} onChange={(e) => setNewUser({ ...newUser, store: e.target.value })} required={newUser.role === "storeManager"} />
          <button type="submit" className="btn">
            Register User
          </button>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Add Walk-In Log</h2>
        <form onSubmit={handleAddLog}>
          <input placeholder="Store ID" value={newLog.store} onChange={(e) => setNewLog({ ...newLog, store: e.target.value })} required />
          <input type="number" placeholder="Customer Count" value={newLog.estimatedCustomerCount} onChange={(e) => setNewLog({ ...newLog, estimatedCustomerCount: e.target.value })} required />
          <button type="submit" className="btn">
            Add Log
          </button>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Add Telco Trend</h2>
        <form onSubmit={handleAddTrend}>
          <input placeholder="Category" value={newTrend.category} onChange={(e) => setNewTrend({ ...newTrend, category: e.target.value })} required />
          <input type="number" placeholder="Trend Score" value={newTrend.trendScore} onChange={(e) => setNewTrend({ ...newTrend, trendScore: e.target.value })} required />
          <button type="submit" className="btn">
            Add Trend
          </button>
        </form>
      </div>
      <StoreList stores={stores} />
      <TrendChart />
    </div>
  );
};

export default AdminDashboard;
