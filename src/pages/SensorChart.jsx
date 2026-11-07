import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

function SensorChart({ selectedStation }) {
  const [selectedSensor, setSelectedSensor] = useState(
    selectedStation && selectedStation.sensors ? selectedStation.sensors[0] : null
  );

  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedStation || !selectedSensor) return;

    const getSensorHistory = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const toDate = selectedSensor.lastMeasurement ? `?to-date=${selectedSensor.lastMeasurement.createdAt}` : '';
        const url = `https://api.opensensemap.org/boxes/${selectedStation._id}/data/${selectedSensor._id}${toDate}`;        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        const rawData = await res.json();

        const formatted = rawData
          .slice(0, 20)
          .reverse()
          .map((item) => ({
            name: item.createdAt.slice(11, 16), 
            value: Number(item.value)
          }));

        setChartData(formatted);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getSensorHistory();
  }, [selectedStation, selectedSensor]);

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

  const sensors = selectedStation.sensors || [];

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Station: {selectedStation.name}</h2>
        <Button as={Link} to="/" variant="outline-secondary" size="sm">
          Back to Explore
        </Button>
      </div>

      <p className="text-muted">
        Placement: <strong>{selectedStation.exposure}</strong> | Click on any sensor below to load its historical chart.
      </p>

      {}
      <div className="row mb-4">
        {sensors.map((sensor) => {
          const isSelected = selectedSensor && selectedSensor._id === sensor._id;
          const lastValue = sensor.lastMeasurement ? sensor.lastMeasurement.value : 'N/A';

          return (
            <div key={sensor._id} className="col-12 col-md-4 mb-3">
              <Card className={isSelected ? 'border-primary h-100 shadow-sm' : 'h-100'}>
                <Card.Body>
                  <Card.Title className="fs-6">{sensor.title}</Card.Title>
                  <Card.Text className="fs-4 fw-bold text-primary mb-2">
                    {lastValue} {sensor.unit}
                  </Card.Text>
                  <Button
                    variant={isSelected ? 'primary' : 'outline-primary'}
                    size="sm"
                    onClick={() => setSelectedSensor(sensor)}
                  >
                    {isSelected ? 'Showing on Chart' : 'Show Chart'}
                  </Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>

      {selectedSensor && (
        <Card className="p-3 shadow-sm">
          <h4 className="mb-3">
            Recent Measurements: {selectedSensor.title} ({selectedSensor.unit})
          </h4>

          {isLoading && <p className="alert alert-info">Loading sensor measurements...</p>}
          {error && <p className="alert alert-danger">Error: {error}</p>}

          {!isLoading && !error && chartData.length === 0 && (
            <p className="text-muted">No recent measurements available for this sensor.</p>
          )}

          {!isLoading && !error && chartData.length > 0 && (
            <div className="overflow-auto">
              <LineChart width={650} height={300} data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="value" stroke="#0d6efd" />
              </LineChart>
            </div>
          )}
        </Card>
      )}
    </Container>
  );
}

export default SensorChart;