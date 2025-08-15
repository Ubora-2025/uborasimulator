import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog.jsx";
import { Button } from "@/components/ui/button.jsx"; // Si vous avez un composant bouton personnalisé

const VideoIntro = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null); // Référence de la vidéo
  const [videoEnded, setVideoEnded] = useState(false); // Etat pour savoir si la vidéo est terminée
  const [showModal, setShowModal] = useState(false); // État pour afficher la modale
  const [videoOpacity, setVideoOpacity] = useState(1); // Opacité de la vidéo

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.volume = 1; // Assurez-vous que le volume est à 100%
    }

    // Écoute la fin de la vidéo pour déclencher la transition
    const handleEnd = () => {
      setVideoEnded(true);
    };

    videoRef.current?.addEventListener("ended", handleEnd);

    return () => {
      videoRef.current?.removeEventListener("ended", handleEnd);
    };
  }, []);

  const handleSkip = () => {
    // Mettre la vidéo en pause et diminuer son opacité
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setVideoOpacity(0.3); // Réduire l'opacité de la vidéo
    setShowModal(true); // Afficher la modale de présentation de l'épreuve
  };

  const handleContinue = () => {
    // Rediriger vers la page de l'épreuve
    navigate("/comprehension-orale", { state: { showStartModal: true } });
  };

  return (
    <div className="relative h-screen bg-black">
      {/* Vidéo d'introduction */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src="/assets/videos/Tcfvideopresentation.mp4" // Assurez-vous que le chemin est correct
        autoPlay
        muted={false}
        controls={false} // Retirer les contrôles de la vidéo
        style={{ opacity: videoOpacity }} // Appliquer l'opacité à la vidéo
      />

      {/* Bouton Passer */}
      {!videoEnded && !showModal && (
        <button
          onClick={handleSkip}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white bg-transparent border border-white py-2 px-4 rounded opacity-70 hover:opacity-100 z-50"
        >
          Passer
        </button>
      )}

      {/* Modale de présentation de l'épreuve */}
      {showModal && (
        <Dialog open={true} onOpenChange={setShowModal}>
          <DialogContent className="w-[600px] h-[400px] p-6 bg-white rounded-lg shadow-xl overflow-y-auto z-50">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-blue-800">Présentation de l'épreuve de Compréhension Orale</DialogTitle>
            </DialogHeader>
            <p className="text-lg text-gray-700 mb-4">
              L'épreuve de compréhension orale du TCF Canada se compose de 39 questions à choix multiples, avec une seule réponse correcte parmi les quatre proposées. Le temps imparti est de 35 minutes.
            </p>
            <div className="mb-4 text-gray-700">
              <h3 className="font-semibold text-blue-800">Structure détaillée de l'épreuve:</h3>
              <ul className="list-inside list-disc mt-2">
                <li><strong>Type de questions:</strong> QCM (Questions à Choix Multiples)</li>
                <li><strong>Nombre de questions:</strong> 39</li>
                <li><strong>Durée:</strong> 35 minutes</li>
                <li><strong>Types d'extraits audio:</strong> Dialogues et monologues</li>
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

export default VideoIntro;
