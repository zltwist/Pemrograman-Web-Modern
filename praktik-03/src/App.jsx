import Identity from './components/Identity';
import React, { useState } from 'react';
import './App.css';

// Import komponen
import Header from './components/Header/Header';
import UserCard from './components/UserCard/UserCard';
import ProductList from './components/ProductList/ProductList';
import Button from './components/Button/Button';

function App() {
  // State untuk data user yang login
  const [currentUser] = useState({
    name: 'Admin',
    avatar: 'vite.svg'
  });

  // State untuk data users
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Ahmad Rizki',
      email: 'ahmad@example.com',
      role: 'Admin',
      avatar: 'vite.svg',
      isActive: true
    },
    {
      id: 2,
      name: 'Sari Dewi',
      email: 'sari@example.com',
      role: 'User',
      avatar: 'vite.svg',
      isActive: true
    },
    {
      id: 3,
      name: 'Budi Santoso',
      email: 'budi@example.com',
      role: 'Moderator',
      avatar: 'vite.svg',
      isActive: false
    }
  ]);

  // State untuk data products
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Laptop ASUS VivoBook',
      price: 8500000,
      category: 'Electronics',
      image: './laptop.png',
      stock: 5
    },
    {
      id: 2,
      name: 'Smartphone Samsung A54',
      price: 4200000,
      category: 'Electronics',
      image: './phone.png',
      stock: 0
    },
    {
      id: 3,
      name: 'Buku Pemrograman React',
      price: 150000,
      category: 'Books',
      image: './book.png',
      stock: 10
    },
    {
      id: 4,
      name: 'Mouse Wireless Logitech',
      price: 350000,
      category: 'Electronics',
      image: './mouse.png',
      stock: 15
    }
  ]);

  // Handler functions
  const handleEditUser = (userId) => {
    alert(`Edit user dengan ID: ${userId}`);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleAddToCart = (product) => {
    alert(`Menambahkan ${product.name} ke keranjang`);
  };

  const handleAddNewUser = () => {
    const newUser = {
      id: users.length + 1,
      name: `User Baru ${users.length + 1}`,
      email: `user${users.length + 1}@example.com`,
      role: 'User',
      avatar: './user.png',
      isActive: true
    };
    setUsers([...users, newUser]);
  };

  const handleAddNewProduct = () => {
    const newProduct = {
      id: products.length + 1,
      name: `Produk Baru ${products.length + 1}`,
      price: Math.floor(Math.random() * 1000000) + 100000,
      category: 'Other',
      image: './others.png',
      stock: Math.floor(Math.random() * 20)
    };
    setProducts([...products, newProduct]);
  };

  return (
    <>
<Identity />
<div className="rangga-wrapper">
<div className="App">
      {/* Header Component dengan props */}
      <Header
        title="Demo Komponen React dengan Props"
        subtitle="Pemrograman Web Modern - Pertemuan 3"
        user={currentUser}
      />

      <main className="App-main">
        {/* Section Users */}
        <section className="section">
          <div className="section-header">
            <h2>Manajemen Pengguna ({users.length} users)</h2>
            <Button
              variant="success"
              onClick={handleAddNewUser}
            >
              + Tambah User
            </Button>
          </div>

          <div className="users-grid">
            {users.map(user => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />
            ))}
          </div>
        </section>

        {/* Section Products */}
        <section className="section">
          <div className="section-header">
            <h2>Katalog Produk</h2>
            <Button
              variant="primary"
              onClick={handleAddNewProduct}
            >
              + Tambah Produk
            </Button>
          </div>

          <ProductList
            products={products}
            onAddToCart={handleAddToCart}
          />
        </section>
      </main>
    </div>
  
</div>
</>);
}

export default App;
