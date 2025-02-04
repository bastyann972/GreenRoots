import Tree from "../models/Tree.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

const cartController = {
  // Ajouter un produit au panier

  addToCart: async (req, res) => {
    try {
      const productId = req.body.productId;

      if (!productId) {
        return res.status(400).render("error", {
          statusCode: 400,
          message: "ID du produit invalide",
        });
      }

      const tree = await Tree.findByPk(productId);
      if (!tree) {
        return res
          .status(404)
          .render("error", { statusCode: 404, message: "Produit introuvable" });
      }

      // Initialiser le panier si nécessaire
      req.session.cart = req.session.cart || [];

      // Vérifier si l'article est déjà dans le panier
      const existingItem = req.session.cart.find(
        (item) => item.id === productId
      );
      if (existingItem) {
        return res.status(400).render("error", {
          statusCode: 400,
          message: "Cet article est déjà dans le panier.",
        });
      }

      // Ajouter l'article au panier
      req.session.cart.push({
        id: tree.id,
        name: tree.name,
        price: parseFloat(tree.price),
        photo: tree.photo,
        quantity: 1, // Par défaut, une quantité de 1
      });

      // Calculer le prix total
      const totalPrice = req.session.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      res.status(200).render("cart", { cart: req.session.cart, totalPrice });
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier :", error);
      res.status(500).render("error", {
        statusCode: 500,
        message: "Erreur lors de l'ajout au panier",
      });
    }
  },

  // Afficher le panier
  viewCart: async (req, res) => {
    try {
      const cart = req.session.cart || [];
      const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      res.render("cart", {
        cart,
        totalPrice,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération du panier :", error);
      res.status(500).render("error", {
        message: "Erreur lors de la récupération du panier.",
      });
    }
  },

  // Supprimer un produit du panier
  removeFromCart: async (req, res) => {
    try {
      const treeid = req.body.productId;

      if (!treeid || isNaN(treeid)) {
        return res.status(400).render("error", {
          statusCode: 400,
          message: "ID du produit invalide",
        });
      }

      if (!req.session.cart || req.session.cart.length === 0) {
        return res.render("cart", { cart: [], totalPrice: 0 });
      }

      // Supprimer l'article du panier
      req.session.cart = req.session.cart.filter(
        (item) => item.id !== parseInt(treeid)
      );

      const totalPrice = req.session.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      res.status(200).render("cart", { cart: req.session.cart, totalPrice });
    } catch (error) {
      console.error("Erreur lors de la suppression du produit :", error);
      res.status(500).render("error", {
        statusCode: 500,
        message: "Erreur lors de la suppression du produit",
      });
    }
  },

  validateCart: async (req, res) => {
    try {
      const userId = req.session.login?.id;

      if (!userId) {
        return res.status(401).render("error", {
          statusCode: 401,
          message: "Vous devez être connecté pour passer une commande.",
        });
      }

      const user = await User.findByPk(userId, {
        attributes: ["firstname", "lastname", "email"],
      });

      if (!user) {
        return res.status(404).render("error", {
          statusCode: 404,
          message: "Utilisateur introuvable. Veuillez vous reconnecter.",
        });
      }

      const cart = req.session.cart || [];
      if (cart.length === 0) {
        return res.status(400).render("error", {
          statusCode: 400,
          message: "Votre panier est vide.",
        });
      }

      const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

      res.render("payment", {
        user,
        cart,
        totalPrice,
      });
    } catch (error) {
      console.error("Erreur lors de la validation du panier :", error);
      res.status(500).render("error", {
        statusCode: 500,
        message: "Erreur interne lors du traitement.",
      });
    }
  },

  confirmOrder: async (req, res) => {
    try {
      const userId = req.session.login?.id;

      if (!userId) {
        return res.status(401).render("error", {
          statusCode: 401,
          message: "Vous devez être connecté pour confirmer votre commande.",
        });
      }

      const user = await User.findByPk(userId, {
        attributes: ["firstname", "lastname", "email"],
      });

      if (!user) {
        return res.status(404).render("error", {
          statusCode: 404,
          message: "Utilisateur introuvable. Veuillez vous reconnecter.",
        });
      }

      const cart = req.session.cart || [];
      if (cart.length === 0) {
        return res.status(400).render("error", {
          statusCode: 400,
          message:
            "Votre panier est vide. Veuillez ajouter des produits avant de passer une commande.",
        });
      }

      const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

      for (const item of cart) {
        const tree = await Tree.findOne({ where: { id: item.id } });
        if (!tree || tree.id_order) {
          return res.status(400).render("error", {
            statusCode: 400,
            message: `Le produit "${item.name}" n'est plus disponible.`,
          });
        }
      }

      const order = await Order.create({
        id_user: userId,
        date_order: new Date(),
        status: true,
      });

      cart.map(async (item) => {
        await Tree.update({ id_order: order.id }, { where: { id: item.id } });
      });

      req.session.cart = [];

      return res.render("confirmation", {
        user,
        cart,
        totalPrice,
        order,
      });
    } catch (error) {
      console.error("Erreur lors de la confirmation de la commande :", error);
      return res.status(500).render("error", {
        statusCode: 500,
        message:
          "Une erreur est survenue lors de la confirmation de votre commande. Veuillez réessayer plus tard.",
      });
    }
  },
};

export default cartController;
