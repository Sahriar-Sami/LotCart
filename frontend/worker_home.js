// ============================================================================
// 1. STATE & SECTION MANAGEMENT
// ============================================================================

const sections = {
    posts: document.getElementById('postSection'),
    trans: document.getElementById('transSection'),
    cancels: document.getElementById('cancelSection')
};

const buttons = {
    posts: document.getElementById('btnPosts'),
    trans: document.getElementById('btnTrans'),
    cancels: document.getElementById('btnCancels')
};

function switchSection(target) {
    // Hide all sections and remove active states
    Object.values(sections).forEach(s => s.classList.add('hidden'));
    Object.values(buttons).forEach(b => b.classList.remove('active'));

    // Show selected
    sections[target].classList.remove('hidden');
    buttons[target].classList.add('active');
}

// ============================================================================
// 2. IMAGE UTILITY (Varbinary to Image URL)
// ============================================================================

function getImageUrl(varbinaryData) {
    if (!varbinaryData) return 'placeholder.png'; // Fallback image
    
    try {
        // Convert SQL Varbinary (Uint8Array) to a browser-readable Blob
        const blob = new Blob([new Uint8Array(varbinaryData)], { type: 'image/jpeg' });
        return URL.createObjectURL(blob);
    } catch (e) {
        console.error("Image conversion error:", e);
        return 'placeholder.png';
    }
}

// ============================================================================
// 3. DATA LOADING FUNCTIONS
// ============================================================================

// --- SECTION 1: SELL POSTS (Cards) ---
async function loadSellPosts() {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '<p>Loading database posts...</p>';

    // MOCK DATA structure based on your database
    const mockPostsFromDB = [
        {
            vaid: 554321,
            description: "High-End GPU Bulk Lot",
            lot_price: 15000,
            number_of_product: 100,
            ordered: 45,
            seller_country: "China",
            destination_country: "USA",
            img: null // This would be the varbinary array
        }
    ];

    container.innerHTML = ''; 
    mockPostsFromDB.forEach(product => {
        const unitPrice = (product.lot_price / product.number_of_product).toFixed(2);
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="img-box">
                <img src="${getImageUrl(product.img)}" class="product-img">
            </div>
            <div class="card-body">
                <p class="title">${product.description}</p>
                <p class="ordered-count">Progress: <b>${product.ordered} / ${product.number_of_product}</b></p>
                <p class="location">📍 ${product.seller_country} → ${product.destination_country}</p>
                <p class="price">$${unitPrice} <small>per item</small></p>
                <p style="font-size:10px; color: #ff2f6d; margin-top:5px;">VAID: ${product.vaid}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// --- SECTION 2: TRANSACTION HISTORY (Table) ---
// Attributes: transactionid, adminaccount, transactiondate, amount, vaid, buyername, product_sl
async function loadTransactions() {
    const tbody = document.getElementById('transTableBody');
    tbody.innerHTML = '<tr><td colspan="7">Fetching transactions...</td></tr>';

    const mockTrans = [
        { tid: 101, admin: 9988, date: '2026-01-20', amt: 1500, vaid: 554321, bName: 'Siam', pSL: 9001 }
    ];

    tbody.innerHTML = mockTrans.map(t => `
        <tr>
            <td>#${t.tid}</td>
            <td>${t.admin}</td>
            <td>${t.date}</td>
            <td style="color: #4ade80; font-weight: bold;">$${t.amt}</td>
            <td>${t.vaid}</td>
            <td>${t.bName}</td>
            <td>${t.pSL}</td>
        </tr>
    `).join('');
}

// --- SECTION 3: CANCEL HISTORY (Table) ---
// Attributes: cancelid, returnedamount, leverage, transactionid
async function loadCancels() {
    const tbody = document.getElementById('cancelTableBody');
    tbody.innerHTML = '<tr><td colspan="4">Fetching cancellations...</td></tr>';

    const mockCancels = [
        { cid: 4001, ret: 1400, lev: 5, tid: 101 }
    ];

    tbody.innerHTML = mockCancels.map(c => `
        <tr>
            <td>#${c.cid}</td>
            <td style="color: #ff6b6b; font-weight: bold;">$${c.ret}</td>
            <td>${c.lev}x</td>
            <td>#${c.tid}</td>
        </tr>
    `).join('');
}

// ============================================================================
// 4. EVENT LISTENERS
// ============================================================================

buttons.posts.addEventListener('click', () => {
    switchSection('posts');
    loadSellPosts();
});

buttons.trans.addEventListener('click', () => {
    switchSection('trans');
    loadTransactions();
});

buttons.cancels.addEventListener('click', () => {
    switchSection('cancels');
    loadCancels();
});

// INITIAL LOAD
document.addEventListener('DOMContentLoaded', () => {
    switchSection('posts');
    loadSellPosts();
});