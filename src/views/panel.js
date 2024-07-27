import React, {useEffect} from 'react';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import '../css/menu.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Menu from './planti/menu';
import Cookies from 'universal-cookie';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { FaArrowAltCircleUp , FaHandsHelping, FaEye, FaShareAltSquare, FaInfoCircle, FaTruck } from "react-icons/fa";
import { RiGitRepositoryFill } from "react-icons/ri";
import { TiCancel } from "react-icons/ti";
import { TbReport } from "react-icons/tb";
// import Navega from '../pages/planti/Navega';
import { useNavigate } from 'react-router-dom';

function Panel(props) {
    const navigate = useNavigate();
    const cookies = new Cookies();

    return (
        <ThemeProvider>
            <Menu/>
            <Container>
                <Row className='mt-4' xs={12} sm={12}>
                    <Col xs={12} sm={12} md={4} className='mt-2 mb-4'>
                        <Card xs={4} style={{ width: '18rem', "background":'#1c84c6', color:"white"}} className='mx-auto'>
                            <div style={{margin:"20% 50% 5% 40%"}}>
                                <FaArrowAltCircleUp style={{fontSize:"52px"}}/>
                            </div>
                            <Card.Body className='text-center'>
                                <Card.Title>Levantar</Card.Title>
                                <Card.Text>
                                    Pedido
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4} className='mt-2 mb-4'>
                        <Card style={{ width: '18rem',"background":'#1ab394', color:"white"}} className='mx-auto'>
                            <div style={{margin:"20% 50% 5% 40%"}}>
                                <FaEye  style={{fontSize:"52px"}}/>
                            </div>
                            <Card.Body className='text-center'>
                                <Card.Title>Ver</Card.Title>
                                <Card.Text>
                                    Pedidos
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4} className='mt-2 mb-4'>
                        <Card style={{ width: '18rem',"background":'#ed5565', color:"white" }} className='mx-auto'>
                            <div style={{margin:"20% 50% 5% 40%"}}>
                                <FaShareAltSquare  style={{fontSize:"52px"}}/>
                            </div>
                            <Card.Body className='text-center'>
                                <Card.Title>SharePoint</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <Col xs={12} md={4} className='mt-2 mb-4'>
                        <Card style={{ width: '18rem',"background":'#ed5565', color:"white" }} className='mx-auto'>
                            <div style={{margin:"20% 50% 5% 40%"}}>
                                <TiCancel  style={{fontSize:"52px"}}/>
                            </div>
                            <Card.Body className='text-center'>
                                <Card.Title>Pedidos Cancelados</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4} className='mt-2 mb-4'>
                        <Card style={{ width: '18rem',"background":'#474A59', color:"white" }} className='mx-auto'>
                            <div style={{margin:"20% 50% 5% 40%"}}>
                                <FaTruck style={{fontSize:"52px"}}/>
                            </div>
                            <Card.Body className='text-center'>
                                <Card.Title>CheckList</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4} className='mt-2 mb-4'>
                        <Card style={{ width: '18rem',"background":'#000054', color:"white" }} className='mx-auto'> 
                            <div style={{margin:"20% 50% 5% 40%"}}>
                                <TbReport  style={{fontSize:"52px"}}/>
                            </div>
                            <Card.Body className='text-center'>
                                <Card.Title>Reportes</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <Col xs={12} md={4} className='mt-2 mb-4'>
                        <Card style={{ width: '18rem',"background":'#f8ac59', color:"white" }} className='mx-auto'>
                            <div style={{margin:"20% 50% 5% 40%"}}>
                                <FaHandsHelping  style={{fontSize:"52px"}}/>
                            </div>
                            <Card.Body className='text-center'>
                                <Card.Title>Help</Card.Title>
                                <Card.Text>
                                    Desk
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4} className='mt-2 mb-4'>
                    <Card style={{ width: '18rem',"background":'#000054', color:"white" }} className='mx-auto'>
                            <div style={{margin:"20% 50% 5% 40%"}}>
                                <FaInfoCircle  style={{fontSize:"52px"}}/>
                            </div>
                            <Card.Body className='text-center'>
                                <Card.Title>Generación</Card.Title>
                                <Card.Text>
                                    Ideas
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4} className='mt-2 mb-4'>
                        <Card style={{ width: '18rem',"background":'#0D0D0D', color:"white" }} className='mx-auto'>
                            <div style={{margin:"20% 50% 5% 40%"}}>
                                <RiGitRepositoryFill style={{fontSize:"52px"}}/>
                            </div>
                            <Card.Body className='text-center'>
                                <Card.Title>Ficha</Card.Title>
                                <Card.Text>
                                    Técnica
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </ThemeProvider>
    );
}

export default Panel;
