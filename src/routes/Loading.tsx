import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import '../layout/login.css'

function Loading() {
    return (
      <Container>
        <Row>
          <Col xs={12} md={4}></Col>
          <Col xs={12} md={3} className='mCarga'>
            <div
              className="modal show"
              style={{ display: 'block', position: 'initial' }}
            >
              <Modal.Dialog>
                <Modal.Body>
                  <img src="icono_sl.png" className="img-fluid" id="logo" />
                  <p className='text-center'>Cargando...</p>
                </Modal.Body>
              </Modal.Dialog>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  export default Loading;

