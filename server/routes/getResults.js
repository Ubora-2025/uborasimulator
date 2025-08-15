const express = require('express');
const router = express.Router();
const ResultatCO = require('../models/Resultat_CO');
const ResultatCE = require('../models/Resultat_CE');
const ResultatEE = require('../models/Resultat_EE');

// Route pour récupérer les résultats du candidat
router.get("/getResults/:candidateId", async (req, res) => {
  const { candidateId } = req.params;
  try {
    const resultCO = await ResultatCO.findOne({ candidateId });
    const resultCE = await ResultatCE.findOne({ candidateId });
    const resultEE = await ResultatEE.findOne({ candidateId });

    res.json({
      scoreCO: resultCO ? resultCO.score : 0,
      scoreCE: resultCE ? resultCE.score : 0,
      devoirsEE: resultEE ? resultEE.devoirs : null,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des résultats", error);
    res.status(500).send("Erreur serveur");
  }
});

module.exports = router;
