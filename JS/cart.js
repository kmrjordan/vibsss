// // Get cart from localStorage or initialize empty
// function getCart() {
//     const cart = localStorage.getItem('cart');
//     return cart ? JSON.parse(cart) : [];
//   }
  
//   // Save cart to localStorage
//   function saveCart(cart) {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }
  
//   // Add product to cart
//   function addToCart(product) {
//     const cart = getCart();
  
//     const existing = cart.find(item => item.id === product.id);
//     if (existing) {
//       existing.quantity += 1;
//     } else {
//       cart.push({ ...product, quantity: 1 });
//     }
  
//     saveCart(cart);
//     alert(`${product.name} added to cart!`);
//     updateCartCount();
//   }
  
//   // Remove product from cart
//   function removeFromCart(productId) {
//     let cart = getCart();
//     cart = cart.filter(item => item.id !== productId);
//     saveCart(cart);
//     renderCartItems();
//     updateCartCount();
//   }
  
//   // Update cart count in navbar
//   function updateCartCount() {
//     const cart = getCart();
//     const count = cart.reduce((sum, item) => sum + item.quantity, 0);
//     const countElem = document.getElementById('cart-count');
//     if (countElem) {
//       countElem.textContent = count;
//     }
//   }
  
//   // Render cart contents
//   function renderCartItems() {
//     const cart = getCart();
//     const container = document.getElementById('cart-items');
//     const totalPriceElem = document.getElementById('total-price');
  
//     if (!container) return; // Safeguard for non-cart pages
  
//     container.innerHTML = '';
  
//     if (cart.length === 0) {
//       container.innerHTML = '<p>Your cart is empty.</p>';
//       if (totalPriceElem) totalPriceElem.textContent = '$0.00';
//       return;
//     }
  
//     let totalPrice = 0;
  
//     cart.forEach(item => {
//       const itemTotal = item.price * item.quantity;
//       totalPrice += itemTotal;
  
//       const div = document.createElement('div');
//       div.className = 'flex items-center justify-between mb-4';
  
//       div.innerHTML = `
//         <div>
//           <h4 class="font-semibold">${item.name}</h4>
//           <p>Quantity: ${item.quantity}</p>
//           <p>Price: $${item.price.toFixed(2)}</p>
//         </div>
//         <button onclick="removeFromCart('${item.id}')" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
//           Remove
//         </button>
//       `;
  
//       container.appendChild(div);
//     });
  
//     if (totalPriceElem) {
//       totalPriceElem.textContent = `$${totalPrice.toFixed(2)}`;
//     }
//   }
  
//   // Initialize on load
//   document.addEventListener('DOMContentLoaded', () => {
//     updateCartCount();
  
//     // Render cart only on cart.html
//     if (document.getElementById('cart-items')) {
//       renderCartItems();
//     }
//   });
  

function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart(cart);
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  renderCartItems();
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countElem = document.getElementById('cart-count');
  if (countElem) {
    countElem.textContent = count;
  }
}

// 🔹 NEW: Update quantity (increment or decrement)
function updateQuantity(productId, change) {
  const cart = getCart();
  const product = cart.find(item => item.id === productId);
  if (product) {
    product.quantity += change;
    if (product.quantity <= 0) {
      // Remove item if quantity is 0 or less
      const index = cart.findIndex(item => item.id === productId);
      if (index > -1) cart.splice(index, 1);
    }
    saveCart(cart);
    renderCartItems();
    updateCartCount();
  }
}

function renderCartItems() {
  const cart = getCart();
  const container = document.getElementById('cart-items');
  const totalPriceElem = document.getElementById('total-price');
  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = '<p>Your cart is empty.</p>';
    totalPriceElem.textContent = '$0.00';
    return;
  }

  let totalPrice = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;

    const div = document.createElement('div');
    div.className = 'flex items-center justify-between mb-4 p-4 bg-gray-100 rounded shadow';

    div.innerHTML = `
      <div>
        <h4 class="font-semibold">${item.name}</h4>
        <p>Unit Price: $${item.price.toFixed(2)}</p>
        <p>Total: $${itemTotal.toFixed(2)}</p>
        <div class="flex items-center mt-2">
          <button onclick="updateQuantity('${item.id}', -1)" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">−</button>
          <span class="mx-2">${item.quantity}</span>
          <button onclick="updateQuantity('${item.id}', 1)" class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">+</button>
        </div>
      </div>
      <button onclick="removeFromCart('${item.id}')" class="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">
        Remove
      </button>
    `;

    container.appendChild(div);
  });

  totalPriceElem.textContent = `$${totalPrice.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  if (window.location.pathname.includes('cart.html')) {
    renderCartItems();
  }
});

