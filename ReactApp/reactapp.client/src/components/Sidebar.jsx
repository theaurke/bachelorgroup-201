import Navbar from './Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default function Sidebar() {
    return (
        <Container fluid style={{ height: '100%', display: 'flex', flexDirection: 'column'}}>
            <Row style={{ height: '20%', backgroundColor: '#45654C', textAlign: 'center', padding: '1em'}}>
                <img alt='logo' src='logo.png' style={{height: '100%', objectFit: 'contain'} } />
            </Row>
            <Row style={{ backgroundColor: '#45654C', flex: '1', marginTop: '1em' }}>
                <Navbar />
            </Row>
        </Container>
    );
}