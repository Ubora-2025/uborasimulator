import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const token = localStorage.getItem("adminToken"); // ✅ clé correcte

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Erreur de chargement des utilisateurs:', err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/users', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData({ name: '', email: '', password: '' });
      fetchUsers();
    } catch (err) {
      console.error('Erreur création utilisateur:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      try {
        await axios.delete(`/api/admin/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchUsers();
      } catch (err) {
        console.error('Erreur suppression utilisateur:', err);
      }
    }
  };

  return (
    <div className="p-6 sm:p-10 max-w-5xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Gestion des utilisateurs</h1>

      {/* Formulaire de création */}
      <form onSubmit={handleCreate} className="bg-white shadow-md rounded-lg p-6 mb-10 space-y-4 border">
        <h2 className="text-xl font-semibold text-gray-700">Créer un nouvel utilisateur</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Nom"
            className="border rounded px-4 py-2"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border rounded px-4 py-2"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="border rounded px-4 py-2"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          ➕ Créer utilisateur
        </button>
      </form>

      {/* Tableau des utilisateurs */}
      <div className="overflow-x-auto bg-white shadow rounded-lg border">
        <table className="min-w-full table-auto text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-4">Nom</th>
              <th className="p-4">Email</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {users.map((user) => (
              <tr key={user._id} className="border-t hover:bg-gray-50">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4 space-x-2">
                  <button className="text-sm text-blue-600 hover:underline">Modifier</button>
                  <button
                    className="text-sm text-red-600 hover:underline"
                    onClick={() => handleDelete(user._id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td className="p-4 text-gray-500" colSpan="3">
                  Aucun utilisateur trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
