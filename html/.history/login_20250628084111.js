// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD5AC2ke4Ja1zjqXdGmtUQg77dnLvCI4wk",
    authDomain: "disease-detection-4bc13.firebaseapp.com",
    databaseURL: "https://disease-detection-4bc13-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "disease-detection-4bc13",
    storageBucket: "disease-detection-4bc13.firebasestorage.app",
    messagingSenderId: "860470659315",
    appId: "1:860470659315:web:ce0c2dfa6f59a55ad98f86",
    measurementId: "G-876FZYNZ6L"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// Login form elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');

// Login function
function loginUser(email, password) {
    loginBtn.disabled = true;
    loginBtn.textContent = 'Signing In...';
    
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            
            // Get user data from database
            return db.ref('users/' + user.uid).once('value');
        })
        .then((snapshot) => {
            const userData = snapshot.val();
            
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
                    errorMsg = 'An error occurred. Please try again.';
            }
            errorMessage.textContent = errorMsg;
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
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
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
    
    // Validation checks
    if (!email) {
        errorMessage.textContent = 'Please enter your email.';
        errorMessage.style.display = 'block';
        return false;
    }
    
    if (!password) {
        errorMessage.textContent = 'Please enter your password.';
        errorMessage.style.display = 'block';
        return false;
    }
    
    return true;
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