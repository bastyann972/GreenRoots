import { Model, DataTypes } from "sequelize";
import sequelize from "../db/database.js";
import Family from "./Family.js";
import Order from "./Order.js";

class Tree extends Model {}

Tree.init(
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    co2Absorption: {
      // Assurez-vous que cette propriété correspond à votre fichier
      type: DataTypes.DECIMAL(10, 0),
      allowNull: false,
      defaultValue: 0,
    },

    region: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    id_order: {
      type: DataTypes.INTEGER, // Type INTEGER pour la clé étrangère
      allowNull: true, // Peut être NULL
      references: {
        model: Order, // Référence au modèle Order
        key: "id", // La clé primaire de la table Order
      },
    },
    id_family: {
      type: DataTypes.INTEGER,
      references: {
        model: Family,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Tree",
    tableName: "tree",
  }
);

Order.hasMany(Tree, { foreignKey: "id_order" });
Tree.belongsTo(Order, { foreignKey: "id_order" });

export default Tree;
