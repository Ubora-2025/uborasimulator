import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Pour les animations de transition

const WelcomePage = () => {
  const [showIntroText, setShowIntroText] = useState(true);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showStartButton, setShowStartButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Afficher l'introduction et gérer le texte
    setTimeout(() => {
      setShowIntroText(false);
      setShowRecommendations(true);
    }, 4000); // Délai pour afficher le texte suivant

    // Après un délai, afficher le bouton "Passer"
    setTimeout(() => {
      setShowStartButton(true);
    }, 8000); // Délai avant d'afficher le bouton
  }, []);

  const handlePass = () => {
    navigate("/video-intro"); // Navigue vers la page de la vidéo d'introduction
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-600 text-white">
      <div className="text-center p-8 max-w-xl">
        {showIntroText && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="text-4xl font-bold mb-4"
          >
            Bienvenue sur le simulateur du TCF Canada
          </motion.h1>
        )}

        {showRecommendations && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="text-lg mb-6"
          >
            Ce simulateur a été conçu pour refléter la réalité de l'examen.
            <br />
            Prenez ce test au sérieux pour évaluer vos compétences.
          </motion.p>
        )}

        {showStartButton && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            onClick={handlePass}
            className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full hover:bg-blue-50 transition"
          >
            Passer
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default WelcomePage;
