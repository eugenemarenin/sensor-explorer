import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router';

function NavBar({ savedCount }) {
  return (
    <Navbar bg="dark" variant="dark" expand="md" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Environmental Sensor Explorer
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              1. Explore Stations
            </Nav.Link>
            <Nav.Link as={Link} to="/chart">
              2. Sensor Chart
            </Nav.Link>
            <Nav.Link as={Link} to="/saved">
              3. Saved Stations ({savedCount})
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;