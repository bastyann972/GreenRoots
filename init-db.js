import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Family from "./src/models/Family.js";
import Tree from "./src/models/Tree.js";
import Order from "./src/models/Order.js";
import User from "./src/models/User.js";
import articles from "./src/data/trees.js";
import sequelize from "./src/db/database.js";

dotenv.config(); // Charge les variables d'environnement

async function initializeDatabase() {
  console.log("Arguments passés au script :", process.argv);

  try {
    // Réinitialisation de la base de données
    console.log("Réinitialisation des tables...");
    await sequelize.drop();
    await sequelize.sync();

    console.log("Base de données réinitialisée avec succès.");

    // Ajout des articles et des essences
    for (const article of articles) {
      // Trouve ou crée une famille d'arbres
      const [family] = await Family.findOrCreate({
        where: { name: article.family },
      });

      console.log(`Famille "${family.name}" insérée ou existante.`);

      // Crée un arbre lié à la famille
      await Tree.create({
        name: article.name,
        description: article.description,
        price: article.price,
        photo: article.photo,
        co2Absorption: article.co2Absorption,
        region: article.region,
        id_family: family.id,
      });

      console.log(
        `Arbre "${article.name}" ajouté à la famille "${family.name}".`
      );
    }

    // Récupération du mot de passe admin
    const adminPassword = process.argv[2] || process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      throw new Error("Le mot de passe admin doit être fourni.");
    }

    // Hashage du mot de passe admin
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Création d'un utilisateur admin
    const adminUser = await User.create({
      lastname: "Monkey D.",
      firstname: "Luffy",
      email: "luffy@gmail.com",
      password: hashedPassword,
      role: "admin", // Assurez-vous que la colonne "role" existe dans la table User
    });

    console.log(
      `Utilisateur admin "${adminUser.firstname} ${adminUser.lastname}" créé.`
    );

    // Création d'une commande pour l'utilisateur admin
    await Order.create({
      date_order: "2024-11-12",
      status: true,
      id_user: adminUser.id,
    });

    console.log("Commande créée pour l'utilisateur admin.");

    console.log("Base de données initialisée avec succès !");
  } catch (error) {
    console.error(
      "Erreur lors de l'initialisation de la base de données :",
      error
    );
  } finally {
    await sequelize.close();
    console.log("Connexion à la base de données fermée.");
  }
}

initializeDatabase();
