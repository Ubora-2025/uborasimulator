import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExpressionEcrite from "./ExpressionEcrite";
import useCandidatSujets from "../hooks/useCandidatSujets"; // ✅ hook à créer si pas déjà
import axios from "axios";

export default function Dashboard() {
  const [examenCommence, setExamenCommence] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sujets, setSujets] = useState(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("candidateToken");

  // useEffect(() => {
  //   const fetchSujets = async () => {
  //     try {
  //       const res = await axios.get("/api/sujets/candidat", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       setSujets(res.data);
  //     } catch (err) {
  //       setError("Erreur de chargement des sujets.");
  //       console.error(err);
  //     } finally {
        setLoading(false);
  //     }
  //   };

  //   fetchSujets();
  // }, [token]);

  const handleCloseModal = () => {
    navigate("/comprehension-orale");
  };

  if (loading) {
    return <div className="text-center p-10 text-blue-700">Chargement des sujets...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-600">{error}</div>;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "linear-gradient(135deg, #e0f2fe 0%, #ffffff 100%)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {!examenCommence && (
        <div className="bg-white rounded-lg shadow-xl p-10 w-full max-w-md flex flex-col items-center">
          <p className="text-lg text-center text-blue-900 mb-6">
            Cliquez sur le bouton <span className="font-semibold">Commencer</span> pour démarrer l’examen officiel.
          </p>
          <button
            onClick={() => setExamenCommence(true)}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
          >
            Commencer
          </button>
        </div>
      )}

      {examenCommence && (
        <ExpressionEcrite sujets={sujets.expressionEcrite} onClose={handleCloseModal} />
      )}
    </div>
  );
}
