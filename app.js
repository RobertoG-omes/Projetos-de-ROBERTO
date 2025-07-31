// app.js

// 1. Configuração do Firebase
// SUBSTITUA AS LINHAS ABAIXO PELOS SEUS DADOS REAIS DO FIREBASE!
// Você encontra isso no console do Firebase, em "Configurações do Projeto" -> "Seus apps" -> "Configuração".
const firebaseConfig = {
  apiKey: "AIzaSyCPFfEbJ2LWL0Pd28L37SObWAwfYJuOAjs",
  authDomain: "emagrecendo-com-a-bel.firebaseapp.com",
  projectId: "emagrecendo-com-a-bel",
  storageBucket: "emagrecendo-com-a-bel.firebasestorage.app",
  messagingSenderId: "32619473699",
  appId: "1:32619473699:web:6b51da8ceb07509a343a96",
  measurementId: "G-RBC2PN3L2G",
};

// Importa as funções necessárias do Firebase SDK
// Certifique-se de que o <script> no HTML tem type="module"
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 2. Elementos HTML (IDs atualizados)
const productsContainer = document.getElementById("products-container");
const cartButton = document.getElementById("cart-button");
const cartCountSpan = document.getElementById("cart-count");
const cartSection = document.getElementById("cart-section");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalSpan = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-button");
const closeCartButton = document.getElementById("close-cart-button");

// NOVAS VARIÁVEIS para os títulos e parágrafos da seção de produtos
const productsHeading = document.getElementById("products-heading");
const productsIntroText = document.getElementById("products-intro-text");

// Número de telefone da sua mãe para o WhatsApp (com código do país e DDD, sem + ou outros caracteres)
// EX: Brasil (55) + DDD (11) + Número (987654321) = 5511987654321
const BEL_PHONE_NUMBER = "5511991716393"; // <<< MUDAR AQUI PARA O NÚMERO DA SUA MÃE!

let cart = JSON.parse(localStorage.getItem("cart")) || []; // Carrinho persistente
updateCartUI(); // Atualiza a UI do carrinho ao carregar a página

// 3. Função para carregar e exibir produtos (SEM ALTERAÇÕES SIGNIFICATIVAS AQUI)
// Esta parte ainda usa o Firebase Firestore para buscar os produtos.
async function loadProducts() {
  try {
    const productsCollection = collection(db, "products");
    const productSnapshot = await getDocs(productsCollection);
    const products = productSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    productsContainer.innerHTML = ""; // Limpa produtos existentes
    products.forEach((product) => {
      const productItem = document.createElement("div");
      productItem.classList.add("produto-item");
      productItem.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span class="preco">R$ ${product.price
                  .toFixed(2)
                  .replace(".", ",")}</span>
                <button class="add-to-cart-btn" data-id="${
                  product.id
                }">Adicionar ao Carrinho</button>
            `;
      productsContainer.appendChild(productItem);
    });

    // Adiciona event listeners aos botões "Adicionar ao Carrinho"
    document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = event.target.dataset.id;
        addToCart(productId);
      });
    });
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
    productsContainer.innerHTML =
      "<p>Erro ao carregar produtos. Tente novamente mais tarde.</p>";
  }
}

// 4. Funções do Carrinho (SEM ALTERAÇÕES)
async function addToCart(productId) {
  try {
    const productRef = doc(db, "products", productId);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      alert("Produto não encontrado!");
      return;
    }

    const product = { id: productSnap.id, ...productSnap.data() };

    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
    alert(`${product.name} adicionado ao carrinho!`);
  } catch (error) {
    console.error("Erro ao adicionar ao carrinho:", error);
    alert("Não foi possível adicionar o produto ao carrinho.");
  }
}

function updateCartUI() {
  cartCountSpan.textContent = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
  } else {
    cart.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("cart-item");
      itemElement.innerHTML = `
                <span>${item.name} x ${item.quantity}</span>
                <span>R$ ${(item.price * item.quantity)
                  .toFixed(2)
                  .replace(".", ",")}</span>
                <button class="remove-from-cart-btn" data-id="${
                  item.id
                }">Remover</button>
            `;
      cartItemsContainer.appendChild(itemElement);
      total += item.price * item.quantity;
    });
  }

  cartTotalSpan.textContent = total.toFixed(2).replace(".", ",");

  // Adiciona event listeners para remover do carrinho
  document.querySelectorAll(".remove-from-cart-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.dataset.id;
      removeFromCart(productId);
    });
  });
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

// 5. Funções de Exibição do Carrinho
cartButton.addEventListener("click", () => {
  // Esconde os elementos específicos da seção de produtos
  productsHeading.style.display = "none"; // Usando o novo ID
  productsIntroText.style.display = "none"; // Usando o novo ID
  productsContainer.style.display = "none";

  cartSection.style.display = "block"; // Mostra a seção do carrinho
});

closeCartButton.addEventListener("click", () => {
  cartSection.style.display = "none"; // Esconde o carrinho

  // Mostra os elementos específicos da seção de produtos novamente
  productsHeading.style.display = "block"; // Usando o novo ID
  productsIntroText.style.display = "block"; // Usando o novo ID
  productsContainer.style.display = "grid"; // CORRIGIDO: Volta para 'grid' como definido no CSS
});

// 6. Checkout: Enviar Pedido via WhatsApp (NOVA LÓGICA)
checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) {
    alert(
      "Seu carrinho está vazio! Por favor, adicione produtos antes de enviar o pedido."
    );
    return;
  }

  // Desabilita o botão para evitar cliques duplicados durante o processo
  checkoutButton.disabled = true;
  checkoutButton.textContent = "Gerando mensagem...";

  // 1. Construir a mensagem detalhada do pedido
  let message = `Olá, Bel! 👋\n\n`;
  message += `Tenho um novo pedido em seu site "Emagrecendo com a Bel"! ✨\n\n`;
  message += `*Detalhes do Pedido:*\n`;
  let total = 0;

  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.name} (Quantidade: ${
      item.quantity
    }) - Valor Unitário: R$ ${item.price.toFixed(2).replace(".", ",")}\n`;
    total += item.price * item.quantity;
  });

  message += `\n*Total Geral do Pedido: R$ ${total
    .toFixed(2)
    .replace(".", ",")}*\n\n`;
  message += `Por favor, me chame para combinarmos o pagamento e a entrega. 😉\n\n`;
  message += `Obrigado!`;

  // 2. Codificar a mensagem para URL
  const encodedMessage = encodeURIComponent(message);

  // 3. Gerar o link do WhatsApp
  const whatsappLink = `https://api.whatsapp.com/send?phone=${BEL_PHONE_NUMBER}&text=${encodedMessage}`;

  // 4. Abrir o link do WhatsApp em uma nova aba
  window.open(whatsappLink, "_blank");

  // Opcional: Limpar o carrinho após o envio da mensagem para um novo pedido
  cart = [];
  localStorage.removeItem("cart");
  updateCartUI();

  // Informa o usuário e restaura o botão
  alert(
    "Pedido enviado para a Bel via WhatsApp! Ela entrará em contato em breve para finalizar a compra."
  );
  checkoutButton.disabled = false;
  checkoutButton.textContent = "Enviar Pedido via WhatsApp";

  // Volta para a página de produtos
  cartSection.style.display = "none";
  // Mostra os elementos específicos da seção de produtos novamente
  productsHeading.style.display = "block"; // Usando o novo ID
  productsIntroText.style.display = "block"; // Usando o novo ID
  productsContainer.style.display = "grid"; // CORRIGIDO: Volta para 'grid'
});

// Carrega os produtos ao carregar a página
loadProducts();
