// Function to display cart items
function displayCartItems() {
    // Get the container for cart items
    const cartItemsContainer = document.getElementById('cart-items-container');
    // Retrieve cart items from local storage or initialize an empty array
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Clear the current cart items display
    cartItemsContainer.innerHTML = '';
    // Initialize subtotal to calculate total price
    let subtotal = 0;

    // Iterate over each item in the cart and create HTML elements for display
    cart.forEach((item, index) => {
        // Parse the price and calculate subtotal
        const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
        subtotal += price * item.quantity;
        // Create a new div element for the cart item
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        // Set the inner HTML of the cart item element with item details
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="product-image" />
            <div class="product-details">
                <h2>${item.title}</h2>
                <p class="product-price">${item.price}</p>
                <p>Size: ${item.size}</p>
                <p class="in-stock">IN STOCK</p>
                <div class="quantity-control">
                    <button class="decrease-quantity" data-index="${index}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase-quantity" data-index="${index}">+</button>
                </div>
            </div>
            <button class="remove-item" data-index="${index}">&times;</button>
        `;
        // Append the cart item element to the cart items container
        cartItemsContainer.appendChild(cartItem);
    });

    // Update cart summary with subtotal
    document.querySelector('.summary-row span:nth-child(2)').innerText = `₹ ${subtotal.toFixed(2)}`;
    document.querySelector('.total span:nth-child(2)').innerText = `₹ ${subtotal.toFixed(2)}`;

    // Add event listeners to quantity buttons
    const increaseButtons = document.querySelectorAll('.increase-quantity');
    const decreaseButtons = document.querySelectorAll('.decrease-quantity');

    increaseButtons.forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });

    decreaseButtons.forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });

    // Add event listeners to remove buttons
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeCartItem);
    });
}

// Function to increase quantity of a cart item
function increaseQuantity(event) {
    // Get the index of the item to increase quantity
    const index = event.target.getAttribute('data-index');
    // Retrieve cart items from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Increase the quantity of the item
    cart[index].quantity += 1;
    // Update the cart in local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    // Refresh the cart display
    displayCartItems();
}

// Function to decrease quantity of a cart item
function decreaseQuantity(event) {
    // Get the index of the item to decrease quantity
    const index = event.target.getAttribute('data-index');
    // Retrieve cart items from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Decrease the quantity of the item if it's greater than 1
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        // Update the cart in local storage
        localStorage.setItem('cart', JSON.stringify(cart));
        // Refresh the cart display
        displayCartItems();
    }
}

// Function to remove an item from the cart
function removeCartItem(event) {
    // Get the index of the item to remove
    const index = event.target.getAttribute('data-index');
    // Retrieve cart items from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Remove the item from the cart array
    cart.splice(index, 1);
    // Update the cart in local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    // Refresh the cart display
    displayCartItems();
}

// Call the function to display cart items on page load
document.addEventListener('DOMContentLoaded', displayCartItems); 