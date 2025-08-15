const express = require('express');
const router = express.Router();
const ResultatCE = require('../models/Resultat_CE');

// Route pour enregistrer les résultats de la compréhension écrite
router.post('/saveResultsCE', async (req, res) => {
  const { candidateId, scoreCE } = req.body;

  try {
    const result = new ResultatCE({
      candidateId,
      score: scoreCE,
    });

    await result.save();
    res.status(200).json({ message: 'Résultats sauvegardés avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
