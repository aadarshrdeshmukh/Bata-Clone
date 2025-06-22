// Initialize wishlist from local storage or as an empty array
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Initialize cart from local storage or as an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to get product details from a product card element
function getProductDetails(card) {
    // Extract product details from the card
    const titleElement = card.querySelector('.product-title');
    const priceElement = card.querySelector('.product-price');
    const imageElement = card.querySelector('img');
    const sizeElement = card.querySelector('.size-btn.selected');

    // Return product details as an object
    const title = titleElement ? titleElement.innerText : 'Unknown Product';
    const price = priceElement ? priceElement.innerText : 'Unknown Price';
    const image = imageElement ? imageElement.src : '';
    const size = sizeElement ? sizeElement.innerText : 'N/A';

    return { title, price, image, size, quantity: 1 };
}

// Add event listener to each wishlist button
const wishlistButtons = document.querySelectorAll('.men-wishlist');
wishlistButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        // Prevent default button behavior
        event.preventDefault();
        // Get the product card associated with the button
        const card = button.closest('.men-product-card');
        // Get product details and add to wishlist
        const product = getProductDetails(card);
        console.log('Product details:', product);
        addToWishlist(product);
    });
});

// Add event listener to each add to bag button
const addToBagButtons = document.querySelectorAll('.add-to-bag-btn');
addToBagButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        // Prevent default button behavior
        event.preventDefault();
        // Get the product card associated with the button
        const card = button.closest('.product-detail-container');
        // Get product details and add to cart
        const product = getProductDetails(card);
        console.log('Product details:', product);
        addToCart(product);
    });
});

// Add event listener to each size button
const sizeButtons = document.querySelectorAll('.size-btn');
sizeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        // Remove 'selected' class from all size buttons
        sizeButtons.forEach(btn => btn.classList.remove('selected'));
        // Add 'selected' class to the clicked button
        button.classList.add('selected');
    });
});

// Function to add a product to the wishlist
function addToWishlist(product) {
    // Add product to wishlist array
    wishlist.push(product);
    // Update wishlist in local storage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    console.log('Product added to wishlist:', product);
}

// Function to add a product to the cart
function addToCart(product) {
    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(item => item.title === product.title && item.size === product.size);
    if (existingProductIndex > -1) {
        // Increase quantity if product exists
        cart[existingProductIndex].quantity += 1;
    } else {
        // Add new product to cart
        cart.push(product);
    }
    // Update cart in local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Product added to cart:', product);
} 

// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', function() {
    const sortButton = document.querySelector('.men-sort-btn');
    const sortOptions = document.querySelectorAll('.men-sort-option');
    const productGrid = document.querySelector('.men-product-grid');

    // Function to sort product cards based on selected criteria
    function sortProducts(criteria) {
        const productCards = Array.from(productGrid.children);
        let sortedCards;

        switch(criteria) {
            case 'Price: Low to High':
                // Sort by price in ascending order
                sortedCards = productCards.sort((a, b) => {
                    const priceA = parseFloat(a.querySelector('.men-product-price').textContent.replace(/[^0-9.-]+/g, ""));
                    const priceB = parseFloat(b.querySelector('.men-product-price').textContent.replace(/[^0-9.-]+/g, ""));
                    return priceA - priceB;
                });
                break;
            case 'Price: High to Low':
                // Sort by price in descending order
                sortedCards = productCards.sort((a, b) => {
                    const priceA = parseFloat(a.querySelector('.men-product-price').textContent.replace(/[^0-9.-]+/g, ""));
                    const priceB = parseFloat(b.querySelector('.men-product-price').textContent.replace(/[^0-9.-]+/g, ""));
                    return priceB - priceA;
                });
                break;
            case 'Newest First':
                // Sort by newest first, assuming a date attribute is present
                sortedCards = productCards.sort((a, b) => {
                    const dateA = new Date(a.dataset.date);
                    const dateB = new Date(b.dataset.date);
                    return dateB - dateA;
                });
                break;
            case 'Discount':
                // Sort by discount, assuming a discount attribute is present
                sortedCards = productCards.sort((a, b) => {
                    const discountA = parseFloat(a.dataset.discount);
                    const discountB = parseFloat(b.dataset.discount);
                    return discountB - discountA;
                });
                break;
            default:
                sortedCards = productCards;
                break;
        }

        // Update the product grid with sorted cards
        productGrid.innerHTML = '';
        sortedCards.forEach(card => productGrid.appendChild(card));
    }

    // Add event listener for sorting options
    sortOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedOption = this.textContent;
            sortProducts(selectedOption);
            // Update sort button text with selected option
            sortButton.textContent = `Sort by: ${selectedOption}`;
        });
    });

    const modal = document.getElementById('cartModal');
    const closeButton = document.querySelector('.close-button');

    // Function to show the modal with fade-out effect
    function showModal() {
        modal.classList.remove('fade-out');
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('fade-out');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300); // Wait for fade-out animation to complete
        }, 3000); // Hide after 3 seconds
    }

    // Add event listener for close button to hide the modal
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Example: Add event listener to 'Add to Cart' button to show modal
    const addToCartButton = document.querySelector('.add-to-bag-btn');
    addToCartButton.addEventListener('click', function() {
        showModal();
    });
});