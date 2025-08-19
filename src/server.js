const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5001;
app.use(cors());

// Mock city-to-coordinates mapping
const cityCoordinates = {
    "New York": { lat: "40.712776", lon: "-74.005974" },
    "London": { lat: "51.507351", lon: "-0.127758" },
    "Tokyo": { lat: "35.689487", lon: "139.691711" },
    "Delhi": { lat: "28.613939", lon: "77.209023" },
    "Sydney": { lat: "-33.868820", lon: "151.209290" }
};

// Function to generate random nearby coordinates
const getNearbyCoordinates = (lat, lon) => ({
    lat: (parseFloat(lat) + (Math.random() * 0.1 - 0.05)).toFixed(6),
    lon: (parseFloat(lon) + (Math.random() * 0.1 - 0.05)).toFixed(6)
});

// Function to generate random weather data
const getMockWeather = () => {
    const descriptions = ["Sunny", "Cloudy", "Rainy", "Snowy", "Windy", "Stormy", "Foggy"];
    return {
        temperature: (Math.random() * 40 - 10).toFixed(1), // Temp between -10°C to 40°C
        weather_description: descriptions[Math.floor(Math.random() * descriptions.length)],
        humidity: Math.floor(Math.random() * 100), // Humidity 0-100%
        wind_speed: (Math.random() * 20).toFixed(1) // Wind speed 0-20 km/h
    };
};

// API Route: Get Mock Weather by City Name
app.get("/weather/:city", (req, res) => {
    const city = req.params.city;
    console.log(`Fetching mock weather for: ${city}`);

    // Simulate delay (1-3 seconds)
    setTimeout(() => {
        if (!cityCoordinates[city]) {
            return res.status(404).json({ error: "City not found" });
        }

        const originalCoords = cityCoordinates[city];
        const mockCoords = getNearbyCoordinates(originalCoords.lat, originalCoords.lon);
        const weather = getMockWeather();

        res.json({
            city,
            original_coordinates: originalCoords,
            mock_coordinates: mockCoords,
            weather
        });
    }, Math.random() * 2000 + 1000); // Delay between 1-3 seconds
});

// Start the server
app.listen(PORT, () => {
    console.log(`🌍 Mock Weather API running at http://localhost:${PORT}`);
});
