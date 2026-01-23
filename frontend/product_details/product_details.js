document.getElementById('orderBtn').addEventListener('click', function() {
    window.location.href = 'confirm_order.html';
});

// This function simulates receiving data from your database
function loadProductDetails(data) {
    // 1. Text Data
    document.getElementById('displayDescription').innerText = data.description;
    document.getElementById('displayPrice').innerText = data.totalPrice;
    document.getElementById('displayDate').innerText = data.estimatedDate;
    document.getElementById('displaySeller').innerText = data.sellerName;
    document.getElementById('displayVerified').innerText = data.verified;
    document.getElementById('displayVaid').innerText = data.vaid;
    
    // 2. Progress Logic (Ordered / Quantity)
    document.getElementById('displayOrdered').innerText = data.ordered;
    document.getElementById('displayQuantity').innerText = data.quantity;
    
    // Calculate percentage for progress bar
    const percentage = (data.ordered / data.quantity) * 100;
    document.getElementById('progressFill').style.width = percentage + "%";

    // 3. Image Logic
    if (data.img) {
        // If data.img is Varbinary (Uint8Array), convert it to a URL
        const blob = new Blob([data.img], { type: 'image/jpeg' });
        document.getElementById('displayImg').src = URL.createObjectURL(blob);
    }
}

// EXAMPLE: How the data looks when it comes from the DB
const sampleData = {
    quantity: 100,
    totalPrice: 5000,
    estimatedDate: "2026-05-20",
    sellerName: "TechWholesale_BD",
    verified: "no",
    vaid: 554321,
    ordered: 45,
    description: "Bulk order of high-quality mechanical switches",
    img: null // This would be your byte array
};

// Initialize the page with the data
loadProductDetails(sampleData);