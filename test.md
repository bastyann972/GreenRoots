# Dictionnaire des données

## Table `user`
| Champ       | Type         | Détails                             | Description                            |
|-------------|--------------|-------------------------------------|----------------------------------------|
| id          | INTEGER      | PRIMARY KEY, GENERATED ALWAYS AS IDENTITY | Identifiant unique de l'utilisateur.  |
| email       | TEXT         | UNIQUE, NOT NULL                   | Adresse email de l'utilisateur.       |
| password    | TEXT         | NOT NULL                           | Mot de passe de l'utilisateur.        |
| firstname   | TEXT         |                                     | Prénom de l'utilisateur.              |
| lastname    | TEXT         |                                     | Nom de famille de l'utilisateur.      |

## Table `family`
| Champ       | Type         | Détails                             | Description                            |
|-------------|--------------|-------------------------------------|----------------------------------------|
| id          | INTEGER      | PRIMARY KEY, GENERATED ALWAYS AS IDENTITY | Identifiant unique de la famille.     |
| name        | TEXT         | NOT NULL                           | Nom de la famille.                    |

## Table `order`
| Champ       | Type         | Détails                             | Description                            |
|-------------|--------------|-------------------------------------|----------------------------------------|
| id          | INTEGER      | PRIMARY KEY, GENERATED ALWAYS AS IDENTITY | Identifiant unique de la commande.    |
| date_order  | DATE         | NOT NULL                           | Date de la commande.                  |
| status      | TEXT         | DEFAULT 'pending'                  | Statut de la commande (par défaut : pending). |
| user_id     | INTEGER      | FOREIGN KEY REFERENCES `user`(`id`) NOT NULL | Identifiant de l'utilisateur associé. |

## Table `tree`
| Champ       | Type         | Détails                             | Description                            |
|-------------|--------------|-------------------------------------|----------------------------------------|
| id          | INTEGER      | PRIMARY KEY, GENERATED ALWAYS AS IDENTITY | Identifiant unique de l'arbre.        |
| name        | TEXT         | NOT NULL                           | Nom de l'arbre.                       |
| description | TEXT         |                                     | Description de l'arbre.               |
| price       | NUMERIC(10,2)| NOT NULL                           | Prix de l'arbre.                      |
| photo       | TEXT         |                                     | URL ou chemin de la photo de l'arbre. |
| co2absorption | NUMERIC(10,2)|                                   | Quantité de CO2 absorbée par l'arbre. |
| region      | TEXT         |                                     | Région où l'arbre est planté.         |
| order_id    | INTEGER      | FOREIGN KEY REFERENCES `order`(`id`) | Identifiant de la commande associée.  |
| family_id   | INTEGER      | FOREIGN KEY REFERENCES `family`(`id`) | Identifiant de la famille associée.   |

| ![Ziad](./public/img/Ziad.png) | ![Kamel](./public/img/kamel.png) | ![Guilhem](./public/img/Guilhem.png) |
|-------------------------------|----------------------------------|-------------------------------------|
| **Ziad**                     | **Kamel**                      | **Guilhem**                        |
| Scrum Master / Développeur Front-end | Lead Developer / Développeur Back-end | Référent Technique / Développeur Front-end |
