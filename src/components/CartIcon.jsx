// src/components/CartIcon.jsx
import React from "react";
import { Badge } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../Contexts/CartContext.jsx";
import { motion } from "framer-motion";

const CartIcon = () => {
  const { cartCount } = useCart();

  return (
    <div className="position-relative">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <FaShoppingCart size={20} />
      </motion.div>
      {cartCount > 0 && (
        <Badge
          pill
          bg="danger"
          className="position-absolute top-0 start-100 translate-middle"
          style={{ fontSize: "0.6rem" }}
        >
          {cartCount}
        </Badge>
      )}
    </div>
  );
};

export default CartIcon;
