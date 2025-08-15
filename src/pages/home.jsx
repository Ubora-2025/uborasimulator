import React from "react";
import { useNavigate } from "react-router-dom"; // Importation de useNavigate pour la redirection
import backgroundImage from "../components/Background.jpg";
import logo from "../components/logo.png";

function home() {
  const navigate = useNavigate(); // Création de l'instance navigate

  const handleStartClick = () => {
    // Redirige vers la page de connexion lorsqu'on clique sur "Commencer"
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Image background avec animation zoom */}
      <img
        src={backgroundImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover animate-zoomInOut"
      />

      {/* Overlay semi-transparent */}
      <div className="absolute inset-0 bg-black opacity-20"></div>

      {/* Conteneur principal en flex-col full height */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header en haut */}
        <header className="flex flex-col items-center pt-12 px-4">
          <img
            src={logo}
            alt="Logo Ubora"
            className="mb-6 w-96 h-auto drop-shadow-md"
          />
          <h1 className="text-6xl font-extrabold text-white mb-1 drop-shadow-lg text-center">
            Ubora simulator TCF
          </h1>
          <p className="text-2xl text-white mb-8 drop-shadow-md text-center max-w-xl">
            Votre simulateur d'examen pour assurer votre réussite
          </p>
        </header>

        {/* Espace flexible */}
        <div className="flex-grow"></div>

        {/* Bouton centré */}
        <main className="flex justify-center items-center pb-24 px-4">
          <button
            onClick={handleStartClick} // Ajout de l'événement sur le clic
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Commencer
          </button>
        </main>
      </div>
    </div>
  );
}

export default home;
