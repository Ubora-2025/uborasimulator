import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/login", { email, password });

      if (!res.data.token) {
        setError("Réponse invalide du serveur.");
        return;
      }

      // 🔐 Stockage du token + nom pour affichage dans l'interface
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminName", res.data.name || "Administrateur");

      console.log("✅ Connexion réussie, redirection...");
      navigate("/admin");
    } catch (err) {
      console.error("❌ Erreur de connexion :", err.response?.data || err.message);
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8 border border-blue-200">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Connexion Admin
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
