import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Vérifier si un token est déjà dans localStorage (signifie que l'utilisateur est déjà connecté)
  useEffect(() => {
    const token = localStorage.getItem("candidateToken");
    if (token) {
      navigate("/expression-ecrite"); // Si l'utilisateur est déjà connecté, redirigez vers l'épreuve
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Réinitialiser l'erreur

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { email, password });


      // Si l'utilisateur n'est pas un candidat, on l'informe
      if (res.data.role !== "candidat") {
        setError("Vous n’êtes pas autorisé à accéder à cet espace.");
        return;
      }

      // Sauvegarde du token et du nom du candidat dans le localStorage
      localStorage.setItem("candidateToken", res.data.token);
      localStorage.setItem("candidateName", res.data.name);

      // Rediriger vers la page WelcomePage après une connexion réussie
      navigate("/WelcomePage"); // Redirection vers la page de bienvenue
    } catch (err) {
      console.error("Erreur de connexion candidat :", err.response?.data || err);
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-md p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Connexion Candidat</h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Mot de passe</label>
        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default Login;
