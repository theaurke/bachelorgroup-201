import React from 'react';
import Navbar from './Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default function Sidebar() {
    return (
        <Container style={{ height: '100%', display: 'flex', flexDirection: 'column'}}>
            <Row style={{ height: '20%', backgroundColor: "#45654C"}}>
                <img alt='logo' />
            </Row>
            <Row style={{ backgroundColor: "#45654C", flex: '1', marginTop: '1em' }}>
                <Navbar />
            </Row>
        </Container>
    );
}