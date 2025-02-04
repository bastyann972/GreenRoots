import { Model, DataTypes } from "sequelize";
import sequelize from "../db/database.js";
import User from "./User.js";

class Order extends Model {}

Order.init(
  {
    date_order: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE", // Supprime les commandes liées à un utilisateur supprimé
    },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "order",
  }
);
// Définir l'association
Order.belongsTo(User, { foreignKey: "id_user" }); // Une commande appartient à un utilisateur
export default Order;
