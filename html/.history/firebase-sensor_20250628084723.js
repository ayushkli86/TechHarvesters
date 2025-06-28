// firebase-sensor.js
// Use centralized Firebase configuration
const db = window.firebaseDB;

// Listen for real-time sensor data (assume path: /sensors/esp32)
db.ref('/sensors/esp32').on('value', (snapshot) => {
    const data = snapshot.val();
    if (!data) return;
    
    console.log('Received sensor data:', data);
    
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

// Handle connection status
db.ref('.info/connected').on('value', (snapshot) => {
    const connected = snapshot.val();
    console.log('Firebase connection status:', connected ? 'Connected' : 'Disconnected');
}); 