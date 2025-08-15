import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button.jsx";
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog.jsx";
import axios from 'axios';

export default function ExpressionEcrite() {
  const [selectedTache, setSelectedTache] = useState(1); // Tâche par défaut
  const [reponses, setReponses] = useState({ 1: '', 2: '', 3: '' });
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes en secondes
  const [showDialog, setShowDialog] = useState(false);
  const [sujetsCandidat, setSujetsCandidat] = useState([]);
  const [currentSujet, setCurrentSujet] = useState(null); // Sujet assigné au candidat
  const [wordCount, setWordCount] = useState({ 1: 0, 2: 0, 3: 0 }); // Compteur de mots pour chaque tâche
  const navigate = useNavigate();

  const token = localStorage.getItem('candidateToken'); // Utilise le token du candidat pour l'authentification

  // Charger le sujet assigné au candidat
  useEffect(() => {
    fetch('/data/sujet1EESession1.json') // Exemple de chargement d'un fichier JSON
      .then((response) => response.json())
      .then((data) => setSujetsCandidat(data)) // Charger les tâches depuis le fichier JSON
      .catch((error) => console.error('Erreur de chargement des sujets :', error));

    // Lancer le compteur de temps
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          setShowDialog(true); // Affiche la modale lorsque le temps est écoulé
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // Mise à jour toutes les secondes

    return () => clearInterval(timer); // Nettoyage du timer au démontage du composant
  }, []);

  const handleTacheChange = (tacheId) => {
    setSelectedTache(tacheId);
    setWordCount({ ...wordCount, [tacheId]: 0 }); // Réinitialiser le nombre de mots à chaque changement de tâche
  };

  const handleAnswerChange = (tacheId, answer) => {
    setReponses({ ...reponses, [tacheId]: answer });
    setWordCount({ ...wordCount, [tacheId]: countWords(answer) }); // Mettre à jour le nombre de mots chaque fois qu'il y a une modification
  };

  const handleSubmit = () => {
    // Sauvegarder les réponses ou procéder à la logique de soumission
    alert('Réponses soumises avec succès');
    // Vous pouvez ensuite envoyer les réponses du candidat à votre backend si nécessaire
  };

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(w => w).length;
  };

  // Utiliser le sujet sélectionné
  const selectedSujet = sujetsCandidat.find(sujet => sujet.id === selectedTache);

  const getWordLimitClass = (sujet) => {
    if (wordCount[sujet.id] < sujet.min) {
      return 'text-gray-500'; // Moins que la limite minimale, gris
    } else if (wordCount[sujet.id] > sujet.max) {
      return 'text-red-600'; // Plus que la limite maximale, rouge
    }
    return 'text-green-600'; // Dans la plage, vert
  };

  return (
    <div className="flex h-screen bg-[#f4f4f4] text-gray-800 font-sans">
      {/* Sidebar pour les boutons de tâche */}
      <div className="w-[180px] bg-white border-r border-blue-600 p-4 flex flex-col items-center">
        <div className="w-full flex flex-col gap-3">
          {/* Boutons pour chaque tâche */}
          {sujetsCandidat.map((sujet) => (
            <button
              key={sujet.id}
              onClick={() => handleTacheChange(sujet.id)}
              className={`w-full py-2 px-3 rounded border text-sm font-semibold shadow-sm transition-all duration-150 text-center ${selectedTache === sujet.id ? "bg-blue-600 text-white border-blue-600" : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"}`}
            >
              {sujet.titre}
            </button>
          ))}
          <p className="text-xs text-center text-gray-600 mt-2">Cliquez sur la tâche pour accéder à son espace.</p>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 p-6 space-y-4 flex flex-col">
        {/* Objectif de la tâche */}
        {selectedSujet && (
          <div className="space-y-4">
            <div className="border-b-2 border-gray-300 pb-2">
              <h3 className="font-semibold text-lg text-gray-600" style={{ fontSize: '14px', marginTop: '-10px' }}>
                {selectedSujet.titre === "Tâche 3" ? "Rédigez un texte argumentatif en utilisant les documents fournis." : selectedSujet.consigne.split("\n")[0]} {/* Objectif pour la tâche 3 */}
              </h3>
            </div>

            {/* Affichage de l'énoncé de la tâche */}
            <div className="bg-white p-4 shadow-md rounded mt-4">
              {/* Affichage spécifique pour la Tâche 3 (deux documents) */}
              {selectedTache === 3 ? (
                <div>
                  <h4 className="font-semibold text-lg text-gray-600">Document 1 :</h4>
                  <p>{selectedSujet.consigne.split('Document 1 :')[1].split('Document 2 :')[0].trim()}</p>
                  <h4 className="font-semibold text-lg text-gray-600">Document 2 :</h4>
                  <p>{selectedSujet.consigne.split('Document 2 :')[1].trim()}</p>
                </div>
              ) : (
                <p>{selectedSujet.consigne}</p>
              )}
            </div>
          </div>
        )}

        {/* Zone de texte pour la réponse */}
        <textarea
          value={reponses[selectedTache] || ''}
          onChange={(e) => handleAnswerChange(selectedTache, e.target.value)}
          placeholder="Écrivez votre message ici…"
          className="flex-1 p-4 bg-white border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm h-[250px]" // Réduit la hauteur de la zone de texte
          spellCheck={false}
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>({selectedSujet ? selectedSujet.min : 0}-{selectedSujet ? selectedSujet.max : 0} mots)</span>
          <span>{countWords(reponses[selectedTache])} mots</span>
        </div>

        {/* Liste des conditions d'admission */}
        <div className="mt-4 text-sm text-gray-700 absolute bottom-4 right-16">
          <h4 className="font-semibold text-xs">Conditions d'admission</h4>
          <ul className="text-sm">
            {sujetsCandidat.map((sujet) => (
              <li key={sujet.id} className="text-gray-700">
                <span className={`font-semibold ${getWordLimitClass(sujet)}`}>
                  {sujet.titre} - {wordCount[sujet.id]}/{sujet.max} mots
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sidebar droite pour le timer et les raccourcis */}
      <div className="w-[240px] bg-white border-l border-blue-600 p-4 flex flex-col justify-start gap-4">
        <div className="text-center space-y-2">
          <h3 className="text-sm font-semibold">Temps restant</h3>
          <div className="text-3xl font-bold text-red-600 tracking-wide">{formatTime(timeLeft)}</div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-1">Tableau de Caractères</h4>
          <div className="flex flex-wrap gap-1">
            {'àâäéèêëîïôöùûüç'.split('').map(c => (
              <button key={c} onClick={() => setReponses(prev => ({ ...prev, [selectedTache]: (prev[selectedTache] || '') + c }))} className="px-2 py-1 border text-sm rounded hover:bg-gray-200" type="button">
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modale de fin de temps */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Temps terminé</DialogTitle>
          </DialogHeader>
          <p>Votre devoir a été enregistré. Vous pourrez le télécharger plus tard dans votre espace personnel.</p>
          <DialogFooter>
            <Button onClick={() => navigate('/comprehension-orale')}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
