// --- REDIRECTS ---
document.getElementById("switchToUser").addEventListener("click", () => {
    window.location.href = "log_in.html";
});

// --- SELLER LOGIN VERIFICATION ---
function verifySellerLogin(id, pass) {
    // This mocks your 'Sellers' table in SQL
    const mockSeller = {
        name: "seller1",
        email: "seller@lotkart.com",
        password: "456"
    };

    if ((id === mockSeller.name || id === mockSeller.email) && pass === mockSeller.password) {
        return 1; // Success
    } else {
        return 0; // Fail
    }
}

// --- FORM SUBMISSION ---
document.getElementById("sellerLoginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const idValue = document.getElementById("sellerIdentifier").value;
    const passValue = document.getElementById("sellerPassword").value;

    if (verifySellerLogin(idValue, passValue) === 1) {
        alert("Seller Login Successful! 🔥");
        // Redirect to wherever sellers manage their lots
        window.location.href = "home.html"; 
    } else {
        alert("Invalid Seller credentials. Try 'seller1' and '456'");
    }
});