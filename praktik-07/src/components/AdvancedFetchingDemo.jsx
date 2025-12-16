import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdvancedFetchingDemo = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState({
    users: true,
    posts: false,
  });
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch semua users menggunakan Axios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading((prev) => ({ ...prev, users: true }));
        setError(null);

        console.log('Fetching users...');

        // Axios otomatis handle JSON parsing dan error status
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');

        console.log('Users berhasil diambil:', response.data);
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(`Gagal mengambil data users: ${err.message}`);
      } finally {
        setLoading((prev) => ({ ...prev, users: false }));
      }
    };

    fetchUsers();
  }, []);

  // Fetch posts berdasarkan user ID (dependent fetching)
  useEffect(() => {
    if (!selectedUserId) return;

    const fetchUserPosts = async () => {
      try {
        setLoading((prev) => ({ ...prev, posts: true }));
        setError(null);

        console.log(`Fetching posts untuk user ${selectedUserId}...`);

        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?userId=${selectedUserId}`
        );

        console.log('Posts berhasil diambil:', response.data);
        setUserPosts(response.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(`Gagal mengambil posts: ${err.message}`);
      } finally {
        setLoading((prev) => ({ ...prev, posts: false }));
      }
    };

    fetchUserPosts();
  }, [selectedUserId]); // Dependency: re-fetch ketika selectedUserId berubah

  // Filter users berdasarkan search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Reset selection
  const resetSelection = () => {
    setSelectedUserId('');
    setUserPosts([]);
    setSearchTerm('');
  };

  return (
    <div className="advanced-fetching-demo">
      <h2>Advanced Data Fetching Demo (Axios + Dependent Fetch)</h2>
      <p>Menampilkan daftar pengguna dan posts mereka.</p>

      {/* Search Input */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Cari user berdasarkan nama atau email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={loading.users}
        />
        <button onClick={resetSelection} className="btn btn-secondary">
          Reset
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="error-state">
          <h3>Terjadi Kesalahan</h3>
          <p>{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading.users && <p>Sedang memuat daftar users...</p>}

      {/* Users List */}
      {!loading.users && !error && (
        <div className="users-list">
          <h3>Daftar Users ({filteredUsers.length})</h3>
          {filteredUsers.length === 0 ? (
            <p>Tidak ada user ditemukan.</p>
          ) : (
            <ul>
              {filteredUsers.map((user) => (
                <li key={user.id}>
                  <button
                    className={`user-btn ${
                      selectedUserId === user.id ? 'selected' : ''
                    }`}
                    onClick={() => setSelectedUserId(user.id)}
                    disabled={loading.posts}
                  >
                    {user.name} ({user.email})
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Posts List */}
      {selectedUserId && (
        <div className="posts-section">
          <h3>Posts oleh User ID {selectedUserId}</h3>
          {loading.posts ? (
            <p>Sedang memuat posts...</p>
          ) : userPosts.length === 0 ? (
            <p>Tidak ada posts untuk user ini.</p>
          ) : (
            <ul className="posts-list">
              {userPosts.map((post) => (
                <li key={post.id}>
                  <h4>{post.title}</h4>
                  <p>{post.body}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Debug Info */}
      <div className="debug-info">
        <h4>Debug Info</h4>
        <ul>
          <li>Loading Users: {loading.users ? 'Ya' : 'Tidak'}</li>
          <li>Loading Posts: {loading.posts ? 'Ya' : 'Tidak'}</li>
          <li>Selected User ID: {selectedUserId || 'Belum dipilih'}</li>
          <li>Total Users: {users.length}</li>
          <li>Total Posts (User): {userPosts.length}</li>
        </ul>
      </div>
    </div>
  );
};

export default AdvancedFetchingDemo;
