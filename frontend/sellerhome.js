let allSellerLots = [];
let currentPage = 1;
const itemsPerPage = 8;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Load
    fetchMyLots();
    
    // 2. Search Event
    document.getElementById('searchInput').addEventListener('input', (e) => {
        handleSearch(e.target.value);
    });
});

async function fetchMyLots() {
    // MOCK DATA: Replace with fetch('api/seller/lots') later
    allSellerLots = [
        {
            vaid: 101,
            description: "Mechanical Keyboards Bulk",
            lot_price: 5000,
            number_of_product: 50,
            ordered: 12,
            seller_country: "China",
            destination_country: "USA",
            img: null
        },
        {
            vaid: 102,
            description: "USB-C Cables Lot",
            lot_price: 1200,
            number_of_product: 200,
            ordered: 180,
            seller_country: "Vietnam",
            destination_country: "UK",
            img: null
        }
    ];
    renderGrid(allSellerLots);
}

function renderGrid(data) {
    const container = document.getElementById('productsContainer');
    container.innerHTML = "";
    
    document.getElementById('resultCount').innerText = `${data.length} lots found`;

    if (data.length === 0) {
        container.innerHTML = "<p>No listings found.</p>";
        return;
    }

    data.forEach(item => {
        const unitPrice = item.lot_price / item.number_of_product;
        
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => {
            localStorage.setItem('selectedLotVaid', item.vaid);
            window.location.href = "product_details.html";
        };

        card.innerHTML = `
            <div class="img-box">
                <img src="placeholder.jpg" class="product-img">
            </div>
            <div class="card-body">
                <p class="title">${item.description}</p>
                <p class="ordered-count">Orders: ${item.ordered}/${item.number_of_product}</p>
                <p class="price">$${unitPrice.toFixed(2)} <small style="font-size: 12px; color: #888;">ea</small></p>
            </div>
        `;
        container.appendChild(card);
    });
}

function handleSearch(term) {
    const filtered = allSellerLots.filter(l => 
        l.description.toLowerCase().includes(term.toLowerCase())
    );
    renderGrid(filtered);
}