import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthResponse, AuthResponseError } from "../types/types";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IoIosMail } from "react-icons/io";
import { Link } from "react-router-dom";
import '../layout/login.css'
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();
  const goTo = useNavigate();

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(username, password, name);

    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, name }),
      });
      if (response.ok) {
        const json = (await response.json()) as AuthResponse;
        console.log(json);
        setUsername("");
        setPassword("");
        setName("");
        goTo("/");
      } else {
        const json = (await response.json()) as AuthResponseError;

        setErrorResponse(json.body.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Container>
      <Card className="dLogin" style={{ border:'transparent','background':'transparent' }}>
          <Card.Body>
            <Row>
              <Col xs={4} md={4} className="fcorreo">
              <Card.Img variant="top" src="./img/mail.png" style={{width:"120px"}} className="imgCorreo" />
                <Form className="mt-2">
                    <InputGroup className="mb-3" style={{'width':'90%'}}>
                        <InputGroup.Text id="basic-addon1">
                          <IoIosMail size={"2rem"}/></InputGroup.Text>
                        <Form.Control
                            id="correo"
                            name="correo"
                            placeholder="Correo"
                            aria-label="Correo"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </Form>
                <div id="dvLog" className="mt-2 ml-2">
                    <Button variant="danger" id="btnSend">
                        ENVIAR CORREO
                    </Button>
                </div>
              </Col>
            </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}