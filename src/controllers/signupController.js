import validator from "validator";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const signupController = {
  signup: async function (req, res) {
    if (req.session.login) {
      // Si l'utilisateur est déjà connecté
      return res.redirect("/"); // Redirection vers la page d'accueil
    }

    // Si l'utilisateur n'est pas connecté, afficher la page d'inscription
    res.render("signup");
  },

  signupAction: async function (req, res) {
    try {
      const { firstname, lastname, email, password, passwordConfirm } =
        req.body;

      console.log(req.body);

      // Vérification de la validité de l'email
      if (!validator.isEmail(email)) {
        throw new Error("L'email n'est pas valide.");
      }

      const passwordoptions = {
        minLength: 12,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      };

      // Vérification de la force du mot de passe
      if (!validator.isStrongPassword(password, passwordoptions)) {
        throw new Error(
          "Le mot de passe doit contenir au moins 12 caractères, une minuscule, une majuscule, un chiffre et un caractère spécial."
        );
      }

      // Vérification de l'unicité de l'email
      const mailExist = await User.findOne({ where: { email } });
      if (mailExist) {
        throw new Error("Cet email est déjà utilisé.");
      }

      // Vérification des mots de passe
      if (password !== passwordConfirm) {
        throw new Error("Les mots de passe ne correspondent pas.");
      }

      // Hachage du mot de passe avec bcrypt
      const hash = await bcrypt.hash(password, 10);

      // Création de l'utilisateur
      const user = await User.create({
        email,
        password: hash,
        firstname,
        lastname,
      });

      // Connexion de l'utilisateur (enregistrement dans la session)
      req.session.login = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      // Redirection après l'inscription réussie
      res.redirect("/");
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error.message);

      // Renvoyer la page avec un message d'erreur
      res.status(error.statusCode || 400).render("signup", {
        error: error.message,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
      });
    }
  },
};

export default signupController;
