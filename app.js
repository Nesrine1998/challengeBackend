require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const tripRoutes = require("./routes/trips");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Autorise les requêtes cross-origin
app.use(bodyParser.json()); // Parse les JSON

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("Connecté à la base de données MongoDB");
  })
  .catch((error) => {
    console.error("Erreur lors de la connexion à MongoDB:", error.message);
  });

// Routes
app.use("/trips", tripRoutes); // Associe les routes liées aux voyages

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
