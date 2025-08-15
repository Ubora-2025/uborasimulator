import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ResultsPage = () => {
  const [resultsCO, setResultsCO] = useState(null); // Résultats de la compréhension orale
  const [resultsCE, setResultsCE] = useState(null); // Résultats de la compréhension écrite
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer les résultats de la compréhension orale et écrite
    const fetchResults = async () => {
      try {
        // Remplacer par l'ID du candidat (à récupérer du contexte ou de l'authentification)
        const candidateId = "CANDIDAT_ID"; 

        const responseCO = await fetch(`/api/resultsCO/${candidateId}`);
        const dataCO = await responseCO.json();
        setResultsCO(dataCO);

        const responseCE = await fetch(`/api/resultsCE/${candidateId}`);
        const dataCE = await responseCE.json();
        setResultsCE(dataCE);
      } catch (error) {
        console.error("Erreur lors de la récupération des résultats:", error);
      }
    };

    fetchResults();
  }, []);

  const handleBackToHome = () => {
    navigate("/home"); // Rediriger vers la page d'accueil ou une autre page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">Vos Résultats</h1>

      {/* Résultats de la compréhension orale */}
      {resultsCO && (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6 max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Compréhension Orale (CO)</h2>
          <p className="text-lg font-medium text-gray-700 mb-4">
            Votre score : {resultsCO.score} / {resultsCO.totalPoints} points
          </p>
          <p className="text-md text-gray-500">
            Vous avez répondu correctement à {resultsCO.correctAnswers} questions sur {resultsCO.totalQuestions}.
          </p>
        </div>
      )}

      {/* Résultats de la compréhension écrite */}
      {resultsCE && (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6 max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Compréhension Écrite (CE)</h2>
          <p className="text-lg font-medium text-gray-700 mb-4">
            Votre score : {resultsCE.score} / {resultsCE.totalPoints} points
          </p>
          <p className="text-md text-gray-500">
            Vous avez répondu correctement à {resultsCE.correctAnswers} questions sur {resultsCE.totalQuestions}.
          </p>
        </div>
      )}

      {/* Bouton pour revenir à l'accueil ou page suivante */}
      <div className="flex justify-center">
        <button
          onClick={handleBackToHome}
          className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
