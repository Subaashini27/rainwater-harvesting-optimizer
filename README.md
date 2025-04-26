# 🌧️ AI Rainwater Harvesting Optimizer

A smart web application for optimizing rainwater harvesting systems in Malaysia, helping users calculate potential water savings, estimate ROI, and get AI-powered recommendations for their specific needs.

## Features

- **Smart Rainwater Capture Calculator**
  - Calculate potential rainwater collection based on roof size and location
  - Uses historical and predicted rainfall data
 

- **ROI Estimator**
  - Calculate potential water bill savings
  - Visualize financial benefits over time
  - Compare different system configurations

- **AI-Powered Recommendations**
  - Customized system suggestions for different property types
  - Tank size and installation type recommendations
  - Cost estimation and efficiency projections

- **Sustainability Dashboard**
  - Visual representation of water savings
  - Environmental impact tracking
  - Educational resources and tips

## Tech Stack

- **Frontend:**
  - React.js
  - Material-UI
  - Recharts for data visualization
  - React Router for navigation

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (for future data storage)
  - RESTful API architecture

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (for local development)

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
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/rainwater-harvesting
   ```

5. Start the development servers:
   ```bash
   # Start backend server
   npm run dev

   # In a new terminal, start frontend server
   cd client
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure

```
rainwater-harvesting-optimizer/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/         # Page components
│       └── App.js         # Main application component
├── server.js              # Express backend server
├── package.json           # Backend dependencies
└── README.md             # Project documentation
```

## API Endpoints

- `POST /api/calculate` - Calculate rainwater collection potential
- `POST /api/roi` - Calculate return on investment
- `GET /api/health` - Check server health

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Malaysian Meteorological Department for rainfall data
- Water Services Commission of Malaysia for water usage statistics
- OpenWeatherMap API for weather data integration 
