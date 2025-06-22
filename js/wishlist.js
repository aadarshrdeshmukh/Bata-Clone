// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', () => {
    const wishlistItemsContainer = document.getElementById('wishlist-items');
    const wishlistCount = document.getElementById('wishlist-count');

    // Retrieve wishlist items from local storage or initialize an empty array
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Log the loaded wishlist to the console
    console.log('Wishlist loaded:', wishlist);

    // Update the wishlist count display
    wishlistCount.innerText = wishlist.length;

    // Function to update the display of wishlist items
    function updateWishlistDisplay() {
        // Clear the current wishlist items display
        wishlistItemsContainer.innerHTML = '';

        // Iterate over each item in the wishlist and create HTML elements for display
        wishlist.forEach((item, index) => {
            // Log item details to the console
            console.log('Item details:', {
                title: item.title,
                price: item.price,
                image: item.image,
                size: item.size
            });

            // Create a new div element for the wishlist item
            const itemElement = document.createElement('div');
            itemElement.classList.add('wishlist-item');

            // Set the inner HTML of the item element with item details
            itemElement.innerHTML = `
                <img src="${item.image || 'default-image.png'}" alt="${item.title || 'Unknown Product'}" />
                <div class="wishlist-item-details">
                    <h3>${item.title || 'Unknown Product'}</h3>
                    <p>${item.price || 'Unknown Price'}</p>
                    <p>Size: ${item.size || 'N/A'}</p>
                    <button class="remove-wishlist-item" data-index="${index}">Remove</button>
                </div>
            `;

            // Append the item element to the wishlist items container
            wishlistItemsContainer.appendChild(itemElement);
        });

        // Add event listeners to remove buttons for each wishlist item
        document.querySelectorAll('.remove-wishlist-item').forEach(button => {
            button.addEventListener('click', (event) => {
                // Get the index of the item to remove
                const index = event.target.getAttribute('data-index');

                // Remove the item from the wishlist array
                wishlist.splice(index, 1);

                // Update the wishlist in local storage
                localStorage.setItem('wishlist', JSON.stringify(wishlist));

                // Refresh the wishlist display
                updateWishlistDisplay();

                // Update the wishlist count display
                wishlistCount.innerText = wishlist.length;
            });
        });
    }

    // Initial call to display the wishlist items
    updateWishlistDisplay();
}); 