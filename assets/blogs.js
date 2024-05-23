document.addEventListener('DOMContentLoaded', () => {
    const welcomeUsername = document.getElementById('welcome-username');
    const logoutButton = document.getElementById('logout-button');

    // Add event listener for logout button
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('username');
        window.location.href = 'index.html'; // Redirect to the landing page after logout
    });

    // Function to display the username in the welcome message
    function showAuthenticatedContent() {
        const username = localStorage.getItem('username');
        welcomeUsername.textContent = username;
    }

    // Check if user is already authenticated
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
        // User is authenticated, so show the content
        showAuthenticatedContent();
    } else {
        // User is not authenticated, so redirect to the login page
        window.location.href = 'index.html';
    }
});
