// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true";
}

// Redirect to login page if not logged in
function checkAuth() {
  if (!isLoggedIn() && window.location.pathname !== "/index.html") {
    window.location.href = "index.html";
  }
}

// Login form submission
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Simple validation
    if (email && password) {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "home.html";
    } else {
      alert("Please enter both email and password");
    }
  });
}

// Logout functionality
if (window.location.pathname === "/logout.html") {
  setTimeout(() => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("cart");
  }, 2000);
}

// Fetch products from API
async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    return products.slice(0, 10);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Display products on home page
async function displayProducts() {
  const productList = document.getElementById("productList");
  if (productList) {
    const products = await fetchProducts();
    productList.innerHTML = "";
    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.className =
        "bg-white flex flex-col justify-between rounded-lg shadow-md overflow-hidden p-2";
      productElement.innerHTML = `
                <img src="${product.image}" alt="${
        product.title
      }" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="text-lg font-semibold mb-2">${product.title}</h3>
                    <p class="text-gray-600 text-sm mb-2">${product.description.substring(
                      0,
                      100
                    )}...</p>
                    <p class="text-indigo-600 font-bold mb-2">$${product.price.toFixed(
                      2
                    )}</p>
                    <button onclick="addToCart(${
                      product.id
                    })" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 w-full">Add to Cart</button>
                </div>
            `;
      productList.appendChild(productElement);
    });
  }
}

// Add to cart functionality
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  fetchProducts().then((products) => {
    const product = products.find((p) => p.id === productId);

    if (product) {
      const existingItem = cart.find((item) => item.id === productId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
    }
  });
}

// Update cart count in navigation
function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  if (cartCount) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }
}

// Display cart items
function displayCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (cartItems && cartTotal) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.className =
        "flex justify-between items-center bg-white p-4 rounded-lg shadow mb-4";
      itemElement.innerHTML = `
                <div class="flex items-center">
                    <img src="${item.image}" alt="${
        item.title
      }" class="w-16 h-16 object-cover rounded mr-4">
                    <div>
                        <h3 class="font-semibold">${item.title}</h3>
                        <p class="text-gray-600">Quantity: ${item.quantity}</p>
                    </div>
                </div>
                <div class="text-right">
                    <p class="font-bold">$${(
                      item.price * item.quantity
                    ).toFixed(2)}</p>
                    <button onclick="removeFromCart(${
                      item.id
                    })" class="text-red-600 hover:text-red-800">Remove</button>
                </div>
            `;
      cartItems.appendChild(itemElement);
      total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);
  }
}

// Remove from cart functionality
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

// Run these functions on page load
checkAuth();
displayProducts();
updateCartCount();
displayCart();
