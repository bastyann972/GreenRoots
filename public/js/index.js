document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("checkbox");
  const burgerMenu = document.getElementById("burger-menu");

  // Ajoute un écouteur d'événements pour détecter le changement de l'état de la case à cocher
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      // Affiche le menu burger
      burgerMenu.classList.remove("hidden");
    } else {
      // Cache le menu burger
      burgerMenu.classList.add("hidden");
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  // Gestion du champ "Mot de passe"
  const passwordInput = document.getElementById("password");
  const togglePassword = document.querySelector("#togglePassword");
  const eyeOpen = togglePassword.querySelector("#eyeOpen");
  const eyeClosed = togglePassword.querySelector("#eyeClosed");

  togglePassword.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    eyeOpen.classList.toggle("hidden", !isPassword);
    eyeClosed.classList.toggle("hidden", isPassword);
  });

  // Gestion du champ "Confirmer le mot de passe"
  const confirmPasswordInput = document.getElementById("passwordConfirm");
  const toggleConfirmPassword = document.querySelector(
    "#togglePasswordConfirm"
  );
  const eyeOpenConfirm = toggleConfirmPassword.querySelector("#eyeOpenConfirm");
  const eyeClosedConfirm =
    toggleConfirmPassword.querySelector("#eyeClosedConfirm");

  toggleConfirmPassword.addEventListener("click", () => {
    const isPassword = confirmPasswordInput.type === "password";
    confirmPasswordInput.type = isPassword ? "text" : "password";
    eyeOpenConfirm.classList.toggle("hidden", !isPassword);
    eyeClosedConfirm.classList.toggle("hidden", isPassword);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const scrollToTopButton = document.getElementById("scrollToTop");

  // Fonction pour gérer l'affichage du bouton
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      scrollToTopButton.classList.remove("hidden");
    } else {
      scrollToTopButton.classList.add("hidden");
    }
  };

  // Fonction pour remonter en haut de la page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Ajouter l'écouteur d'événement au bouton
  scrollToTopButton.addEventListener("click", scrollToTop);

  // Gérer l'événement de défilement
  window.addEventListener("scroll", toggleVisibility);
});
// Gestion de l'affichage des détails de la carte
document.addEventListener("DOMContentLoaded", () => {
  const cardOption = document.getElementById("cardOption");
  const cardDetails = document.getElementById("cardDetails");

  function toggleCardDetails() {
    if (cardOption.checked) {
      cardDetails.style.display = "block";
    } else {
      cardDetails.style.display = "none";
    }
  }

  cardOption.addEventListener("change", toggleCardDetails);
  toggleCardDetails(); // État initial
});
// Sélectionner les éléments
const paymentOptions = document.querySelectorAll(
  '.payment-option input[type="radio"]'
);
const cardForm = document.querySelector(".card-form");

