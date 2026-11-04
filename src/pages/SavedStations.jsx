import { Container, Card, Button } from 'react-bootstrap';

function SavedStations({ savedStations, onRemoveStation }) {
  return (
    <Container>
      <h2 className="mb-3">3. Saved Stations ({savedStations.length})</h2>
      <Card className="p-3">
        {savedStations.length === 0 ? (
          <p className="mb-0">You have not saved any stations yet.</p>
        ) : (
          <ul>
            {savedStations.map((station) => (
              <li key={station._id} className="mb-2">
                <strong>{station.name}</strong> ({station.exposure}){' '}
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onRemoveStation(station._id)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </Container>
  );
}

export default SavedStations;