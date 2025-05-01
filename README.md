# 🌧️ AI Rainwater Harvesting Optimizer

A smart web application for optimizing rainwater harvesting systems in Malaysia, helping users calculate potential water savings, estimate ROI, and get recommendations for their specific needs.

## Features

### Smart Rainwater Capture Calculator
- Calculate potential rainwater collection based on roof size and location
- Uses historical rainfall data from local CSV database
- Real-time weather data integration via OpenWeatherMap API
- State-specific calculations for accurate results

### ROI Estimator
- Calculate potential water bill savings based on state-specific tariffs
- Visualize financial benefits over time
- Tank size recommendations with cost estimates
- Payback period calculations

### Property-Specific Recommendations
- Customized calculations for different property types (terrace, semi-d, bungalow)
- Tank size recommendations based on peak rainfall
- Cost estimation and efficiency projections
- State-specific water tariff considerations

## Tech Stack

### Frontend
- React.js
- Material-UI
- Recharts for data visualization
- React Router for navigation

### Backend
- Node.js
- Express.js
- CSV data storage (for rainfall data)
- RESTful API architecture

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- OpenWeatherMap API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/rainwater-harvesting-optimizer.git
cd rainwater-harvesting-optimizer
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
```

4. Create a `.env` file in the root directory:
```env
PORT=5001
OPENWEATHER_API_KEY=your_api_key_here
```

5. Start the development servers:

For backend:
```bash
npm run dev
```

For frontend (in a new terminal):
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001

## Project Structure
```
rainwater-harvesting-optimizer/
├── client/                 # React frontend
│   ├── public/            # Static files
│   └── src/               # Source files
├── server.js              # Express backend server
├── rainfall.csv           # Historical rainfall data
├── package.json           # Backend dependencies
└── README.md             # Project documentation
```

## API Endpoints

### GET /api/health
- Check server health and data loading status
- Response: `{ status: 'ok', dataLoaded: boolean }`

### GET /api/rainfall-data
- Retrieve historical rainfall data
- Response: Array of rainfall records

### POST /api/calculate
- Calculate rainwater harvesting potential
- Required parameters: state, propertyType
- Response: Includes real-time and historical calculations

### GET /api/weather/:state
- Get real-time weather data for a specific state
- Response: temperature, rainfall, weather description

## Data Sources
- OpenWeatherMap API for real-time weather data
- Local CSV database for historical rainfall data
- State-specific water tariffs from Malaysian water authorities

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- OpenWeatherMap API for weather data integration
- Malaysian water authorities for tariff information
- Local meteorological data sources

