import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CompréhensionOraleIntro = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const audio = new Audio('/audio/comprehension-orale.mp3');
    audio.play(); // Joue l'audio pour l'introduction de l'épreuve orale

    audio.onended = () => {
      navigate('/epreuve/comprehension-orale'); // Passe à l'épreuve après l'audio
    };
  }, [navigate]);

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Présentation de l'Épreuve de Compréhension Orale</h1>
      <p className="text-lg mb-6">
        Cette épreuve vise à évaluer votre capacité à comprendre le français parlé. Écoutez l'audio attentivement.
      </p>
      <button
        onClick={() => navigate('/epreuve/comprehension-orale')}
        className="mt-4 bg-blue-600 text-white py-2 px-6 rounded"
      >
        Commencer l'épreuve
      </button>
    </div>
  );
};

export default CompréhensionOraleIntro;
