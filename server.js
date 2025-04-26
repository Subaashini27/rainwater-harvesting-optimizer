const express = require('express');
const cors = require('cors');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001; // Allow port to be set by environment variable

// Middleware
app.use(cors());
app.use(express.json());

// Load rainfall data
let rainfallData = [];

// Check if rainfall.csv exists
const csvPath = path.join(__dirname, 'rainfall.csv');
if (!fs.existsSync(csvPath)) {
  console.error('Error: rainfall.csv not found!');
  process.exit(1);
}

fs.createReadStream(csvPath)
  .pipe(csv())
  .on('data', (row) => {
    // Convert rainfall_mm to number
    row.rainfall_mm = parseFloat(row.rainfall_mm);
    rainfallData.push(row);
  })
  .on('end', () => {
    console.log('Rainfall data loaded successfully:', rainfallData);
  })
  .on('error', (error) => {
    console.error('Error reading rainfall data:', error);
    process.exit(1);
  });

// Helper functions
const calculateHarvestableWater = (roofArea, rainfallMm) => {
  const result = roofArea * rainfallMm * 0.8; // Litres
  console.log(`Calculating harvestable water: ${roofArea} m² * ${rainfallMm} mm * 0.8 = ${result} L`);
  return result;
};

const calculateSavings = (litres) => {
  const pricePerM3 = 0.57; // Air Selangor tariff RM/m³
  const savings = (litres / 1000) * pricePerM3; // RM
  console.log(`Calculating savings: ${litres} L = RM ${savings.toFixed(2)}`);
  return savings;
};

const recommendTankSize = (litres) => {
  let recommendation;
  if (litres < 3000) {
    recommendation = {
      size: "1,000 L slim tank",
      cost: 800
    };
  } else if (litres < 8000) {
    recommendation = {
      size: "3,000 L vertical tank",
      cost: 1200
    };
  } else {
    recommendation = {
      size: "5,000 L concrete cistern",
      cost: 5000
    };
  }
  console.log(`Recommending tank for ${litres} L: ${recommendation.size} at RM ${recommendation.cost}`);
  return recommendation;
};

// API endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', dataLoaded: rainfallData.length > 0 });
});

app.get('/api/rainfall-data', (req, res) => {
  res.json(rainfallData);
});

app.post('/api/calculate', (req, res) => {
  console.log('Received calculation request:', req.body);
  const { state, propertyType } = req.body;
  
  if (!state || !propertyType) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  // Default roof areas based on property type
  const roofAreas = {
    'terrace': 95,
    'semi-d': 150,
    'bungalow': 220
  };
  
  const roofArea = roofAreas[propertyType] || 95;
  console.log(`Using roof area: ${roofArea} m² for property type: ${propertyType}`);
  
  // Calculate monthly data
  const monthlyData = rainfallData
    .filter(row => row.state === state)
    .map(row => {
      const rainfallMm = row.rainfall_mm;
      const harvestableWater = calculateHarvestableWater(roofArea, rainfallMm);
      const savings = calculateSavings(harvestableWater);
      
      return {
        month: row.month,
        rainfall_mm: rainfallMm,
        harvestable_water: Math.round(harvestableWater),
        savings: parseFloat(savings.toFixed(2))
      };
    });

  if (monthlyData.length === 0) {
    return res.status(404).json({ error: `No rainfall data found for state: ${state}` });
  }

  console.log('Monthly data calculated:', monthlyData);

  // Calculate yearly totals
  const yearlyTotal = monthlyData.reduce((acc, curr) => acc + curr.harvestable_water, 0);
  const yearlySavings = monthlyData.reduce((acc, curr) => acc + curr.savings, 0);
  
  // Find peak month
  const peakMonth = monthlyData.reduce((max, curr) => 
    curr.harvestable_water > max.harvestable_water ? curr : max
  );

  // Calculate payback period
  const tankInfo = recommendTankSize(peakMonth.harvestable_water);
  const paybackPeriod = Math.ceil(tankInfo.cost / yearlySavings);

  const result = {
    monthlyData,
    yearlyTotal,
    yearlySavings: parseFloat(yearlySavings.toFixed(2)),
    peakMonth,
    tankSize: tankInfo.size,
    tankCost: tankInfo.cost,
    paybackPeriod
  };

  console.log('Sending response:', result);
  res.json(result);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server with port fallback
const startServer = (port) => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  }).on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use, trying port ${port + 1}`);
      startServer(port + 1);
    } else {
      console.error('Server error:', error);
      process.exit(1);
    }
  });
};

startServer(PORT); 