import bcrypt from "bcrypt";
import User from "../models/User.js";

const loginController = {
  login: function (req, res) {
    // Fonction de connexion
    if (req.session.login) {
      console.log(req.session);

      // Si l'utilisateur est déjà connecté
      return res.redirect("/"); // Redirection vers la page d'accueil
    }
    res.render("login"); // Renvoie du formulaire de connexion
  },
  loginAction: async function (req, res) {
    try {
      console.log("Données reçues dans req.body :", req.body); // Ajoutez ce log

      const { email, password } = req.body;

      // Vérifier que l'email et le mot de passe sont fournis
      if (!email || !password) {
        throw new Error("L'email et le mot de passe sont requis.");
      }

      // Rechercher l'utilisateur par email dans la base de données
      const user = await User.findOne({ where: { email } });

      if (!user) {
        // Si aucun utilisateur n'est trouvé
        throw new Error("Email ou mot de passe incorrect.");
      }

      // Vérification du mot de passe avec bcrypt
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        // Si le mot de passe est incorrect
        throw new Error("Email ou mot de passe incorrect.");
      }

      // Si tout est correct, connecter l'utilisateur
      req.session.login = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      console.log("Connexion réussie :", req.session.login);

      // Redirection après connexion réussie
      res.redirect("/");
    } catch (error) {
      console.error("Erreur lors de la connexion :", error.message);

      // Afficher un message d'erreur dans la vue de connexion
      res.render("login", { error: error.message });
    }
  },

  logout: function (req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Erreur lors de la déconnexion :", err);
        return res.redirect("/"); // Redirige vers l'accueil en cas d'erreur
      }
      res.redirect("/"); // Redirige vers l'accueil après la déconnexion
    });
  },
};
export default loginController;
