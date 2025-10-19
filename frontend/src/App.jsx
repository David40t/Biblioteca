import { Outlet, Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function App() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Biblioteca</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/authors">Autores</Nav.Link>
            <Nav.Link as={Link} to="/books">Libros</Nav.Link>
            <Nav.Link as={Link} to="/genders">Géneros</Nav.Link>
            <Nav.Link as={Link} to="/loans">Préstamos</Nav.Link>
            <Nav.Link as={Link} to="/users">Usuarios</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Outlet /> 
      </Container>
    </>
  );
}
