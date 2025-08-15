import React, { useState, useEffect } from "react";
import axios from "axios";

const EpreuveManagement = () => {
  const [candidats, setCandidats] = useState([]);
  const [selectedCandidat, setSelectedCandidat] = useState("");
  const [epreuve, setEpreuve] = useState("");
  const [selectedSujet, setSelectedSujet] = useState("");
  const [sujets, setSujets] = useState([]);
  
  const [newSujet, setNewSujet] = useState({
    type: "",
    titre: "",
    consigne: "",
    idCandidat: "",
  });

  // Récupérer les candidats au démarrage
  useEffect(() => {
    axios
      .get("/api/admin/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      })
      .then((res) => setCandidats(res.data))
      .catch((err) => console.error("Erreur lors de la récupération des candidats:", err));
  }, []);

  // Fonction pour charger le sujet à partir d'un fichier JSON
  const loadSujetFromFile = (fileName) => {
    fetch(`/data/${fileName}.json`)
      .then((response) => response.json())
      .then((data) => setSujets(data))
      .catch((error) => console.error("Erreur de chargement des sujets :", error));
  };

  // Charger les sujets dès que l'épreuve est sélectionnée
  useEffect(() => {
    if (epreuve === "Expression écrite" && selectedSujet) {
      loadSujetFromFile(selectedSujet);
    }

    // Charger d'autres épreuves comme la Compréhension Orale et la Compréhension Écrite ici
    if (epreuve === "Compréhension orale") {
      loadSujetFromFile("comprehension_orale_session1"); // Sujet pour la compréhension orale
    }

    if (epreuve === "Compréhension écrite") {
      loadSujetFromFile("comprehension_ecrite_session1"); // Sujet pour la compréhension écrite
    }
  }, [epreuve, selectedSujet]);

  // Fonction pour assigner le sujet au candidat
  const handleCreateSujet = () => {
    // Vérifier si un candidat et un sujet ont bien été sélectionnés
    if (selectedCandidat && selectedSujet) {
      alert(`Sujet ${selectedSujet} attribué au candidat ${selectedCandidat}`);
      // Vous pouvez associer ce sujet au candidat sans l'enregistrer dans la base de données
    } else {
      alert("Sélectionnez un candidat et un sujet");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Gestion des Épreuves</h2>

      {/* Sélection du candidat */}
      <div className="mb-6">
        <label className="block text-sm font-semibold">Choisir un Candidat</label>
        <select
          onChange={(e) => setSelectedCandidat(e.target.value)}
          value={selectedCandidat}
          className="w-full p-3 border rounded-md mb-6 bg-gray-50"
        >
          <option value="">Sélectionnez un Candidat</option>
          {candidats.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Sélection de l'épreuve */}
      <div className="mb-6">
        <label className="block text-sm font-semibold">Choisir l'Épreuve</label>
        <select
          onChange={(e) => setEpreuve(e.target.value)}
          value={epreuve}
          className="w-full p-3 border rounded-md mb-6 bg-gray-50"
        >
          <option value="">Sélectionnez une épreuve</option>
          <option value="Expression écrite">Expression écrite</option>
          <option value="Compréhension orale">Compréhension orale</option>
          <option value="Compréhension écrite">Compréhension écrite</option>
        </select>
      </div>

      {/* Sélectionner le fichier JSON (sujet) */}
      {epreuve === "Expression écrite" && (
        <>
          <div className="mb-6">
            <label className="block text-sm font-semibold">Choisir le Sujet (fichier JSON)</label>
            <select
              onChange={(e) => setSelectedSujet(e.target.value)}
              value={selectedSujet}
              className="w-full p-3 border rounded-md mb-6 bg-gray-50"
            >
              <option value="">Sélectionnez un sujet</option>
              <option value="sujet1EESession1">Sujet 1 - Session 1</option>
              <option value="sujet2EESession1">Sujet 2 - Session 1</option>
            </select>
          </div>

          {/* Affichage des tâches de l'épreuve */}
          {sujets.length > 0 && (
            <div>
              {sujets.map((sujet) => (
                <div key={sujet.id}>
                  <h3 className="text-xl font-semibold">{sujet.titre}</h3>
                  <p>{sujet.consigne}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Pour la compréhension orale */}
      {epreuve === "Compréhension orale" && (
        <>
          <div className="mb-6">
            <label className="block text-sm font-semibold">Choisir le Sujet (fichier JSON)</label>
            <select
              onChange={(e) => setSelectedSujet(e.target.value)}
              value={selectedSujet}
              className="w-full p-3 border rounded-md mb-6 bg-gray-50"
            >
              <option value="">Sélectionnez un sujet</option>
              <option value="comprehension_orale_session1">Compréhension orale - Session 1</option>
            </select>
          </div>
        </>
      )}

      {/* Pour la compréhension écrite */}
      {epreuve === "Compréhension écrite" && (
        <>
          <div className="mb-6">
            <label className="block text-sm font-semibold">Choisir le Sujet (fichier JSON)</label>
            <select
              onChange={(e) => setSelectedSujet(e.target.value)}
              value={selectedSujet}
              className="w-full p-3 border rounded-md mb-6 bg-gray-50"
            >
              <option value="">Sélectionnez un sujet</option>
              <option value="comprehension_ecrite_session1">Compréhension écrite - Session 1</option>
            </select>
          </div>
        </>
      )}

      {/* Créer le sujet (sans modification de la base de données) */}
      <button
        onClick={handleCreateSujet}
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
      >
        Assigner le Sujet
      </button>
    </div>
  );
};

export default EpreuveManagement;
