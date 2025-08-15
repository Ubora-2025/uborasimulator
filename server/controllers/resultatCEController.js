const ResultatCE = require('../models/Resultat_CE');

exports.getResultatCE = async (req, res) => {
  try {
    const resultatCE = await ResultatCE.findOne({ candidateId: req.params.candidateId });
    if (!resultatCE) {
      return res.status(404).json({ message: 'Résultats non trouvés' });
    }
    res.json(resultatCE);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
