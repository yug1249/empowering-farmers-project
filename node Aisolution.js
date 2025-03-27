
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// In-memory storage for demo purposes
let sensorData = [];
let droneData = [];

// Step 1: Endpoint to collect soil sensor data
app.post('/api/sensor-data', (req, res) => {
    const { section, moistureLevel } = req.body;
    sensorData.push({ section, moistureLevel });
    console.log('Soil Sensor Data Received:', req.body);
    res.status(200).send('Soil sensor data saved successfully');
});

// Step 2: Endpoint to collect drone analysis data
app.post('/api/drone-data', (req, res) => {
    const { section, stressDetected } = req.body;
    droneData.push({ section, stressDetected });
    console.log('Drone Data Received:', req.body);
    res.status(200).send('Drone data saved successfully');
});

// Step 3: AI logic to recommend irrigation actions
app.get('/api/recommendations', (req, res) => {
    let recommendations = sensorData.map((data) => {
        const droneInfo = droneData.find(d => d.section === data.section);
        if (data.moistureLevel < 20 || (droneInfo && droneInfo.stressDetected)) {
            return { section: data.section, action: 'Irrigate' };
        } else {
            return { section: data.section, action: 'No Action Needed' };
        }
    });
    res.status(200).json(recommendations);
});

// Step 4: Endpoint to trigger irrigation (simulated)
app.post('/api/irrigate', (req, res) => {
    const { sections } = req.body; // Array of sections to irrigate
    console.log('Irrigation Activated for Sections:', sections);
    res.status(200).send(`Irrigation activated for sections: ${sections.join(', ')}`);
});

// Step 5: Continuous Monitoring (placeholder endpoint)
app.get('/api/monitor', (req, res) => {
    res.status(200).send('Monitoring plant growth...');
});

// Optional: Serve an HTML file
app.get('/', (req, res) => {
    fs.readFile('index.html', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error loading the file.');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Precision Agriculture Backend running on http://localhost:${PORT}`);
});
