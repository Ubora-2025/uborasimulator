import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog.jsx";
import { Button } from "@/components/ui/button.jsx"; // Si vous avez un composant bouton personnalisé

const TransitionPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [videoEnded, setVideoEnded] = useState(false); 
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.volume = 1; // Volume à 100%
    }

    const handleEnd = () => {
      setVideoEnded(true);
    };

    videoRef.current?.addEventListener("ended", handleEnd);

    return () => {
      videoRef.current?.removeEventListener("ended", handleEnd);
    };
  }, []);

  const handleSkip = () => {
    // Mettre la vidéo en pause et afficher la modale
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setShowModal(true); 
  };

  const handleContinue = () => {
    navigate("/ecrit-comprehension"); // Rediriger vers l'épreuve de compréhension écrite
  };

  return (
    <div className="relative h-screen bg-black">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src="/assets/videos/transition_video.mp4" // Vidéo de transition
        autoPlay
        muted={false}
        controls={false} // Pas de contrôles
      />

      {!videoEnded && (
        <button
          onClick={handleSkip}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white bg-transparent border border-white py-2 px-4 rounded opacity-70 hover:opacity-100 z-50"
        >
          Passer
        </button>
      )}

      {showModal && (
        <Dialog open={true} onOpenChange={setShowModal}>
          <DialogContent className="w-[600px] h-[400px] p-6 bg-white rounded-lg shadow-xl overflow-y-auto z-50">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-blue-800">Présentation de l'épreuve de Compréhension Écrite</DialogTitle>
            </DialogHeader>
            <p className="text-lg text-gray-700 mb-4">
              L'épreuve de compréhension écrite du TCF Canada se compose de 39 questions à choix multiples. Le temps imparti est de 35 minutes.
            </p>
            <div className="mb-4 text-gray-700">
              <h3 className="font-semibold text-blue-800">Structure détaillée de l'épreuve:</h3>
              <ul className="list-inside list-disc mt-2">
                <li><strong>Type de questions:</strong> QCM (Questions à Choix Multiples)</li>
                <li><strong>Nombre de questions:</strong> 39</li>
                <li><strong>Durée:</strong> 35 minutes</li>
                <li><strong>Types de textes:</strong> Dialogues, monologues, extraits écrits</li>
                <li><strong>Audios écoutés une seule fois:</strong> Chaque enregistrement est diffusé une seule fois</li>
                <li><strong>Pas de retour en arrière:</strong> Il est impossible de revenir à une question précédente</li>
              </ul>
            </div>
            <DialogFooter>
              <Button onClick={handleContinue} className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700">
                Continuer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TransitionPage;
