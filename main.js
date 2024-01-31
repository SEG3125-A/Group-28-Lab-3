const products = [
    { name: "Bananas", price: 1.5, vegetarian: true, glutenFree: true, preference: 'organic' },
    { name: "Milk", price: 2.0, vegetarian: true, glutenFree: true, preference: 'non-organic' },
    { name: "Bread", price: 2.5, vegetarian: true, glutenFree: false, preference: 'non-organic' },
    { name: "Tomatoes", price: 3.0, vegetarian: true, glutenFree: true, preference: 'organic' },
    { name: "Chicken", price: 5.0, vegetarian: false, glutenFree: true, preference: 'non-organic' },
    { name: "Rice", price: 4.0, vegetarian: true, glutenFree: true, preference: 'organic' },
    { name: "Apples", price: 1.8, vegetarian: true, glutenFree: true, preference: 'non-organic' },
    { name: "Eggs", price: 2.5, vegetarian: false, glutenFree: true, preference: 'organic' },
    { name: "Cereal", price: 3.5, vegetarian: true, glutenFree: false, preference: 'non-organic' },
    { name: "Salmon", price: 6.0, vegetarian: false, glutenFree: true, preference: 'organic' }
];

let userPreferences = {
    vegetarian: false,
    glutenFree: false,
    preference: 'organic',
};

let cartItems = [];

// Function to display products page with a filter button
function showProductsPage() {
    const content = document.getElementById('content');
    const filterButton = document.getElementById('filterButton');

    content.innerHTML = `
        <h2>Products Page</h2>
        <ul>
            ${products.map(product => `
                <li>${product.name} - $${product.price}
                    <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
                </li>`).join('')}
        </ul>
        <div id="filterSidePanel">
            <!-- New section for customer preferences -->
            <h3>Customer Preferences</h3>
            <label><input type="checkbox" id="vegetarian"> Vegetarian</label>
            <label><input type="checkbox" id="glutenFree"> Gluten-Free</label>
            <label>Preference: 
                <select id="preference">
                    <option value="organic">Organic</option>
                    <option value="non-organic">Non-organic</option>
                </select>
            </label>
            <!-- Apply Filters button -->
            <button onclick="applyFilters()">Apply Filters</button>
        </div>
    `;

    // Updated event listener for the filter button in the header
    filterButton.removeEventListener('click', toggleFilters);
    filterButton.addEventListener('click', toggleFilters);
}

// Function to toggle the filter side panel
function toggleFilters() {
    const sidePanel = document.getElementById('filterSidePanel');
    
    // Check if the side panel element exists before attempting to modify its style
    if (sidePanel) {
        sidePanel.style.width = sidePanel.style.width === '250px' ? '0' : '250px';
    }
}


// Function to navigate to the home page (Products Page)
function goToHomePage() {
    showProductsPage();
}


// Function to display cart page
function showCartPage() {
    const content = document.getElementById('content');
    // Display cart items with remove buttons
    const cartContent = cartItems.map(item => `
        <li>${item.name} - $${item.price}
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        </li>`).join('');

    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    content.innerHTML = `
        <h2>Cart Page</h2>
        <ul>${cartContent}</ul>
        <p>Total: $${totalPrice}</p>
    `;
}

// Function to apply filters on Products Page
function applyFilters() {
    const vegetarianFilter = document.getElementById('vegetarian').checked;
    const glutenFreeFilter = document.getElementById('glutenFree').checked;
    const preferenceFilter = document.getElementById('preference').value;

    userPreferences.vegetarian = vegetarianFilter;
    userPreferences.glutenFree = glutenFreeFilter;
    userPreferences.preference = preferenceFilter;

    // Filter products based on user preferences
    const filteredProducts = products.filter(product => {
        return (
            (userPreferences.vegetarian ? product.vegetarian : true) &&
            (userPreferences.glutenFree ? product.glutenFree : true) &&
            (userPreferences.preference === 'all' || product.preference === userPreferences.preference)
        );
    });

    // Update the displayed products
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Products Page</h2>
        <ul>
            ${filteredProducts.map(product => `
                <li>${product.name} - $${product.price}
                    <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
                </li>`).join('')}
        </ul>
    `;
}

// Function to add an item to the cart
function addToCart(name, price) {
    cartItems.push({ name, price });
    showProductsPage(); // Refresh Products Page to reflect the updated cart
}

// Function to remove an item from the cart
function removeFromCart(name) {
    cartItems = cartItems.filter(item => item.name !== name);
    showCartPage(); // Refresh Cart Page to reflect the updated cart
}

// Initial load - show products page by default
showProductsPage();
