import React from 'react';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function App() {
    return (
        <Container fluid>
            <Row>
                <Col xl={3}>
                    <Sidebar />
                </Col>
                <Col>
                    <Main />
                </Col>
            </Row>
        </Container>
    );
}

