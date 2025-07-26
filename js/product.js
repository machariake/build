// Product detail page functionality
let currentProduct = null;
let selectedRating = 0;

// Helper function to format KSh prices
function formatKshPrice(price) {
    return `KSh ${price.toLocaleString()}`;
}

document.addEventListener('DOMContentLoaded', function() {
    loadProductDetails();
    setupProductEventListeners();
});

function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    currentProduct = products.find(p => p.id === productId);
    
    if (!currentProduct) {
        // Redirect to products page if product not found
        window.location.href = 'products.html';
        return;
    }
    
    renderProductDetails();
    loadRelatedProducts();
    updateBreadcrumb();
}

function setupProductEventListeners() {
    // Tab switching
    document.getElementById('description-tab').addEventListener('click', () => switchTab('description'));
    document.getElementById('reviews-tab').addEventListener('click', () => switchTab('reviews'));
    document.getElementById('shipping-tab').addEventListener('click', () => switchTab('shipping'));
    
    // Rating stars for review form
    document.querySelectorAll('#rating-stars i').forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.dataset.rating);
            updateRatingStars();
        });
        
        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.dataset.rating);
            highlightStars(rating);
        });
    });
    
    document.getElementById('rating-stars').addEventListener('mouseleave', function() {
        updateRatingStars();
    });
    
    // Review form submission
    document.getElementById('review-form').addEventListener('submit', handleReviewSubmission);
}

