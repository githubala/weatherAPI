const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

// Mock city data
const cities = {
  Mumbai: { lat: 19.076, lon: 72.8777 },
  Delhi: { lat: 28.6139, lon: 77.209 },
  Bengaluru: [
    {
      "place": "MG Road",
      "latitude": 12.9752,
      "longitude": 77.6050
    },
    {
      "place": "Whitefield",
      "latitude": 12.9698,
      "longitude": 77.7499
    },
    {
      "place": "Electronic City",
      "latitude": 12.8393,
      "longitude": 77.6770
    },
    {
      "place": "Koramangala",
      "latitude": 12.9352,
      "longitude": 77.6245
    },
    {
      "place": "Indiranagar",
      "latitude": 12.9716,
      "longitude": 77.6412
    },
    {
      "place": "Majestic (KSR Bengaluru Railway Station)",
      "latitude": 12.9784,
      "longitude": 77.5721
    },
    {
      "place": "Hebbal",
      "latitude": 13.0352,
      "longitude": 77.5912
    },
    {
      "place": "Yeshwanthpur",
      "latitude": 13.0285,
      "longitude": 77.5408
    },
    {
      "place": "Bangalore Airport",
      "latitude": 13.1986,
      "longitude": 77.7066
    },
    {
      "place": "Jayanagar",
      "latitude": 12.9250,
      "longitude": 77.5938
    }
  ]
  ,
  Hyderabad: [
    {
      "place": "Charminar",
      "latitude": 17.3616,
      "longitude": 78.4747
    },
    {
      "place": "Gachibowli",
      "latitude": 17.4422,
      "longitude": 78.3483
    },
    {
      "place": "HITEC City",
      "latitude": 17.4498,
      "longitude": 78.3829
    },
    {
      "place": "Banjara Hills",
      "latitude": 17.4125,
      "longitude": 78.4429
    },
    {
      "place": "Jubilee Hills",
      "latitude": 17.4239,
      "longitude": 78.4072
    },
    {
      "place": "Secunderabad Railway Station",
      "latitude": 17.4399,
      "longitude": 78.4983
    },
    {
      "place": "Rajiv Gandhi Intl Airport",
      "latitude": 17.2403,
      "longitude": 78.4294
    },
    {
      "place": "Mehdipatnam",
      "latitude": 17.3846,
      "longitude": 78.4405
    },
    {
      "place": "Kukatpally",
      "latitude": 17.4942,
      "longitude": 78.3996
    },
    {
      "place": "LB Nagar",
      "latitude": 17.3500,
      "longitude": 78.5160
    }
  ],
  Ahmedabad: { lat: 23.0225, lon: 72.5714 },
  Chennai: [
    {
      "place": "Marina Beach",
      "latitude": 13.0500,
      "longitude": 80.2824
    },
    {
      "place": "Chennai Central Railway Station",
      "latitude": 13.0820,
      "longitude": 80.2757
    },
    {
      "place": "T Nagar",
      "latitude": 13.0425,
      "longitude": 80.2337
    },
    {
      "place": "Guindy",
      "latitude": 13.0083,
      "longitude": 80.2201
    },
    {
      "place": "Velachery",
      "latitude": 12.9756,
      "longitude": 80.2214
    },
    {
      "place": "Adyar",
      "latitude": 13.0064,
      "longitude": 80.2570
    },
    {
      "place": "Tambaram",
      "latitude": 12.9229,
      "longitude": 80.1270
    },
    {
      "place": "Anna Nagar",
      "latitude": 13.0879,
      "longitude": 80.2105
    },
    {
      "place": "Perambur",
      "latitude": 13.1176,
      "longitude": 80.2289
    },
    {
      "place": "Chennai Airport",
      "latitude": 12.9941,
      "longitude": 80.1709
    }
  ]
};

// Geocoding API: Returns latitude & longitude based on city name
app.get("/geo/:city", (req, res) => {
  const city = req.params.city;
  console.log(`Fetching coordinates for: ${city}`);

  const cityData = cities[city]

  if (!cityData) {
    return res.status(404).json({ error: "City not found in mock data" });
  }

  // If the cityData is an array (multiple places like Bengaluru or Chennai)
  if (Array.isArray(cityData)) {
    return res.json({
      city,
      places: cityData
    });
  }

  // Otherwise, it's a single lat/lon object
  const response = {
    city,
    latitude: cityData.lat,
    longitude: cityData.lon
  };

  if (cityData.humidity !== undefined) {
    response.humidity = cityData.humidity;
  }

  return res.json(response);
});

app.listen(PORT, () => console.log(`Geocoding API running at http://localhost:${PORT}`));
