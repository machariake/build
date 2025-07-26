// Products page functionality
document.addEventListener('DOMContentLoaded', function() {
    loadProductsPage();
    setupProductsEventListeners();
});

let currentView = 'grid';
let filteredProducts = [...products];
let currentSort = 'featured';

function loadProductsPage() {
    // Get category from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category) {
        const categoryData = categories.find(cat => cat.id === category);
        if (categoryData) {
            document.getElementById('breadcrumb-category').textContent = categoryData.name;
            filteredProducts = products.filter(product => product.category === category);
        }
    }
    
    renderCategoryFilters();
    renderProducts();
    updateProductsCount();
}

function setupProductsEventListeners() {
    // Sort dropdown
    document.getElementById('sort-select').addEventListener('change', function(e) {
        currentSort = e.target.value;
        sortProducts();
        renderProducts();
    });
    
    // View toggle buttons
    document.getElementById('grid-view').addEventListener('click', function() {
        setView('grid');
    });
    
    document.getElementById('list-view').addEventListener('click', function() {
        setView('list');
    });
    
    // Clear filters button
    document.getElementById('clear-filters').addEventListener('click', clearAllFilters);
    
    // Price filter radio buttons
    document.querySelectorAll('input[name="price"]').forEach(radio => {
        radio.addEventListener('change', applyFilters);
    });
    
    // Search functionality
    document.getElementById('search-input').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        searchProducts(searchTerm);
    });
}

function renderCategoryFilters() {
    const categoryFilters = document.getElementById('category-filters');
    
    // Count products in each category
    const categoryCounts = {};
    products.forEach(product => {
        categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
    });
    
    categoryFilters.innerHTML = categories.map(category => `
        <label class="flex items-center justify-between">
            <div class="flex items-center">
                <input type="checkbox" class="category-filter mr-2" value="${category.id}">
                <span class="text-sm">${category.name}</span>
            </div>
            <span class="text-xs text-gray-500">(${categoryCounts[category.id] || 0})</span>
        </label>
    `).join('');
    
    // Add event listeners to category checkboxes
    document.querySelectorAll('.category-filter').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
}

