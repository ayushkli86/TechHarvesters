// Firebase configuration - Centralized config file
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

// Initialize Firebase only once with error handling
try {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        console.log('Firebase initialized successfully');
    } else {
        console.log('Firebase already initialized');
    }
} catch (error) {
    console.error('Firebase initialization error:', error);
}

// Export Firebase services with error handling
let auth, db;
try {
    auth = firebase.auth();
    db = firebase.database();
    console.log('Firebase services initialized');
} catch (error) {
    console.error('Firebase services initialization error:', error);
}

// Export for use in other scripts
window.firebaseAuth = auth;
window.firebaseDB = db;

// Add a global function to check if Firebase is ready
window.isFirebaseReady = function() {
    return !!(window.firebaseAuth && window.firebaseDB);
}; 