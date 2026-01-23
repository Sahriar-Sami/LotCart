const togglePassword = document.getElementById("togglePassword");
const passwordField = document.getElementById("workerPassword");

// Password Visibility Toggle
togglePassword.addEventListener("click", () => {
  const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
  passwordField.setAttribute("type", type);
  togglePassword.textContent = type === "password" ? "👁️" : "🙈";
});

// Form Submission
document.getElementById("workerLoginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const loginData = {
    identifier: document.getElementById("workerIdentifier").value,
    password: passwordField.value
  };

  console.log("Attempting Worker Login:", loginData);
  
  // Here you would typically fetch your backend:
  // const response = await fetch('/api/worker-login', { ... });
  
  alert(`Worker Login Attempted for: ${loginData.identifier}`);
});