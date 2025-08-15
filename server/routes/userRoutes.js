// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Utilisateur introuvable" });

    // Comparaison directe (car pas de hash pour l’instant)
    if (user.password !== password) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2h" });

    res.json({
      token,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    console.error("Erreur de connexion :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
