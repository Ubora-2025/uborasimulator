const express = require('express');
const router = express.Router();
const ResultatCO = require('../models/Resultat_CO');

// Route pour enregistrer les résultats de la compréhension orale
router.post('/saveResultsCO', async (req, res) => {
  const { candidateId, scoreCO, correctAnswers, totalPoints, totalQuestions } = req.body;

  try {
    const result = new ResultatCO({
      candidateId,
      score: scoreCO,
      correctAnswers,
      totalPoints,
      totalQuestions,
    });

    await result.save();
    res.status(200).json({ message: 'Résultats sauvegardés avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;