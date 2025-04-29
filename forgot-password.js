document.getElementById("forgotPasswordForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const newPassword = document.getElementById("newPassword").value;
    const confirmNewPassword = document.getElementById("confirmNewPassword").value;

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        document.getElementById("emailError").textContent = "Enter a valid email";
        return;
    }

    if (newPassword.length < 6) {
        document.getElementById("newPasswordError").textContent = "New password must be at least 6 characters";
        return;
    }

    if (newPassword !== confirmNewPassword) {
        document.getElementById("confirmNewPasswordError").textContent = "Passwords do not match";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex(u => u.email === email);
    if (userIndex === -1) {
        document.getElementById("emailError").textContent = "Email not found";
        return;
    }

    users[userIndex].eosword = newPassword;
    localStorage.setItem("users", JSON.stringify(users));
    document.getElementById("success").textContent = "Password changed successfully!";
});