function renderProductDetails() {
    const productDetails = document.getElementById('product-details');
    
    productDetails.innerHTML = `
        <!-- Product Images -->
        <div class="space-y-4">
            <div class="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                <img src="${currentProduct.image}" alt="${currentProduct.name}" 
                     class="w-full h-96 object-cover">
            </div>
            <!-- Thumbnail images (placeholder for now) -->
            <div class="grid grid-cols-4 gap-2">
                <img src="${currentProduct.image}" alt="Thumbnail 1" 
                     class="w-full h-20 object-cover rounded border cursor-pointer hover:border-primary">
                <img src="${currentProduct.image}" alt="Thumbnail 2" 
                     class="w-full h-20 object-cover rounded border cursor-pointer hover:border-primary opacity-75">
                <img src="${currentProduct.image}" alt="Thumbnail 3" 
                     class="w-full h-20 object-cover rounded border cursor-pointer hover:border-primary opacity-75">
                <img src="${currentProduct.image}" alt="Thumbnail 4" 
                     class="w-full h-20 object-cover rounded border cursor-pointer hover:border-primary opacity-75">
            </div>
        </div>

        <!-- Product Info -->
        <div class="space-y-6">
            <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">${currentProduct.name}</h1>
                <div class="flex items-center space-x-4 mb-4">
                    <div class="flex items-center">
                        <div class="flex text-yellow-400">
                            ${generateStars(currentProduct.rating)}
                        </div>
                        <span class="ml-2 text-gray-600">(${currentProduct.reviews} reviews)</span>
                    </div>
                    <span class="text-sm ${currentProduct.inStock ? 'text-green-600' : 'text-red-600'}">
                        ${currentProduct.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                </div>
            </div>

            <!-- Price -->
            <div class="border-b border-gray-200 pb-6">
                <div class="flex items-end space-x-4">
                    <span class="text-4xl font-bold text-primary">${formatKshPrice(currentProduct.price)}</span>
                    ${currentProduct.originalPrice > currentProduct.price ? 
                        `<span class="text-2xl text-gray-500 line-through">${formatKshPrice(currentProduct.originalPrice)}</span>
                         <span class="bg-red-500 text-white px-2 py-1 text-sm rounded">
                            ${Math.round((1 - currentProduct.price / currentProduct.originalPrice) * 100)}% OFF
                         </span>` : ''
                    }
                </div>
            </div>

            <!-- Product Description -->
            <div class="border-b border-gray-200 pb-6">
                <p class="text-gray-600 leading-relaxed">${currentProduct.description}</p>
            </div>

            <!-- Quantity & Add to Cart -->
            <div class="space-y-4">
                <div class="flex items-center space-x-4">
                    <label class="text-sm font-medium text-gray-700">Quantity:</label>
                    <div class="flex items-center border border-gray-300 rounded">
                        <button id="decrease-qty" class="px-3 py-2 hover:bg-gray-100">-</button>
                        <input type="number" id="quantity" value="1" min="1" max="10" 
                               class="w-16 text-center border-0 focus:ring-0">
                        <button id="increase-qty" class="px-3 py-2 hover:bg-gray-100">+</button>
                    </div>
                </div>

                <div class="flex space-x-4">
                    <button id="add-to-cart-btn" 
                            ${!currentProduct.inStock ? 'disabled' : ''}
                            class="flex-1 ${currentProduct.inStock ? 'bg-primary hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} text-white py-3 px-6 rounded-lg font-semibold transition duration-300">
                        <i class="fas fa-cart-plus mr-2"></i>
                        ${currentProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <button id="buy-now-btn" 
                            ${!currentProduct.inStock ? 'disabled' : ''}
                            class="flex-1 ${currentProduct.inStock ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'} text-white py-3 px-6 rounded-lg font-semibold transition duration-300">
                        <i class="fas fa-bolt mr-2"></i>
                        ${currentProduct.inStock ? 'Buy Now' : 'Out of Stock'}
                    </button>
                </div>

                <button id="wishlist-btn" class="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition duration-300">
                    <i class="far fa-heart mr-2"></i>Add to Wishlist
                </button>
            </div>

            <!-- Product Features -->
            <div class="border-t border-gray-200 pt-6">
                <h3 class="text-lg font-semibold mb-4">Product Features</h3>
                <ul class="space-y-2 text-gray-600">
                    <li><i class="fas fa-check text-green-500 mr-2"></i>High-quality materials and construction</li>
                    <li><i class="fas fa-check text-green-500 mr-2"></i>1-year manufacturer warranty</li>
                    <li><i class="fas fa-check text-green-500 mr-2"></i>Fast and reliable performance</li>
                    <li><i class="fas fa-check text-green-500 mr-2"></i>Compatible with all major devices</li>
                </ul>
            </div>

            <!-- Shipping Info -->
            <div class="bg-gray-50 p-4 rounded-lg">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div class="flex items-center">
                        <i class="fas fa-truck text-primary mr-2"></i>
                        <span>Free shipping on orders over KSh 5000</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-undo text-primary mr-2"></i>
                        <span>30-day return policy</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-shield-alt text-primary mr-2"></i>
                        <span>Secure payment</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-headset text-primary mr-2"></i>
                        <span>24/7 customer support</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners for quantity controls and buttons
    setupProductInteractions();
    
    // Update full description in the description tab
    document.getElementById('product-full-description').textContent = currentProduct.description;
    
    // Update features list
    const featuresElement = document.getElementById('product-features');
    const features = [
        'High-quality materials and premium build',
        'Latest technology and advanced features',
        'Fast performance and reliable operation',
        'Energy efficient and environmentally friendly',
        'Easy installation and user-friendly design',
        'Comprehensive warranty and support'
    ];
    
    featuresElement.innerHTML = features.map(feature => `<li>${feature}</li>`).join('');
    
    // Update reviews count
    document.getElementById('reviews-count').textContent = currentProduct.reviews;
    
    // Load sample reviews
    loadSampleReviews();
}

function setupProductInteractions() {
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decrease-qty');
    const increaseBtn = document.getElementById('increase-qty');
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const buyNowBtn = document.getElementById('buy-now-btn');
    const wishlistBtn = document.getElementById('wishlist-btn');
    
    decreaseBtn.addEventListener('click', () => {
        const currentQty = parseInt(quantityInput.value);
        if (currentQty > 1) {
            quantityInput.value = currentQty - 1;
        }
    });
    
    increaseBtn.addEventListener('click', () => {
        const currentQty = parseInt(quantityInput.value);
        if (currentQty < 10) {
            quantityInput.value = currentQty + 1;
        }
    });
    
    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        for (let i = 0; i < quantity; i++) {
            addToCart(currentProduct.id);
        }
    });
    
    buyNowBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        // Clear cart and add this product
        cart = [];
        for (let i = 0; i < quantity; i++) {
            addToCart(currentProduct.id);
        }
        // Redirect to checkout
        window.location.href = 'checkout.html';
    });
    
    wishlistBtn.addEventListener('click', () => {
        // Add to wishlist functionality (placeholder)
        showNotification('Added to wishlist!', 'success');
    });
}

function loadRelatedProducts() {
    const relatedProducts = products
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 4);
    
    const relatedProductsElement = document.getElementById('related-products');
    
    if (relatedProducts.length === 0) {
        relatedProductsElement.innerHTML = '<p class="text-gray-500 col-span-full text-center">No related products found.</p>';
        return;
    }
    
    relatedProductsElement.innerHTML = relatedProducts.map(product => `
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <div class="relative">
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover cursor-pointer" 
                     onclick="viewProduct(${product.id})">
                ${product.originalPrice > product.price ? 
                    `<span class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                        ${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>` : ''
                }
            </div>
            <div class="p-4">
                <h3 class="font-semibold text-lg mb-2 cursor-pointer hover:text-primary" onclick="viewProduct(${product.id})">${product.name}</h3>
                <div class="flex items-center mb-2">
                    <div class="flex text-yellow-400 text-sm">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="text-gray-600 text-sm ml-2">(${product.reviews})</span>
                </div>
                <div class="flex items-center justify-between mb-3">
                    <div>
                        <span class="text-xl font-bold text-primary">${formatKshPrice(product.price)}</span>
                        ${product.originalPrice > product.price ? 
                            `<span class="text-gray-500 line-through text-sm ml-2">${formatKshPrice(product.originalPrice)}</span>` : ''
                        }
                    </div>
                </div>
                <button onclick="addToCart(${product.id})" 
                        class="w-full bg-primary text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                    <i class="fas fa-cart-plus mr-2"></i>Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function updateBreadcrumb() {
    document.getElementById('breadcrumb-product').textContent = currentProduct.name;
}

function switchTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    // Remove active state from all tabs
    document.querySelectorAll('nav button').forEach(tab => {
        tab.className = 'py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700';
    });
    
    // Show selected tab content
    document.getElementById(`${tabName}-content`).classList.remove('hidden');
    
    // Add active state to selected tab
    document.getElementById(`${tabName}-tab`).className = 'py-4 px-1 border-b-2 border-primary text-primary font-medium';
}

function updateRatingStars() {
    document.querySelectorAll('#rating-stars i').forEach((star, index) => {
        if (index < selectedRating) {
            star.className = 'fas fa-star text-yellow-400 cursor-pointer';
        } else {
            star.className = 'fas fa-star text-gray-300 cursor-pointer';
        }
    });
}

function highlightStars(rating) {
    document.querySelectorAll('#rating-stars i').forEach((star, index) => {
        if (index < rating) {
            star.className = 'fas fa-star text-yellow-400 cursor-pointer';
        } else {
            star.className = 'fas fa-star text-gray-300 cursor-pointer';
        }
    });
}

function handleReviewSubmission(e) {
    e.preventDefault();
    
    if (selectedRating === 0) {
        alert('Please select a rating');
        return;
    }
    
    // Here you would normally send the review to a server
    showNotification('Review submitted successfully!', 'success');
    
    // Reset form
    e.target.reset();
    selectedRating = 0;
    updateRatingStars();
}

function loadSampleReviews() {
    const sampleReviews = [
        {
            name: 'John Doe',
            rating: 5,
            date: '2024-01-15',
            comment: 'Excellent product! Exactly as described and fast delivery.'
        },
        {
            name: 'Sarah Smith',
            rating: 4,
            date: '2024-01-10',
            comment: 'Good quality and value for money. Would recommend.'
        },
        {
            name: 'Mike Johnson',
            rating: 5,
            date: '2024-01-05',
            comment: 'Outstanding service and product quality. Very satisfied!'
        }
    ];
    
    const reviewsList = document.getElementById('reviews-list');
    
    reviewsList.innerHTML = sampleReviews.map(review => `
        <div class="border-b border-gray-200 pb-6">
            <div class="flex items-center justify-between mb-2">
                <div class="flex items-center space-x-4">
                    <h5 class="font-semibold">${review.name}</h5>
                    <div class="flex text-yellow-400 text-sm">
                        ${generateStars(review.rating)}
                    </div>
                </div>
                <span class="text-sm text-gray-500">${new Date(review.date).toLocaleDateString()}</span>
            </div>
            <p class="text-gray-600">${review.comment}</p>
        </div>
    `).join('');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    
    notification.className = `fixed top-20 right-4 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg z-50`;
    notification.innerHTML = `<i class="fas fa-check mr-2"></i>${message}`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 3000);
}