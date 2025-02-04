import session from "express-session";

// Middleware pour gérer les sessions
export const sessionMiddleware = session({
  resave: false, // Ne sauvegarde pas la session si elle n'est pas modifiée
  saveUninitialized: true, // Sauvegarde les sessions même si elles ne contiennent rien
  secret: process.env.SECRET, // Clé secrète pour signer les sessions
});

// Middleware pour rendre la session accessible dans les vues
export const sessionToLocals = (req, res, next) => {
  console.log("Session actuelle : ", req.session); // Affiche la session pour le débogage
  res.locals.session = req.session; // Rend la session disponible dans les vues
  next();
};

// Middleware pour gérer les erreurs 404 (page introuvable)
export const notFoundMiddleware = (req, res) => {
  res.status(404).render("error", {
    statusCode: 404,
    message: "La page demandée n'a pas pu être trouvée.",
  });
};

// Middleware pour gérer les erreurs 500 (erreurs serveur)
export const errorHandlerMiddleware = (err, req, res, next) => {
  console.error("Erreur interne : ", err.stack); // Affiche l'erreur dans la console pour débogage
  res.status(500).render("error", {
    statusCode: 500,
    message:
      "Une erreur interne du serveur s'est produite. Veuillez réessayer plus tard.",
  });
};
