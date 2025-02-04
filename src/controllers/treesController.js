import Tree from "../models/Tree.js";
import Family from "../models/Family.js";

const treesController = {
  // Route pour afficher la page "tree"
  tree: async (req, res) => {
    try {
      const families = await Family.findAll(); // Récupère toutes les familles
      res.status(200).render("tree", { families }); // Rend la vue "tree.ejs" avec les familles
    } catch (error) {
      console.error("Erreur lors de la récupération des familles :", error);
      res.status(500).render("error", {
        statusCode: 500,
        message:
          "Erreur lors de la récupération des familles. Veuillez réessayer plus tard.",
      });
    }
  },

  // API pour récupérer toutes les familles
  getFamilies: async (req, res) => {
    try {
      const families = await Family.findAll();
      res.status(200).json(families); // Renvoie les familles sous forme de JSON
    } catch (error) {
      console.error("Erreur lors de la récupération des familles :", error);
      res.status(500).render("error", {
        statusCode: 500,
        message:
          "Impossible de récupérer les familles. Veuillez réessayer plus tard.",
      });
    }
  },

  // API pour récupérer les arbres (tous ou filtrés par famille)
  getTrees: async (req, res) => {
    try {
      const familyId = req.query.familyId || null;

      let trees;
      if (familyId) {
        // Récupère les arbres par famille
        trees = await Tree.findAll({ where: { id_family: familyId } });
      } else {
        // Récupère tous les arbres
        trees = await Tree.findAll();
      }

      res.status(200).json(trees); // Renvoie les arbres sous forme de JSON
    } catch (error) {
      console.error("Erreur lors de la récupération des arbres :", error);
      res.status(500).render("error", {
        statusCode: 500,
        message:
          "Impossible de récupérer les arbres. Veuillez réessayer plus tard.",
      });
    }
  },
};

export default treesController;
