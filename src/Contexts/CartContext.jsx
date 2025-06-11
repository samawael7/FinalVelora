// src/Contexts/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useApi from "../hooks/useApi";
import { cartEndpoints } from "../api/endpoints/cart";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { get, post, delete: del } = useApi();
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(() => {
    // Load cartId from localStorage on initialization
    return localStorage.getItem("cartId") || null;
  });
  const [loading, setLoading] = useState(false);
  const [hasMerged, setHasMerged] = useState(false);
  const [authStatus, setAuthStatus] = useState(isAuthenticated());
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize cart on first load
  useEffect(() => {
    if (!isInitialized) {
      initializeCart();
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Track authentication status changes and prevent infinite loops
  useEffect(() => {
    const currentAuthStatus = isAuthenticated();
    if (currentAuthStatus !== authStatus && isInitialized) {
      setAuthStatus(currentAuthStatus);
      setHasMerged(false); // Reset merge flag when auth status changes

      if (currentAuthStatus) {
        // User just logged in
        initializeCart();
      } else {
        // User logged out - clear cart state and load guest cart
        setCart([]);
        const guestCart = getGuestCart();
        setCart(guestCart);
      }
    }
  }, [isAuthenticated(), authStatus, isInitialized]);

  const initializeCart = async () => {
    try {
      if (isAuthenticated()) {
        // User is authenticated - check if we need to merge guest cart first
        const guestCart = getGuestCart();
        const savedCartId = localStorage.getItem("cartId");

        if (guestCart.length > 0 && !hasMerged) {
          // We have guest cart items and haven't merged yet - merge first
          await performCartMerge(guestCart, savedCartId);
        } else if (savedCartId) {
          // No guest cart or already merged - just fetch backend cart
          await fetchCartFromBackend(savedCartId);
        } else {
          // No cartId and no guest cart - start with empty cart
          setCart([]);
        }
      } else {
        // User is not authenticated, load guest cart from localStorage
        const guestCart = getGuestCart();
        setCart(guestCart);
      }
    } catch (error) {
      console.error("Failed to initialize cart:", error);
      // Fallback to guest cart on any error
      const guestCart = getGuestCart();
      setCart(guestCart);
    }
  };

  const getGuestCart = () => {
    try {
      const savedCart = localStorage.getItem("guestCart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse guest cart from localStorage:", error);
      // Clear corrupted data and return empty cart
      localStorage.removeItem("guestCart");
      return [];
    }
  };

  const saveGuestCart = (cartData) => {
    localStorage.setItem("guestCart", JSON.stringify(cartData));
  };

  const clearGuestCart = () => {
    localStorage.removeItem("guestCart");
  };

  const saveCartId = (id) => {
    setCartId(id);
    localStorage.setItem("cartId", id);
  };

  const clearCartId = () => {
    setCartId(null);
    localStorage.removeItem("cartId");
  };

  const fetchCartFromBackend = async (cartIdToFetch = cartId) => {
    if (!cartIdToFetch) return [];

    try {
      setLoading(true);

      const response = await get(cartEndpoints.getCart(cartIdToFetch));

      if (response && response.cartItems) {
        // Normalize the cart items to ensure consistent structure
        const normalizedCartItems = response.cartItems.map((item) => ({
          id: item.id || item.productId,
          productId: item.id || item.productId,
          name: item.productName || item.name || "Unknown Product",
          productName: item.productName || item.name || "Unknown Product",
          pictureUrl: item.pictureUrl || item.imageUrl || "",
          price: parseFloat(item.price) || 0,
          quantity: parseInt(item.quantity) || 1,
          productBrand: item.brandName || item.productBrand || item.brand || "",
          brandName: item.brandName || item.productBrand || item.brand || "",
          productCategory:
            item.categoryName || item.productCategory || item.category || "",
          categoryName:
            item.categoryName || item.productCategory || item.category || "",
        }));

        setCart(normalizedCartItems);
        return normalizedCartItems;
      } else {
        setCart([]);
        return [];
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);

      // If cart not found or other error, clear cartId and fallback to guest cart
      if (error.response?.status === 404) {
        clearCartId();
      }
      const guestCart = getGuestCart();
      setCart(guestCart);
      return guestCart;
    } finally {
      setLoading(false);
    }
  };

  const performCartMerge = async (guestCart, savedCartId) => {
    try {
      setLoading(true);

      // Fetch existing user cart if cartId exists
      let existingCart = [];
      if (savedCartId) {
        try {
          const response = await get(cartEndpoints.getCart(savedCartId));

          if (response && response.cartItems) {
            existingCart = response.cartItems;
          }
        } catch (fetchError) {
          console.error("Failed to fetch existing cart:", fetchError);
          // If cart doesn't exist, that's fine, we'll create a new one
        }
      }

      // STEP 1: Start with existing cart as base
      const mergedCart = [...existingCart];

      // STEP 2: Process each guest cart item
      guestCart.forEach((guestItem) => {
        // Find if this product already exists in user's cart (compare by product ID)
        const guestProductId = guestItem.id || guestItem.productId;
        const existingItemIndex = mergedCart.findIndex((item) => {
          const existingProductId = item.id || item.productId;
          return existingProductId === guestProductId;
        });

        if (existingItemIndex !== -1) {
          // STEP 3a: Product exists - merge quantities and preserve/update all fields
          const existingItem = mergedCart[existingItemIndex];
          const oldQuantity = existingItem.quantity;
          const guestQuantity = guestItem.quantity;
          const newQuantity = oldQuantity + guestQuantity;

          // Create merged item with all fields properly preserved
          mergedCart[existingItemIndex] = {
            ...existingItem,
            ...guestItem, // Guest item may have more complete data
            quantity: newQuantity,
            // Ensure name fields are preserved from whichever source has them
            name:
              guestItem.name ||
              existingItem.name ||
              guestItem.productName ||
              existingItem.productName ||
              "Unknown Product",
            productName:
              guestItem.productName ||
              existingItem.productName ||
              guestItem.name ||
              existingItem.name ||
              "Unknown Product",
          };
        } else {
          // STEP 3b: New product - add to cart
          mergedCart.push(guestItem);
        }
      });

      // Check if merged cart is empty
      if (mergedCart.length === 0) {
        // If empty, just use guest cart
        setCart(guestCart);
        clearGuestCart();
        setHasMerged(true);
        return guestCart;
      }

      // STEP 4: Update cart state immediately
      setCart(mergedCart);

      // STEP 5: Sync merged cart to backend immediately
      try {
        const updateResponse = await updateBackendCart(mergedCart);

        // Ensure we have a cartId after sync
        if (updateResponse && updateResponse.id) {
          saveCartId(updateResponse.id);
        }
      } catch (updateError) {
        console.error("Backend cart sync failed:", updateError);
        throw updateError; // Re-throw to be caught by outer catch
      }

      // STEP 6: Clean up guest cart and mark as merged
      clearGuestCart();
      setHasMerged(true);
      return mergedCart;
    } catch (error) {
      console.error("Cart merge failed:", error);

      // On error, just show existing cart or guest cart
      try {
        if (savedCartId) {
          await fetchCartFromBackend(savedCartId);
        } else {
          setCart(guestCart);
        }
      } catch (fallbackError) {
        console.error("Fallback also failed:", fallbackError);
        setCart(guestCart);
      }
      return cart;
    } finally {
      setLoading(false);
    }
  };

  const updateBackendCart = async (cartData) => {
    if (!isAuthenticated()) {
      return;
    }

    try {
      const backendCartData = {
        deliveryMethodId: 1,
        shippingPrice: 60.0,
        cartItems: cartData.map((item) => ({
          productId: item.id || item.productId,
          productName:
            item.name || item.productName || item.title || "Unknown Product",
          pictureUrl: item.pictureUrl || item.imageUrl || "",
          price: parseFloat(item.price) || 0,
          quantity: parseInt(item.quantity) || 1,
          brandName: item.productBrand || item.brandName || item.brand || "",
          categoryName:
            item.productCategory || item.categoryName || item.category || "",
        })),
      };

      const response = await post(cartEndpoints.updateCart, backendCartData);

      if (response && response.id) {
        saveCartId(response.id);
      }
      return response;
    } catch (error) {
      console.error("Backend cart update failed:", error);
      throw error;
    }
  };

  // Add to cart method
  const addToCart = async (product) => {
    const productId = product.id || product.productId;

    // Normalize the product data to ensure consistent structure
    const normalizedProduct = {
      id: product.id || product.productId,
      productId: product.id || product.productId,
      name:
        product.name ||
        product.productName ||
        product.title ||
        "Unknown Product",
      productName:
        product.name ||
        product.productName ||
        product.title ||
        "Unknown Product",
      pictureUrl: product.pictureUrl || product.imageUrl || "",
      price: parseFloat(product.price) || 0,
      quantity: 1,
      productBrand:
        product.productBrand || product.brandName || product.brand || "",
      brandName:
        product.productBrand || product.brandName || product.brand || "",
      productCategory:
        product.productCategory ||
        product.categoryName ||
        product.category ||
        "",
      categoryName:
        product.productCategory ||
        product.categoryName ||
        product.category ||
        "",
    };

    const newCart = (() => {
      const existing = cart.find(
        (item) => (item.id || item.productId) === productId
      );
      if (existing) {
        return cart.map((item) =>
          (item.id || item.productId) === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...cart, normalizedProduct];
      }
    })();

    setCart(newCart);

    if (isAuthenticated()) {
      try {
        await updateBackendCart(newCart);
      } catch (error) {
        console.error("Failed to add to cart:", error);
        toast.error("Failed to add product to cart. Please try again.");
        setCart(cart);
      }
    } else {
      saveGuestCart(newCart);
    }
  };

  // Remove from cart method
  const removeFromCart = async (productId) => {
    const newCart = cart.filter(
      (item) => (item.id || item.productId) !== productId
    );

    setCart(newCart);

    if (isAuthenticated()) {
      try {
        if (cartId) {
          await del(cartEndpoints.removeFromCart(productId));
        } else {
          await updateBackendCart(newCart);
        }
      } catch (error) {
        console.error("Failed to remove from cart:", error);
        // Fallback to update cart for merged products
        try {
          await updateBackendCart(newCart);
        } catch (fallbackError) {
          console.error("Fallback update also failed:", fallbackError);
          toast.error("Failed to remove product from cart.");
          setCart(cart);
        }
      }
    } else {
      saveGuestCart(newCart);
    }
  };

  // Update quantity method
  const updateQuantity = async (productId, quantity) => {
    const newCart = cart.map((item) =>
      (item.id || item.productId) === productId ? { ...item, quantity } : item
    );

    setCart(newCart);

    if (isAuthenticated()) {
      try {
        await updateBackendCart(newCart);
      } catch (error) {
        console.error("Failed to update quantity:", error);
        toast.error("Failed to update quantity.");
        setCart(cart);
      }
    } else {
      saveGuestCart(newCart);
    }
  };

  // Clear cart
  const clearCart = async () => {
    setCart([]);

    if (isAuthenticated() && cartId) {
      try {
        await del(cartEndpoints.clearCart(cartId));
        clearCartId(); // Clear cartId after successful clear
      } catch (error) {
        console.error("Failed to clear cart:", error);
        toast.error("Failed to clear cart.");
      }
    } else {
      clearGuestCart();
    }
  };

  // Method to merge guest cart after login (called from Cart component)
  const mergeGuestCartAfterLogin = async () => {
    const guestCart = getGuestCart();

    // Prevent duplicate merges
    if (guestCart.length > 0 && !hasMerged && isAuthenticated()) {
      const savedCartId = localStorage.getItem("cartId");
      const mergedCart = await performCartMerge(guestCart, savedCartId);
      // Note: performCartMerge already shows a success toast, so we don't need another one here
      return mergedCart;
    } else {
      // No guest cart or already merged, just fetch user's existing cart
      if (cartId) {
        const existingCart = await fetchCartFromBackend(cartId);
        return existingCart;
      }
      return cart;
    }
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        setCart,
        loading,
        cartId,
        mergeGuestCartAfterLogin,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
