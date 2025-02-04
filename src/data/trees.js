const articles = [
  {
    family: "Pinaceae",
    name: "Sapin blanc",
    description:
      "Le sapin blanc est un arbre élégant et robuste, souvent utilisé comme arbre de Noël et pour son bois en menuiserie. Il symbolise la nature alpine.",
    price: 69,
    photo:
      "https://cdn.pixabay.com/photo/2022/12/25/09/52/winter-forest-7677111_1280.jpg",
    co2Absorption: 20,
    region: "France",
  },
  {
    family: "Pinaceae",
    name: "Pin maritime",
    description:
      "Le pin maritime est un arbre résineux idéal pour stabiliser les sols sablonneux. Il est également prisé pour son bois et son rôle écologique.",
    price: 80,
    photo:
      "https://cdn.pixabay.com/photo/2022/10/28/13/02/mountains-7553125_1280.jpg",
    co2Absorption: 25,
    region: "Espagne",
  },
  {
    family: "Pinaceae",
    name: "Épicéa",
    description:
      "L'épicéa commun est un arbre conifère à croissance rapide, utilisé pour la construction et la fabrication d'instruments de musique.",
    price: 79,
    photo:
      "https://cdn.pixabay.com/photo/2011/11/16/20/43/pine-cones-10617_640.jpg",
    co2Absorption: 30,
    region: "Europe du Nord",
  },
  {
    family: "Pinaceae",
    name: "Cèdre",
    description:
      "Le cèdre de l'Atlas est un arbre majestueux, connu pour ses aiguilles bleutées et son bois durable, idéal pour les régions sèches.",
    price: 89,
    photo:
      "https://cdn.pixabay.com/photo/2013/08/28/18/38/conifer-176823_1280.jpg",
    co2Absorption: 40,
    region: "Maroc",
  },
  {
    family: "Rosaceae",
    name: "Cerisier",
    description:
      "Le cerisier offre des fleurs éclatantes au printemps et des cerises délicieuses en été. Symbole de beauté éphémère au Japon.",
    price: 69,
    photo:
      "https://cdn.pixabay.com/photo/2023/03/14/12/41/ornamental-cherry-7852285_1280.jpg",
    co2Absorption: 15,
    region: "Japon",
  },
  {
    family: "Rosaceae",
    name: "Pommier",
    description:
      "Le pommier est un arbre fruitier emblématique, produisant des pommes savoureuses et ornant les vergers de fleurs délicates.",
    price: 76,
    photo:
      "https://images.pexels.com/photos/13317132/pexels-photo-13317132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    co2Absorption: 18,
    region: "France",
  },
  {
    family: "Rosaceae",
    name: "Poirier",
    description:
      "Le poirier produit des poires juteuses et sucrées. Ses fleurs blanches annoncent l’arrivée du printemps dans les vergers.",
    price: 77,
    photo:
      "https://cdn.pixabay.com/photo/2018/06/17/20/19/pears-3481351_640.jpg",
    co2Absorption: 15,
    region: "France",
  },
  {
    family: "Rosaceae",
    name: "Églantier",
    description:
      "L'églantier est un arbuste sauvage aux fruits riches en vitamine C, idéal pour les infusions et les haies champêtres.",
    price: 79,
    photo:
      "https://cdn.pixabay.com/photo/2015/03/27/01/29/rose-hip-694030_640.jpg",
    co2Absorption: 12,
    region: "France",
  },
  {
    family: "Fabaceae",
    name: "Acacia",
    description:
      "L'acacia est un arbre résistant aux climats arides, connu pour ses fleurs parfumées et sa production de gomme arabique.",
    price: 69,
    photo:
      "https://images.pexels.com/photos/19336562/pexels-photo-19336562/free-photo-of-nature-arbres-campagne-branches.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    co2Absorption: 35,
    region: "Afrique",
  },
  {
    family: "Fabaceae",
    name: "Tamaris",
    description:
      "Le tamaris est un arbre léger et délicat, adapté aux sols salins et prisé pour sa floraison rosée.",
    price: 89,
    photo:
      "https://images.pexels.com/photos/16935286/pexels-photo-16935286/free-photo-of-nature-branches-printemps-arbre.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    co2Absorption: 10,
    region: "Afrique du Nord",
  },
  {
    family: "Fabaceae",
    name: "Tamarinier",
    description:
      "Le tamarinier est un arbre tropical produisant des gousses comestibles riches en saveurs acidulées. Idéal pour la cuisine exotique.",
    price: 79,
    photo:
      "https://cdn.pixabay.com/photo/2014/04/14/17/42/tamarind-tree-324023_1280.jpg",
    co2Absorption: 20,
    region: "Afrique",
  },
  {
    family: "Fabaceae",
    name: "Robinier",
    description:
      "Le robinier est un arbre à croissance rapide, apprécié pour ses fleurs blanches parfumées et son bois résistant.",
    price: 79,
    photo:
      "https://cdn.pixabay.com/photo/2018/05/17/17/18/robinia-3409104_640.jpg",
    co2Absorption: 22,
    region: "Europe centrale",
  },
  {
    family: "Fagaceae",
    name: "Chêne",
    description:
      "Le chêne pédonculé est un arbre majestueux, symbole de force et utilisé pour ses glands et son bois en charpente.",
    price: 69,
    photo:
      "https://images.pexels.com/photos/53435/tree-oak-landscape-view-53435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    co2Absorption: 50,
    region: "France",
  },
  {
    family: "Fagaceae",
    name: "Hêtre",
    description:
      "Le hêtre européen est un arbre élégant à l'écorce grise, prisé pour son bois en ébénisterie et son feuillage dense.",
    price: 75,
    photo:
      "https://images.pexels.com/photos/28926270/pexels-photo-28926270/free-photo-of-arbre-d-automne-vibrant-dans-un-parc-ensoleille.jpeg?auto=compress&cs=tinysrgb&w=600",
    co2Absorption: 28,
    region: "Allemagne",
  },
  {
    family: "Fagaceae",
    name: "Chêne vert",
    description:
      "Le chêne vert est un arbre méditerranéen à feuillage persistant, utilisé pour la fabrication de charbon de bois.",
    price: 85,
    photo:
      "https://cdn.pixabay.com/photo/2017/01/29/17/36/oak-tree-2018822_1280.jpg",
    co2Absorption: 45,
    region: "Espagne",
  },
  {
    family: "Fagaceae",
    name: "Châtaignier",
    description:
      "Le châtaignier produit des châtaignes comestibles et son bois est utilisé pour la construction et la vannerie.",
    price: 90,
    photo:
      "https://cdn.pixabay.com/photo/2020/05/08/14/53/chestnut-5146065_640.jpg",
    co2Absorption: 30,
    region: "Italie",
  },
];

export default articles;