function renderProducts() {
    const productsGrid = document.getElementById('products-grid');
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="col-span-full text-center py-16">
                <i class="fas fa-search text-gray-400 text-6xl mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                <p class="text-gray-500">Try adjusting your filters or search terms</p>
            </div>
        `;
        return;
    }
    
    if (currentView === 'grid') {
        productsGrid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
        productsGrid.innerHTML = filteredProducts.map(product => renderProductCard(product)).join('');
    } else {
        productsGrid.className = 'space-y-4';
        productsGrid.innerHTML = filteredProducts.map(product => renderProductListItem(product)).join('');
    }
}

function renderProductCard(product) {
    return `
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <div class="relative group">
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover cursor-pointer" 
                     onclick="viewProduct(${product.id})">
                ${product.originalPrice > product.price ? 
                    `<span class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                        ${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>` : ''
                }
                ${!product.inStock ? 
                    `<span class="absolute top-2 right-2 bg-gray-500 text-white px-2 py-1 text-xs rounded">
                        Out of Stock
                    </span>` : ''
                }
                <div class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button onclick="viewProduct(${product.id})" class="bg-white text-primary px-4 py-2 rounded-lg font-semibold hover:bg-gray-100">
                        Quick View
                    </button>
                </div>
            </div>
            <div class="p-4">
                <h3 class="font-semibold text-lg mb-2 cursor-pointer hover:text-primary" onclick="viewProduct(${product.id})">${product.name}</h3>
                <p class="text-gray-600 text-sm mb-3 line-clamp-2">${product.description}</p>
                <div class="flex items-center mb-2">
                    <div class="flex text-yellow-400 text-sm">
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
                    <span class="text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}">
                        ${product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                </div>
                <div class="flex space-x-2">
                    <button onclick="addToCart(${product.id})" 
                            ${!product.inStock ? 'disabled' : ''}
                            class="flex-1 ${product.inStock ? 'bg-primary hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} text-white py-2 px-4 rounded transition duration-300">
                        <i class="fas fa-cart-plus mr-2"></i>
                        ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <button onclick="viewProduct(${product.id})" 
                            class="px-4 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white transition duration-300">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderProductListItem(product) {
    return `
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <div class="flex">
                <div class="relative w-48 h-48">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover cursor-pointer" 
                         onclick="viewProduct(${product.id})">
                    ${product.originalPrice > product.price ? 
                        `<span class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                            ${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                        </span>` : ''
                    }
                </div>
                <div class="flex-1 p-6">
                    <h3 class="font-semibold text-xl mb-2 cursor-pointer hover:text-primary" onclick="viewProduct(${product.id})">${product.name}</h3>
                    <p class="text-gray-600 mb-4">${product.description}</p>
                    <div class="flex items-center mb-4">
                        <div class="flex text-yellow-400">
                            ${generateStars(product.rating)}
                        </div>
                        <span class="text-gray-600 ml-2">(${product.reviews} reviews)</span>
                        <span class="ml-4 text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}">
                            ${product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </div>
                    <div class="flex items-center justify-between">
                        <div>
                            <span class="text-3xl font-bold text-primary">$${product.price}</span>
                            ${product.originalPrice > product.price ? 
                                `<span class="text-gray-500 line-through text-lg ml-2">$${product.originalPrice}</span>` : ''
                            }
                        </div>
                        <div class="flex space-x-3">
                            <button onclick="addToCart(${product.id})" 
                                    ${!product.inStock ? 'disabled' : ''}
                                    class="${product.inStock ? 'bg-primary hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} text-white py-2 px-6 rounded transition duration-300">
                                <i class="fas fa-cart-plus mr-2"></i>
                                ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                            <button onclick="viewProduct(${product.id})" 
                                    class="px-6 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white transition duration-300">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function setView(view) {
    currentView = view;
    
    // Update button states
    document.getElementById('grid-view').className = view === 'grid' 
        ? 'p-2 bg-primary text-white' 
        : 'p-2 text-gray-600 hover:bg-gray-100';
    document.getElementById('list-view').className = view === 'list' 
        ? 'p-2 bg-primary text-white' 
        : 'p-2 text-gray-600 hover:bg-gray-100';
    
    renderProducts();
}

function sortProducts() {
    switch (currentSort) {
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'featured':
        default:
            filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
            break;
    }
}

function applyFilters() {
    let filtered = [...products];
    
    // Category filters
    const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked'))
        .map(checkbox => checkbox.value);
    
    if (selectedCategories.length > 0) {
        filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }
    
    // Price filters
    const selectedPriceRange = document.querySelector('input[name="price"]:checked').value;
    if (selectedPriceRange !== 'all') {
        if (selectedPriceRange === '0-25') {
            filtered = filtered.filter(product => product.price >= 0 && product.price <= 25);
        } else if (selectedPriceRange === '25-100') {
            filtered = filtered.filter(product => product.price > 25 && product.price <= 100);
        } else if (selectedPriceRange === '100-500') {
            filtered = filtered.filter(product => product.price > 100 && product.price <= 500);
        } else if (selectedPriceRange === '500+') {
            filtered = filtered.filter(product => product.price > 500);
        }
    }
    
    filteredProducts = filtered;
    sortProducts();
    renderProducts();
    updateProductsCount();
}

function searchProducts(searchTerm) {
    if (searchTerm.length === 0) {
        applyFilters(); // Reset to filtered products
        return;
    }
    
    filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    sortProducts();
    renderProducts();
    updateProductsCount();
}

function clearAllFilters() {
    // Reset category filters
    document.querySelectorAll('.category-filter').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Reset price filter
    document.querySelector('input[name="price"][value="all"]').checked = true;
    
    // Reset search
    document.getElementById('search-input').value = '';
    
    // Apply filters (which will show all products)
    applyFilters();
}

function updateProductsCount() {
    const count = filteredProducts.length;
    const total = products.length;
    document.getElementById('products-count').textContent = 
        `Showing ${count} of ${total} products`;
}