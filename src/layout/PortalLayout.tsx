import { Link, useNavigate } from "react-router-dom";
import React, { MouseEvent, useState, useEffect } from "react";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Cookies from 'universal-cookie';
import { IoIosHelpCircle } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { FaBell, FaUser } from "react-icons/fa";
import { Permisos } from "../types/types";
import Badge from 'react-bootstrap/Badge';
import "../layout/dashboard.css"
import Notificacion from "../components/v_notificacion";
import Vcotizador from "../components/permisos/v_cotizador";

interface PortalLayoutProps {
  children?: React.ReactNode;
}
export default function PortalLayout({ children }: PortalLayoutProps) {
  const auth = useAuth();
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Permisos[]>([]);  
  const [value, setValue] = useState("");

  async function getPermisos() {
    const accessToken = cookies.get('token');
    try {
      const response = await fetch(`${API_URL}Permisos/GetPermisos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response) {
        const json = await response.json();
        setTodos(json);
      }
    } catch (error) {
      console.log(error);
      console.log("Primer Error");
    }
  }

  const cerrarSesion=()=>{
    cookies.remove('idUsuario', {path: '/'});
    cookies.remove('nombre', {path: '/'});
    cookies.remove('usuario', {path: '/'});
    cookies.remove('rol', {path: '/'});
    cookies.remove('token', {path: '/'});
    navigate('/');
}


  
  function setPermisos()
  {
    let opc;
    for(var i = 0; i < todos.length; i++)
    {
      if(todos[i].id_permiso == 1)
        {
          opc = <Vcotizador />;
        }
      if(todos[i].id_permiso == 2)
        {
          opc = 
            <NavDropdown.Item href="#action/3.1">Cotizador</NavDropdown.Item>
          ;
        }
    }
    return opc;
  }
  async function handleSignOut(e: MouseEvent) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/signout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getRefreshToken()}`,
        },
      });
      if (response.ok) {
        auth.signout();
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if(todos.length > 0 && cookies.get('idUsuario') != undefined)
    {
      setPermisos();
    }else if(cookies.get('idUsuario') == undefined){
      cookies.remove('token', {path: '/'});
      //cerrarSesion();
    }else{
      getPermisos();
    }
  }, []);
  return (
    <>
    <Navbar collapseOnSelect expand="lg" style={{"background":"#000054", color:"red"}}>
            <Container fluid>
                <Navbar.Brand style={{color:"white"}} href="#">
                  <Link to="/dashboard">
                    <img src='../logo.png' style={{width:"60px"}} />
                  </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#" style={{color:"white"}} className='text-center'>
                      <Link to="/dashboard" style={{"text-decoration":"none"}}>
                        ¡Hola! {cookies.get('nombre')}
                      </Link>
                    </Nav.Link>
                    
                    {cookies.get('rol') == 1 && 
                    <NavDropdown title={<span className="text-white">Admin</span>} id="collapsible-nav-dropdown">
                      <NavDropdown.Item href="#">
                        <Link to="/usuarios"><FaUser /> Usuarios</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">Roles</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">Permisos</NavDropdown.Item>
                      <NavDropdown.Item href="#">Asignaciones</NavDropdown.Item>
                      <NavDropdown.Item href="#">Asignar Usuario/Planta</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">Catalogos</NavDropdown.Item></NavDropdown>
                    }
                    {(cookies.get('rol') == 1 || cookies.get('rol') == 2) &&
                      <NavDropdown title={<span className="text-white">Ventas</span>} id="collapsible-nav-dropdown">
                        {setPermisos()}
                      <NavDropdown.Item href="#action/3.2">Pedidos</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">Reportes</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">Ventas Diarias</NavDropdown.Item></NavDropdown>
                    }
                    {(cookies.get('rol') == 1 || cookies.get('rol') == 3) &&
                      <NavDropdown title={<span className="text-white">Producción</span>} id="collapsible-nav-dropdown">
                      <NavDropdown.Item href="#action/3.1">Usuarios</NavDropdown.Item>
                      </NavDropdown>
                    }
                </Nav>
                <Nav>
                    <Nav.Link href="#deets" style={{color:"white"}}>
                      <FaBell style={{"fontSize":"14pt"}} />
                      <Badge bg="primary" className="bdge">
                        <Notificacion />
                      </Badge>
                    </Nav.Link>
                    <Nav.Link href="#" style={{color:"white"}}>
                        <Link to="/ayuda" style={{color:"white"}}>
                          <IoIosHelpCircle style={{"fontSize":"16pt"}} /> 
                        </Link>
                    </Nav.Link>
                    <Nav.Link eventKey={2} style={{color:"white"}} onClick={()=>cerrarSesion()}>
                        <CiLogout style={{"fontSize":"20pt"}} /> Cerrar Sesión
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
      <main>{children}</main>
    </>
  );
}