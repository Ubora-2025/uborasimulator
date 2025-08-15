const User = require('../models/User');

exports.getUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Utilisateur existe déjà' });

  const user = new User({ name, email, password });
  await user.save();
  res.status(201).json({ message: 'Utilisateur créé' });
};
