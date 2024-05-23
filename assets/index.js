document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const responseMessage = document.getElementById('response-message');
    const loginSection = document.getElementById('login-section');
    const registerSection = document.getElementById('register-section');
    const errorMessage = document.getElementById('error-message');


    // Add event listener for login form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // const url = 'http://localhost:8082/auth/login'; // dev server
        const url = 'http://3.214.251.68:8082/auth/login'; // prod server
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('jwtToken', data.jwtToken);
            localStorage.setItem('username', data.username);
            window.location.href = "blogs.html"; // Redirect to blog page after successful login
        } else {
            responseMessage.textContent = `Error: ${data.message || 'Invalid credentials'}`;
        }
    });

    // Add event listener for registration form submission
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const about = document.getElementById('reg-about').value;


        // const url = 'http://localhost:8082/auth/register'; // dev server
        const url = 'http://3.214.251.68:8082/auth/register'; // prod server
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, about })
        });

        const data = await response.json();

        if (response.ok) {
            responseMessage.textContent = 'Registration successful!';
        } else {
            responseMessage.textContent = `Error: ${data.message || 'Something went wrong'}`;
        }
    });

    // Add event listener for showing registration form
    const showSignupLink = document.getElementById('show-signup');
    showSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        toggleForms(registerSection, loginSection);
    });

    // Add event listener for showing login form
    const showLoginLink = document.getElementById('show-login');
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        toggleForms(loginSection, registerSection);
    });

    // Function to toggle between login and registration forms
    function toggleForms(show, hide) {
        hide.style.display = 'none';
        show.style.display = 'block';
    }
    // Function to display error message
    function showErrorMessage(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
    // Check if there is an error message in the URL query params
    const urlParams = new URLSearchParams(window.location.search);
    const errorMessageParam = urlParams.get('error');
    if (errorMessageParam) {
        showErrorMessage(errorMessageParam);
    }
});
