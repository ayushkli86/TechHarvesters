// firebase-sensor.js
// 1. Add your Firebase config below
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

// 2. Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// 3. Listen for real-time sensor data (assume path: /sensors/esp32)
db.ref('/sensors/esp32').on('value', (snapshot) => {
    const data = snapshot.val();
    if (!data) return;
    // Update UI elements (IDs must match those in html.html)
    if (data.moisture !== undefined) {
        document.getElementById('moisture-value').textContent = data.moisture + '%';
        document.getElementById('moisture-bar').style.width = data.moisture + '%';
    }
    if (data.temperature !== undefined) {
        document.getElementById('temperature-value').textContent = data.temperature + '°C';
        document.getElementById('temperature-bar').style.width = (data.temperature / 40 * 100) + '%';
    }
    if (data.humidity !== undefined) {
        document.getElementById('humidity-value').textContent = data.humidity + '%';
        document.getElementById('humidity-bar').style.width = data.humidity + '%';
    }
    // Light Intensity: If available
    if (data.light !== undefined) {
        document.getElementById('light-value').textContent = data.light + '%';
        document.getElementById('light-bar').style.width = data.light + '%';
    }
});

// 4. Optionally, handle connection status, errors, etc.
// You can add more logic as needed for your dashboard. 