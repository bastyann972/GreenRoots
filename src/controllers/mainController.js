import Tree from "../models/Tree.js";

const mainController = {
  home: async (req, res) => {
    const cart = req.session.cart || []; // Récupérer le panier depuis la session
    const trees = await Tree.findAll({
      where: {
        id_order: null, // Exclure les produits déjà associés à une commande
      },
      limit: 3,
      order: [["createdAt", "DESC"]],
    });
    res.render("home", { trees, cart }); // Rendre la vue 'home' avec les produits
  },

  about: async (req, res) => {
    res.render("about");
  },

  orderHistory: async (req, res) => {
    res.render("orderHistory");
  },
};

export default mainController;
