// App.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contacts from "./pages/Contacts";
import FAQ from "./pages/FAQ";
import WhyVelora from "./pages/WhyVelora";
import Shop from './pages/Shop';
import QuizForm from './pages/QuizForm';

// Admin

import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ManageProducts from "./pages/admin/ManageProducts";
import Notifications from "./pages/admin/Notifications";
import Feedback from "./pages/admin/Feedback";
import Activities from "./pages/admin/Activities";
import SwitchView from "./pages/admin/SwitchView";
import { ToastContainer } from "react-toastify";

const App = () => {
  const location = useLocation(); // Hook to get the current path
  const isAdminRoute = location.pathname.startsWith("/admin"); // Check if admin page

  return (
    <>
      {/* Toasts System */}
      <ToastContainer />

      {/* Show Navbar only on non-admin pages */}
      {!isAdminRoute && <Navbar />}

      {/* Routing */}
      <Routes>
        {/* User Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/whyvelora" element={<WhyVelora />} />
        <Route path="/quiz" element={<QuizForm />} />

        {/* Admin Pages */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="activities" element={<Activities />} />
          <Route path="switchview" element={<SwitchView />} />
        </Route>
      </Routes>

      {/* Show Footer only on non-admin pages */}
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
