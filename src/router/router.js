import express from "express";
import mainController from "../controllers/mainController.js";
import treesController from "../controllers/treesController.js";
import loginController from "../controllers/loginController.js";
import signupController from "../controllers/signupController.js";
import profilController from "../controllers/profilController.js";
import cartController from "../controllers/cartController.js";
import orderController from "../controllers/orderController.js";
const router = express.Router();

router.get("/", mainController.home);
router.get("/tree", treesController.tree);
router.get("/api/families", treesController.getFamilies);
router.get("/api/trees", treesController.getTrees);

router.get("/about", mainController.about);

router.get("/signup", signupController.signup);
router.post("/signup", signupController.signupAction);

router.get("/login", loginController.login);
router.post("/login", loginController.loginAction);
router.post("/logout", loginController.logout);

router.get("/cart", cartController.viewCart); // Affiche le panier
router.post("/add-to-cart", cartController.addToCart); // Ajoute un produit au panier
router.delete("/cart/remove", cartController.removeFromCart); // Supprime un produit du panier
router.post("/payment/checkout", cartController.validateCart);
router.post("/payment/confirmation", cartController.confirmOrder);

router.get("/order", orderController.order);
router.get("/orderHistory", mainController.orderHistory);

router.get("/profil", profilController.profil); // Affiche la page de profil
router.get("/profil/edit", profilController.profilEdit); // Affiche le formulaire d'édition
router.post("/profil/edit", profilController.profilEditAction); // Gère la mise à jour des informations

router.get("/profil/password", profilController.profilPassword); // Affiche le formulaire de modification du mot de passe
router.post("/profil/password", profilController.profilPasswordAction); // Gère la modification du mot de passe

router.get("/profil/delete", profilController.profilDelete); // Affiche le formulaire de suppression du compte
router.post("/profil/delete", profilController.profilDeleteAction); // Gère la suppression du compte

export default router;
