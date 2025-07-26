// Checkout page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeCheckout();
    setupCheckoutEventListeners();
});

let shippingCost = 0;
let taxRate = 0.08; // 8% tax rate

function initializeCheckout() {
    // Check if cart is empty
    if (cart.length === 0) {
        window.location.href = 'index.html';
        return;
    }
    
    renderCheckoutItems();
    updateOrderSummary();
}

function setupCheckoutEventListeners() {
    // Shipping method change
    document.querySelectorAll('input[name="shipping"]').forEach(radio => {
        radio.addEventListener('change', function() {
            updateShippingCost(this.value);
            updateOrderSummary();
        });
    });
    
    // Payment method change
    document.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.addEventListener('change', function() {
            showPaymentDetails(this.value);
        });
    });
    
    // Form submission
    document.getElementById('checkout-form').addEventListener('submit', handleOrderSubmission);
    document.getElementById('place-order-btn').addEventListener('click', handleOrderSubmission);
}

function renderCheckoutItems() {
    const checkoutCartItems = document.getElementById('checkout-cart-items');
    
    checkoutCartItems.innerHTML = cart.map(item => `
        <div class="flex items-center space-x-3 py-2">
            <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
            <div class="flex-1">
                <h4 class="font-medium text-sm">${item.name}</h4>
                <p class="text-gray-600 text-sm">Qty: ${item.quantity}</p>
            </div>
            <div class="text-right">
                <p class="font-semibold">$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        </div>
    `).join('');
}

function updateShippingCost(shippingMethod) {
    switch (shippingMethod) {
        case 'standard':
            shippingCost = 0;
            break;
        case 'express':
            shippingCost = 9.99;
            break;
        case 'overnight':
            shippingCost = 19.99;
            break;
        default:
            shippingCost = 0;
    }
}

function updateOrderSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * taxRate;
    const total = subtotal + shippingCost + tax;
    
    document.getElementById('checkout-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkout-shipping').textContent = shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`;
    document.getElementById('checkout-tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('checkout-total').textContent = `$${total.toFixed(2)}`;
}

function showPaymentDetails(paymentMethod) {
    const paymentDetails = document.getElementById('payment-details');
    const cardDetails = document.getElementById('card-details');
    const mpesaDetails = document.getElementById('mpesa-details');
    
    // Hide all payment detail sections
    paymentDetails.classList.add('hidden');
    cardDetails.classList.add('hidden');
    mpesaDetails.classList.add('hidden');
    
    // Show relevant payment details
    if (paymentMethod === 'card') {
        paymentDetails.classList.remove('hidden');
        cardDetails.classList.remove('hidden');
    } else if (paymentMethod === 'mpesa') {
        paymentDetails.classList.remove('hidden');
        mpesaDetails.classList.remove('hidden');
    }
}

function handleOrderSubmission(e) {
    e.preventDefault();
    
    // Validate form
    const form = document.getElementById('checkout-form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Get form data
    const formData = new FormData(form);
    const orderData = {
        customer: {
            firstName: formData.get('firstName') || form.querySelector('input[type="text"]').value,
            lastName: formData.get('lastName') || form.querySelectorAll('input[type="text"]')[1].value,
            email: form.querySelector('input[type="email"]').value,
            phone: form.querySelector('input[type="tel"]').value
        },
        shipping: {
            address: form.querySelectorAll('input[type="text"]')[2].value,
            apartment: form.querySelectorAll('input[type="text"]')[3].value,
            city: form.querySelectorAll('input[type="text"]')[4].value,
            state: form.querySelector('select').value,
            postalCode: form.querySelectorAll('input[type="text"]')[5].value,
            method: document.querySelector('input[name="shipping"]:checked').value
        },
        payment: {
            method: document.querySelector('input[name="payment"]:checked').value
        },
        items: cart,
        totals: {
            subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            shipping: shippingCost,
            tax: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * taxRate,
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + shippingCost + (cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * taxRate)
        }
    };
    
    // Show loading state
    const placeOrderBtn = document.getElementById('place-order-btn');
    const originalText = placeOrderBtn.innerHTML;
    placeOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processing Order...';
    placeOrderBtn.disabled = true;
    
    // Simulate order processing
    setTimeout(() => {
        processOrder(orderData);
    }, 2000);
}

function processOrder(orderData) {
    try {
        // Generate order number
        const orderNumber = 'MG' + Date.now();
        
        // Store order in localStorage (in a real app, this would go to a server)
        const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
        const newOrder = {
            ...orderData,
            orderNumber,
            date: new Date().toISOString(),
            status: 'confirmed'
        };
        existingOrders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(existingOrders));
        
        // Clear cart
        cart = [];
        localStorage.removeItem('cart');
        
        // Redirect to success page with order number
        window.location.href = `order-success.html?order=${orderNumber}`;
        
    } catch (error) {
        console.error('Order processing failed:', error);
        
        // Reset button
        const placeOrderBtn = document.getElementById('place-order-btn');
        placeOrderBtn.innerHTML = '<i class="fas fa-lock mr-2"></i>Place Order';
        placeOrderBtn.disabled = false;
        
        // Show error message
        showNotification('Order processing failed. Please try again.', 'error');
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    
    notification.className = `fixed top-20 right-4 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg z-50`;
    notification.innerHTML = `<i class="fas fa-${type === 'error' ? 'exclamation-triangle' : 'check'} mr-2"></i>${message}`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 5000);
}