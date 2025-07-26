// Product Categories Data
const categories = [
    {
        id: 'laptops',
        name: 'Laptops',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        count: 45
    },
    {
        id: 'wifi-routers',
        name: 'WiFi Routers',
        image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        count: 28
    },
    {
        id: 'mobile-accessories',
        name: 'Mobile Accessories',
        image: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        count: 156
    },
    {
        id: 'chargers',
        name: 'Chargers',
        image: 'https://images.unsplash.com/photo-1609968066071-a8b9b4c30b54?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        count: 73
    },
    {
        id: 'ethernet-cables',
        name: 'Ethernet Cables',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        count: 35
    },
    {
        id: 'electronics',
        name: 'Electronics',
        image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        count: 89
    },
    {
        id: 'storage',
        name: 'Storage & RAM',
        image: 'https://images.unsplash.com/photo-1562976540-9c0bc4c4b4bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        count: 52
    },
    {
        id: 'mikrotik',
        name: 'MikroTik Products',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        count: 24
    }
];

// Sample Products Data
const products = [
    {
        id: 1,
        name: 'MacBook Pro M2',
        category: 'laptops',
        price: 1299.99,
        originalPrice: 1499.99,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        rating: 4.8,
        reviews: 156,
        inStock: true,
        featured: true,
        description: 'Latest MacBook Pro with M2 chip, 16GB RAM, 512GB SSD'
    },
    {
        id: 2,
        name: 'TP-Link WiFi 6 Router',
        category: 'wifi-routers',
        price: 89.99,
        originalPrice: 119.99,
        image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        rating: 4.5,
        reviews: 89,
        inStock: true,
        featured: true,
        description: 'High-speed WiFi 6 router with advanced security features'
    },
    {
        id: 3,
        name: 'iPhone 14 Case',
        category: 'mobile-accessories',
        price: 24.99,
        originalPrice: 34.99,
        image: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        rating: 4.3,
        reviews: 234,
        inStock: true,
        featured: true,
        description: 'Premium silicone case with drop protection'
    },
    {
        id: 4,
        name: 'USB-C Fast Charger',
        category: 'chargers',
        price: 19.99,
        originalPrice: 29.99,
        image: 'https://images.unsplash.com/photo-1609968066071-a8b9b4c30b54?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        rating: 4.6,
        reviews: 178,
        inStock: true,
        featured: true,
        description: '65W USB-C fast charger compatible with all devices'
    },
    {
        id: 5,
        name: 'Cat6 Ethernet Cable',
        category: 'ethernet-cables',
        price: 12.99,
        originalPrice: 18.99,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        rating: 4.4,
        reviews: 67,
        inStock: true,
        featured: false,
        description: '10ft Cat6 ethernet cable for high-speed internet'
    },
    {
        id: 6,
        name: 'Smart LED Bulb',
        category: 'electronics',
        price: 15.99,
        originalPrice: 22.99,
        image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        rating: 4.2,
        reviews: 145,
        inStock: true,
        featured: false,
        description: 'WiFi enabled smart LED bulb with color changing'
    },
    {
        id: 7,
        name: 'DDR4 16GB RAM',
        category: 'storage',
        price: 79.99,
        originalPrice: 99.99,
        image: 'https://images.unsplash.com/photo-1562976540-9c0bc4c4b4bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        rating: 4.7,
        reviews: 92,
        inStock: true,
        featured: false,
        description: 'High-performance DDR4 16GB RAM module'
    },
    {
        id: 8,
        name: 'MikroTik hEX S',
        category: 'mikrotik',
        price: 69.99,
        originalPrice: 89.99,
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        rating: 4.9,
        reviews: 43,
        inStock: true,
        featured: false,
        description: 'Professional grade router with advanced features'
    }
];

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const categoriesGrid = document.getElementById('categories-grid');
const featuredProducts = document.getElementById('featured-products');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    updateCartUI();
    renderCategories();
    renderFeaturedProducts();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    cartBtn.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    checkoutBtn.addEventListener('click', goToCheckout);
}

// Render Categories
function renderCategories() {
    categoriesGrid.innerHTML = categories.map(category => `
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer" 
             onclick="viewCategory('${category.id}')">
            <img src="${category.image}" alt="${category.name}" class="w-full h-32 object-cover">
            <div class="p-4">
                <h3 class="font-semibold text-lg mb-1">${category.name}</h3>
                <p class="text-gray-600 text-sm">${category.count} products</p>
            </div>
        </div>
    `).join('');
}

// Render Featured Products
function renderFeaturedProducts() {
    const featured = products.filter(product => product.featured);
    featuredProducts.innerHTML = featured.map(product => `
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <div class="relative">
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                ${product.originalPrice > product.price ? 
                    `<span class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                        ${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>` : ''
                }
            </div>
            <div class="p-4">
                <h3 class="font-semibold text-lg mb-2">${product.name}</h3>
                <div class="flex items-center mb-2">
                    <div class="flex text-yellow-400">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="text-gray-600 text-sm ml-2">(${product.reviews})</span>
                </div>
                <div class="flex items-center justify-between mb-3">
                    <div>
                        <span class="text-2xl font-bold text-primary">$${product.price}</span>
                        ${product.originalPrice > product.price ? 
                            `<span class="text-gray-500 line-through text-sm ml-2">$${product.originalPrice}</span>` : ''
                        }
                    </div>
                </div>
                <div class="flex space-x-2">
                    <button onclick="addToCart(${product.id})" 
                            class="flex-1 bg-primary text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                        <i class="fas fa-cart-plus mr-2"></i>Add to Cart
                    </button>
                    <button onclick="viewProduct(${product.id})" 
                            class="px-4 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white transition duration-300">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    showCartNotification(product.name);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    renderCartItems();
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        updateCartUI();
        renderCartItems();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    
    renderCartItems();
}

function renderCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-gray-500 text-center py-8">Your cart is empty</p>';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="flex items-center space-x-3 py-3 border-b">
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
            <div class="flex-1">
                <h4 class="font-semibold">${item.name}</h4>
                <p class="text-primary font-bold">$${item.price}</p>
            </div>
            <div class="flex items-center space-x-2">
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" 
                        class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
                    <i class="fas fa-minus text-sm"></i>
                </button>
                <span class="w-8 text-center">${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" 
                        class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
                    <i class="fas fa-plus text-sm"></i>
                </button>
            </div>
            <button onclick="removeFromCart(${item.id})" 
                    class="text-red-500 hover:text-red-700 ml-2">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function toggleCart() {
    cartSidebar.classList.toggle('translate-x-full');
    cartOverlay.classList.toggle('hidden');
}

function closeCart() {
    cartSidebar.classList.add('translate-x-full');
    cartOverlay.classList.add('hidden');
}

function showCartNotification(productName) {
    // Simple notification (you can enhance this with a proper notification system)
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    notification.innerHTML = `<i class="fas fa-check mr-2"></i>${productName} added to cart`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

// Navigation Functions
function viewCategory(categoryId) {
    window.location.href = `products.html?category=${categoryId}`;
}

function viewProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}

function goToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    window.location.href = 'checkout.html';
}

// Search Functionality
document.getElementById('search-input').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm.length > 2) {
        // Implement search functionality here
        console.log('Searching for:', searchTerm);
    }
});

// Mobile Menu Toggle
document.getElementById('mobile-menu-btn').addEventListener('click', function() {
    // Add mobile menu functionality here
    console.log('Mobile menu toggled');
});