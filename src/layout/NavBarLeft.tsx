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
      <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link href="/home">Active</Nav.Link>
        <Nav.Link eventKey="link-1">Link</Nav.Link>
        <Nav.Link eventKey="link-2">Link</Nav.Link>
        <Nav.Link eventKey="disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav>
      <main>{children}</main>
    </>
  );
}