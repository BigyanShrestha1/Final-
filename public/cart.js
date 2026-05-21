function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }
  
  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  function addToCart(product) {
    const cart = getCart();
    const existingProduct = cart.find((item) => item.id === product.id);
  
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.image,
        quantity: 1
      });
    }
  
    saveCart(cart);
    alert(`${product.name} added to cart!`);
  }
  
  function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter((item) => item.id !== id);
    saveCart(cart);
    renderCart();
  }
  
  function increaseQuantity(id) {
    const cart = getCart();
    const item = cart.find((product) => product.id === id);
  
    if (item) {
      item.quantity += 1;
    }
  
    saveCart(cart);
    renderCart();
  }
  
  function decreaseQuantity(id) {
    const cart = getCart();
    const item = cart.find((product) => product.id === id);
  
    if (item) {
      item.quantity -= 1;
  
      if (item.quantity <= 0) {
        removeFromCart(id);
        return;
      }
    }
  
    saveCart(cart);
    renderCart();
  }
  
  function clearCart() {
    localStorage.removeItem("cart");
    renderCart();
  }
  
  function renderCart() {
    const cartItemsContainer = document.getElementById("cartItems");
    const subtotalElement = document.getElementById("cartSubtotal");
    const shippingElement = document.getElementById("cartShipping");
    const totalElement = document.getElementById("cartTotal");
  
    if (!cartItemsContainer) {
      return;
    }
  
    const cart = getCart();
  
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      subtotalElement.textContent = "$0.00";
      shippingElement.textContent = "$0.00";
      totalElement.textContent = "$0.00";
      return;
    }
  
    let subtotal = 0;
  
    cartItemsContainer.innerHTML = cart
      .map((item) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
  
        return `
          <div class="cart-item">
            <div class="cart-product-image">
              <img src="${item.image}" alt="${item.name}">
            </div>
  
            <div class="cart-item-info">
              <h2>${item.name}</h2>
              <p class="price">$${item.price.toFixed(2)}</p>
  
              <div class="quantity-controls">
                <button type="button" onclick="decreaseQuantity('${item.id}')">-</button>
                <span>${item.quantity}</span>
                <button type="button" onclick="increaseQuantity('${item.id}')">+</button>
              </div>
  
              <button class="delete-link" type="button" onclick="removeFromCart('${item.id}')">
                Remove
              </button>
            </div>
  
            <div class="cart-item-total">
              <strong>$${itemTotal.toFixed(2)}</strong>
            </div>
          </div>
        `;
      })
      .join("");
  
    const shipping = subtotal > 0 ? 5 : 0;
    const total = subtotal + shipping;
  
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    shippingElement.textContent = `$${shipping.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
  
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const product = {
          id: button.dataset.id,
          name: button.dataset.name,
          price: button.dataset.price,
          image: button.dataset.image
        };
  
        addToCart(product);
      });
    });
  
    const clearCartButton = document.getElementById("clearCart");
  
    if (clearCartButton) {
      clearCartButton.addEventListener("click", clearCart);
    }
  
    renderCart();
  });