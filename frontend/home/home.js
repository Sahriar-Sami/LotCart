// ============================================================================
// LOTKART HOME PAGE - PROFESSIONAL DATABASE INTEGRATION
// ============================================================================

let allProducts = []; // This will hold your database results
let currentPage = 1;
const itemsPerPage = 12;

document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    loadProducts(); // Fetches initial data
});

function initializeEventListeners() {
    // Filter Buttons
    document.getElementById('applyFiltersBtn').addEventListener('click', applyFilters);
    document.getElementById('clearFiltersBtn').addEventListener('click', clearFilters);

    // Search Logic
    document.getElementById('searchIcon').addEventListener('click', handleSearch);
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    // Pagination
    document.getElementById('prevPage').addEventListener('click', () => changePage(-1));
    document.getElementById('nextPage').addEventListener('click', () => changePage(1));
}

// ============================================================================
// PRODUCT CARD GENERATOR (YOUR UPDATED FUNCTION)
// ============================================================================

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-vaid', product.vaid);
    card.onclick = () => viewProductDetails(product.vaid);

    // Image handling (Varbinary to Blob)
    let imageUrl = 'placeholder.jpg';
    if (product.img) {
        // SQL Varbinary comes as a Buffer/Uint8Array
        const blob = new Blob([product.img], { type: 'image/jpeg' });
        imageUrl = URL.createObjectURL(blob);
    }

    // --- MATH FOR UNIT PRICE ---
    const total = parseFloat(product.totalPrice || product.lot_price) || 0;
    const qty = parseInt(product.quantity || product.number_of_product) || 1;
    const unitPrice = total / qty; 

    card.innerHTML = `
        <div class="img-box">
            <img src="${imageUrl}" alt="${product.description}" class="product-img">
        </div>
        <div class="card-body">
            <p class="title">${product.description || 'Untitled Lot'}</p>
            <p class="ordered-count">
                Progress: <b>${product.ordered || 0} / ${qty}</b>
            </p>
            <p class="location">📍 ${product.sellerCountry || product.seller_country} → ${product.destinationCountry || product.destination_country}</p>
            <p class="price">$${unitPrice.toFixed(2)} <small style="font-size: 12px; color: #aaa;">per item</small></p>
        </div>
    `;

    return card;
}

// ============================================================================
// FILTERING LOGIC
// ============================================================================

function applyFilters() {
    const filters = {
        minP: parseFloat(document.getElementById('minPrice').value) || 0,
        maxP: parseFloat(document.getElementById('maxPrice').value) || Infinity,
        sCountry: document.getElementById('sellerCountryFilter').value,
        dCountry: document.getElementById('destinationCountryFilter').value,
        deliveryDate: document.getElementById('deliveryDate').value,
        minQty: parseInt(document.getElementById('minOrders').value) || 0,
        maxQty: parseInt(document.getElementById('maxOrders').value) || Infinity
    };

    const filtered = allProducts.filter(p => {
        const unitP = (p.totalPrice || p.lot_price) / (p.quantity || p.number_of_product);
        const pQty = p.quantity || p.number_of_product;
        const pDate = p.estimatedDate || p.estimated_date;

        return unitP >= filters.minP && 
               unitP <= filters.maxP &&
               (!filters.sCountry || (p.sellerCountry || p.seller_country) === filters.sCountry) &&
               (!filters.dCountry || (p.destinationCountry || p.destination_country) === filters.dCountry) &&
               (pQty >= filters.minQty && pQty <= filters.maxQty) &&
               (!filters.deliveryDate || new Date(pDate) >= new Date(filters.deliveryDate));
    });

    currentPage = 1;
    displayProducts(filtered);
    updateResultCount(filtered.length);
}

function clearFilters() {
    document.querySelectorAll('.sidebar input, .sidebar select').forEach(i => i.value = '');
    displayProducts(allProducts);
    updateResultCount(allProducts.length);
}

// ============================================================================
// UI HELPERS
// ============================================================================

function displayProducts(products) {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';

    if (products.length === 0) {
        container.innerHTML = '<div class="no-results">No products match your filters.</div>';
        return;
    }

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginated = products.slice(start, end);

    paginated.forEach(p => container.appendChild(createProductCard(p)));
    updatePagination(products.length);
}

function updateResultCount(count) {
    document.getElementById('resultCount').innerText = `${count} products found`;
}

function updatePagination(total) {
    const totalPages = Math.ceil(total / itemsPerPage) || 1;
    document.getElementById('pageInfo').innerText = `Page ${currentPage} of ${totalPages}`;
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
}

function changePage(dir) {
    currentPage += dir;
    displayProducts(allProducts);
    window.scrollTo(0,0);
}

function viewProductDetails(vaid) {
    localStorage.setItem('selectedLotVaid', vaid);
    window.location.href = 'product_details.html';
}

function handleSearch() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const searched = allProducts.filter(p => 
        (p.description || '').toLowerCase().includes(term) ||
        (p.sellerCountry || p.seller_country || '').toLowerCase().includes(term)
    );
    displayProducts(searched);
}

// ============================================================================
// DATA LOADING (MOCK FOR NOW)
// ============================================================================

function loadProducts() {
    // Replace this with your actual fetch('/api/lots') call
    allProducts = [
        {
            vaid: 554321,
            description: "High-End GPU Bulk Lot",
            lot_price: 15000,
            number_of_product: 100,
            ordered: 45,
            seller_country: "China",
            destination_country: "USA",
            estimated_date: "2026-05-20",
            img: null // Uint8Array goes here
        }
    ];
    displayProducts(allProducts);
    updateResultCount(allProducts.length);
}
