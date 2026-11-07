import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router';

function SavedStations({ savedStations, onSelectStation, onRemoveStation }) {
  return (
    <Container>
      <h2 className="mb-3">3. Saved Stations ({savedStations.length})</h2>

      {savedStations.length === 0 ? (
        <Card className="p-3">
          <p className="mb-2">No saved stations yet.</p>
          <div>
            <Button as={Link} to="/" variant="primary" size="sm">
              Back to Explore
            </Button>
          </div>
        </Card>
      ) : (
        savedStations.map((station) => (
          <Card key={station._id} className="p-3 mb-2 shadow-sm">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1">{station.name}</h5>
                <small className="text-muted">
                  Placement: {station.exposure} | Sensors: {station.sensors ? station.sensors.length : 0}
                </small>
              </div>

              <div className="d-flex gap-2">
                <Button
                  as={Link}
                  to="/chart"
                  variant="primary"
                  size="sm"
                  onClick={() => onSelectStation(station)}
                >
                  Open Chart
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onRemoveStation(station._id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          </Card>
        ))
      )}
    </Container>
  );
}

export default SavedStations;