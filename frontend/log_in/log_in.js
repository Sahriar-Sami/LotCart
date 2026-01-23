// --- REDIRECTS ---
document.getElementById("switchToSeller").addEventListener("click", () => {
    window.location.href = "login_seller.html";
});

document.getElementById("switchToWorker").addEventListener("click", () => {
    window.location.href = "login_worker.html";
});

// --- LOGIN VERIFICATION FUNCTION ---
function verifyLogin(id, pass) {
    // This mocks your database table. 
    // In your project, you'd fetch this data from your SQL Server.
    const mockUser = {
        name: "admin",
        email: "admin@lotkart.com",
        password: "123"
    };

    // Checks if the input matches either the name or the email
    if ((id === mockUser.name || id === mockUser.email) && pass === mockUser.password) {
        return 1; // User exists and password is correct
    } else {
        return 0; // Login failed
    }
}

// --- FORM SUBMISSION ---
document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const idValue = document.getElementById("loginIdentifier").value;
    const passValue = document.getElementById("password").value;

    if (verifyLogin(idValue, passValue) === 1) {
        alert("Logged in 🔥");
        window.location.href = "home.html"; // Send them home
    } else {
        alert("Invalid credentials. Try 'admin' and '123'");
    }
});