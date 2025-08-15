const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const sujetRoutes = require("./routes/sujetRoutes");

dotenv.config();

const app = express();

// Connexion à la base de données MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", userRoutes); // Routes pour les utilisateurs
app.use("/api/admin", adminRoutes); // Routes pour les administrateurs
app.use("/api/sujets", sujetRoutes); // Routes pour les sujets (épreuves)

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur le port ${PORT}`);
});
