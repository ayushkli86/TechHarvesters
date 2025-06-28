// Use centralized Firebase configuration
const auth = window.firebaseAuth;
const db = window.firebaseDB;

// Authentication state management
let currentUser = null;

// Check authentication state
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        currentUser = user;
        console.log('User is signed in:', user.email);
        
        // Get user data from database
        db.ref('users/' + user.uid).once('value')
            .then((snapshot) => {
                const userData = snapshot.val();
                console.log('User data from database:', userData);
                if (userData) {
                    // Update localStorage with fresh data
                    localStorage.setItem('userName', userData.name);
                    localStorage.setItem('userEmail', userData.email);
                    localStorage.setItem('userSubscription', JSON.stringify(userData.subscription));
                    
                    // Update UI with user info
                    updateUserUI(userData);
                } else {
                    console.warn('No user data found in database for user:', user.uid);
                }
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    } else {
        // User is signed out
        currentUser = null;
        console.log('User is signed out');
        
        // Clear localStorage
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userSubscription');
        
        // Redirect to login page
        if (window.location.pathname !== '/login.html' && window.location.pathname !== '/register.html') {
            window.location.href = 'login.html';
        }
    }
});

// Update user interface
function updateUserUI(userData) {
    const userNameElement = document.getElementById('user-name');
    const userAvatarElement = document.getElementById('user-avatar');
    const subscriptionStatusElement = document.getElementById('subscription-status');
    const subscriptionExpiryElement = document.getElementById('subscription-expiry');
    
    if (userNameElement) {
        userNameElement.textContent = userData.name;
    }
    
    if (userAvatarElement) {
        userAvatarElement.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=2563eb&color=fff&rounded=true&size=96`;
    }
    
    if (subscriptionStatusElement && userData.subscription) {
        const isActive = new Date(userData.subscription.expiresAt) > new Date();
        subscriptionStatusElement.textContent = isActive ? 'Active' : 'Expired';
        subscriptionStatusElement.className = `px-3 py-1 rounded ${isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} text-sm font-medium`;
    }
    
    if (subscriptionExpiryElement && userData.subscription) {
        const expiryDate = new Date(userData.subscription.expiresAt).toLocaleDateString();
        subscriptionExpiryElement.textContent = expiryDate;
    }
}

// Logout function
function logout() {
    auth.signOut()
        .then(() => {
            console.log('User signed out successfully');
            // Clear localStorage
            localStorage.removeItem('userName');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userSubscription');
            
            // Redirect to login page
            window.location.href = 'login.html';
        })
        .catch((error) => {
            console.error('Error signing out:', error);
        });
}

// Update user subscription
function updateSubscription(userId, subscriptionData) {
    return db.ref('users/' + userId + '/subscription').update(subscriptionData);
}

// Get current user data
function getCurrentUserData() {
    if (!currentUser) return null;
    
    return db.ref('users/' + currentUser.uid).once('value')
        .then((snapshot) => snapshot.val());
}

// Export functions for use in other scripts
window.authUtils = {
    logout: logout,
    updateSubscription: updateSubscription,
    getCurrentUserData: getCurrentUserData,
    currentUser: () => currentUser
}; 