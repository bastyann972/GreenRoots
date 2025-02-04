import { Model, DataTypes } from "sequelize";
import sequelize from "../db/database.js";

class Family extends Model {}

Family.init(
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Family",
    tableName: "family",
  }
);

export default Family;
