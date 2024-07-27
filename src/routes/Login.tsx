import { useState, useEffect } from "react";
import { FaUser, FaKey } from "react-icons/fa";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import { AuthResponseError } from "../types/types";
import Cookies from 'universal-cookie';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../layout/login.css'
import InputGroup from 'react-bootstrap/InputGroup';
import Loading from './Loading';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const auth = useAuth();
  const cookies = new Cookies();
  const MySwal = withReactContent(Swal);
  const baseUrl="http://apicatsa.catsaconcretos.mx:2543/api/";

  useEffect(()=>{
    
    if(cookies.get('idUsuario') == undefined)
      {
        setTimeout(()=>{
          setIsLoading(false);
        }, 3000);
      }else{
        cookies.remove('token', {path: '/'});
        cookies.remove('idUsuario', {path: '/'});
      }
  }, []);

  if(isLoading)
  {
    return <Loading />;
  }
  
  if(cookies.get('token')==undefined)
  {
    console.log("TOKEN UNDEFINED");
    GeToken();
  }
  else if(cookies.get('idUsuario') != undefined)
  { 
    auth.saveUser({"token":cookies.get('token'),"usuario":cookies.get('usuario'),"rol":cookies.get('rol')});
    if (auth.isAuthenticated) 
    {
      setTimeout(()=>{
        setIsLoading(false);
      }, 1000);
      return <Navigate to="/dashboard" />;
    }
  }else{
    cookies.get('token');
  }
  
  function handleChange(e: React.ChangeEvent) {
    const { name, value } = e.target as HTMLInputElement;
    if (name === "username") {
      setUsername(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  }

  function GeToken()
  {
    try
    {
      var postData = 
      {
        UserName:'ProCatsa',
        Password:'ProCatsa2024$.'
      };
      let confi_ax = 
      {
        headers:
        {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
        }
      }
      axios.post(baseUrl+'Login/Login',postData,confi_ax)
      .then(response=>{
        return response.data;
      }).then(response=>{
        cookies.set('token', response, {path: '/'});
        console.log(response);
      })
      .catch(error=>{
        console.log(error);
      })    
    }catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      let confi_ax = 
      {
        headers:
        {
          'Cache-Control': 'no-cache',
          "Authorization": "Bearer "+cookies.get('token'),
        }
      }
      //await axios.get(baseUrl+`/${username},${password}`)
      await axios.get(baseUrl+'Usuarios/GetLogin'+`/${username},${password}`,confi_ax)
      .then(response=>{
        return response.data;
      }).then(response=>{
        var obj = JSON.stringify(response);
        if(obj.length>0){
          obj = JSON.parse(obj);
          console.log(obj);
          let nombre = response.nombre+" "+response.app+" "+response.apm;
          cookies.set('idUsuario', response.id_usuario, {path: '/'});
          cookies.set('nombre', nombre, {path: '/'});
          cookies.set('usuario', response.correo, {path: '/'});
          cookies.set('rol', response.id_rol, {path: '/'});
          //const json = ({"token":cookies.get('token'),"usuario":response.correo}) as AuthResponse;
          auth.saveUser({"token":cookies.get('token'),"usuario":response.correo,"rol":response.id_rol});
          setTimeout(()=>{
            setIsLoading(false);
          }, 1000);
        }else{    
          const json = (response) as AuthResponseError;
          setErrorResponse(json.body.error);
        }
      })
      .catch(error=>{
        console.log(error);
        //cookies.remove('token', {path: '/'});
      })    
    } catch (error) {
      console.log(error);
    }
  }
  
  if (auth.isAuthenticated) {
    setTimeout(()=>{
      setIsLoading(false);
    }, 1000);
    return <Navigate to="/dashboard" />;
  }
  
  return (
      <Container className="mt-4">
        <Card className="dLogin" style={{ border:'transparent','background':'transparent' }}>
          <Card.Body>
            <form onSubmit={handleSubmit} className="form">
              <Row>
              <Col xs={12} md={6}>
                  {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
                  <div className="dForm" style={{'background':'#474A59'}}>
                  <InputGroup className="mb-3" style={{'width':'90%'}}>
                    <InputGroup.Text id="basic-addon1"><FaUser /></InputGroup.Text>
                    <Form.Control
                        id="usuario"
                        name="username"
                        type="text"
                        onChange={handleChange}
                        value={username}
                        placeholder="Usuario"
                        aria-label="Usuario"
                        aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                  <InputGroup className="mb-3" style={{'width':'90%'}}>
                      <InputGroup.Text id="basic-addon1"><FaKey /></InputGroup.Text>
                      <Form.Control
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Password"
                          aria-label="Password"
                          aria-describedby="basic-addon1"
                          onChange={handleChange}
                          value={password}
                      />
                  </InputGroup>
                  <div className="text-center mb-3 mt-3">
                    <button className="btn btn-primary text-center">Ingresar</button>
                  </div>
                  <div className="form-check align-items-center">
                    <Form.Check id={`check-api-checkbox`}>
                      <Form.Check.Input isValid />
                      <Form.Check.Label style={{color:'withe'}}>{`Mantener Sesión Activa `}</Form.Check.Label>
                    </Form.Check>
                  </div>
                  <div className="text-center mb-3 mt-3">
                      <Link to="/signup" style={{"color":"yellow"}}>¿Olvidaste tu contraseña?</Link>
                  </div>
                  </div>
                </Col>
                <Col xs={12} md={6} className="dLogo">
                  <div className="bg-white mt-4 dlWhite">
                    <Row>
                      <Col xs={12} md={12}>
                        <img src="icono_sl.png" className="img-fluid" id="logo" />
                      </Col>
                      <Col xs={12} md={12} className="imgLetra">
                        <img src="titulo.png" className="img-fluid_letra" />
                      </Col>
                    </Row>
                    <div className="eula">Bienvenido, ingresa tus credenciales para iniciar</div>
                  </div>
                </Col>
              </Row>
          </form>
          <Row>
          </Row>
          </Card.Body>
        </Card>
      </Container>
  );
}