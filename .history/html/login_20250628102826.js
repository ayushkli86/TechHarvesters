// Wait for DOM and Firebase to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait for Firebase to be initialized
    const checkFirebase = setInterval(() => {
        if (window.firebaseAuth && window.firebaseDB) {
            clearInterval(checkFirebase);
            initializeLogin();
        }
    }, 100);

    // Timeout after 10 seconds
    setTimeout(() => {
        clearInterval(checkFirebase);
        console.error('Firebase initialization timeout');
        showError('Firebase initialization failed. Please refresh the page.');
    }, 10000);
});

function initializeLogin() {
    // Use centralized Firebase configuration
    const auth = window.firebaseAuth;
    const db = window.firebaseDB;

    // Login form elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    // Check if elements exist
    if (!loginForm || !emailInput || !passwordInput || !loginBtn || !errorMessage || !successMessage) {
        console.error('Required DOM elements not found');
        return;
    }

    // Login function
    function loginUser(email, password) {
        loginBtn.disabled = true;
        loginBtn.textContent = 'Signing In...';
        
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User logged in successfully:', user.uid);
                
                // Get user data from database
                return db.ref('users/' + user.uid).once('value');
            })
            .then((snapshot) => {
                const userData = snapshot.val();
                console.log('User data retrieved:', userData);
                
                if (userData) {
                    // Update user data with login information
                    const updatedUserData = {
                        ...userData,
                        lastLoginAt: new Date().toISOString(),
                        loginCount: (userData.loginCount || 0) + 1,
                        lastActiveAt: new Date().toISOString()
                    };
                    
                    // Update the database with new login information
                    return db.ref('users/' + auth.currentUser.uid).update({
                        lastLoginAt: updatedUserData.lastLoginAt,
                        loginCount: updatedUserData.loginCount,
                        lastActiveAt: updatedUserData.lastActiveAt
                    }).then(() => {
                        console.log('User login data updated in database');
                        return updatedUserData;
                    });
                } else {
                    console.warn('No user data found in database for user:', user.uid);
                    return userData;
                }
            })
            .then((userData) => {
                if (userData) {
                    // Store user info in localStorage
                    localStorage.setItem('userName', userData.name);
                    localStorage.setItem('userEmail', userData.email);
                    localStorage.setItem('userSubscription', JSON.stringify(userData.subscription));
                }
                
                successMessage.textContent = 'Login successful! Redirecting...';
                successMessage.style.display = 'block';
                errorMessage.style.display = 'none';
                
                // Redirect to dashboard after 1 second
                setTimeout(() => {
                    window.location.href = 'html.html';
                }, 1000);
            })
            .catch((error) => {
                console.error('Login error:', error);
                let errorMsg = '';
                switch (error.code) {
                    case 'auth/user-not-found':
                        errorMsg = 'No account found with this email address.';
                        break;
                    case 'auth/wrong-password':
                        errorMsg = 'Incorrect password. Please try again.';
                        break;
                    case 'auth/invalid-email':
                        errorMsg = 'Please enter a valid email address.';
                        break;
                    case 'auth/user-disabled':
                        errorMsg = 'This account has been disabled.';
                        break;
                    default:
                        errorMsg = 'An error occurred. Please try again. Error: ' + error.message;
                }
                showError(errorMsg);
            })
            .finally(() => {
                loginBtn.disabled = false;
                loginBtn.textContent = 'Login';
            });
    }

    // Form validation
    function validateLoginForm() {
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        // Reset error messages
        hideMessages();
        
        // Validation checks
        if (!email) {
            showError('Please enter your email.');
            return false;
        }
        
        if (!password) {
            showError('Please enter your password.');
            return false;
        }
        
        return true;
    }

    // Helper functions
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
    }

    function hideMessages() {
        errorMessage.style.display = 'none';
        successMessage.style.display = 'none';
    }

    // Event listeners
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateLoginForm()) {
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            
            loginUser(email, password);
        }
    });

    // Check if user is already logged in
    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is already logged in, redirect to dashboard
            window.location.href = 'html.html';
        }
    });
} 