import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import StoreManagerDashboard from "./components/StoreManagerDashboard";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Switch>
          <Route exact path="/login">
            <Login setUser={setUser} />
          </Route>
          <Route exact path="/admin">
            {user && user.role === "admin" ? <AdminDashboard user={user} /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/store-manager">
            {user && user.role === "storeManager" ? <StoreManagerDashboard user={user} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
