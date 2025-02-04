import { Model, DataTypes } from "sequelize";

import sequelize from "../db/database.js";

class User extends Model {}

User.init(
  {
    lastname: {
      type: DataTypes.STRING(100), // VARCHAR(100) en PostgreSQL
      allowNull: false, // NOT NULL
      validate: {
        notEmpty: true, // Ne doit pas être une chaîne vide
      },
    },

    firstname: {
      type: DataTypes.STRING(100), // VARCHAR(100) en PostgreSQL
      allowNull: false, // NOT NULL
      validate: {
        notEmpty: true, // Ne doit pas être une chaîne vide
      },
    },

    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true, // Empêche les doublons de mail dans la bdd
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING(100), // VARCHAR(100) en PostgreSQL
      allowNull: false, // NOT NULL
      validate: {
        notEmpty: true, // Ne doit pas être une chaîne vide
        len: [12, 100], // doit contenir entre 8 et 100 caractères
      },
    },

    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
      validate: {
        isIn: [["user", "admin"]], // condition pour que le role soit, soit user soit admin
      },
    },
  },

  // dans le 2ème objet on dit dans quelle bdd devront persister les infos
  {
    sequelize, // pour cela on indique le client connecté à la bdd
    modelName: "User", // on donne un nom au modèle, cela pourra servir plus tard
    tableName: "user", // on peut demander à sequelize de ranger les infos liées à ce modèle dans la table de notre choix
  }
);

export default User;
