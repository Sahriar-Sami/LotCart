// Example of the object you fetch from the database
let myOrders = [
    { productid: "GPU-99", verificationkey: "KEY-123", vaid: 554321, amount: 303 },
    { productid: "KBD-44", verificationkey: "KEY-999", vaid: 112233, amount: 85 }
];

const LEVERAGE_PENALTY = 2;

function loadOrders() {
    const tableBody = document.getElementById('orderList');
    tableBody.innerHTML = "";

    myOrders.forEach((order, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.productid}</td>
            <td>${order.vaid}</td>
            <td>$${order.amount}</td>
            <td><code>${order.verificationkey}</code></td>
            <td>
                <button class="cancel-btn" onclick="processCancellation(${index})">Cancel Order</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to generate the Transaction ID (Placeholder)
function calculateTransactionId() {
    // Empty function as requested for your custom logic
    return ""; 
}

// Function to update the user's balance in the UI/Database
function updateUserBalance(refundAmount) {
    // This function is empty for your custom balance logic
    // Usually: currentBalance += refundAmount
}

function processCancellation(index) {
    const originalOrder = myOrders[index];
    const LEVERAGE_PENALTY = 2;

    // Create the 'canceled' object
    const canceled = {
        cancelid: Math.floor(100000 + Math.random() * 900000),
        returnedamount: originalOrder.amount - LEVERAGE_PENALTY,
        leverage: LEVERAGE_PENALTY,
        buyeraccount: 0, 
        transactionid: calculateTransactionId(),
        vaid: originalOrder.vaid
    };

    // Invoke the balance update function
    updateUserBalance(canceled.returnedamount);

    console.log("Cancellation Processed. Balance Update Invoked:", canceled);
    alert(`Order Canceled. $${canceled.returnedamount} has been added back to your balance.`);
    
    // Refresh the UI or send to DB
}

document.addEventListener('DOMContentLoaded', loadOrders);