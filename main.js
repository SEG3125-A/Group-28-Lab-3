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

const categories = {
    milk: ['Milk'],
    meats: ['Chicken', 'Salmon', 'Eggs'],
    fruits: ['Bananas', 'Tomatoes', 'Apples'],
    breads: ['Bread', 'Rice', 'Cereal'],
    // ... add more categories as needed
};

let userPreferences = {
    vegetarian: false,
    glutenFree: false,
    preference: 'organic',
};

let cartItems = [];

function showProductsPage() {
    const content = document.getElementById('content');
    const filterButton = document.getElementById('filterButton');

    // If a category is selected, show products for that category
    if (userPreferences.category) {
        const categoryProducts = products.filter(product => categories[userPreferences.category].includes(product.name));
        displayProducts(content, categoryProducts);
    } else {
        // Show categories initially
        displayCategories(content);
    }

    filterButton.removeEventListener('click', toggleFilters);
    filterButton.addEventListener('click', toggleFilters);
}

function displayCategories(container) {
    container.innerHTML = `
        <h2>Categories</h2>
        <div class="category-container">
            ${Object.keys(categories).map(category => `
                <div class="category-item">
                    <img src="${category}.png" alt="${category}" width="200" height="200">
                    <div>${category.charAt(0).toUpperCase() + category.slice(1)}</div>
                    <button onclick="selectCategory('${category}')">Enter</button>
                </div>`).join('')}
        </div>
        <div id="filterSidePanel">
            <h3>Customer Preferences</h3>
            <label><input type="checkbox" id="vegetarian"> Vegetarian</label>
            <label><input type="checkbox" id="glutenFree"> Gluten-Free</label>
            <label>Preference: 
                <select id="preference">
                    <option value="organic">Organic</option>
                    <option value="non-organic">Non-organic</option>
                </select>
            </label>
            <button onclick="applyFilters()">Apply Filters</button>
        </div>
    `;
}

function displayProducts(container, productList) {
    container.innerHTML = `
        <h2>${userPreferences.category.charAt(0).toUpperCase() + userPreferences.category.slice(1)} Products</h2>
        <div class="product-container">
            ${productList.map(product => `
                <div class="product-item">
                    <img src="${product.name}.png" alt="${product.name}" width="50" height="50">
                    <div>${product.name} - $${product.price}</div>
                    <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
                </div>`).join('')}
        </div>
        <div id="filterSidePanel">
            <h3>Customer Preferences</h3>
            <label><input type="checkbox" id="vegetarian"> Vegetarian</label>
            <label><input type="checkbox" id="glutenFree"> Gluten-Free</label>
            <label>Preference: 
                <select id="preference">
                    <option value="organic">Organic</option>
                    <option value="non-organic">Non-organic</option>
                </select>
            </label>
            <button onclick="applyFilters()">Apply Filters</button>
        </div>
    `;
}

function selectCategory(category) {
    userPreferences.category = category;
    showProductsPage();
}

function toggleFilters() {
    const sidePanel = document.getElementById('filterSidePanel');
    
    if (sidePanel) {
        sidePanel.style.width = sidePanel.style.width === '250px' ? '0' : '250px';
    }
}

function goToHomePage() {
    userPreferences.category = null; // Reset selected category to null
    showProductsPage();
}

function showCartPage() {
    const content = document.getElementById('content');
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

function applyFilters() {
    const vegetarianFilter = document.getElementById('vegetarian').checked;
    const glutenFreeFilter = document.getElementById('glutenFree').checked;
    const preferenceFilter = document.getElementById('preference').value;

    userPreferences.vegetarian = vegetarianFilter;
    userPreferences.glutenFree = glutenFreeFilter;
    userPreferences.preference = preferenceFilter;

    const filteredProducts = products.filter(product => {
        return (
            (userPreferences.vegetarian ? product.vegetarian : true) &&
            (userPreferences.glutenFree ? product.glutenFree : true) &&
            (userPreferences.preference === 'all' || product.preference === userPreferences.preference)
        );
    });

    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Products Page</h2>
        <div class="product-container">
            ${filteredProducts.map(product => `
                <div class="product-item">
                    <img src="${product.name}.png" alt="${product.name}" width="50" height="50">
                    <div>${product.name} - $${product.price}</div>
                    <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
                </div>`).join('')}
        </div>
    `;
}

function addToCart(name, price) {
    cartItems.push({ name, price });
    showProductsPage();
}

function removeFromCart(name) {
    cartItems = cartItems.filter(item => item.name !== name);
    showCartPage();
}

showProductsPage();
