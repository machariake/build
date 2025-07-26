// Order success page functionality
document.addEventListener('DOMContentLoaded', function() {
    loadOrderDetails();
});

function loadOrderDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderNumber = urlParams.get('order');
    
    if (!orderNumber) {
        window.location.href = 'index.html';
        return;
    }
    
    // Get order from localStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.orderNumber === orderNumber);
    
    if (!order) {
        window.location.href = 'index.html';
        return;
    }
    
    renderOrderDetails(order);
}

function renderOrderDetails(order) {
    // Update order information
    document.getElementById('order-number').textContent = order.orderNumber;
    document.getElementById('order-date').textContent = new Date(order.date).toLocaleDateString();
    
    // Calculate estimated delivery
    const deliveryDate = new Date(order.date);
    const shippingDays = getShippingDays(order.shipping.method);
    deliveryDate.setDate(deliveryDate.getDate() + shippingDays);
    document.getElementById('estimated-delivery').textContent = deliveryDate.toLocaleDateString();
    
    // Update delivery address
    const deliveryAddress = document.getElementById('delivery-address');
    deliveryAddress.innerHTML = `
        <div class="space-y-1">
            <p class="font-medium">${order.customer.firstName} ${order.customer.lastName}</p>
            <p>${order.shipping.address}</p>
            ${order.shipping.apartment ? `<p>${order.shipping.apartment}</p>` : ''}
            <p>${order.shipping.city}, ${order.shipping.state} ${order.shipping.postalCode}</p>
            <p class="text-sm text-gray-500 mt-2">
                <i class="fas fa-truck mr-1"></i>
                ${getShippingMethodName(order.shipping.method)}
            </p>
        </div>
    `;
    
    // Update order items
    const orderItems = document.getElementById('order-items');
    orderItems.innerHTML = order.items.map(item => `
        <div class="flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0">
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg">
            <div class="flex-1">
                <h4 class="font-semibold">${item.name}</h4>
                <p class="text-gray-600">Quantity: ${item.quantity}</p>
                <p class="text-primary font-semibold">${formatPrice(item.price)} each</p>
            </div>
            <div class="text-right">
                <p class="font-bold text-lg">${formatPrice(item.price * item.quantity)}</p>
            </div>
        </div>
    `).join('');
    
    // Update order totals
    document.getElementById('order-subtotal').textContent = formatPrice(order.totals.subtotal);
    document.getElementById('order-shipping').textContent = order.totals.shipping === 0 ? 'Free' : formatPrice(order.totals.shipping);
    document.getElementById('order-tax').textContent = formatPrice(order.totals.tax);
    document.getElementById('order-total').textContent = formatPrice(order.totals.total);
}

function getShippingDays(method) {
    switch (method) {
        case 'standard':
            return 5; // 3-5 business days, use 5 for estimate
        case 'express':
            return 2; // 1-2 business days
        case 'overnight':
            return 1; // Next business day
        default:
            return 5;
    }
}

function getShippingMethodName(method) {
    switch (method) {
        case 'standard':
            return 'Standard Delivery (3-5 business days)';
        case 'express':
            return 'Express Delivery (1-2 business days)';
        case 'overnight':
            return 'Overnight Delivery (Next business day)';
        default:
            return 'Standard Delivery';
    }
}

function printOrder() {
    window.print();
}