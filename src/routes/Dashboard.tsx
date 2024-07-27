import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PortalLayout from "../layout/NavBarLeft";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cookies from 'universal-cookie';
import '../layout/dashboard.css'
import { FaBell, FaEye } from "react-icons/fa";
import { MdBlock } from "react-icons/md";


export default function Dashboard() {
  const auth = useAuth();
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  
  async function createTodo() {
    if (value.length > 3) {
      try {
        const response = await fetch(`${API_URL}/posts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.getAccessToken()}`,
          },
          body: JSON.stringify({ title: value }),
        });
        if (response.ok) {
          const todo = (await response.json()) as Todo;
          setTodos([...todos, todo]);
        }
      } catch (error) {}
    }
  }

  useEffect(() => {
    
    if(cookies.get('idUsuario') == undefined)
      {
        navigate('/');
      }
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createTodo();
  }
 
  return (
      <Container fluid>
        <Row>
          <Col xs lg="2" className="navbarL">
            <PortalLayout />
          </Col>
          <Col xs lg md="auto">
            <Row>
              a
            </Row>
            <Row className="panel">
              <div className="dashboard">
                
                {(cookies.get('rol') == 1 || cookies.get('rol') == 2) &&
                  <Col xs={12} md={2}>
                    <Link to="/levantarPedido" style={{"text-decoration":"none"}}>
                    <div>
                      <Card
                        bg='primary'
                        text='Ver Pedido'
                        style={{ width: '18rem' }}
                        className="mb-2"
                      >
                        <Card.Body style={{"color":"white"}}>
                          <Card.Title className="text-center"> <FaBell style={{"fontSize":"4rem"}} /> </Card.Title>
                          <Card.Text className='text-center' style={{"fontSize":"12pt"}}>
                            Levantar Pedido
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                    </Link>
                  </Col>
                }
                {(cookies.get('rol') == 1 || cookies.get('rol') == 2) &&
                  <Col xs={12} md={2}>
                      <Link to="/verPedido" style={{"text-decoration":"none"}}>
                      <Card
                        bg='warning'
                        text='Ver Pedido'
                        style={{ width: '18rem' }}
                        className="mb-2"
                      >
                      
                      <Card.Body style={{"color":"white"}}>
                        <Card.Title className="text-center"> <FaEye style={{"fontSize":"4rem"}} /> </Card.Title>
                        <Card.Text className='text-center' style={{"fontSize":"12pt"}}>
                          Ver Pedido
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    </Link>
                  </Col>
                }
                {(cookies.get('rol') == 1 || cookies.get('rol') == 2|| cookies.get('rol') == 3|| cookies.get('rol') == 4|| cookies.get('rol') == 9|| cookies.get('rol') == 21) &&
                  <Col xs={12} md={4}>
                      <Card
                        bg='danger'
                        text='Pedido Cancelado'
                        style={{ width: '18rem' }}
                        className="mb-2"
                      >
                      <Link to="/pedidoCan" style={{"text-decoration":"none"}}>
                      <Card.Body style={{"color":"white"}}>
                        <Card.Title className="text-center"> <MdBlock style={{"fontSize":"4rem"}} /> </Card.Title>
                        <Card.Text className='text-center' style={{"fontSize":"12pt"}}>
                          Pedido Cancelado
                        </Card.Text>
                      </Card.Body>
                      </Link>
                    </Card>
                  </Col>
                }
              
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
  );
}