// Ajouter un écouteur d'événements
paymentOptions.forEach((option) => {
  option.addEventListener("change", (e) => {
    if (e.target.value === "card") {
      cardForm.classList.remove("hidden"); // Afficher le formulaire de carte
    } else {
      cardForm.classList.add("hidden"); // Cacher le formulaire de carte
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const showPasswordFormBtn = document.getElementById("show-password-form");
  const passwordForm = document.getElementById("password-form");
  const cancelPasswordBtn = document.getElementById("cancel-password");

  function togglePasswordForm() {
    passwordForm.classList.toggle("hidden");
    showPasswordFormBtn.classList.toggle("hidden");
  }

  showPasswordFormBtn.addEventListener("click", togglePasswordForm);
  cancelPasswordBtn.addEventListener("click", togglePasswordForm);

  passwordForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const currentPassword = document.getElementById("current-password").value;
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (newPassword !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    // Here you would typically make an API call to update the password
    console.log("Password update submitted");

    // Reset form and hide it
    passwordForm.reset();
    togglePasswordForm();
  });
});
//Nos arbres//
document.addEventListener("DOMContentLoaded", async () => {
  const familyButtonsContainer = document.getElementById("family-buttons");
  const treeCardsContainer = document.getElementById("tree-cards");

  // Charger les familles et générer les boutons dynamiquement
  async function loadFamilies() {
    try {
      const response = await fetch("/api/families");
      const families = await response.json();

      // Ajouter un bouton "Tous"
      familyButtonsContainer.innerHTML = `
              <button class="family-button active-button" data-family-id="">Tous</button>
          `;

      // Ajouter des boutons pour chaque famille
      families.forEach((family) => {
        familyButtonsContainer.innerHTML += `
                  <button class="family-button inactive-button" data-family-id="${family.id}">
                      ${family.name}
                  </button>
              `;
      });

      // Ajouter les événements de clic sur les boutons
      addFamilyButtonClickEvents();
    } catch (error) {
      console.error("Erreur lors de la récupération des familles :", error);
      familyButtonsContainer.innerHTML =
        "<p>Erreur lors du chargement des familles.</p>";
    }
  }

  // Charger les arbres en fonction de la famille sélectionnée
  async function loadTrees(familyId = "") {
    try {
      treeCardsContainer.innerHTML = "<p>Chargement...</p>";

      const response = await fetch(`/api/trees?familyId=${familyId}`);
      const trees = await response.json();

      if (trees.length > 0) {
        treeCardsContainer.innerHTML = trees
          .map(
            (tree) => `
                      <article class="tree-card">
                          <img src="${tree.photo}" alt="${tree.name}">
                          <div class="card-content">
                              <h3>${tree.name}</h3>
                              <p>${tree.description}</p>
                              <div class="tree-info">
                                  <span><i class="fa-solid fa-wind"></i> ${tree.co2Absorption} kg de CO2/an</span>
                                  <span><i class="fa-solid fa-location-dot"></i> ${tree.region}</span>
                              </div>
                              <div class="card-actions">
                                  <span class="price">${tree.price}€</span>
                               <form action="/add-to-cart" method="POST">
                                    <input type="hidden" name="productId" value="${tree.id}">
                                    <button class="btn-plant">Planter</button>
                                </form>
                              </div>
                          </div>
                      </article>
                  `
          )
          .join("");
      } else {
        treeCardsContainer.innerHTML =
          "<p>Aucun arbre disponible pour cette famille.</p>";
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des arbres :", error);
      treeCardsContainer.innerHTML =
        "<p>Erreur lors du chargement des arbres.</p>";
    }
  }

  // Ajouter des événements de clic aux boutons des familles
  function addFamilyButtonClickEvents() {
    const familyButtons = document.querySelectorAll(".family-button");
    familyButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const familyId = button.dataset.familyId;

        // Mettre à jour les classes des boutons pour indiquer le bouton actif
        familyButtons.forEach((btn) => btn.classList.remove("active-button"));
        button.classList.add("active-button");

        // Charger les arbres pour la famille sélectionnée
        loadTrees(familyId);
      });
    });
  }

  // Charger les familles et les arbres par défaut au chargement
  await loadFamilies();
  await loadTrees(); // Charger tous les arbres par défaut
});

// fonction panier
async function addToCart(treeId) {
  try {
    const response = await fetch("/add-to-cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ treeId }),
    });

    if (response.ok) {
      alert("Produit ajouté au panier !");
    } else {
      alert("Erreur lors de l'ajout au panier.");
    }
  } catch (error) {
    console.error("Erreur:", error);
    alert("Une erreur est survenue.");
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse("<%= JSON.stringify(cart || []) %>"); // Charge le panier
  const buttons = document.querySelectorAll(".btn-add-to-cart");

  buttons.forEach((button) => {
    const productId = button.dataset.productId;

    // Vérifie si le produit est déjà dans le panier
    if (cart.some((item) => item.id === parseInt(productId))) {
      button.textContent = "Déjà dans le panier";
      button.classList.add("btn-disabled");
      button.disabled = true;
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const profileButton = document.getElementById("profile-menu-button");
  const profileMenu = document.getElementById("profile-menu");

  // Toggle dropdown visibility
  profileButton.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevents click from bubbling to the document
    profileMenu.classList.toggle("show");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", () => {
    profileMenu.classList.remove("show");
  });
});
