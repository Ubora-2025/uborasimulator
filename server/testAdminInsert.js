// testAdminInsert.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

console.log("🚀 Script lancé");

async function testCreateAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connecté à MongoDB");

    const newAdmin = new User({
      name: "TestConsoleAdmin",
      email: "admin-console@ubora.com",
      password: "test1234", // mot de passe brut
      role: "admin"
    });

    await newAdmin.save();
    console.log("✅ Admin sauvegardé avec succès !");
    console.log("📨 Email:", newAdmin.email);
    console.log("🔐 Password (hashé en DB):", newAdmin.password);

    await mongoose.disconnect();
    console.log("🔌 Déconnecté de MongoDB");
  } catch (error) {
    console.error("❌ Erreur lors de la création admin :", error.message);
  }
}

testCreateAdmin();
