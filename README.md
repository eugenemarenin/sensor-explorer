# Environmental Sensor Explorer

A React single-page web application for exploring real-time environmental monitoring stations across regions in Germany and Finland using the public OpenSenseMap REST API.

## Links
- **Live Application (GitHub Pages):** [https://eugenemarenin.github.io/sensor-explorer/](https://eugenemarenin.github.io/sensor-explorer/)
- **GitHub Repository:** [https://github.com/eugenemarenin/sensor-explorer](https://github.com/eugenemarenin/sensor-explorer)

## Features & Screens
1. **Explore Stations (`/`):** Fetches environmental sensor stations by regional bounding boxes (`bbox`) in 4 regions in Germany and Finland, supports filtering by station name, and displays reusable station cards.
2. **Sensor Chart (`/chart`):** Displays all sensors attached to a selected station and visualizes recent measurement history using an interactive **Recharts** line chart.
3. **Saved Stations (`/saved`):** Allows users to bookmark stations for quick access and manage their saved list.

## Technologies & Libraries Used
- **React & Vite**
- **React Router (`HashRouter`)** 
- **React-Bootstrap & Bootstrap 5** 
- **Recharts** (historical sensor data visualization)
- **openSenseMap REST API** (real-time JSON environmental data)

## How to Run Locally

Clone the repository, install dependencies and start development server:
   ```bash
   git clone [https://github.com/eugenemarenin/sensor-explorer.git](https://github.com/eugenemarenin/sensor-explorer.git)
   cd sensor-explorer
   npm install
   npm run dev
   ```

Then open http://localhost:5173 in your browser