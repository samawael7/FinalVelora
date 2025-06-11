import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminTopBar from "../../components/AdminTopBar";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import CountUp from "react-countup";
import { FaShoePrints, FaChartLine, FaDollarSign, FaUsers } from "react-icons/fa";

const salesData = [
  { date: "22 Jul", income: 4000, expense: 2400 },
  { date: "23 Jul", income: 3000, expense: 1398 },
  { date: "24 Jul", income: 2000, expense: 9800 },
  { date: "25 Jul", income: 2780, expense: 3908 },
  { date: "26 Jul", income: 1890, expense: 4800 },
  { date: "27 Jul", income: 2390, expense: 3800 },
  { date: "28 Jul", income: 3490, expense: 4300 },
];

const customerData = [
  { date: "22 Jul", newCustomers: 240 },
  { date: "23 Jul", newCustomers: 180 },
  { date: "24 Jul", newCustomers: 300 },
  { date: "25 Jul", newCustomers: 270 },
  { date: "26 Jul", newCustomers: 220 },
  { date: "27 Jul", newCustomers: 320 },
  { date: "28 Jul", newCustomers: 280 },
];

const Dashboard = () => {
  return (
    <>
      <AdminSidebar />
      <AdminTopBar />

      <div style={{
        marginLeft: "250px",
        paddingTop: "80px",
        padding: "80px 25px 25px 25px",
        backgroundColor: "#F3F4F6",
        minHeight: "100vh"
      }}>
        {/* Overview Cards */}
        <div className="row g-4 mb-4">
          {[
            { title: "Total Revenue", value: 82650, suffix: "$", icon: <FaDollarSign />, change: "+11%" },
            { title: "Total Orders", value: 1645, suffix: "", icon: <FaChartLine />, change: "+11%" },
            { title: "Total Customers", value: 1462, suffix: "", icon: <FaUsers />, change: "-17%" },
          ].map((card, index) => (
            <div className="col-md-4" key={index}>
              <div
                className="p-3 d-flex flex-column gap-2 shadow-sm rounded"
                style={{ backgroundColor: "#ffffff", border: "1px solid #E5E7EB" }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="fw-semibold text-muted mb-1" style={{ fontSize: "14px" }}>{card.title} (Last 30 days)</p>
                    <h3 className="fw-bold mb-0">
                      {card.suffix}<CountUp end={card.value} duration={2} separator="," />
                    </h3>
                  </div>
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "40px", backgroundColor: "#E0F2FE", color: "#0284C7" }}
                  >
                    {card.icon}
                  </div>
                </div>
                <span
                  className="fw-semibold"
                  style={{ color: card.change.includes("+") ? "#16A34A" : "#DC2626", fontSize: "14px" }}
                >
                  {card.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Chart Section: Two Side-by-Side Charts */}
        <div className="row g-4 mb-4">
          {/* Sales Chart */}
          <div className="col-lg-6">
            <div className="shadow-sm rounded p-3 h-100" style={{ backgroundColor: "#ffffff", border: "1px solid #E5E7EB" }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold">Sales Analytics</h5>
                <select className="form-select form-select-sm w-auto">
                  <option>Jul 2023</option>
                  <option>Aug 2023</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* New Customers Chart */}
          <div className="col-lg-6">
            <div className="shadow-sm rounded p-3 h-100" style={{ backgroundColor: "#ffffff", border: "1px solid #E5E7EB" }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold">New Customers Analytics</h5>
                <select className="form-select form-select-sm w-auto">
                  <option>Jul 2023</option>
                  <option>Aug 2023</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={customerData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="newCustomers" stroke="#3B82F6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="shadow-sm rounded p-3" style={{ backgroundColor: "#ffffff", border: "1px solid #E5E7EB" }}>
          <h5 className="fw-bold mb-3">Top Selling Products</h5>
          <div className="d-flex gap-3 flex-wrap">
            {["acne cream", "serum", "product 1", "product 2"].map((product, index) => (
              <div
                key={index}
                className="d-flex flex-column align-items-center justify-content-center rounded shadow-sm"
                style={{
                  width: "140px",
                  padding: "15px",
                  backgroundColor: "#F3F4F6",
                  border: "1px solid #E5E7EB"
                }}
              >
                <div
                  style={{
                    width: "100px",
                    height: "80px",
                    backgroundColor: "#E5E7EB",
                    borderRadius: "8px",
                  }}
                  className="mb-2 d-flex justify-content-center align-items-center"
                >
                  <FaShoePrints size={24} color="#6B7280" />
                </div>
                <span className="fw-semibold text-center" style={{ fontSize: "14px" }}>
                  {product}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;