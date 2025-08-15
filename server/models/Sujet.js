const mongoose = require('mongoose');

// Définir le modèle Sujet
const SujetSchema = new mongoose.Schema({
  type: { 
    type: String, 
    required: true 
  }, // Type d'épreuve (expression, compréhension orale, compréhension écrite)
  
  titre: { 
    type: String, 
    required: true 
  }, // Titre de la tâche ou question
  
  consigne: { 
    type: String, 
    required: true 
  }, // Consigne pour l'expression écrite ou le texte/question pour la compréhension

  idCandidat: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, // ID du candidat pour lequel ce sujet est assigné
  
  image: { 
    type: String 
  }, // Image pour la compréhension orale (facultatif)

  audio: { 
    type: String 
  }, // Audio pour la compréhension orale (facultatif)

  questionTexte: { 
    type: String 
  }, // Texte de la question (pour compréhension orale et écrite)

  options: [String], // Options de réponse (pour compréhension orale et écrite)

});

const Sujet = mongoose.model('Sujet', SujetSchema);

module.exports = Sujet;
