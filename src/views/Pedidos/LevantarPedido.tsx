import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PortalLayout from "../../layout/PortalLayout";
import Button from 'react-bootstrap/Button';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { GiPositionMarker } from "react-icons/gi";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

export default function LevantarPedido() {
  return (
    <PortalLayout>
      <Container>
        <Row>
          <Col>
            <Link to="/" style={{"text-decoration":"none"}}>
            <Button variant="primary" size="lg">
              <IoArrowBackCircleSharp style={{"fontSize":"2rem"}} />
            </Button>{' '}
          </Link>
          </Col>
        </Row>
        <Row>
          <Card>
            <Card.Body>
              <Card.Title>Levantar Pedido</Card.Title>
              <Row>
                <Col sm={1}>
                  <Form.Label>No. Pedido</Form.Label>
                </Col>
                <Col sm={3}>
                  <Form.Control placeholder="No. Pedido" />
                </Col>
                <Col sm={1}>
                  <Form.Label>No. Obra</Form.Label>
                </Col>
                <Col sm={3}>
                  <Form.Control placeholder="No. Obra" />
                </Col>
              </Row>
              <Row>
                <Col sm={1}>
                  <Form.Label>
                    Cliente
                  </Form.Label>
                </Col>
                <Col sm={4}>
                  <Form.Control placeholder="Cliente" />
                </Col>
                <Col sm={1}>
                  <Form.Label>Fecha / Hra</Form.Label>
                </Col>
                <Col sm={4}>
                  <Form.Control placeholder="Fca/Hra" />
                </Col>
              </Row>
              <Row>
              <Col sm={1}>
                  <Form.Label>Descripción Obra</Form.Label>
                </Col>
                <Col sm={4}>
                  <Form.Control />
                </Col>
                <Col sm={1}>
                  <Form.Label>Planta</Form.Label>
                </Col>
                <Col sm={3}>
                  <Form.Select aria-label="Default select example">
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Col>
                <Col sm={1}>
                  <Form.Label>No. Cliente</Form.Label>
                </Col>
                <Col sm={2}>
                  <Form.Control />
                </Col>
              </Row>
              <Row>
                <Col sm={1}>
                  <Button variant="primary" size="sm">
                    <GiPositionMarker style={{"fontSize":"1rem"}} />
                  </Button>{' '}
                </Col>
                <Col sm={2}>
                  <Form.Control></Form.Control>
                </Col>
                <Col sm={2}>
                  <Form.Control></Form.Control>
                </Col>
                <Col sm={1}>
                  <Form.Label>Facturar a</Form.Label>
                </Col>
                <Col sm={4}>
                  <Form.Control></Form.Control>
                </Col>
              </Row>
              <Row>
                <Col sm={4}>
                  <Form.Label>Dirección Cliente</Form.Label>
                  <Form.Control></Form.Control>
                </Col>
                <Col sm={3}>
                  <Form.Label>Forma Pago</Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Col>
                <Col sm={3}><Form.Label>Asesor</Form.Label><Form.Control></Form.Control></Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
        <Row>
          
        </Row>
        <Row>
          
        </Row>
      </Container>
    </PortalLayout>
  );
}
