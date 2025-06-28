# TechHarvesters
# 🌾 Tech Harvesters - Precision Farming Dashboard

An interactive, real-time dashboard built for precision agriculture using ESP32, IoT sensors, AI-based disease detection, and GIS-based field analysis. This system enables smarter decisions in irrigation, disease prevention, and crop yield forecasting.

## 🚀 Features

- 📍 *Field Overview Panel*  
  View total area, crop type, growth stage, and pesticide usage.

- 📡 *IoT Node Status*  
  Live connectivity status for Irrigation Node, Drone Node, and Sensor Node.

- 🌱 *Real-Time Sensor Data*  
  Monitors:
  - Soil Moisture
  - Temperature
  - Humidity
  - Light Intensity(no module)

- 🤖 *AI-Based Predictive Analytics*  
  Disease risk prediction for:
  - 🥔 Potato (e.g., Late Blight,late Blight,healthy,)
  - 🍅 Tomato (e.g., Early Blight,late Blight,healthy)  
  Plus:
  - Water requirement suggestions
  - Yield estimations

- 🧠 *AI Model Training Insights*  
  Displays training and validation accuracy/loss of ML models for disease detection.

- 🗺 *GIS-Based Field Analysis*  
  Interactive map showing:
  - Soil variability
  - Crop zones
  - Segmentation by health zones
  -recommendation of crops

- 💬 *Chatbot + AI Image Detector*  
  - AI-powered chatbot for plant disease Q&A  
  - Upload leaf images for disease diagnosis using AI

## 🛠 Built With

- *HTML/CSS + TailwindCSS* – Responsive UI Design  
- *JavaScript* – Dynamic sensor updates & interaction  
- *Firebase* – Real-time database (for sensor data)  
- *Leaflet.js* – GIS-based mapping  
- *AI Models* – Image-based disease detection using ML  

tech-harvesters-dashboard/
│
├── index.html                        # Main HTML file (Precision Farming Dashboard UI)
├── style.css                         # Optional: Custom Tailwind overrides (can extract from <style> tag in HTML)
├── script.js                         # Optional: Custom JS logic (can extract from inline script)
│
├── assets/                           # Static assets
│   ├── images/                       # Crop images, avatars, illustrations
│   └── icons/                        # FontAwesome icons or custom SVGs
│
├── libs/                             # External libraries (via CDN or local)
│   ├── tailwindcss/                  # Tailwind CSS (via CDN)
│   ├── leaflet/                      # Leaflet.js for GIS maps
│   └── momentjs/                     # Moment.js for time formatting
│
├── firebase/                         # Firebase configuration
│   ├── firebase-app.js               # Firebase app initialization
│   └── firebase-database.js         # Realtime database configuration
│
├── components/                       # Modular JS components
│   ├── chatbot.js                    # Smart Chatbot logic
│   ├── ai-modules.js                # AI disease detection (image upload, prediction logic)
│   └── predictive-analytics.js      # Simulated prediction logic & sensor updates
│
├── data/                             # Data resources
│   ├── sensor_data.csv              # Downloadable sensor readings
│   ├── crop_recommendation.csv      # Crop advice or fertilizer schedules
│   ├── potato_leaf_dataset.csv      # Potato leaf classification data
│   ├── tomato_leaf_dataset.csv      # Tomato leaf classification data
│   └── farmer_disease_qa_10000.csv  # Q&A dataset for chatbot training
│
└── README.md                         # Project description, features, and setup guide


