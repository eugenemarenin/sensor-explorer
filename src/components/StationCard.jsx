import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router';

function StationCard({ station, isSaved, onSelectStation, onSaveStation }) {
  // Считаем количество датчиков у станции (если массив sensors есть)
  const sensorCount = station.sensors ? station.sensors.length : 0;

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{station.name}</Card.Title>

        <Card.Text className="text-muted mb-2">
          Placement: <strong>{station.exposure}</strong>
        </Card.Text>

        <Card.Text className="mb-3">
          Available sensors: <strong>{sensorCount}</strong>
        </Card.Text>

        <div className="mt-auto d-flex gap-2">
          <Button
            as={Link}
            to="/chart"
            variant="primary"
            size="sm"
            onClick={() => onSelectStation(station)}
          >
            View Sensors & Chart
          </Button>

          <Button
            variant={isSaved ? 'secondary' : 'outline-success'}
            size="sm"
            disabled={isSaved}
            onClick={() => onSaveStation(station)}
          >
            {isSaved ? 'Saved' : 'Save Station'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default StationCard;