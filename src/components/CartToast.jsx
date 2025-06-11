// src/components/CartToast.jsx
import React from "react";
import { Toast } from "react-bootstrap";
import { motion } from "framer-motion";

const CartToast = ({ show, onClose, product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
      }}
    >
      <Toast show={show} onClose={onClose} autohide delay={3000}>
        <Toast.Header>
          <strong className="me-auto">Added to Cart</strong>
        </Toast.Header>
        <Toast.Body>
          <div className="d-flex align-items-center">
            <img
              src={product.pictureUrl}
              alt={product.name}
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                borderRadius: "4px",
                marginRight: "10px",
              }}
            />
            <div>
              <h6 className="mb-1">{product.name}</h6>
              <p className="mb-0 text-muted">{product.price} EGP</p>
            </div>
          </div>
        </Toast.Body>
      </Toast>
    </motion.div>
  );
};

export default CartToast;
