import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import StationCard from '../components/StationCard';

const REGION_BBOX = {
  finland: '21.0,60.0,31.5,64.0',
  munster: '7.4,51.8,7.8,52.1',
  berlin: '13.2,52.4,13.6,52.6',
  helsinki: '24.7,60.1,25.2,60.3'
};

function Explorer({ savedStations, onSelectStation, onSaveStation }) {
  const [stations, setStations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [region, setRegion] = useState('munster');
  const [search, setSearch] = useState('');
  const [exposure, setExposure] = useState('all');

  useEffect(() => {
    const getStations = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const bbox = REGION_BBOX[region];
        const res = await fetch(`https://api.opensensemap.org/boxes?bbox=${bbox}`);

        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();
        setStations(data.slice(0, 24));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getStations();
  }, [region]);

  const filteredStations = stations.filter((station) => {
    const matchesName = station.name.toLowerCase().includes(search.toLowerCase());
    const matchesExposure = exposure === 'all' ? true : station.exposure === exposure;
    return matchesName && matchesExposure;
  });

  return (
    <Container>
      <h2 className="mb-3">1. Explore Environmental Stations</h2>

      {}
      <Card className="p-3 mb-4 shadow-sm">
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <label htmlFor="regionSelect" className="form-label fw-bold">
              Select Region:
            </label>
            <select
              id="regionSelect"
              className="form-select"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="munster">Münster Area (Germany)</option>
              <option value="berlin">Berlin (Germany)</option>
              <option value="helsinki">Helsinki Area (Finland)</option>
              <option value="finland">Southern & Eastern Finland</option>
            </select>
          </div>

          <div className="col-12 col-md-4">
            <label htmlFor="searchInput" className="form-label fw-bold">
              Search by Station Name:
            </label>
            <input
              id="searchInput"
              type="text"
              className="form-control"
              placeholder="Type station name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-12 col-md-4">
            <label htmlFor="exposureSelect" className="form-label fw-bold">
              Placement Type:
            </label>
            <select
              id="exposureSelect"
              className="form-select"
              value={exposure}
              onChange={(e) => setExposure(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="outdoor">Outdoor</option>
              <option value="indoor">Indoor</option>
              <option value="mobile">Mobile</option>
            </select>
          </div>
        </div>
      </Card>

      {}
      {isLoading && <p className="alert alert-info">Loading stations from openSenseMap API...</p>}
      {error && <p className="alert alert-danger">Error: {error}</p>}

      {}
      {!isLoading && !error && (
        <>
          <p className="text-muted mb-3">
            Showing {filteredStations.length} stations
          </p>

          <div className="row">
            {filteredStations.map((station) => {
              const isSaved = savedStations.some((item) => item._id === station._id);

              return (
                <div key={station._id} className="col-12 col-md-6 col-lg-4 mb-3">
                  <StationCard
                    station={station}
                    isSaved={isSaved}
                    onSelectStation={onSelectStation}
                    onSaveStation={onSaveStation}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </Container>
  );
}

export default Explorer;