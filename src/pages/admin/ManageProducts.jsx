import React, { useState } from "react";

const ManageProducts = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Acne Cream", price: 25 },
    { id: 2, name: "Dark Spots Serum", price: 30 },
  ]);

  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const [editProduct, setEditProduct] = useState(null);

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      setProducts([...products, { ...newProduct, id: Date.now() }]);
      toast.success(`Product "${newProduct.name}" added successfully!`);
      setNewProduct({ name: "", price: "" });
    } else {
      toast.error("Please fill in all fields!");
    }
  };

  const handleDelete = (id) => {
    const deletedProduct = products.find((p) => p.id === id);
    setProducts(products.filter((product) => product.id !== id));
    toast.success(`Deleted "${deletedProduct.name}"`);
  };

  const handleEdit = (product) => {
    setEditProduct(product);
  };

  const handleUpdateProduct = () => {
    setProducts(
      products.map((prod) =>
        prod.id === editProduct.id ? editProduct : prod
      )
    );
    toast.info(`Product "${editProduct.name}" updated!`);
    setEditProduct(null);
  };

  return (
    <div style={{ marginLeft: "250px", padding: "2rem", maxWidth: "calc(100% - 250px)", overflowX: "hidden" }}>
      <h1 className="h2 fw-bold mb-4">Manage Products</h1>

      {/* Add Product */}
      <div className="card shadow-sm mb-5">
        <div className="card-body">
          <h4 className="fw-bold mb-4">Add New Product</h4>
          <div className="d-flex gap-3">
            <input
              type="text"
              className="form-control"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <button className="btn btn-success" onClick={handleAddProduct}>
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="card shadow-sm mb-5">
        <div className="card-body">
          <h4 className="fw-bold mb-4">Products List</h4>
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price ($)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(product)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Upload CSV */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="fw-bold mb-4">Bulk Upload Products (.csv)</h4>
          <input type="file" accept=".csv" className="form-control" />
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
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Product</h5>
                <button type="button" className="btn-close" onClick={() => setEditProduct(null)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Product Name"
                  value={editProduct.name}
                  onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  value={editProduct.price}
                  onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setEditProduct(null)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleUpdateProduct}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
