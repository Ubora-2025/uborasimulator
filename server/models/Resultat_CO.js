const mongoose = require('mongoose');

// Définition du modèle pour la compréhension orale
const resultatCOSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  totalPoints: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Resultat_CO', resultatCOSchema);
