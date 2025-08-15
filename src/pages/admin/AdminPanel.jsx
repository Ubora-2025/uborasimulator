// src/pages/admin/AdminPanel.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const navigate = useNavigate();

  const adminName = localStorage.getItem("adminName") || "Administrateur";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminName");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-800">
            Bienvenue, {adminName}
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Se déconnecter
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            onClick={() => navigate("/admin/user-management")}
            className="cursor-pointer bg-blue-100 p-6 rounded-lg shadow hover:bg-blue-200 transition"
          >
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              👥 Gestion des utilisateurs
            </h2>
            <p className="text-sm text-gray-700">
              Créez, modifiez et supprimez les comptes candidats.
            </p>
          </div>

          <div
            onClick={() => navigate("/admin/epreuve-management")}
            className="cursor-pointer bg-green-100 p-6 rounded-lg shadow hover:bg-green-200 transition"
          >
            <h2 className="text-xl font-semibold text-green-700 mb-2">
              📚 Gestion des épreuves
            </h2>
            <p className="text-sm text-gray-700">
              Ajoutez ou modifiez les textes, questions et audios.
            </p>
          </div>

          <div className="cursor-not-allowed bg-gray-100 p-6 rounded-lg shadow opacity-60">
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              📊 Statistiques (bientôt)
            </h2>
            <p className="text-sm text-gray-600">
              Analyse des performances des candidats.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
