const mongoose = require('mongoose');

// 🛑 Aucun bcrypt ici !
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nom requis']
  },
  email: {
    type: String,
    required: [true, 'Email requis'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Mot de passe requis']
  },
  role: {
    type: String,
    enum: ['admin', 'candidat'],
    default: 'candidat'
  }
}, { timestamps: true });

// ❌ Supprime complètement ce hook :
/*
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});
*/

module.exports = mongoose.model('User', userSchema);
