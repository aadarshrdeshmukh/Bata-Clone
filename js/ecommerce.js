// Initialize wishlist
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Initialize cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to get product details from the page
function getProductDetails(card) {
    const titleElement = card.querySelector('.product-title');
    const priceElement = card.querySelector('.product-price');
    const imageElement = card.querySelector('img');
    const sizeElement = card.querySelector('.size-btn.selected');

    const title = titleElement ? titleElement.innerText : 'Unknown Product';
    const price = priceElement ? priceElement.innerText : 'Unknown Price';
    const image = imageElement ? imageElement.src : '';
    const size = sizeElement ? sizeElement.innerText : 'N/A';

    return { title, price, image, size, quantity: 1 };
}

// Add event listener to the wishlist button
const wishlistButtons = document.querySelectorAll('.men-wishlist');
wishlistButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default button behavior
        const card = button.closest('.men-product-card');
        const product = getProductDetails(card);
        console.log('Product details:', product);
        addToWishlist(product);
    });
});

// Add event listener to the add to bag button
const addToBagButtons = document.querySelectorAll('.add-to-bag-btn');
addToBagButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default button behavior
        const card = button.closest('.product-detail-container');
        const product = getProductDetails(card);
        console.log('Product details:', product);
        addToCart(product);
    });
});

// Add event listener to the size buttons
const sizeButtons = document.querySelectorAll('.size-btn');
sizeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        // Remove 'selected' class from all size buttons
        sizeButtons.forEach(btn => btn.classList.remove('selected'));
        // Add 'selected' class to the clicked button
        button.classList.add('selected');
    });
});

// Function to add product to wishlist
function addToWishlist(product) {
    wishlist.push(product);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    console.log('Product added to wishlist:', product);
}

// Function to add product to cart
function addToCart(product) {
    const existingProductIndex = cart.findIndex(item => item.title === product.title && item.size === product.size);
    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Product added to cart:', product);
} 

document.addEventListener('DOMContentLoaded', function() {
    const sortButton = document.querySelector('.men-sort-btn');
    const sortOptions = document.querySelectorAll('.men-sort-option');
    const productGrid = document.querySelector('.men-product-grid');

    // Function to sort product cards
    function sortProducts(criteria) {
        const productCards = Array.from(productGrid.children);
        let sortedCards;

        switch(criteria) {
            case 'Price: Low to High':
                sortedCards = productCards.sort((a, b) => {
                    const priceA = parseFloat(a.querySelector('.men-product-price').textContent.replace(/[^0-9.-]+/g, ""));
                    const priceB = parseFloat(b.querySelector('.men-product-price').textContent.replace(/[^0-9.-]+/g, ""));
                    return priceA - priceB;
                });
                break;
            case 'Price: High to Low':
                sortedCards = productCards.sort((a, b) => {
                    const priceA = parseFloat(a.querySelector('.men-product-price').textContent.replace(/[^0-9.-]+/g, ""));
                    const priceB = parseFloat(b.querySelector('.men-product-price').textContent.replace(/[^0-9.-]+/g, ""));
                    return priceB - priceA;
                });
                break;
            case 'Newest First':
                // Assuming there's a date attribute or similar to sort by
                sortedCards = productCards.sort((a, b) => {
                    const dateA = new Date(a.dataset.date);
                    const dateB = new Date(b.dataset.date);
                    return dateB - dateA;
                });
                break;
            case 'Discount':
                // Assuming there's a discount attribute or similar to sort by
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

    // Event listener for sorting
    sortOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedOption = this.textContent;
            sortProducts(selectedOption);
            sortButton.textContent = `Sort by: ${selectedOption}`; // Update sort button text
        });
    });

    const modal = document.getElementById('cartModal');
    const closeButton = document.querySelector('.close-button');

    // Function to show the modal
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

    // Event listener for close button
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Example: Add event listener to 'Add to Cart' button
    const addToCartButton = document.querySelector('.add-to-bag-btn');
    addToCartButton.addEventListener('click', function() {
        showModal();
    });
});