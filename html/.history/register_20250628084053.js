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

// Registration form elements
const registerForm = document.getElementById('registerForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const nameInput = document.getElementById('name');
const registerBtn = document.getElementById('registerBtn');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');

// Registration function
function registerUser(email, password, name) {
    registerBtn.disabled = true;
    registerBtn.textContent = 'Creating Account...';
    
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            
            // Save additional user data to database
            return db.ref('users/' + user.uid).set({
                name: name,
                email: email,
                createdAt: new Date().toISOString(),
                subscription: {
                    status: 'free',
                    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days free trial
                }
            });
        })
        .then(() => {
            successMessage.textContent = 'Account created successfully! Redirecting...';
            successMessage.style.display = 'block';
            errorMessage.style.display = 'none';
            
            // Store user info in localStorage
            localStorage.setItem('userName', name);
            localStorage.setItem('userEmail', email);
            
            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                window.location.href = 'html.html';
            }, 2000);
        })
        .catch((error) => {
            let errorMsg = '';
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMsg = 'Email is already registered. Please use a different email.';
                    break;
                case 'auth/invalid-email':
                    errorMsg = 'Please enter a valid email address.';
                    break;
                case 'auth/weak-password':
                    errorMsg = 'Password should be at least 6 characters long.';
                    break;
                default:
                    errorMsg = 'An error occurred. Please try again.';
            }
            errorMessage.textContent = errorMsg;
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
        })
        .finally(() => {
            registerBtn.disabled = false;
            registerBtn.textContent = 'Register';
        });
}

// Form validation
function validateForm() {
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const name = nameInput.value.trim();
    
    // Reset error messages
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
    
    // Validation checks
    if (!name) {
        errorMessage.textContent = 'Please enter your name.';
        errorMessage.style.display = 'block';
        return false;
    }
    
    if (!email) {
        errorMessage.textContent = 'Please enter your email.';
        errorMessage.style.display = 'block';
        return false;
    }
    
    if (!password) {
        errorMessage.textContent = 'Please enter a password.';
        errorMessage.style.display = 'block';
        return false;
    }
    
    if (password.length < 6) {
        errorMessage.textContent = 'Password must be at least 6 characters long.';
        errorMessage.style.display = 'block';
        return false;
    }
    
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match.';
        errorMessage.style.display = 'block';
        return false;
    }
    
    return true;
}

// Event listeners
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const name = nameInput.value.trim();
        
        registerUser(email, password, name);
    }
});

// Real-time password validation
confirmPasswordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (confirmPassword && password !== confirmPassword) {
        confirmPasswordInput.style.borderColor = '#ef4444';
    } else {
        confirmPasswordInput.style.borderColor = '#10b981';
    }
});

// Check if user is already logged in
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is already logged in, redirect to dashboard
        window.location.href = 'html.html';
    }
});