const mongoose = require('mongoose');

const resultatSchema = new mongoose.Schema({
  utilisateurId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sujetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sujet' },
  reponses: [String],
  note: Number,
  dateSoumission: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resultat', resultatSchema);
