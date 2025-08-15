const ResultatCO = require('../models/Resultat_CO');

exports.getResultatCO = async (req, res) => {
  try {
    const resultatCO = await ResultatCO.findOne({ candidateId: req.params.candidateId });
    if (!resultatCO) {
      return res.status(404).json({ message: 'Résultats non trouvés' });
    }
    res.json(resultatCO);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
