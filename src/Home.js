import React from "react";
import { Route, Routes } from "react-router-dom";
import AddExtension from "./admin/AddExtension";
import Dashboard from "./admin/Dashboard";
import EditExtension from "./admin/EditExtension";
import Login from "./admin/Login";
import App from "./App";

const Home = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Administrator" element={<Login />} />
        <Route path="/Admin/Dashboard" element={<Dashboard />} />
        <Route path="/Admin/AddNew" element={<AddExtension />} />
        <Route path="/extension/edit/:id" element={<EditExtension />} />
      </Routes>
    </div>
  );
};

export default Home;
