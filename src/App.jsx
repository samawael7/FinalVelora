// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

// Public pages
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Contacts from "./pages/Contacts";
import Faq from "./pages/FAQ";
import WhyVelora from "./pages/WhyVelora";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";

// Admin layout and pages
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageOrders from "./pages/admin/ManageOrders";
import Feedback from "./pages/admin/Feedback";
import Notifications from "./pages/admin/Notifications";
import SwitchView from "./pages/admin/SwitchView";

// Protected route component
import PrivateRoute from "./routes/PrivateRoutes";

// Layout wrapper to hide footer on admin pages
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <LayoutWrapper>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/whyvelora" element={<WhyVelora />} />
          <Route path="/products/:id" element={<ProductDetails />} />

          {/* Protected Route Example */}
          <Route element={<PrivateRoute />}>
            <Route path="/products" element={<Products />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<ManageProducts />} />
            <Route path="orders" element={<ManageOrders />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="switchview" element={<SwitchView />} />
          </Route>
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  );
};

export default App;
