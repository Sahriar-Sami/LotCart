// Placeholder for your name check logic
function nameCheck(name) {
    console.log("Checking name availability for:", name);
    // You will complete this later. Returning 1 (true) for now.
    return 1; 
}

// Toggle Password Visibility
const toggle = document.getElementById("togglePassword");
const passwordInput = document.getElementById("userPass");
const rePasswordInput = document.getElementById("rePassword");

toggle.addEventListener("click", () => {
    const type = rePasswordInput.type === "password" ? "text" : "password";
    rePasswordInput.type = type;
    passwordInput.type = type; // Keep both in sync
});

// Form Submission & Validation
document.getElementById("signupForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const pass = document.getElementById("userPass").value;
    const rePass = document.getElementById("rePassword").value;
    const nameValue = document.getElementById("userName").value;

    // 1. Check if passwords match
    if (pass !== rePass) {
        alert("Passwords do not match! Try again.");
        return;
    }

    // 2. Check name using your function
    if (nameCheck(nameValue) === 1) {
        
        // 3. Create the Database-ready object
        const userData = {
            name: nameValue,
            email: document.getElementById("userEmail").value,
            phoneNumber: document.getElementById("userPhone").value,
            bankAccount: parseInt(document.getElementById("userBank").value), // basic int
            address: document.getElementById("userAddress").value,
            password: pass,
            amount: parseFloat(document.getElementById("userAmount").value),
            timestamp: new Date().toISOString()
        };

        console.log("Data ready for SQL Database:", userData);
        alert("Account verified and ready for database 🚀");
        
        // Next step: fetch('/api/signup', { method: 'POST', body: JSON.stringify(userData) });
    } else {
        alert("This name is already taken or invalid.");
    }
});