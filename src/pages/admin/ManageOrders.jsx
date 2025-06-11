import React, { useState, useEffect } from "react";
import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

const getStatusCount = (status, data) =>
  data.filter((order) => order.orderStatus === status).length;

const getOrdersByDate = (data) => {
  const counts = {};
  data.forEach((order) => {
    // استخدم order.orderDate بدلاً من order.date
    const date = order.orderDate?.slice(0, 10); // خذ اليوم فقط
    if (date) {
      counts[date] = (counts[date] || 0) + 1;
    }
  });
  return Object.keys(counts).map((date) => ({
    date,
    count: counts[date],
  }));
};

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [ordersByDate, setOrdersByDate] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    fetch("https://localhost:7182/api/Admin/sales/recent-orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Orders from API:", data); // أضف هذا السطر هنا
        setOrders(data);
        setFilteredOrders(data);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  useEffect(() => {
    setOrdersByDate(getOrdersByDate(filteredOrders));
  }, [filteredOrders]);

  const handleSearch = () => {
    let updatedOrders = orders;

    if (searchText) {
      updatedOrders = updatedOrders.filter(
        (order) =>
          order.buyerEmail?.toLowerCase().includes(searchText.toLowerCase()) ||
          order.orderId?.toString().includes(searchText)
      );
    }

    if (statusFilter !== "All") {
      updatedOrders = updatedOrders.filter(
        (order) => order.orderStatus === statusFilter
      );
    }

    setFilteredOrders(updatedOrders);
  };

  useEffect(() => {
    handleSearch();
  }, [searchText, statusFilter, orders]);

  const handleStatusChange = (orderId, newStatus) => {
    fetch(`https://localhost:7182/api/OrderS/${orderId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newStatus) // هنا التعديل: ابعتي القيمة مباشرة كـ string
    })
      .then(async res => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          console.log("Status update error:", data);
          throw new Error(data.message || "Failed to update status");
        }
        setOrders(prev =>
          prev.map(order =>
            order.orderId === orderId ? { ...order, orderStatus: newStatus } : order
          )
        );
        setFilteredOrders(prev =>
          prev.map(order =>
            order.orderId === orderId ? { ...order, orderStatus: newStatus } : order
          )
        );
      })
      .catch(err => alert("Error updating status: " + err.message));
  };

  // Generate data for Pie Chart
  const statusData = [
    { name: "Placed", value: getStatusCount("Placed", filteredOrders) },
    { name: "Shipped", value: getStatusCount("Shipped", filteredOrders) },
    { name: "Cancelled", value: getStatusCount("Cancelled", filteredOrders) },
  ];

  const COLORS = ["#FFD700", "#32CD32", "#FF6347"]; // Colors for Pie Chart

  const fetchOrderDetails = (orderId) => {
    fetch(`https://localhost:7182/api/OrderS/${orderId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(data => setOrderDetails(data))
      .catch(err => alert("Error fetching order details: " + err.message));
  };

  return (
    <div
      style={{
        marginLeft: "250px",
        padding: "2rem",
        maxWidth: "calc(100% - 250px)",
        overflowX: "hidden",
        minHeight: "100vh",
        backgroundColor: "#F9FAFB",
      }}
    >
      {/* Status Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="row mb-4"
      >
        {[
          {
            label: "Placed",
            icon: <FaClock className="me-2 text-warning" />,
            bg: "#F3F4F6",
            count: getStatusCount("Placed", filteredOrders),
            delay: 0.1,
          },
          {
            label: "Shipped",
            icon: <FaCheckCircle className="me-2 text-success" />,
            bg: "#E6FFFA",
            count: getStatusCount("Shipped", filteredOrders),
            delay: 0.2,
          },
          {
            label: "Cancelled",
            icon: <FaTimesCircle className="me-2 text-danger" />,
            bg: "#FFF5F5",
            count: getStatusCount("Cancelled", filteredOrders),
            delay: 0.3,
          },
        ].map((card, idx) => (
          <motion.div
            key={card.label}
            className="col-md-4"
            whileHover={{
              scale: 1.04,
              boxShadow: "0 4px 24px rgba(120,91,249,0.09)",
            }}
            transition={{ type: "spring", stiffness: 200, delay: card.delay }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="p-3 rounded shadow-sm" style={{ background: card.bg }}>
              {card.icon}
              <span className="fw-bold">
                {card.label}: {card.count}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="row mb-5"
      >
        <div className="col-md-6">
          <h5 className="mb-3">Orders Over Time</h5>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={ordersByDate}
              barSize={32}
              margin={{ top: 20, right: 80, left: 20, bottom: 10 }}
            >
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#ccc" }}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="#785bf9"
                radius={[10, 10, 0, 0]}
              >
                <LabelList
                  dataKey="count"
                  position="top"
                  style={{ fontSize: 12, fill: "#333" }}
                />
                {ordersByDate.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`rgba(120, 91, 249, ${0.5 + index / ordersByDate.length})`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="col-md-6">
          <h5 className="mb-3">Order Status Distribution</h5>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Recent Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div>
          <motion.h5
            className="mb-3 fw-bold"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{
              letterSpacing: 1,
              color: "#785bf9",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <FaClock className="text-primary" />
            Recent Orders
          </motion.h5>
          <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Email</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, idx) => (
                <motion.tr
                  key={order.orderId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  whileHover={{
                    scale: 1.01,
                    backgroundColor: "#f3f4f9"
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <td>{order.orderId}</td>
                  <td>{order.buyerEmail}</td>
                  <td>{order.orderDate?.slice(0, 10)}</td>
                  <td>
                    <select
                      value={order.orderStatus}
                      onChange={e => handleStatusChange(order.orderId, e.target.value)}
                      className="form-select form-select-sm"
                      style={{ minWidth: 110 }}
                    >
                      <option value="Placed">Placed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => {
                        setSelectedOrder(order);
                        fetchOrderDetails(order.orderId);
                      }}
                    >
                      Details
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <hr className="my-3" />

      {/* Order Details Modal */}
      {orderDetails && (
        <div className="modal show" style={{ display: "block", background: "rgba(0,0,0,0.2)" }}>
          <div className="modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <FaCheckCircle className="me-2" /> Order Details
                </h5>
                <button className="btn-close" onClick={() => setOrderDetails(null)}></button>
              </div>
              <div className="modal-body">
                {/* Customer Info */}
                <div className="mb-3">
                  <h6 className="fw-bold mb-2"><FaClock className="me-2 text-warning" />Customer Info</h6>
                  <div className="row">
                    <div className="col-6"><b>Name:</b> {orderDetails.shippingAddress?.firstName} {orderDetails.shippingAddress?.lastName}</div>
                    <div className="col-6"><b>Email:</b> {orderDetails.buyerEmail}</div>
                    <div className="col-6"><b>City:</b> {orderDetails.shippingAddress?.city}</div>
                    <div className="col-6"><b>Street:</b> {orderDetails.shippingAddress?.street}</div>
                  </div>
                </div>
                {/* Order Info */}
                <div className="mb-3">
                  <h6 className="fw-bold mb-2"><FaCheckCircle className="me-2 text-success" />Order Info</h6>
                  <div className="row">
                    <div className="col-6"><b>Order ID:</b> {orderDetails.orderId || orderDetails.id}</div>
                    <div className="col-6"><b>Date:</b> {orderDetails.orderDate?.slice(0, 10)}</div>
                    <div className="col-6"><b>Status:</b> <span className={`badge bg-${orderDetails.orderStatus === "Placed" ? "warning" : orderDetails.orderStatus === "Shipped" ? "success" : "danger"}`}>{orderDetails.orderStatus}</span></div>
                    <div className="col-6"><b>Payment Status:</b> {orderDetails.orderPaymentStatus}</div>
                    <div className="col-6"><b>Delivery Method:</b> {orderDetails.deliveryMethod}</div>
                  </div>
                </div>
                {/* Price Info */}
                <div className="mb-3">
                  <h6 className="fw-bold mb-2"><FaCheckCircle className="me-2 text-info" />Price Details</h6>
                  <div className="row">
                    <div className="col-4"><b>Subtotal:</b> {orderDetails.subTotal} $</div>
                    <div className="col-4"><b>Shipping:</b> {orderDetails.shippingPrice} $</div>
                    <div className="col-4"><b>Total:</b> <span className="fw-bold text-success">{orderDetails.total} $</span></div>
                  </div>
                </div>
                {/* Products Table */}
                <div>
                  <h6 className="fw-bold mb-2"><FaCheckCircle className="me-2 text-secondary" />Products</h6>
                  <table className="table table-sm table-bordered align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails.orderItems?.map((item, idx) => (
                        <tr key={item.productId}>
                          <td>{idx + 1}</td>
                          <td>{item.productName}</td>
                          <td>{item.quantity}</td>
                          <td>{item.price}$</td>
                          <td>{item.price * item.quantity}$</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`
  .table thead th {
    background:rgb(239, 227, 248);
    color:rgb(70, 55, 141);
    font-weight: bold;
    letter-spacing: 0.5px;
    border-bottom: 2px solid #e5e7eb;
  }
  .table tbody tr {
    transition: background 0.2s, box-shadow 0.2s;
  }
`}</style>
    </div>
  );
};

export default ManageOrders;