import express from "express";
import dotenv from "dotenv";
import router from "./src/router/router.js";
import {
  sessionMiddleware,
  sessionToLocals,
  notFoundMiddleware,
  errorHandlerMiddleware,
} from "./src/middleware/middleware.js";

// Chargement des variables d'environnement
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Application des middlewares de session
app.use(sessionMiddleware);
app.use(sessionToLocals);

// Middlewares pour le traitement des données des requêtes
app.use(express.urlencoded({ extended: true })); // Pour traiter les formulaires (x-www-form-urlencoded)
app.use(express.json()); // Pour traiter les données JSON

// Configuration du moteur de vues
app.set("view engine", "ejs"); // Utilisation d'EJS comme moteur de rendu
app.set("views", "./src/views"); // Répertoire où se trouvent les vues

// Middleware pour les fichiers statiques
app.use(express.static("public")); // Répertoire pour les fichiers statiques (CSS, JS, images)

// Routes principales
app.use(router); // Enregistrement du routeur principal

// Gestion des erreurs
app.use(notFoundMiddleware); // Gestion des erreurs 404
app.use(errorHandlerMiddleware); // Gestion des erreurs 500

// Lancement du serveur
app.listen(port, () => {
  console.log(`✅ Serveur démarré et prêt sur : http://localhost:${port}`);
  console.log("🚀 Appuyez sur CTRL+C pour arrêter le serveur.");
});
