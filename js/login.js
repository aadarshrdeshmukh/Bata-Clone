// Add event listener to the login form for the submit event
document.getElementById("loginForm").addEventListener("submit", function (e) {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Get references to the input fields and error message elements
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    // Initialize a flag to track form validity
    let valid = true;

    // Trim whitespace from input values
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    // Regex for validating email or 10-digit mobile number
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$|^\d{10}$/;

    // Clear previous error messages
    emailError.textContent = "";
    passwordError.textContent = "";

    // Validate email or mobile number
    if (!emailRegex.test(emailValue)) {
        // Display error message if validation fails
        emailError.textContent = "Please enter a valid email or 10-digit mobile number.";
        valid = false;
    }

    // Validate password length
    if (passwordValue.length < 6) {
        // Display error message if validation fails
        passwordError.textContent = "Password must be at least 6 characters long.";
        valid = false;
    }

    // If all validations pass
    if (valid) {
        alert("Login successful!"); // Placeholder for actual login logic
        // You can also submit form using AJAX here if needed
    }
}); 