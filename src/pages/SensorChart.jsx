import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router';

function SensorChart({ selectedStation }) {
  if (!selectedStation) {
    return (
      <Container>
        <h2 className="mb-3">2. Sensor Chart & Details</h2>
        <Card className="p-3">
          <p>No station selected yet. Please choose a station on the Explore page first.</p>
          <div>
            <Button as={Link} to="/" variant="primary">
              Back to Explore Stations
            </Button>
          </div>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="mb-3">Station: {selectedStation.name}</h2>
      <Card className="p-3">
        <p>
          <strong>Station ID:</strong> {selectedStation._id}
        </p>
        <p className="mb-0">
          Здесь будут карточки датчиков этой станции и линейный график из библиотеки Recharts.
        </p>
      </Card>
    </Container>
  );
}

export default SensorChart;