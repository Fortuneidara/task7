

   const CART_KEY = "cart";
   const LAST_ORDER_KEY = "lastOrder";
   
   
   const products = [
       {
           id: 1,
           title: "Radiance Vitamin C Serum",
           price: 18900,
           category: "Serums",
           description:
               "A brightening vitamin C serum that helps improve the appearance of dull and uneven-looking skin.",
           image:
               "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=85"
       },
   
       {
           id: 2,
           title: "Hydra Glow Moisturizer",
           price: 22500,
           category: "Moisturizers",
           description:
               "A luxurious daily moisturizer designed to leave skin feeling soft, hydrated and refreshed.",
           image:
               "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=800&q=85"
       },
   
       {
           id: 3,
           title: "Gentle Foam Cleanser",
           price: 14500,
           category: "Cleansers",
           description:
               "A gentle foaming cleanser that removes everyday impurities while leaving skin comfortable.",
           image:
               "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=85"
       },
   
       {
           id: 4,
           title: "Luxe Shield SPF 50",
           price: 19900,
           category: "Sunscreen",
           description:
               "Lightweight SPF 50 facial sunscreen created for comfortable everyday protection.",
           image:
               "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=800&q=85"
       },
   
       {
           id: 5,
           title: "Renewal Eye Cream",
           price: 24500,
           category: "Eye Creams",
           description:
               "A silky eye cream formulated for the delicate-looking eye area.",
           image:
               "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&w=800&q=85"
       },
   
       {
           id: 6,
           title: "Luxury Clay Face Mask",
           price: 16500,
           category: "Face Masks",
           description:
               "A premium clay mask for a refreshed, smooth and beautifully balanced-looking complexion.",
           image:
               "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=800&q=85"
       },
   
       {
           id: 7,
           title: "Silk Body Butter",
           price: 17900,
           category: "Body Care",
           description:
               "A rich body butter that leaves the skin feeling nourished, smooth and beautifully soft.",
           image:
               "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=85"
       },
   
       {
           id: 8,
           title: "Ultimate Glow Skincare Set",
           price: 49900,
           category: "Skincare Sets",
           description:
               "A beautifully curated skincare set containing everyday essentials for your routine.",
           image:
               "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=85"
       },
   
       {
           id: 9,
           title: "Niacinamide Balance Serum",
           price: 21500,
           category: "Serums",
           description:
               "A lightweight serum designed for a balanced, smooth and refined-looking complexion.",
           image:
               "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=800&q=85"
       },
   
       {
           id: 10,
           title: "Deep Hydration Eye Gel",
           price: 21900,
           category: "Eye Creams",
           description:
               "A refreshing eye gel with a lightweight texture for the delicate eye area.",
           image:
               "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=85"
       },
   
       {
           id: 11,
           title: "Creamy Daily Cleanser",
           price: 15500,
           category: "Cleansers",
           description:
               "A creamy cleanser made for a gentle and comfortable daily cleansing ritual.",
           image:
               "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=85"
       },
   
       {
           id: 12,
           title: "Overnight Repair Mask",
           price: 23900,
           category: "Face Masks",
           description:
               "A nourishing overnight mask for skin that looks refreshed by morning.",
           image:
               "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=85"
       }
   ];
   
   
   
   function formatPrice(price) {
       return new Intl.NumberFormat("en-NG", {
           style: "currency",
           currency: "NGN",
           maximumFractionDigits: 0
       }).format(price);
   }
   
   
   
   function getCart() {
       try {
           return JSON.parse(localStorage.getItem(CART_KEY)) || [];
       } catch (error) {
           return [];
       }
   }
   
   
   function saveCart(cart) {
       localStorage.setItem(CART_KEY, JSON.stringify(cart));
       updateCartCount();
   }
   
   
   
   
   function updateCartCount() {
       const cart = getCart();
   
       const count = cart.reduce((total, item) => {
           return total + Number(item.quantity || 0);
       }, 0);
   
       const cartCounters = document.querySelectorAll("#cartCount");
   
       cartCounters.forEach(counter => {
           counter.textContent = count;
       });
   }
   
   

   
   function addToCart(productId, quantity = 1) {
       const product = products.find(item => item.id === Number(productId));
   
       if (!product) {
           console.error("Product not found:", productId);
           return;
       }
   
       const cart = getCart();
   
       const existingProduct = cart.find(
           item => Number(item.id) === Number(productId)
       );
   
       if (existingProduct) {
           existingProduct.quantity += Number(quantity);
       } else {
           cart.push({
               id: product.id,
               title: product.title,
               price: product.price,
               category: product.category,
               description: product.description,
               image: product.image,
               quantity: Number(quantity)
           });
       }
   
       saveCart(cart);
   
       showToast(`${product.title} added to cart`);
   }
   
   
   
   function removeFromCart(productId) {
       let cart = getCart();
   
       cart = cart.filter(
           item => Number(item.id) !== Number(productId)
       );
   
       saveCart(cart);
   
       renderCart();
   
       showToast("Product removed from cart");
   }
   
   

   
   function changeQuantity(productId, amount) {
       const cart = getCart();
   
       const product = cart.find(
           item => Number(item.id) === Number(productId)
       );
   
       if (!product) return;
   
       product.quantity += Number(amount);
   
       if (product.quantity <= 0) {
           removeFromCart(productId);
           return;
       }
   
       saveCart(cart);
   
       renderCart();
   }
   
   
   
   
   function getSubtotal() {
       const cart = getCart();
   
       return cart.reduce((total, item) => {
           return total + Number(item.price) * Number(item.quantity);
       }, 0);
   }
   
   
   function getDeliveryFee() {
       const subtotal = getSubtotal();
   
       if (subtotal === 0) {
           return 0;
       }
   
   
       if (subtotal >= 100000) {
           return 0;
       }
   
       return 3500;
   }
   
   
   function getGrandTotal() {
       return getSubtotal() + getDeliveryFee();
   }
   
   

   
   function escapeHTML(value) {
       return String(value || "").replace(/[&<>"']/g, character => {
           const entities = {
               "&": "&amp;",
               "<": "&lt;",
               ">": "&gt;",
               '"': "&quot;",
               "'": "&#039;"
           };
   
           return entities[character];
       });
   }
   
   

   
   function createProductCard(product) {
       return `
           <article class="product-card">
   
               <a 
                   class="product-image"
                   href="product.html?id=${product.id}"
               >
   
                   <img
                       src="${escapeHTML(product.image)}"
                       alt="${escapeHTML(product.title)}"
                       loading="lazy"
                   >
   
                   <span class="product-badge">
                       ${escapeHTML(product.category)}
                   </span>
   
               </a>
   
   
               <div class="product-info">
   
                   <span class="product-category">
                       ${escapeHTML(product.category)}
                   </span>
   
                   <a href="product.html?id=${product.id}">
                       <h3 class="product-title">
                           ${escapeHTML(product.title)}
                       </h3>
                   </a>
   
                   <p class="product-description">
                       ${escapeHTML(product.description)}
                   </p>
   
                   <div class="price">
                       ${formatPrice(product.price)}
                   </div>
   
                   <button
                       class="quick-add"
                       data-add="${product.id}"
                       type="button"
                   >
                       ADD TO CART
                   </button>
   
               </div>
   
           </article>
       `;
   }
   
   

   
   function renderProducts(productList, containerId) {
       const container = document.getElementById(containerId);
   
       if (!container) return;
   
       if (!productList.length) {
           container.innerHTML = `
               <div class="empty-state">
                   No products found.
               </div>
           `;
   
           return;
       }
   
       container.innerHTML = productList
           .map(createProductCard)
           .join("");
   
       const buttons = container.querySelectorAll("[data-add]");
   
       buttons.forEach(button => {
   
           button.addEventListener("click", event => {
   
               event.preventDefault();
   
               const productId = Number(button.dataset.add);
   
               addToCart(productId);
   
               const originalText = button.textContent;
   
               button.textContent = "ADDED ✓";
   
               setTimeout(() => {
                   button.textContent = originalText;
               }, 1200);
   
           });
   
       });
   }
   
   

   
   function initHomePage() {
       const featuredGrid = document.getElementById("featuredGrid");
   
       if (!featuredGrid) return;
   
       const featuredProducts = products.slice(0, 4);
   
       renderProducts(
           featuredProducts,
           "featuredGrid"
       );
   }
   
   

   
   function initShopPage() {
   
       const productGrid = document.getElementById("productGrid");
   
       if (!productGrid) return;
   
       let displayedProducts = [...products];
   
       const searchInput = document.getElementById("searchInput");
   
       const urlParams = new URLSearchParams(
           window.location.search
       );
   
       const searchFromURL =
           urlParams.get("search") || "";
   
       if (searchInput && searchFromURL) {
           searchInput.value = searchFromURL;
       }
   
   
       function displaySearchResults(searchTerm = "") {
   
           const query = searchTerm
               .trim()
               .toLowerCase();
   
           displayedProducts = products.filter(product => {
   
               return (
                   product.title.toLowerCase().includes(query) ||
                   product.category.toLowerCase().includes(query) ||
                   product.description.toLowerCase().includes(query)
               );
   
           });
   
           renderProducts(
               displayedProducts,
               "productGrid"
           );
   
           const productCount =
               document.getElementById("productCount");
   
           if (productCount) {
               productCount.textContent =
                   displayedProducts.length;
           }
       }
   
   
       displaySearchResults(searchFromURL);
   
   
       const sortSelect =
           document.getElementById("sortSelect");
   
       if (sortSelect) {
   
           sortSelect.addEventListener(
               "change",
               function () {
   
                   let sorted =
                       [...displayedProducts];
   
                   if (this.value === "low") {
   
                       sorted.sort(
                           (a, b) => a.price - b.price
                       );
   
                   }
   
                   if (this.value === "high") {
   
                       sorted.sort(
                           (a, b) => b.price - a.price
                       );
   
                   }
   
                   if (this.value === "az") {
   
                       sorted.sort(
                           (a, b) =>
                               a.title.localeCompare(b.title)
                       );
   
                   }
   
                   renderProducts(
                       sorted,
                       "productGrid"
                   );
               }
           );
       }
   }
   
   

   
   function initProductDetails() {
   
       const productId =
           new URLSearchParams(
               window.location.search
           ).get("id");
   
       if (!productId) return;
   
       const product =
           products.find(
               item => item.id === Number(productId)
           );
   
       if (!product) return;
   
       const main = document.querySelector("main");
   
       if (!main) return;
   
       document.title =
           `${product.title} | LuxeGlow`;
   
   
       main.innerHTML = `
   
           <section class="section">
   
               <div class="container">
   
                   <a
                       class="text-link"
                       href="product.html"
                   >
                       ← Back to shop
                   </a>
   
   
                   <div
                       class="product-detail"
                       style="
                           display:grid;
                           grid-template-columns:1fr 1fr;
                           gap:60px;
                           margin-top:30px;
                           align-items:start;
                       "
                   >
   
                       <div>
   
                           <div
                               class="product-detail-main"
                               style="
                                   height:520px;
                                   background:#f0ece5;
                                   border:1px solid var(--line);
                                   display:grid;
                                   place-items:center;
                               "
                           >
   
                               <img
                                   id="detailImage"
                                   src="${escapeHTML(product.image)}"
                                   alt="${escapeHTML(product.title)}"
                                   style="
                                       width:100%;
                                       height:100%;
                                       object-fit:contain;
                                       padding:35px;
                                       mix-blend-mode:multiply;
                                   "
                               >
   
                           </div>
   
   
                           <div
                               style="
                                   display:grid;
                                   grid-template-columns:repeat(3,1fr);
                                   gap:10px;
                                   margin-top:10px;
                               "
                           >
   
                               <button
                                   class="gallery-thumb active"
                                   type="button"
                               >
                                   <img
                                       src="${escapeHTML(product.image)}"
                                       alt=""
                                       style="
                                           width:100%;
                                           height:90px;
                                           object-fit:contain;
                                           background:#f0ece5;
                                           padding:8px;
                                           mix-blend-mode:multiply;
                                       "
                                   >
                               </button>
   
   
                               <button
                                   class="gallery-thumb"
                                   type="button"
                               >
                                   <img
                                       src="${escapeHTML(product.image)}"
                                       alt=""
                                       style="
                                           width:100%;
                                           height:90px;
                                           object-fit:contain;
                                           background:#eee8df;
                                           padding:14px;
                                           mix-blend-mode:multiply;
                                           filter:sepia(.15);
                                       "
                                   >
                               </button>
   
   
                               <button
                                   class="gallery-thumb"
                                   type="button"
                               >
                                   <img
                                       src="${escapeHTML(product.image)}"
                                       alt=""
                                       style="
                                           width:100%;
                                           height:90px;
                                           object-fit:contain;
                                           background:#e9e3d9;
                                           padding:20px;
                                           mix-blend-mode:multiply;
                                       "
                                   >
                               </button>
   
                           </div>
   
                       </div>
   
   
                       <div>
   
                           <p class="eyebrow">
                               ${escapeHTML(product.category)}
                           </p>
   
   
                           <h1
                               style="
                                   font-family:'Playfair Display',Georgia,serif;
                                   font-size:clamp(38px,5vw,58px);
                                   line-height:1.05;
                               "
                           >
                               ${escapeHTML(product.title)}
                           </h1>
   
   
                           <div
                               class="price"
                               style="
                                   font-size:24px;
                                   margin:20px 0;
                               "
                           >
                               ${formatPrice(product.price)}
                           </div>
   
   
                           <p
                               style="
                                   color:var(--muted);
                                   font-size:14px;
                                   max-width:520px;
                               "
                           >
                               ${escapeHTML(product.description)}
                           </p>
   
   
                           <div
                               style="
                                   border-top:1px solid var(--line);
                                   border-bottom:1px solid var(--line);
                                   padding:20px 0;
                                   margin:25px 0;
                                   font-size:12px;
                                   color:var(--muted);
                               "
                           >
   
                               <p>✓ Carefully selected skincare product</p>
                               <p>✓ Secure checkout</p>
                               <p>✓ Delivery available across Nigeria</p>
   
                           </div>
   
   
                           <div
                               style="
                                   display:flex;
                                   gap:12px;
                                   align-items:center;
                               "
                           >
   
                               <div
                                   class="quantity"
                                   id="detailQty"
                               >
   
                                   <button
                                       type="button"
                                       id="qtyMinus"
                                   >
                                       −
                                   </button>
   
                                   <span>1</span>
   
                                   <button
                                       type="button"
                                       id="qtyPlus"
                                   >
                                       +
                                   </button>
   
                               </div>
   
   
                               <button
                                   class="btn btn-dark"
                                   id="detailAdd"
                                   type="button"
                                   style="flex:1"
                               >
                                   Add to cart
                                   <span>→</span>
                               </button>
   
                           </div>
   
                       </div>
   
                   </div>
   
               </div>
   
           </section>
       `;
   
   
       let quantity = 1;
   
       const quantityDisplay =
           document.querySelector(
               "#detailQty span"
           );
   
   
       document
           .getElementById("qtyMinus")
           ?.addEventListener("click", () => {
   
               quantity =
                   Math.max(1, quantity - 1);
   
               quantityDisplay.textContent =
                   quantity;
           });
   
   
       document
           .getElementById("qtyPlus")
           ?.addEventListener("click", () => {
   
               quantity++;
   
               quantityDisplay.textContent =
                   quantity;
           });
   
   
   
       document
           .getElementById("detailAdd")
           ?.addEventListener("click", () => {
   
               addToCart(
                   product.id,
                   quantity
               );
   
           });
   
   
   
       document
           .querySelectorAll(".gallery-thumb")
           .forEach(button => {
   
               button.addEventListener(
                   "click",
                   () => {
   
                       document
                           .querySelectorAll(".gallery-thumb")
                           .forEach(item =>
                               item.classList.remove("active")
                           );
   
                       button.classList.add("active");
   
                       const image =
                           button.querySelector("img");
   
                       const mainImage =
                           document.getElementById(
                               "detailImage"
                           );
   
                       if (image && mainImage) {
                           mainImage.src =
                               image.src;
                       }
   
                   }
               );
   
           });
   }
   
   

   
   function renderCart() {
   
       const cartItems =
           document.getElementById("cartItems");
   
       const cartSummary =
           document.getElementById("cartSummary");
   
       if (!cartItems || !cartSummary) {
           return;
       }
   
   
       const cart = getCart();
   
   
       if (cart.length === 0) {
   
           cartItems.innerHTML = `
   
               <div
                   class="empty-state"
                   style="
                       border:1px solid var(--line);
                       background:#fff;
                   "
               >
   
                   <h3
                       style="
                           font-family:'Playfair Display',Georgia,serif;
                           font-size:28px;
                           color:var(--ink);
                       "
                   >
                       Your cart is empty.
                   </h3>
   
                   <p style="margin:10px 0 22px;">
                       Discover something beautiful
                       for your skincare routine.
                   </p>
   
                   <a
                       class="btn btn-dark"
                       href="product.html"
                   >
                       Start shopping →
                   </a>
   
               </div>
           `;
   
   
           cartSummary.innerHTML = `
   
               <h2>Order summary</h2>
   
               <div class="summary-row">
                   <span>Subtotal</span>
                   <strong>₦0</strong>
               </div>
   
               <div class="summary-row">
                   <span>Delivery</span>
                   <strong>₦0</strong>
               </div>
   
               <div class="summary-row total">
                   <span>Total</span>
                   <strong>₦0</strong>
               </div>
           `;
   
           return;
       }
   
   
   
       cartItems.innerHTML =
           cart.map(item => `
   
               <div class="cart-item">
   
                   <a
                       class="cart-item-image"
                       href="product.html?id=${item.id}"
                   >
   
                       <img
                           src="${escapeHTML(item.image)}"
                           alt="${escapeHTML(item.title)}"
                       >
   
                   </a>
   
   
                   <div>
   
                       <h3>
                           ${escapeHTML(item.title)}
                       </h3>
   
                       <p>
                           ${escapeHTML(item.category)}
                       </p>
   
   
                       <div class="quantity">
   
                           <button
                               type="button"
                               data-dec="${item.id}"
                           >
                               −
                           </button>
   
                           <span>
                               ${item.quantity}
                           </span>
   
                           <button
                               type="button"
                               data-inc="${item.id}"
                           >
                               +
                           </button>
   
                       </div>
   
   
                       <button
                           class="remove-btn"
                           type="button"
                           data-remove="${item.id}"
                       >
                           Remove
                       </button>
   
                   </div>
   
   
                   <div class="cart-price">
   
                       ${formatPrice(
                           item.price * item.quantity
                       )}
   
                   </div>
   
               </div>
   
           `).join("");
   
   
      
       cartItems
           .querySelectorAll("[data-inc]")
           .forEach(button => {
   
               button.addEventListener(
                   "click",
                   () => {
   
                       changeQuantity(
                           Number(button.dataset.inc),
                           1
                       );
   
                   }
               );
   
           });
   
   
        cartItems
           .querySelectorAll("[data-dec]")
           .forEach(button => {
   
               button.addEventListener(
                   "click",
                   () => {
   
                       changeQuantity(
                           Number(button.dataset.dec),
                           -1
                       );
   
                   }
               );
   
           });
   
   
       cartItems
           .querySelectorAll("[data-remove]")
           .forEach(button => {
   
               button.addEventListener(
                   "click",
                   () => {
   
                       removeFromCart(
                           Number(button.dataset.remove)
                       );
   
                   }
               );
   
           });
   
   
   
       const subtotal =
           getSubtotal();
   
       const delivery =
           getDeliveryFee();
   
       const total =
           subtotal + delivery;
   
   
       cartSummary.innerHTML = `
   
           <h2>Order summary</h2>
   
           <div class="summary-row">
               <span>Subtotal</span>
               <strong>
                   ${formatPrice(subtotal)}
               </strong>
           </div>
   
   
           <div class="summary-row">
               <span>Delivery</span>
               <strong>
                   ${
                       delivery === 0
                           ? "FREE"
                           : formatPrice(delivery)
                   }
               </strong>
           </div>
   
   
           <div class="summary-row">
               <span>Items</span>
               <strong>
                   ${cart.reduce(
                       (sum, item) =>
                           sum + item.quantity,
                       0
                   )}
               </strong>
           </div>
   
   
           <div class="summary-row total">
               <span>Total</span>
               <strong>
                   ${formatPrice(total)}
               </strong>
           </div>
   
   
           <a
               class="btn btn-dark full-btn"
               href="checkout.html"
           >
               Proceed to checkout →
           </a>
   
   
           <p class="muted-note">
               Secure checkout • Bank transfer available
           </p>
       `;
   }
   
   

   
   function renderCheckoutSummary() {
   
       const summary =
           document.getElementById(
               "checkoutSummary"
           );
   
       if (!summary) return;
   
   
       const cart = getCart();
   
   
       if (!cart.length) {
   
           summary.innerHTML = `
   
               <h2>No items</h2>
   
               <p
                   style="
                       font-size:12px;
                       color:var(--muted);
                   "
               >
                   Your cart is empty.
               </p>
   
               <a
                   class="btn btn-dark full-btn"
                   href="product.html"
               >
                   Shop now
               </a>
           `;
   
           const checkoutButton =
               document.querySelector(
                   "#checkoutForm button[type='submit']"
               );
   
           if (checkoutButton) {
               checkoutButton.disabled = true;
           }
   
           return;
       }
   
   
       const subtotal =
           getSubtotal();
   
       const delivery =
           getDeliveryFee();
   
       const total =
           subtotal + delivery;
   
   
       summary.innerHTML = `
   
           <h2>Order summary</h2>
   
           <div class="checkout-items">
   
               ${cart.map(item => `
   
                   <div class="order-item">
   
                       <span>
                           ${escapeHTML(item.title)}
                           × ${item.quantity}
                       </span>
   
                       <strong>
                           ${formatPrice(
                               item.price *
                               item.quantity
                           )}
                       </strong>
   
                   </div>
   
               `).join("")}
   
           </div>
   
   
           <div class="summary-row">
   
               <span>Subtotal</span>
   
               <strong>
                   ${formatPrice(subtotal)}
               </strong>
   
           </div>
   
   
           <div class="summary-row">
   
               <span>Delivery</span>
   
               <strong>
                   ${
                       delivery === 0
                           ? "FREE"
                           : formatPrice(delivery)
                   }
               </strong>
   
           </div>
   
   
           <div class="summary-row total">
   
               <span>Total</span>
   
               <strong>
                   ${formatPrice(total)}
               </strong>
   
           </div>
       `;
   
   
       const bankAmount =
           document.getElementById(
               "bankAmount"
           );
   
       if (bankAmount) {
           bankAmount.textContent =
               formatPrice(total);
       }
   }
   
   

   
   function initCheckout() {
   
       const form =
           document.getElementById(
               "checkoutForm"
           );
   
       if (!form) return;
   
   
       const sameAddress =
           document.getElementById(
               "sameAddress"
           );
   
       const shippingFields =
           document.getElementById(
               "shippingFields"
           );
   
   
       if (sameAddress && shippingFields) {
   
           sameAddress.addEventListener(
               "change",
               () => {
   
                   shippingFields.classList.toggle(
                       "hidden",
                       sameAddress.checked
                   );
   
               }
           );
   
       }
   
   
   
       const paymentInputs =
           document.querySelectorAll(
               'input[name="payment"]'
           );
   
   
       paymentInputs.forEach(input => {
   
           input.addEventListener(
               "change",
               () => {
   
                   document
                       .querySelectorAll(".payment-option")
                       .forEach(option =>
                           option.classList.remove(
                               "selected"
                           )
                       );
   
   
                   input
                       .closest(".payment-option")
                       ?.classList.add(
                           "selected"
                       );
   
   
                   const bankDetails =
                       document.getElementById(
                           "bankDetails"
                       );
   
                   const cardFields =
                       document.getElementById(
                           "cardFields"
                       );
   
   
                   if (bankDetails) {
   
                       bankDetails.classList.toggle(
                           "hidden",
                           input.value !== "bank"
                       );
   
                   }
   
   
                   if (cardFields) {
   
                       cardFields.classList.toggle(
                           "hidden",
                           input.value !== "card"
                       );
   
                   }
   
               }
           );
   
       });
   
   
      
       form.addEventListener(
           "submit",
           event => {
   
               event.preventDefault();
   
   
               const error =
                   document.getElementById(
                       "checkoutError"
                   );
   
   
               if (error) {
                   error.textContent = "";
               }
   
   
               const cart =
                   getCart();
   
   
               if (!cart.length) {
   
                   if (error) {
                       error.textContent =
                           "Your cart is empty.";
                   }
   
                   return;
               }
   
   
               const formData =
                   new FormData(form);
   
   
               const data =
                   Object.fromEntries(
                       formData.entries()
                   );
   
   
            
               if (
                   !data.name ||
                   !data.email ||
                   !data.phone ||
                   !data.address ||
                   !data.city ||
                   !data.state
               ) {
   
                   if (error) {
                       error.textContent =
                           "Please complete all required billing fields.";
                   }
   
                   return;
               }
   
   
            
               if (
                   data.payment === "bank" &&
                   !data.transferReference.trim()
               ) {
   
                   if (error) {
                       error.textContent =
                           "Please enter your bank transfer reference.";
                   }
   
                   return;
               }
   
   
         
               if (data.payment === "card") {
   
                   const cardNumber =
                       data.cardNumber
                           .replace(/\s/g, "");
   
   
                   if (
                       !data.cardName ||
                       cardNumber.length < 12 ||
                       !data.expiry ||
                       !data.cvv
                   ) {
   
                       if (error) {
                           error.textContent =
                               "Please complete the card details.";
                       }
   
                       return;
                   }
               }
   
   
         
               const orderNumber =
                   "LC-" +
                   Date.now()
                       .toString()
                       .slice(-8);
   
   
               const subtotal =
                   getSubtotal();
   
               const delivery =
                   getDeliveryFee();
   
               const total =
                   subtotal + delivery;
   
   
            
               let shipping;
   
   
               if (
                   sameAddress &&
                   sameAddress.checked
               ) {
   
                   shipping = {
   
                       name: data.name,
   
                       phone: data.phone,
   
                       address: data.address,
   
                       city: data.city,
   
                       state: data.state
                   };
   
               } else {
   
                   shipping = {
   
                       name: data.shipName,
   
                       phone: data.shipPhone,
   
                       address: data.shipAddress,
   
                       city: data.shipCity,
   
                       state: data.shipState
                   };
   
               }
   
   
         
               const order = {
   
                   orderNumber: orderNumber,
   
                   date:
                       new Date().toISOString(),
   
                   customer: {
   
                       name: data.name,
   
                       email: data.email,
   
                       phone: data.phone,
   
                       billing: {
   
                           address: data.address,
   
                           city: data.city,
   
                           state: data.state
                       },
   
                       shipping: shipping
                   },
   
   
                   payment:
                       data.payment,
   
   
                   paymentReference:
                       data.transferReference ||
                       "CARD-PAYMENT-DEMO",
   
   
                   items:
                       cart,
   
   
                   subtotal:
                       subtotal,
   
   
                   delivery:
                       delivery,
   
   
                   total:
                       total
               };
   
   
         
               localStorage.setItem(
                   LAST_ORDER_KEY,
                   JSON.stringify(order)
               );
   
   
            
               localStorage.removeItem(
                   CART_KEY
               );
   
   
               updateCartCount();
   
   
         
               window.location.href =
                   "order.html";
   
           }
       );
   }
   
   
  
   
   function renderOrderConfirmation() {
   
       const container =
           document.getElementById(
               "orderConfirmation"
           );
   
       if (!container) return;
   
   
       let order;
   
   
       try {
   
           order =
               JSON.parse(
                   localStorage.getItem(
                       LAST_ORDER_KEY
                   )
               );
   
       } catch (error) {
   
           order = null;
       }
   
   
       if (!order) {
   
           container.innerHTML = `
   
               <div class="order-success">
   
                   <div class="success-mark">
                       !
                   </div>
   
                   <h1>
                       No recent order
                   </h1>
   
                   <p>
                       There is no recent order
                       to display.
                   </p>
   
                   <a
                       class="btn btn-dark"
                       href="product.html"
                   >
                       Shop now →
                   </a>
   
               </div>
           `;
   
           return;
       }
   
   
       const firstName =
           order.customer.name
               .split(" ")[0];
   
   
       container.innerHTML = `
   
           <div class="order-success">
   
               <div class="success-mark">
                   ✓
               </div>
   
   
               <p class="eyebrow">
                   ORDER CONFIRMED
               </p>
   
   
               <h1>
                   Thank you,
                   ${escapeHTML(firstName)}.
               </h1>
   
   
               <p>
                   Your order has been placed
                   successfully. Keep your order
                   number and payment reference
                   for your records.
               </p>
   
   
               <div class="order-meta">
   
                   <div>
   
                       <span>
                           Order number
                       </span>
   
                       <strong>
                           ${escapeHTML(
                               order.orderNumber
                           )}
                       </strong>
   
                   </div>
   
   
                   <div>
   
                       <span>
                           Payment
                       </span>
   
                       <strong>
                           ${
                               order.payment === "bank"
                                   ? "Bank Transfer"
                                   : "Card"
                           }
                       </strong>
   
                   </div>
   
   
                   <div>
   
                       <span>
                           Total
                       </span>
   
                       <strong>
                           ${formatPrice(
                               order.total
                           )}
                       </strong>
   
                   </div>
   
               </div>
   
   
               ${
                   order.payment === "bank"
                       ? `
                       <div class="bank-confirm">
   
                           <strong>
                               🏦 Bank Transfer Instructions
                           </strong>
   
                           <p>
                               Please transfer
                               <strong>
                                   ${formatPrice(
                                       order.total
                                   )}
                               </strong>
                               to:
                           </p>
   
                           <p>
                               <strong>
                                   Bank:
                               </strong>
                               LuxeGlow Demo Bank
                           </p>
   
                           <p>
                               <strong>
                                   Account Name:
                               </strong>
                               LuxeGlow Online Store
                           </p>
   
                           <p>
                               <strong>
                                   Account Number:
                               </strong>
                               5673450982
                           </p>
   
                           <p>
                               <strong>
                                   Transfer Reference:
                               </strong>
                               ${escapeHTML(
                                   order.paymentReference
                               )}
                           </p>
   
                           <p>
                               Use your order number
                               ${escapeHTML(
                                   order.orderNumber
                               )}
                               as the transfer narration.
                           </p>
   
                       </div>
                       `
                       : ""
               }
   
   
               <div class="order-items">
   
                   ${order.items.map(item => `
   
                       <div class="order-item">
   
                           <span>
                               ${escapeHTML(
                                   item.title
                               )}
                               × ${item.quantity}
                           </span>
   
                           <strong>
                               ${formatPrice(
                                   item.price *
                                   item.quantity
                               )}
                           </strong>
   
                       </div>
   
                   `).join("")}
   
   
                   <div class="order-item">
   
                       <span>
                           Delivery
                       </span>
   
                       <strong>
                           ${
                               order.delivery === 0
                                   ? "FREE"
                                   : formatPrice(
                                       order.delivery
                                   )
                           }
                       </strong>
   
                   </div>
   
   
                   <div class="order-item">
   
                       <strong>
                           Total
                       </strong>
   
                       <strong>
                           ${formatPrice(
                               order.total
                           )}
                       </strong>
   
                   </div>
   
               </div>
   
   
               <a
                   class="btn btn-dark"
                   href="product.html"
               >
                   Continue shopping →
               </a>
   
           </div>
       `;
   }
   
   
   
   function initSearch() {
   
       const form =
           document.getElementById(
               "searchForm"
           );
   
       const input =
           document.getElementById(
               "searchInput"
           );
   
   
       if (!form || !input) return;
   
   
       form.addEventListener(
           "submit",
           event => {
   
               event.preventDefault();
   
   
               const query =
                   input.value.trim();
   
   
               if (
                   window.location.pathname
                       .endsWith("product.html")
               ) {
   
                   const url =
                       query
                           ? `product.html?search=${encodeURIComponent(query)}`
                           : "product.html";
   
   
                   window.location.href =
                       url;
   
               } else {
   
                   window.location.href =
                       query
                           ? `product.html?search=${encodeURIComponent(query)}`
                           : "product.html";
   
               }
   
           }
       );
   }
   
   
   
   function initMobileMenu() {
   
       const button =
           document.getElementById(
               "mobileMenu"
           );
   
       const navigation =
           document.getElementById(
               "mainNav"
           );
   
   
       if (!button || !navigation) {
           return;
       }
   
   
       button.addEventListener(
           "click",
           () => {
   
               navigation.classList.toggle(
                   "open"
               );
   
           }
       );
   }
   
   

   
   function showToast(message) {
   
       let toast =
           document.getElementById(
               "toast"
           );
   
   
       if (!toast) {
   
           toast =
               document.createElement(
                   "div"
               );
   
           toast.id = "toast";
   
   
           toast.style.cssText = `
               position:fixed;
               right:20px;
               bottom:20px;
               background:#1b1a18;
               color:#fff;
               padding:14px 20px;
               font-size:12px;
               z-index:9999;
               border-left:3px solid #b58a45;
               box-shadow:0 10px 30px rgba(0,0,0,.2);
               transition:opacity .3s ease;
           `;
   
   
           document.body.appendChild(
               toast
           );
       }
   
   
       toast.textContent =
           message;
   
   
       toast.style.opacity = "1";
   
   
       clearTimeout(
           window.toastTimer
       );
   
   
       window.toastTimer =
           setTimeout(
               () => {
   
                   toast.style.opacity =
                       "0";
   
               },
               1800
           );
   }
   
   

   
   function updateYear() {
   
       const year =
           new Date().getFullYear();
   
   
       document
           .querySelectorAll("#year")
           .forEach(element => {
   
               element.textContent =
                   year;
   
           });
   }
   
   
   
   function initWebsite() {
   
       updateYear();
   
       updateCartCount();
   
       initSearch();
   
       initMobileMenu();
   
   
       const page =
           document.body.dataset.page;
   
   
   
   
       if (page === "home") {
           initHomePage();
       }
   
   
   
   
       if (page === "shop") {
   
           const productId =
               new URLSearchParams(
                   window.location.search
               ).get("id");
   
   
           if (productId) {
   
               initProductDetails();
   
           } else {
   
               initShopPage();
   
           }
   
       }
   
   
       
   
       if (page === "cart") {
           renderCart();
       }
   
   
       if (page === "checkout") {
   
           renderCheckoutSummary();
   
           initCheckout();
   
       }
   
   
       if (page === "order") {
   
           renderOrderConfirmation();
   
       }
   }
   
   
   
   document.addEventListener(
       "DOMContentLoaded",
       initWebsite
   );
