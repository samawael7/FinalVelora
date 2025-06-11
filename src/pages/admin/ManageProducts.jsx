import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaSearch, FaSort, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    concern: "",
    description: "",
    price: "",
    pictureUrl: "",
    productBrand: "",
    productCategory: "",
    skinType: "",
    salesCount: 0,
    isBestSeller: false,
    createdAt: new Date().toISOString(),
    stockQuantity: 0,
  });
  const [editProduct, setEditProduct] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [categoryFilter, setCategoryFilter] = useState("");

  const categories = [
    "Acne",
    "Hydration",
    "Dark Spots",
    "Wrinkles",
    "Sunburn",
    "Eczema",
    "Oily Skin",
    "Dry Skin",
    "Combination Skin",
    "Sensitive Skin",
    "All Skin Types",
    "Cleanser",
    "Serum",
    "Moisturizer",
    "Sunscreen",
    "Hydrating Mist",
  ];

  // Fetch products from API
  useEffect(() => {
    fetch("https://localhost:7182/api/Admin/get-products", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          setProducts([]);
          toast.error("Products API did not return a list!");
        }
      })
      .catch(() => toast.error("Failed to fetch products!"));
  }, []);

  // Add Product
  const handleAddProduct = () => {
    if (
      newProduct.name &&
      newProduct.price &&
      newProduct.productCategory &&
      newProduct.productBrand &&
      newProduct.description &&
      newProduct.concern &&
      newProduct.skinType
    ) {
      fetch("https://localhost:7182/api/Admin/create-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ ...newProduct, id: 0, createdAt: new Date().toISOString() }),
      })
        .then(res => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then(addedProduct => {
          const data = addedProduct.data ? addedProduct.data : addedProduct;
          const product = {
            id: data.id ?? newProduct.id ?? Date.now(),
            name: data.name ?? newProduct.name ?? "",
            concern: data.concern ?? newProduct.concern ?? "",
            description: data.description ?? newProduct.description ?? "",
            price: data.price ?? newProduct.price ?? 0,
            pictureUrl: data.pictureUrl ?? newProduct.pictureUrl ?? "",
            productBrand: data.productBrand ?? newProduct.productBrand ?? "",
            productCategory: data.productCategory ?? newProduct.productCategory ?? "",
            skinType: data.skinType ?? newProduct.skinType ?? "",
            salesCount: data.salesCount ?? newProduct.salesCount ?? 0,
            isBestSeller: data.isBestSeller ?? newProduct.isBestSeller ?? false,
            createdAt: data.createdAt ?? newProduct.createdAt ?? new Date().toISOString(),
            stockQuantity: data.stockQuantity ?? newProduct.stockQuantity ?? 0,
          };
          setProducts([...products, product]);
          toast.success(`Product "${product.name}" added successfully!`);
          setNewProduct({
            name: "",
            concern: "",
            description: "",
            price: "",
            pictureUrl: "",
            productBrand: "",
            productCategory: "",
            skinType: "",
            salesCount: 0,
            isBestSeller: false,
            createdAt: new Date().toISOString(),
            stockQuantity: 0,
          });
        })
        .catch(() => toast.error("Failed to add product!"));
    } else {
      toast.error("Please fill in all fields!");
    }
  };

  // Delete Product
  const handleDelete = (id) => {
    fetch(`https://localhost:7182/api/Admin/delete-product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error();
        setProducts(products.filter((product) => product.id !== id));
        toast.success("Product deleted!");
      })
      .catch(() => toast.error("Failed to delete product!"));
  };

  // Edit Product
  const handleEdit = (product) => {
    setEditProduct({ ...product });
  };

  // Update Product
  const handleUpdateProduct = () => {
    fetch(`https://localhost:7182/api/Admin/update-product/${editProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(editProduct),
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(updatedProduct => {
        // استخدم بيانات editProduct كـ fallback لأي قيمة ناقصة
        const data = updatedProduct.data ? updatedProduct.data : updatedProduct;
        const product = {
          id: data.id ?? editProduct.id,
          name: data.name ?? editProduct.name,
          concern: data.concern ?? editProduct.concern,
          description: data.description ?? editProduct.description,
          price: data.price ?? editProduct.price,
          pictureUrl: data.pictureUrl ?? editProduct.pictureUrl,
          productBrand: data.productBrand ?? editProduct.productBrand,
          productCategory: data.productCategory ?? editProduct.productCategory,
          skinType: data.skinType ?? editProduct.skinType,
          salesCount: data.salesCount ?? editProduct.salesCount,
          isBestSeller: data.isBestSeller ?? editProduct.isBestSeller,
          createdAt: data.createdAt ?? editProduct.createdAt,
          stockQuantity: data.stockQuantity ?? editProduct.stockQuantity,
        };
        setProducts(
          products.map((prod) =>
            prod.id === product.id ? product : prod
          )
        );
        toast.info(`Product "${product.name}" updated!`);
        setEditProduct(null);
      })
      .catch(() => toast.error("Failed to update product!"));
  };

  // Update Product Stock
  const handleUpdateStock = (productId, newStock) => {
    fetch(`https://localhost:7182/api/Admin/update-product-stock/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ stockQuantity: newStock }),
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(updatedProduct => {
        const data = updatedProduct.data ? updatedProduct.data : updatedProduct;
        const product = {
          id: data.id ?? productId,
          name: data.name ?? "",
          concern: data.concern ?? "",
          description: data.description ?? "",
          price: data.price ?? 0,
          pictureUrl: data.pictureUrl ?? "",
          productBrand: data.productBrand ?? "",
          productCategory: data.productCategory ?? "",
          skinType: data.skinType ?? "",
          salesCount: data.salesCount ?? 0,
          isBestSeller: data.isBestSeller ?? false,
          createdAt: data.createdAt ?? new Date().toISOString(),
          stockQuantity: data.stockQuantity ?? newStock,
        };
        setProducts(
          products.map((prod) =>
            prod.id === product.id ? product : prod
          )
        );
        toast.info(`Stock for "${product.name}" updated!`);
      })
      .catch(() => toast.error("Failed to update stock!"));
  };

  // Bulk Upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const rows = text.split("\n").filter((row) => row.trim() !== "");
        const parsedProducts = rows
          .map((row, index) => {
            const [
              name,
              concern,
              description,
              price,
              pictureUrl,
              productBrand,
              productCategory,
              skinType,
              salesCount,
              isBestSeller,
              createdAt,
              stockQuantity,
            ] = row.split(",").map((item) => item.trim());
            if (!name || !price || !productCategory) {
              toast.error(`Invalid data on row ${index + 1}`);
              return null;
            }
            return {
              id: Date.now() + index,
              name,
              concern: concern || "",
              description: description || "",
              price: parseFloat(price),
              pictureUrl: pictureUrl || "",
              productBrand: productBrand || "",
              productCategory,
              skinType: skinType || "",
              salesCount: Number(salesCount) || 0,
              isBestSeller: isBestSeller === "true",
              createdAt: createdAt || new Date().toISOString(),
              stockQuantity: Number(stockQuantity) || 0,
            };
          })
          .filter((product) => product !== null);
        setProducts([...products, ...parsedProducts]);
        toast.success("Products uploaded successfully!");
      };
      reader.readAsText(file);
    }
  };

  // Filtered & Sorted Products
  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) &&
        (!categoryFilter || product.productCategory === categoryFilter)
    )
    .sort((a, b) => {
      if (sortOption === "name") return a.name.localeCompare(b.name);
      if (sortOption === "price") return a.price - b.price;
      return 0;
    });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        style={{
          marginLeft: "250px",
          padding: "2rem",
          background: "#f8fafc",
          minHeight: "100vh",
        }}
      >
        <h1
  className="fw-bold mb-4"
  style={{
    letterSpacing: 1.5,
    fontSize: "2.3rem",
    background: "linear-gradient(90deg,#785bf9 60%,#a18fff 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "flex",
    alignItems: "center",
    gap: 16,
    textShadow: "0 2px 12px rgba(120,91,249,0.08)"
  }}
>
  <span
    style={{
      background: "#fff",
      borderRadius: "50%",
      boxShadow: "0 2px 8px rgba(120,91,249,0.10)",
      padding: 12,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <FaPlus style={{ color: "#785bf9", fontSize: 28 }} />
  </span>
  Manage Products
</h1>

        {/* Filters */}
        <div className="card shadow-sm mb-4" style={{ borderRadius: 16 }}>
          <div className="card-body d-flex flex-wrap gap-3 align-items-center">
            <div className="input-group" style={{ maxWidth: 300 }}>
              <span className="input-group-text bg-white">
                <FaSearch />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search products..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ borderRadius: 8 }}
              />
            </div>
            <div className="input-group" style={{ maxWidth: 220 }}>
              <span className="input-group-text bg-white">
                <FaSort />
              </span>
              <select
                className="form-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                style={{ borderRadius: 8 }}
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
              </select>
            </div>
            <select
              className="form-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{ maxWidth: 220, borderRadius: 8 }}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Add Product */}
        <div className="card shadow-sm mb-5" style={{ borderRadius: 16 }}>
          <div className="card-body">
            <h4 className="fw-bold mb-4 text-primary">
              <FaPlus className="me-2" />
              Add New Product
            </h4>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Brand</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Brand"
                  value={newProduct.productBrand}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, productBrand: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={newProduct.productCategory}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, productCategory: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, description: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Concern</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Concern"
                  value={newProduct.concern}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, concern: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Skin Type</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Skin Type"
                  value={newProduct.skinType}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, skinType: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Picture URL</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Picture URL"
                  value={newProduct.pictureUrl}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, pictureUrl: e.target.value })
                  }
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Sales Count</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Sales Count"
                  value={newProduct.salesCount}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, salesCount: Number(e.target.value) })
                  }
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Stock Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Stock Quantity"
                  value={newProduct.stockQuantity}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, stockQuantity: Number(e.target.value) })
                  }
                />
              </div>
              <div className="col-md-3 d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={newProduct.isBestSeller}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, isBestSeller: e.target.checked })
                  }
                />
                <label className="form-label ms-2">Best Seller</label>
              </div>
              <div className="col-md-12">
                <button
                  className="btn btn-success w-100 py-2 fs-5"
                  onClick={handleAddProduct}
                >
                  <FaPlus className="me-2" />
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="card shadow-sm mb-5" style={{ borderRadius: 16 }}>
          <div className="card-body">
            <h4 className="fw-bold mb-4 text-primary">Products List</h4>
            <div className="table-responsive">
              <table
                className="table align-middle table-hover"
                style={{ borderRadius: 12, overflow: "hidden" }}
              >
                <thead className="table-light">
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Price ($)</th>
                    <th>Stock</th>
                    <th>Best Seller</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ background: "#fff" }}
                    >
                      <td>
                        {product.pictureUrl ? (
                          <img
                            src={
                              product.pictureUrl.startsWith("http")
                                ? product.pictureUrl.replace("https://localhost:7182/https://localhost:7182/", "https://localhost:7182/")
                                : `https://localhost:7182${product.pictureUrl.startsWith("/") ? "" : "/"}${product.pictureUrl}`
                            }
                            alt={product.name}
                            style={{
                              width: 48,
                              height: 48,
                              borderRadius: 12,
                              objectFit: "cover",
                              border: "2px solid #e5e7fb",
                              boxShadow: "0 2px 8px rgba(120,91,249,0.07)"
                            }}
                            onError={e => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/48x48?text=No+Image"; }}
                          />
                        ) : (
                          <span className="text-muted">No Image</span>
                        )}
                      </td>
                      <td className="fw-semibold">{product.name}</td>
                      <td>{product.productBrand}</td>
                      <td>{product.productCategory}</td>
                      <td>${product.price}</td>
                      <td>{product.stockQuantity}</td>
                      <td>
                        {product.isBestSeller ? (
                          <span className="badge bg-success">Yes</span>
                        ) : (
                          <span className="badge bg-secondary">No</span>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-primary btn-sm me-2"
                          onClick={() => handleEdit(product)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(product.id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>


        {/* Edit Product Modal */}
        {editProduct && (
          <div
            className="modal show"
            style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
            onClick={() => setEditProduct(null)}
          >
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
              <motion.div
                className="modal-content"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{ borderRadius: 16 }}
              >
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">Edit Product</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setEditProduct(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row g-2">
                    <div className="col-md-6">
                      <label className="form-label">Product Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Product Name"
                        value={editProduct.name}
                        onChange={(e) =>
                          setEditProduct({ ...editProduct, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Brand</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Brand"
                        value={editProduct.productBrand}
                        onChange={(e) =>
                          setEditProduct({ ...editProduct, productBrand: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Category</label>
                      <select
                        className="form-select"
                        value={editProduct.productCategory}
                        onChange={(e) =>
                          setEditProduct({ ...editProduct, productCategory: e.target.value })
                        }
                      >
                        <option value="">Select Category</option>
                        {categories.map((category, index) => (
                          <option key={index} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Price</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Price"
                        value={editProduct.price}
                        onChange={(e) =>
                          setEditProduct({ ...editProduct, price: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-12">
                      <label className="form-label">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        value={editProduct.description}
                        onChange={(e) =>
                          setEditProduct({ ...editProduct, description: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Concern</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Concern"
                        value={editProduct.concern}
                        onChange={(e) =>
                          setEditProduct({ ...editProduct, concern: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Skin Type</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Skin Type"
                        value={editProduct.skinType}
                        onChange={(e) =>
                          setEditProduct({ ...editProduct, skinType: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Picture URL</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Picture URL"
                        value={editProduct.pictureUrl}
                        onChange={(e) =>
                          setEditProduct({ ...editProduct, pictureUrl: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Sales Count</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Sales Count"
                        value={editProduct.salesCount}
                        onChange={(e) =>
                          setEditProduct({ ...editProduct, salesCount: Number(e.target.value) })
                        }
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Stock Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Stock Quantity"
                        value={editProduct.stockQuantity}
                        onChange={(e) =>
                          setEditProduct({ ...editProduct, stockQuantity: Number(e.target.value) })
                        }
                      />
                    </div>
                    <div className="col-md-3 d-flex align-items-center">
                      <input
                        type="checkbox"
                        checked={editProduct.isBestSeller}
                        onChange={(e) =>
                          setEditProduct({ ...editProduct, isBestSeller: e.target.checked })
                        }
                      />
                      <label className="form-label ms-2">Best Seller</label>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary px-4"
                    onClick={() => setEditProduct(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary px-4"
                    onClick={handleUpdateProduct}
                  >
                    Save Changes
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
        {/* Custom CSS for more elegance */}
        <style>{`
          .table thead th { vertical-align: middle; }
          .table tbody tr:hover { background: #f1f5f9; }
          .form-label { font-weight: 500; }
        `}</style>
      </div>
    </motion.div>
  );
};

export default ManageProducts;