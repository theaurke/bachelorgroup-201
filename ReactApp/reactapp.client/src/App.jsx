import React from 'react';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function App() {
    return (
        <Container className="vh-100" style={{padding: '1em' }} fluid>
            <Row style={{ height: '100%' }}>
                <Col xl={3} >
                    <Sidebar />
                </Col>
                <Col>
                    <Main />
                </Col>
            </Row >
        </Container>
    );
}

