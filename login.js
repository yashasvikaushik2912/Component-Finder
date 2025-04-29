document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const loginError = document.getElementById("loginError");

    emailError.textContent = "";
    passwordError.textContent = "";
    loginError.textContent = "";

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        emailError.textContent = "Enter a valid email (e.g., user@domain.com)";
        return;
    }

    if (password.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        loginError.textContent = "Invalid email or password";
        return;
    }

    localStorage.setItem("name", user.name);
    localStorage.setItem("email", user.email);
    window.location.href = "index.html";
});