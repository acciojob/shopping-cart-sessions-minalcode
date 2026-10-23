
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

let cart = JSON.parse(
  window.sessionStorage.getItem("cart") || "[]"
);

// Render products
function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">
        Add to Cart
      </button>
    `;

    productList.appendChild(li);
  });
}

// Render cart
function renderCart() {
  cartList.innerHTML = "";

  cart.forEach((product) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="remove-from-cart-btn" data-id="${product.id}">
        Remove
      </button>
    `;

    cartList.appendChild(li);
  });
}

// Save cart in sessionStorage
function saveCart() {
  window.sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Add product to cart
function addToCart(productId) {
  const product = products.find(
    (item) => item.id === Number(productId)
  );

  if (product) {
    cart.push(product);
    saveCart();
    renderCart();
  }
}

// Remove product from cart
function removeFromCart(productId) {
  const index = cart.findIndex(
    (item) => item.id === Number(productId)
  );

  if (index !== -1) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
  }
}

// Clear cart
function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

// Handle Add and Remove buttons
productList.addEventListener("click", function (event) {
  if (event.target.classList.contains("add-to-cart-btn")) {
    addToCart(event.target.dataset.id);
  }
});

cartList.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    removeFromCart(event.target.dataset.id);
  }
});

// Clear cart button
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
