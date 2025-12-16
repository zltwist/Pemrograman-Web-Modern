import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:8080/api.php";

function ProductApp() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState(null);

  const fetchProducts = () => {
    setError(null);
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data produk");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setProducts(data.data);
        } else {
          setError(data.message || "Gagal mengambil data produk.");
        }
      })
      .catch((err) => {
        setError("Error koneksi: " + err.message);
        console.error("Fetch error:", err);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    setError(null);

    const priceValue = parseFloat(newProduct.price);
    if (!newProduct.name || isNaN(priceValue) || priceValue <= 0) {
      setError("Nama produk dan harga yang valid harus diisi.");
      return;
    }

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newProduct.name, price: priceValue }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal menambah produk");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          alert(data.message);
          setNewProduct({ name: "", price: "" });
          fetchProducts();
        } else {
          setError(data.message || "Gagal menambah produk.");
        }
      })
      .catch((err) => {
        setError("Error koneksi: " + err.message);
        console.error("Post error:", err);
      });
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    setError(null);
    if (!editingProduct) return;

    const priceValue = parseFloat(editingProduct.price);
    if (!editingProduct.name || isNaN(priceValue) || priceValue <= 0) {
      setError("Nama produk dan harga yang valid harus diisi.");
      return;
    }

    fetch(`${API_URL}?id=${editingProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editingProduct.name,
        price: priceValue,
      }),
    })
      .then((response) => {
        if (response.status === 404) {
          throw new Error(
            "Produk tidak ditemukan atau tidak ada perubahan data."
          );
        }
        if (!response.ok) {
          throw new Error("Gagal memperbarui produk");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          alert(data.message);
          setEditingProduct(null);
          fetchProducts();
        } else {
          setError(data.message || "Gagal memperbarui produk.");
        }
      })
      .catch((err) => {
        setError("Error koneksi atau data: " + err.message);
        console.error("Put error:", err);
      });
  };

  const handleDeleteProduct = (id) => {
    setError(null);
    if (window.confirm("Yakin ingin menghapus produk ini?")) {
      fetch(`${API_URL}?id=${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.status === 404) {
            throw new Error("Produk tidak ditemukan.");
          }
          if (!response.ok) {
            throw new Error("Gagal menghapus produk");
          }
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            alert(data.message);
            fetchProducts();
          } else {
            setError(data.message || "Gagal menghapus produk.");
          }
        })
        .catch((err) => {
          setError("Error koneksi atau data: " + err.message);
          console.error("Delete error:", err);
        });
    }
  };

  return (
    <div className="product-app">
      <h1>Manajemen Produk &#128722;</h1>

      {error && (
        <p className="product-error">Error: {error}</p>
      )}

      <h2>{editingProduct ? "Edit Produk" : "Tambah Produk Baru"}</h2>
      <form
        onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
        className="product-form"
      >
        <input
          type="text"
          placeholder="Nama Produk"
          value={editingProduct ? editingProduct.name : newProduct.name}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({ ...editingProduct, name: e.target.value })
              : setNewProduct({ ...newProduct, name: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Harga"
          value={editingProduct ? editingProduct.price : newProduct.price}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({ ...editingProduct, price: e.target.value })
              : setNewProduct({ ...newProduct, price: e.target.value })
          }
          step="0.01"
          required
        />
        <div className="product-actions">
          <button type="submit">
            {editingProduct ? "Simpan Perubahan" : "Tambah Produk"}
          </button>
          {editingProduct && (
            <button type="button" onClick={() => setEditingProduct(null)}>
              Batal Edit
            </button>
          )}
        </div>
      </form>

      <h2>Daftar Produk</h2>
      {products.length === 0 ? (
        <p className="product-empty">Tidak ada produk ditemukan.</p>
      ) : (
        <div className="product-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Harga</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{parseFloat(product.price).toFixed(2)}</td>
                  <td>
                    <button onClick={() => setEditingProduct({ ...product })}>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="danger"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ProductApp;
