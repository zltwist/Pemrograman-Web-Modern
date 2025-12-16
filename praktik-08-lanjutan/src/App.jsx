import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Identity from "./components/Identity";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

const App = () => {
  return (
    <>
      <Identity />
      <BrowserRouter basename="/praktik-08-lanjutan">
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            } 
          >
            {/* Rute yang berada di dalam Layout dan dilindungi oleh ProtectedRoute */}
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="logout" element={<Logout />} />
          </Route>
          
          {/* Rute yang tidak menggunakan Layout dan tidak dilindungi */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
