// This data comes from your database
const dbData = {
    orderid: 33,
    name: "Rtx 3090",
    ordered: 88,
    quantity: 99,
    price: 75,
    vaid: 11
};

let currentQty = 1;

function initPage() {
    document.getElementById("displayProgressText").innerText = `${dbData.ordered}/${dbData.quantity}`;
    const percentage = (dbData.ordered / dbData.quantity) * 100;
    document.getElementById("progressFill").style.width = percentage + "%";
    document.getElementById("displayProductName").innerText = dbData.name;
    updatePrice();
}

function changeQty(val) {
    currentQty += val;
    if (currentQty < 1) currentQty = 1;
    document.getElementById("qty").innerText = currentQty;
    updatePrice();
}

function updatePrice() {
    const productTotal = currentQty * dbData.price;
    const totalWithFees = productTotal + 3; // +3 for leverage/shipping
    
    document.getElementById("productCost").innerText = `$${productTotal}`;
    document.getElementById("total").innerText = `$${totalWithFees}`;
}

// --- NEW CHECKOUT LOGIC ---
// --- UPDATED CHECKOUT LOGIC ---
document.getElementById("checkoutBtn").addEventListener("click", function() {
    // 1. Get the final amount from the screen (stripping the '$')
    const totalAmount = parseFloat(document.getElementById("total").innerText.replace('$', ''));
    
    // 2. Generate random 6-digit verification key
    const vKey = Math.floor(100000 + Math.random() * 900000);

    // 3. Create the Database Object
    const orderObject = {
        productid: dbData.orderid,
        buyername: localStorage.getItem("currentUser") || "Guest", // Using the session we talked about
        buyeraddress: "User Address", 
        verificationkey: vKey,
        vaid: dbData.vaid,
        amount: totalAmount,
        numbersofproduct: currentQty // <--- This is the value you selected
    };

    console.log("Checkout Object Created:", orderObject);
    alert(`Order Placed! Your Verification Key is: ${vKey}`);
});
initPage();