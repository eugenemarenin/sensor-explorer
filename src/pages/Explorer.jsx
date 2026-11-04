import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router';

function Explorer({ onSelectStation, onSaveStation }) {
  // Пробный объект станции для проверки связи между экранами до подключения API
  const testStation = {
    _id: '57000b8745fd40c8196ad04c',
    name: 'Test Weather Station',
    exposure: 'outdoor'
  };

  return (
    <Container>
      <h2 className="mb-3">1. Explore Environmental Stations</h2>
      <Card className="p-3 mb-3">
        <p>
          На следующем шаге мы добавим сюда загрузку станций через fetch + useEffect и фильтр по региону.
        </p>
        <div className="d-flex gap-2">
          <Button
            as={Link}
            to="/chart"
            variant="primary"
            onClick={() => onSelectStation(testStation)}
          >
            View Test Station on Screen 2
          </Button>

          <Button
            variant="outline-success"
            onClick={() => onSaveStation(testStation)}
          >
            Save Test Station to Screen 3
          </Button>
        </div>
      </Card>
    </Container>
  );
}

export default Explorer;