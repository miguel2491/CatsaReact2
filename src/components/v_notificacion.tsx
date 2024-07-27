import { API_URL } from "../auth/authConstants";
import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import { IoIosMail } from "react-icons/io";
import "../components/notificacion.css"

export default function v_notificacion()
{
    // const navigate = useNavigate();
    const cookies = new Cookies();
    const [noti, setNoti] = useState(0);
    const [list, setNotifica] = useState([]);
    
    if(cookies.get('idUsuario') == undefined)
    {
      return null;  
    }

    function setCorreo(id)
    {
      console.log(id)
      let confi_ax = 
            {
              headers:
              {
                'Cache-Control': 'no-cache',
                "Authorization": "Bearer "+cookies.get('token'),
              }
            }
      try {
        axios.post(API_URL+'Usuarios/SetNotificacionUpd',{id:id},confi_ax)
        .then((res) =>{
          console.log(res);
        });
      } catch (error) {
          console.log(error);
      }
    }

    useEffect(() => {  
      
      const fetchData = async()=>{
        try{
          let confi_ax = 
            {
              headers:
              {
                'Cache-Control': 'no-cache',
                "Authorization": "Bearer "+cookies.get('token'),
              }
            }
          const response = await axios.get(API_URL+'Usuarios/GetNotificacion'+`/${cookies.get('idUsuario')}`,confi_ax);
          //console.log(response.data);
          setNoti(response.data.length);
          setNotifica(response.data);
        } catch(error){
          console.log(error);
        }
      };
      fetchData();
    }, [setNotifica]);

    if(!noti) return null;

      return (
        <Dropdown className="bdge_icon">
            <Dropdown.Toggle>
            {noti}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {list.map((item) =>(
                <div className="dv_not" onClick={()=>setCorreo(item.id_notificaciones)}>
                    <Dropdown.Item href="">
                      <div className="dv_desc">
                        <IoIosMail style={{"fontSize":"16pt"}} />{item.descripcion}
                      </div>
                    </Dropdown.Item>
                    <hr></hr>
                </div>
              ))}
              
            </Dropdown.Menu>
        </Dropdown>
    )
}