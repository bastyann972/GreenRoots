import User from "../models/User.js";
import bcrypt from "bcrypt";
import validator from "validator";

const profilController = {
  profil: async function (req, res) {
    try {
      const userId = req.session.login.id;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.redirect("/login");
      }
      console.log("Données de l'utilisateur:", user.toJSON());

      res.render("profil", { user });
    } catch (error) {
      console.error("Erreur chargement profil :", error);
      res.status(500).send("Erreur interne");
    }
  },

  profilEdit: async function (req, res) {
    try {
      const userId = req.session.login.id; // Vérifie si l'utilisateur est connecté
      if (!userId) return res.redirect("/login");

      const user = await User.findByPk(userId); // Récupère les données de l'utilisateur connecté par son id (userId) dans la base de données (User) avec la méthode findByPk (Primary Key) qui permet de rechercher un enregistrement par sa clé primaire (id)
      if (!user) return res.status(404).send("Utilisateur introuvable");

      // Affiche le formulaire d'édition
      return res.render("profilinfo", { user }); // Attention : 'profilinfo' doit être bien configuré comme une vue.
    } catch (error) {
      console.error("Erreur lors de l'affichage du formulaire :", error);
      return res.status(500).send("Erreur interne");
    }
  },

  profilEditAction: async function (req, res) {
    try {
      const userId = req.session.login.id; // Récupération de l'id de l'utilisateur connecté dans la session

      // Vérifier si l'utilisateur est bien connecté
      if (!userId) {
        return res.redirect("/login"); // Redirige vers la page de connexion si aucune session active
      }

      // Récupération des données du formulaire
      const { firstName, lastName, email } = req.body;

      // Trouver l'utilisateur connecté dans la base de données
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).send("Utilisateur introuvable"); // Si l'utilisateur n'existe pas
      }
      // Vérification de l'unicité de l'email si l'email a changé par rapport à celui enregistré en base de données (user.email)
      if (email !== user.email) {
        // Vérification de l'unicité de l'email en base de données pour éviter les doublons
        const mailExist = await User.findOne({ where: { email } }); // Recherche d'un utilisateur avec l'email fourni dans la base de données pour vérifier s'il existe déjà en base de données

        if (mailExist) {
          // Si l'email existe déjà en base de données
          throw new Error("Cet email est déjà utilisé."); // On renvoie une erreur
        }
      }
      // Mise à jour des informations de l'utilisateur
      await user.update({ firstname: firstName, lastname: lastName, email });

      // Redirection ou affichage d'une confirmation
      return res.redirect("/profil");
    } catch (error) {
      console.error(error.message);
      res.render("error", { message: error.message });
    }
  },

  profilPassword: function (req, res) {
    // Affiche le formulaire de modification du mot de passe
    res.render("profilpassword");
  },

  profilPasswordAction: async function (req, res) {
    try {
      const userId = req.session.login?.id; // Vérification de session active
      if (!userId) {
        throw new Error(
          "Veuillez vous connecter pour modifier votre mot de passe."
        );
      }

      const { currentPassword, newPassword, newPasswordConfirm } = req.body;

      // Vérification de la présence des champs
      if (!currentPassword || !newPassword || !newPasswordConfirm) {
        throw new Error("Tous les champs doivent être remplis.");
      }

      // Vérification de la correspondance des nouveaux mots de passe
      if (newPassword !== newPasswordConfirm) {
        throw new Error("Les nouveaux mots de passe ne correspondent pas.");
      }

      // Validation de la force du mot de passe
      const passwordOption = {
        minLength: 12,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      };

      if (!validator.isStrongPassword(newPassword, passwordOption)) {
        throw new Error(
          "Le mot de passe doit contenir au moins 12 caractères, une majuscule, un chiffre et un caractère spécial."
        );
      }

      // Recherche de l'utilisateur
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("Utilisateur introuvable.");
      }

      // Vérification du mot de passe actuel
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        throw new Error("Le mot de passe actuel est incorrect.");
      }

      // Hashage et mise à jour du mot de passe
      const hash = await bcrypt.hash(newPassword, 10);
      await user.update({ password: hash });

      // Redirection après succès
      return res.redirect("/profil");
    } catch (error) {
      console.error(
        "Erreur lors du changement de mot de passe :",
        error.message
      );
      res.render("error", {
        message: error.message || "Une erreur s'est produite.",
      });
    }
  },

  profilDelete: function (req, res) {
    res.render("profildelete"); // Affiche le formulaire de suppression du compte
  },

  profilDeleteAction: async function (req, res) {
    try {
      const userId = req.session.login.id; // Récupération de l'id de l'utilisateur connecté dans la session

      // Vérifier si l'utilisateur est bien connecté
      if (!userId) {
        return res.redirect("/login"); // Redirige vers la page de connexion si aucune session active
      }

      // Trouver l'utilisateur connecté dans la base de données
      const user = await User.findByPk(userId);

      if (!user) {
        throw new Error("Utilisateur introuvable"); // Si l'utilisateur n'existe pas
      }

      // Suppression de l'utilisateur connecté en base de données
      const destroyedUser = await user.destroy();

      if (!destroyedUser) {
        throw new Error("Erreur lors de la suppression de l'utilisateur"); // Si la suppression échoue
      } else {
        req.session.destroy(); // Suppression de la session
      }

      // Redirection ou affichage d'une confirmation
      return res.redirect("/");
    } catch (error) {
      console.error(error.message);
      res.render("error", { message: error.message });
    }
  },
};

export default profilController;
