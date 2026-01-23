// Function to check if seller name is valid/available
function namecheckseller(name) {
    // You will complete the actual logic later
    // Returning 1 (success) for now
    return 1; 
}

document.getElementById("signupForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("sellerName").value;
    const homeCountry = document.getElementById("homeCountry").value;
  
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    const rePass = document.getElementById("rePassword").value;
    const description = document.getElementById("description").value || "";

    // 1. Confirm Password Check
    if (pass !== rePass) {
        alert("Passwords do not match!");
        return;
    }

    // 2. Name Check Function
    if (namecheckseller(name) === 1) {
        
        // 3. Create the Database Object
        const sellerData = {
            name: name,
            homecountry: homeCountry,
            bankaccount: bankAccount, // Basic int
            email: email,
            password: pass,
            membershipdate: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
            description: description // Optional
        };

        console.log("Seller Object ready for database:", sellerData);
        alert("Seller account created successfully! 🚀");

        // Next step: Send sellerData to your backend
    } else {
        alert("Seller name check failed.");
    }
});