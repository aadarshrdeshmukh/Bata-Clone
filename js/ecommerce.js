// Initialize cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize wishlist
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Function to add product to cart
function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
}

// Function to get product details from the page
function getProductDetails(card) {
    const titleElement = card.querySelector('.men-product-title');
    const priceElement = card.querySelector('.men-product-price');
    const imageElement = card.querySelector('img');

    const title = titleElement ? titleElement.innerText : 'Unknown Product';
    const price = priceElement ? priceElement.innerText : 'Unknown Price';
    const image = imageElement ? imageElement.src : '';

    return { title, price, image, size: 'N/A' };
}

// Add event listener to all Add to Cart buttons
const addToCartButtons = document.querySelectorAll('.add-to-bag-btn');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('Add to Cart button clicked');
        const card = button.closest('.men-product-card');
        if (card) {
            const product = getProductDetails(card);
            console.log('Product details:', product);
            addToCart(product);
        } else {
            console.log('Product card not found');
        }
    });
});

// Add event listener to size buttons
const sizeButtons = document.querySelectorAll('.sizes-grid .size-btn');
sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
        sizeButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
    });
});

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

// Function to add product to wishlist
function addToWishlist(product) {
    wishlist.push(product);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    console.log('Product added to wishlist:', product);
} 