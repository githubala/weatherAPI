const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 6000;

app.use(cors());

// Weather API: Returns mock weather based on latitude & longitude
app.get("/weather/:lat/:lon", (req, res) => {
  const { lat, lon } = req.params;
  console.log(`Fetching weather for coordinates: ${lat}, ${lon}`);

  // Simulate API delay (2 seconds)
  setTimeout(() => {
    res.json({
      latitude: lat,
      longitude: lon,
      temperature: `${Math.floor(Math.random() * 10) + 25}°C`, // Random temp
      condition: ["Sunny", "Cloudy", "Rainy", "Windy"][Math.floor(Math.random() * 4)]
    });
  }, 2000);
});

app.listen(PORT, () => console.log(`Weather API running at http://localhost:${PORT}`));
