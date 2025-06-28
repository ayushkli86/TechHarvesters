// firebase-sensor.js
// 1. Add your Firebase config below
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
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