// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

console.log("📦 adminRoutes.js chargé");

// ======================================================
// 📌 [GET] Tous les utilisateurs (protégé par token)
router.get('/users', auth, async (req, res) => {
  console.log("🔐 [GET] /users appelé par :", req.user?.email);

  try {
    const users = await User.find().select('-password');
    console.log("✅ Utilisateurs récupérés :", users.length);
    res.json(users);
  } catch (err) {
    console.error("❌ Erreur récupération utilisateurs :", err.message);
    res.status(500).json({ message: 'Erreur serveur', detail: err.message });
  }
});

// ======================================================
// ➕ [POST] Créer un utilisateur (candidat)
router.post('/users', auth, async (req, res) => {
  console.log("📨 [POST] /users (candidat) appelé");
  console.log("🧾 Données reçues :", req.body);

  const { name, email, password } = req.body;

  try {
    const exist = await User.findOne({ email });
    if (exist) {
      console.log("⚠️ Email déjà utilisé :", email);
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    const newUser = new User({ name, email, password, role: 'candidat' });
    await newUser.save();

    console.log("✅ Utilisateur candidat créé :", email);
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (err) {
    console.error("❌ Erreur création utilisateur :", err.message);
    res.status(500).json({ message: 'Erreur serveur', detail: err.message });
  }
});

// ======================================================
// ❌ [DELETE] Supprimer un utilisateur
router.delete('/users/:id', auth, async (req, res) => {
  console.log("🗑️ [DELETE] /users/:id appelé pour ID :", req.params.id);

  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      console.log("⚠️ Utilisateur non trouvé");
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    console.log("✅ Utilisateur supprimé :", user.email);
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (err) {
    console.error("❌ Erreur suppression utilisateur :", err.message);
    res.status(500).json({ message: 'Erreur serveur', detail: err.message });
  }
});

// ======================================================
// 🛠️ [POST] Créer un compte admin (à usage unique via Postman)
router.post('/register-admin', async (req, res) => {
  console.log('📨 [POST] /register-admin appelé');
  console.log('🧾 Données reçues :', req.body);

  const { name, email, password } = req.body;

  try {
    const exist = await User.findOne({ email });
    if (exist) {
      console.log("⚠️ Email déjà utilisé :", email);
      return res.status(400).json({ message: 'Cet email existe déjà' });
    }

    const admin = new User({ name, email, password, role: 'admin' }); // mot de passe en clair
    await admin.save();

    console.log("✅ Admin enregistré avec succès :", email);
    res.status(201).json({ message: 'Admin créé avec succès' });
  } catch (err) {
    console.error("❌ ERREUR création admin :", err.message, err.stack);
    res.status(500).json({ message: 'Erreur serveur', detail: err.message });
  }
});

module.exports = router;
