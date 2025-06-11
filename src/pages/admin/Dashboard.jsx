import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminTopBar from "../../components/AdminTopBar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { FaChartLine, FaDollarSign, FaUsers } from "react-icons/fa";

const Dashboard = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [timeView, setTimeView] = useState("Weekly");
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  const COLORS = ["#FF4081", "#4ADE80", "#6554E8", "#00B2FF", "#FFB347"];

  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
  });

  const fetchWithAuth = (url) => {
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  useEffect(() => {
    fetchWithAuth("https://localhost:7182/api/Admin/sales/total")
      .then((res) => res.json())
      .then((data) =>
        setStats((prev) => ({ ...prev, totalRevenue: data }))
      );

    fetchWithAuth("https://localhost:7182/api/Admin/sales/orders/count")
      .then((res) => res.json())
      .then((data) =>
        setStats((prev) => ({ ...prev, totalOrders: data }))
      );

    fetchWithAuth("https://localhost:7182/api/Admin/users/count")
      .then((res) => res.json())
      .then((data) =>
        setStats((prev) => ({ ...prev, totalCustomers: data.usersCount }))
      );

    fetchWithAuth("https://localhost:7182/api/Admin/sales/recent-orders")
      .then((res) => res.json())
      .then((data) => {
        setRecentOrders(data);
        setFilteredData(data);
      });

    fetchWithAuth("https://localhost:7182/api/Admin/sales/top-products")
      .then((res) => res.json())
      .then((data) => {
        setTopProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);

    const filteredOrders = recentOrders.filter(
      (data) =>
        (data.orderDate &&
          data.orderDate.toLowerCase().includes(value.toLowerCase())) ||
        (data.totalAmount && data.totalAmount.toString().includes(value))
    );
    setFilteredData(filteredOrders);

    const filteredTopProducts = topProducts.filter(
      (product) =>
        (product.productName &&
          product.productName.toLowerCase().includes(value.toLowerCase())) ||
        (product.salesCount && product.salesCount.toString().includes(value))
    );
    setFilteredProducts(filteredTopProducts);
  };

  return (
    <>
      <AdminSidebar />
      <AdminTopBar searchText={searchText} onSearch={handleSearch} />

      <div
        style={{
          marginLeft: "250px",
          paddingTop: "80px",
          padding: "80px 25px 25px 25px",
          backgroundColor: "#F3F4F6",
          minHeight: "100vh",
        }}
      >
        {/* Cards Section */}
        <motion.div
          className="row g-4 mb-4 d-flex align-items-stretch"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {[
            {
              title: "Total Revenue",
              value: stats.totalRevenue,
              suffix: "$",
              icon: <FaDollarSign />,
              change: "+11%",
            },
            {
              title: "Total Orders",
              value: stats.totalOrders,
              suffix: "",
              icon: <FaChartLine />,
              change: "+11%",
            },
            {
              title: "Total Customers",
              value: stats.totalCustomers,
              suffix: "",
              icon: <FaUsers />,
              change: "-17%",
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              className="col-md-4 d-flex"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 180 }}
            >
              <div
                className="p-3 rounded shadow flex-fill d-flex flex-column justify-content-between"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #E5E7EB",
                  transition: "0.3s",
                  boxShadow:
                    "0 0 10px rgba(101, 84, 232, 0.1), 0 6px 12px rgba(0,0,0,0.03)",
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p
                      className="text-muted fw-medium mb-1"
                      style={{ fontSize: "12px" }} // أصغر
                    >
                      {card.title} (Last 30 days)
                    </p>
                    <h4 className="fw-bold text-dark" style={{ fontSize: "1.5rem" }}>
                      {card.suffix}
                      <CountUp end={card.value} duration={1.4} separator="," />
                    </h4>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    style={{
                      backgroundColor: "#6554E8",
                      color: "#fff",
                      width: "36px", // أصغر
                      height: "36px", // أصغر
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {card.icon}
                  </motion.div>
                </div>
                <span
                  className="fw-semibold"
                  style={{
                    color: card.change.includes("+") ? "#4ADE80" : "#EF4444",
                    fontSize: "12px", // أصغر
                  }}
                >
                  {card.change}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts */}
        <div className="row g-4 mb-4">
          {/* Orders Line Chart */}
          <motion.div
            className="col-lg-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="shadow rounded p-3 h-100"
              style={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold text-dark mb-0">
                  Recent Orders Overview
                </h5>
                <select
                  className="form-select form-select-sm"
                  value={timeView}
                  onChange={(e) => setTimeView(e.target.value)}
                  style={{
                    width: "120px",
                    borderColor: "#6554E8",
                    color: "#6554E8",
                    fontWeight: "500",
                  }}
                >
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredData}>
                  <XAxis dataKey="orderDate" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="totalAmount"
                    stroke="#22C55E"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Top Products Pie Chart */}
          <motion.div
            className="col-lg-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="shadow rounded p-3 h-100"
              style={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }}
            >
              <h5 className="fw-bold text-dark mb-3">Top Selling Products</h5>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={filteredProducts.map((p) => ({
                      ...p,
                      productName: `Product #${p.productId}`,
                      salesCount: p.totalQuantity,
                    }))}
                    dataKey="salesCount"
                    nameKey="productName"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                  >
                    {filteredProducts.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
