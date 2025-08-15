// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const header = req.header('Authorization');
  if (!header || !header.startsWith('Bearer ')) {
    console.log('❌ Aucun token Bearer fourni.');
    return res.status(401).json({ message: 'Non autorisé' });
  }

  const token = header.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      console.log('❌ Utilisateur non trouvé pour ce token');
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log('❌ Token invalide :', error.message);
    res.status(401).json({ message: 'Token invalide' });
  }
};

module.exports = auth;
