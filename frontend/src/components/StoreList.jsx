import React, { useState, useEffect } from "react";
import axios from "axios";

const StoreList = ({ stores }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const res = await axios.get("http://localhost:5000/api/stores/recommendations", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setRecommendations(res.data);
    };
    fetchRecommendations();
  }, []);

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Stores & Recommendations</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Category</th>
            <th className="p-2">Floor</th>
            <th className="p-2">Recommendation</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store._id} className="border-b">
              <td className="p-2">{store.name}</td>
              <td className="p-2">{store.category}</td>
              <td className="p-2">{store.floor}</td>
              <td className="p-2">{recommendations.find((r) => r.store === store.name)?.recommendation || "No recommendation"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoreList;
