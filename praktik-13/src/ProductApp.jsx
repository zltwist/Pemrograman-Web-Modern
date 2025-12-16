import React, { useState } from 'react';

const defaultProducts = [
  { id: 1, name: 'Laptop Pro 15"', price: 15500000 },
  { id: 2, name: 'Mechanical Keyboard', price: 1350000 },
  { id: 3, name: 'Noise Cancelling Headset', price: 2750000 },
];

const ProductApp = () => {
  const [products, setProducts] = useState(defaultProducts);
  const [form, setForm] = useState({ id: null, name: '', price: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setForm({ id: null, name: '', price: '' });
    setIsEditing(false);
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) {
      setError('Nama produk wajib diisi.');
      return false;
    }
    const parsedPrice = Number(form.price);
    if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      setError('Harga harus berupa angka positif.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const parsedPrice = Number(form.price);

    if (isEditing) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === form.id ? { ...product, name: form.name.trim(), price: parsedPrice } : product
        )
      );
    } else {
      const nextId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
      setProducts((prev) => [
        ...prev,
        {
          id: nextId,
          name: form.name.trim(),
          price: parsedPrice,
        },
      ]);
    }

    resetForm();
  };

  const startEdit = (product) => {
    setForm({ id: product.id, name: product.name, price: product.price });
    setIsEditing(true);
    setError('');
  };

  const deleteProduct = (id) => {
    if (!window.confirm('Yakin ingin menghapus produk ini?')) return;
    setProducts((prev) => prev.filter((product) => product.id !== id));
    if (isEditing && form.id === id) {
      resetForm();
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Manajemen Produk</h1>
      {error && (
        <p style={{ color: 'red', border: '1px solid red', padding: 10 }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Nama Produk</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nama produk"
            style={{ width: '100%', padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Harga (Rp)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Contoh: 250000"
            style={{ width: '100%', padding: 8 }}
          />
        </div>

        <button type="submit">
          {isEditing ? 'Simpan Perubahan' : 'Tambah Produk'}
        </button>
        {isEditing && (
          <button type="button" onClick={resetForm} style={{ marginLeft: 10 }}>
            Batal
          </button>
        )}
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ccc', padding: 8 }}>ID</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: 8 }}>Nama</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: 8 }}>Harga</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: 8 }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ padding: 12, textAlign: 'center' }}>
                Belum ada data produk.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id}>
                <td style={{ padding: 8 }}>{product.id}</td>
                <td style={{ padding: 8 }}>{product.name}</td>
                <td style={{ padding: 8 }}>Rp {product.price.toLocaleString('id-ID')}</td>
                <td style={{ padding: 8 }}>
                  <button onClick={() => startEdit(product)}>Edit</button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    style={{ marginLeft: 8, backgroundColor: '#d9534f', color: '#fff' }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductApp;
