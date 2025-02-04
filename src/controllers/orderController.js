import Tree from "../models/Tree.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

const orderController = {
  order: async (req, res) => {
    const userId = req.session.login?.id;

    if (!userId) {
      return res.status(401).render("error", {
        message: "Vous devez être connecté pour consulter vos commandes.",
      });
    }

    // Récupérer les informations de l'utilisateur
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).render("error", {
        statusCode: 404, // Pass the status code here
        message: "Aucune commande trouvée.",
      });
    }

    // Récupérer la commande avec les produits associés
    const orders = await Order.findAll({
      where: { id_user: user.id },
      include: [
        {
          model: Tree,
          attributes: ["name", "price"],
        },
      ],
    });

    if (!orders || orders.length === 0) {
      // Gérer le cas où aucune commande n'est trouvée
      return res.status(404).render("error", {
        statusCode: 404, // Pass the status code here
        message: "Aucune commande trouvée.",
      });
    }

    // Rendre la vue avec les commandes récupérées
    return res.render("order", { orders });
  },
};

export default orderController;
