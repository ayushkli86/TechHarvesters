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

// Initialize Firebase only once
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Export Firebase services
const auth = firebase.auth();
const db = firebase.database();

// Export for use in other scripts
window.firebaseAuth = auth;
window.firebaseDB = db; 