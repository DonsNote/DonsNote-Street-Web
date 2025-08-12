import { Link, Outlet } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';

const MainLayout = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/">DonsNote-Street</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="py-3 main-content">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
