import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router';
import NavBar from './components/NavBar';
import Explorer from './pages/Explorer';
import SensorChart from './pages/SensorChart';
import SavedStations from './pages/SavedStations';

function App() {
  const [selectedStation, setSelectedStation] = useState(null);
  const [savedStations, setSavedStations] = useState([]);

  const handleSaveStation = (station) => {
    const exists = savedStations.some((item) => item._id === station._id);
    if (!exists) {
      setSavedStations([...savedStations, { ...station, note: '' }]);
    }
  };

  const handleRemoveStation = (stationId) => {
    const filtered = savedStations.filter((item) => item._id !== stationId);
    setSavedStations(filtered);
  };

  return (
    <HashRouter>
      <div className="min-vh-100 bg-light pb-5">
        <NavBar savedCount={savedStations.length} />

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Explorer
                  onSelectStation={setSelectedStation}
                  onSaveStation={handleSaveStation}
                />
              }
            />
            <Route
              path="/chart"
              element={<SensorChart selectedStation={selectedStation} />}
            />
            <Route
              path="/saved"
              element={
                <SavedStations
                  savedStations={savedStations}
                  onRemoveStation={handleRemoveStation}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;