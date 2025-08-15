// routes/sujetRoutes.js
const express = require('express');
const router = express.Router();
const Sujet = require('../models/Sujet');
const auth = require('../middleware/auth');

// Récupérer tous les sujets d'un candidat connecté
router.get('/sujets', auth, async (req, res) => {
  try {
    // Chercher les sujets associés à l'ID du candidat connecté
    const sujets = await Sujet.find({ idCandidat: req.user._id }); // Utiliser req.user._id pour filtrer par le candidat connecté
    res.status(200).json(sujets);
  } catch (err) {
    console.error('Erreur lors de la récupération des sujets', err);
    res.status(500).json({ message: 'Erreur lors de la récupération des sujets', detail: err.message });
  }
});

// Créer un sujet (admin seulement)
router.post('/sujets', auth, async (req, res) => {
  const { type, titre, consigne, idCandidat } = req.body;

  try {
    // Créer un nouveau sujet et l'enregistrer
    const sujet = new Sujet({ type, titre, consigne, idCandidat });
    await sujet.save();
    res.status(201).json({ message: 'Sujet créé avec succès' });
  } catch (err) {
    console.error('Erreur lors de la création du sujet', err);
    res.status(500).json({ message: 'Erreur lors de la création du sujet', detail: err.message });
  }
});

// Modifier un sujet (admin seulement)
router.put('/sujets/:id', auth, async (req, res) => {
  const { titre, consigne } = req.body;

  try {
    // Modifier le sujet selon l'ID
    const sujet = await Sujet.findByIdAndUpdate(req.params.id, { titre, consigne }, { new: true });
    if (!sujet) return res.status(404).json({ message: 'Sujet non trouvé' });
    res.status(200).json(sujet);
  } catch (err) {
    console.error('Erreur lors de la modification du sujet', err);
    res.status(500).json({ message: 'Erreur lors de la modification du sujet', detail: err.message });
  }
});

// Supprimer un sujet (admin seulement)
router.delete('/sujets/:id', auth, async (req, res) => {
  try {
    // Supprimer un sujet par son ID
    const sujet = await Sujet.findByIdAndDelete(req.params.id);
    if (!sujet) return res.status(404).json({ message: 'Sujet non trouvé' });
    res.status(200).json({ message: 'Sujet supprimé avec succès' });
  } catch (err) {
    console.error('Erreur lors de la suppression du sujet', err);
    res.status(500).json({ message: 'Erreur lors de la suppression du sujet', detail: err.message });
  }
});

module.exports = router;
